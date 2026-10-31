"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const CONTRACT = "0x99131FcFad88c0A1DF75FaeCC9c1CfAD1566a63B";
const EXPLORER = `https://bscscan.com/address/${CONTRACT}`;

const MAX_SUPPLY = 10_000;
const FIRST_PRICE_WEI = "20000000000000";
const ADDITIONAL_PRICE_WEI = "1100000000000000";

type MintStats = {
  totalMinted: number;
  maxSupply: number;
  remaining: number;
  percentage: number;
};

export default function MintPanel() {
  const [quantity, setQuantity] = useState(1);
  const [stats, setStats] = useState<MintStats | null>(null);
  const [copied, setCopied] = useState(false);
  const [openInstructions, setOpenInstructions] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const refreshStats = useCallback(async () => {
    try {
      const response = await fetch("/api/mint-stats", {
        cache: "no-store",
      });

      if (!response.ok) throw new Error("Stats unavailable");

      const data = (await response.json()) as MintStats;
      setStats(data);
      setLoadError(false);
    } catch {
      setLoadError(true);
    }
  }, []);

  useEffect(() => {
    refreshStats();

    const interval = window.setInterval(refreshStats, 15_000);

    return () => window.clearInterval(interval);
  }, [refreshStats]);

  const remaining = stats?.remaining ?? MAX_SUPPLY;
  const percentage = stats?.percentage ?? 0;

  useEffect(() => {
    if (remaining > 0 && quantity > remaining) {
      setQuantity(remaining);
    }
  }, [remaining, quantity]);

  const prompt = useMemo(() => {
    return `I want to mint ${quantity} Trexion Genesis NFT(s).

Use my CURRENT Binance Agentic Wallet address. Do not use another address.

NETWORK:
- BNB Smart Chain Mainnet
- Chain ID: 56
- Native currency: BNB

NFT CONTRACT:
${CONTRACT}

CONTRACT FUNCTIONS:
- mintedBy(address) view returns (uint256)
- totalMinted() view returns (uint256)
- MAX_SUPPLY() view returns (uint256)
- mint(uint256 quantity) payable

TASK:
1. Confirm that my wallet is connected to BNB Smart Chain Mainnet, Chain ID 56.
2. Read my current wallet address.
3. Read totalMinted() and MAX_SUPPLY() from the NFT contract.
4. Read mintedBy(my_wallet_address).
5. Confirm that at least ${quantity} NFTs remain available. If not, STOP and tell me the remaining supply.
6. Calculate the exact payment in wei using the contract rules:
   - If mintedBy(my_wallet_address) is 0, payment = ${FIRST_PRICE_WEI} + (${quantity} - 1) × ${ADDITIONAL_PRICE_WEI}.
   - If mintedBy(my_wallet_address) is greater than 0, payment = ${quantity} × ${ADDITIONAL_PRICE_WEI}.
   - These are wei amounts. Do not round or approximate.
7. Encode the contract call mint(uint256) with quantity = ${quantity}.
   Function selector: 0xa0712d68
   ABI argument: ${quantity} encoded as uint256.
8. Prepare a native BNB transaction:
   - To: ${CONTRACT}
   - Value: the exact calculated payment in wei
   - Input data: encoded mint(${quantity}) call
   - Chain ID: 56
   - No ERC-20 approval is required.
9. Before executing, show me a transaction preview containing my wallet address, network, contract address, quantity, mintedBy value, total minted, exact BNB payment, and estimated gas.
10. DO NOT execute until I explicitly confirm the transaction.
11. After my confirmation, execute the transaction and verify the on-chain receipt.
12. Confirm success only after the transaction is successful. Read the NFTsMinted event and report the transaction hash, quantity minted, and token ID range.

IMPORTANT:
- Never assume the first mint is free. The deployed contract charges 0.00002 BNB for the first NFT.
- Subsequent NFTs cost 0.0011 BNB each.
- Do not invent a wallet mint limit.
- Do not execute any unrelated transaction.
- If any contract read, network check, supply check, or payment calculation fails, STOP and explain the problem.`;
  }, [quantity]);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      alert("Copy failed. Please select and copy the prompt manually.");
    }
  }

  const soldOut = remaining <= 0;

  return (
    <div className="trexion-mint">
      <div className="mint-card">
        <div className="mint-card-top">
          <div>
            <span className="stat-label">TREXION GENESIS</span>
            <h3>Public mint</h3>
          </div>

          <span className="status">
            <i /> {soldOut ? "SOLD OUT" : "LIVE ON BNB"}
          </span>
        </div>

        <div className="mint-preview">
          <img
            src="https://raw.githubusercontent.com/cityofairdrops/trexion-nft/main/trexion.png"
            alt="Trexion Genesis NFT"
          />
          <div>
            <strong>Trexion Genesis</strong>
            <span>10,000 NFTs · BNB Smart Chain</span>
          </div>
        </div>

        <div className="mint-progress-heading">
          <span>LIVE MINT PROGRESS</span>
          <strong>
            {stats ? stats.totalMinted.toLocaleString() : "Loading..."} /{" "}
            {MAX_SUPPLY.toLocaleString()}
          </strong>
        </div>

        <div
          className="mint-progress-track"
          role="progressbar"
          aria-valuenow={stats?.totalMinted ?? 0}
          aria-valuemin={0}
          aria-valuemax={MAX_SUPPLY}
        >
          <div
            className="mint-progress-fill"
            style={{ width: `${Math.min(100, percentage)}%` }}
          />
        </div>

        <div className="mint-progress-foot">
          <span>{percentage.toFixed(2)}% minted</span>
          <span>{remaining.toLocaleString()} remaining</span>
        </div>

        {loadError && (
          <p className="mint-load-error">
            Live supply could not be refreshed. Please try again shortly.
          </p>
        )}

        <div className="mint-row">
          <span>First mint</span>
          <strong className="green">FREE</strong>
        </div>

        <div className="mint-row">
          <span>Each additional mint</span>
          <strong>0.0011 BNB</strong>
        </div>

        <div className="mint-row">
          <span>Max mint limit</span>
          <strong className="green">No Limit</strong>
        </div>

        <div className="mint-row">
          <span>Network</span>
          <strong>BNB Smart Chain</strong>
        </div>

        <div className="mint-quantity">
          <label htmlFor="mint-quantity">SELECT QUANTITY</label>

          <div className="quantity-control">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>

            <input
              id="mint-quantity"
              type="number"
              min={1}
              max={Math.max(1, remaining)}
              value={quantity}
              onChange={(event) => {
                const value = Number(event.target.value);
                if (Number.isFinite(value)) {
                  setQuantity(
                    Math.min(
                      Math.max(1, remaining),
                      Math.max(1, Math.floor(value))
                    )
                  );
                }
              }}
            />

            <button
              type="button"
              onClick={() =>
                setQuantity((value) =>
                  Math.min(Math.max(1, remaining), value + 1)
                )
              }
              disabled={soldOut || quantity >= remaining}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          className="button button-primary mint-copy-button"
          onClick={copyPrompt}
          disabled={soldOut}
        >
          {soldOut
            ? "Collection Sold Out"
            : copied
              ? "✓ Prompt Copied"
              : "Copy Agentic Wallet Prompt"}
        </button>

        <p className="fine-print">
          Copy the prompt and paste it into Binance Agentic Wallet. Review the
          transaction carefully before confirming. Network gas fees apply.
        </p>

        <a
          className="mint-contract-link"
          href={EXPLORER}
          target="_blank"
          rel="noreferrer"
        >
          View NFT contract on BscScan ↗
        </a>
      </div>

      <div className="mint-instructions">
        <button
          type="button"
          className="mint-instructions-toggle"
          onClick={() => setOpenInstructions((value) => !value)}
          aria-expanded={openInstructions}
        >
          <span>HOW TO MINT WITH BINANCE AGENTIC WALLET</span>
          <b>{openInstructions ? "−" : "+"}</b>
        </button>

        {openInstructions && (
          <div className="mint-instructions-content">
            <article>
              <span>01</span>
              <div>
                <h4>Enable Developer Mode</h4>
                <p>
                  Open Binance App, go to Agentic Wallet management, open
                  Settings and enable Developer Mode. Accept the risk warning
                  and make sure your wallet is on BNB Smart Chain Mainnet.
                </p>
              </div>
            </article>

            <article>
              <span>02</span>
              <div>
                <h4>Choose your NFT quantity</h4>
                <p>
                  Select how many Trexion NFTs you want to mint using the
                  quantity selector above.
                </p>
              </div>
            </article>

            <article>
              <span>03</span>
              <div>
                <h4>Copy and paste the prompt</h4>
                <p>
                  Tap “Copy Agentic Wallet Prompt”. Open Agentic Wallet and
                  paste the complete prompt into the chat.
                </p>
              </div>
            </article>

            <article>
              <span>04</span>
              <div>
                <h4>Review the transaction</h4>
                <p>
                  Agentic Wallet will check the collection supply, your
                  previous mint count and the exact contract payment. Review
                  the transaction preview, including gas fees and destination.
                </p>
              </div>
            </article>

            <article>
              <span>05</span>
              <div>
                <h4>Confirm and receive your NFTs</h4>
                <p>
                  Approve the transaction inside Agentic Wallet. Once the
                  transaction succeeds on BNB Smart Chain, your Trexion NFTs
                  will appear in your wallet.
                </p>
              </div>
            </article>

            <p className="mint-warning">
              Never approve a transaction you did not request. Verify the
              contract address and BNB amount before confirming.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
