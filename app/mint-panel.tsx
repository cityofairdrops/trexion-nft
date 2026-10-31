
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const CONTRACT = "0xe9BBc5164375d0C7c7b340CE7DC1fA2de35a5720";
const EXPLORER = `https://bscscan.com/address/${CONTRACT}`;

const MAX_SUPPLY = 10_000;
const MAX_PER_WALLET = 10;
const ADDITIONAL_PRICE_WEI = "1000000000000000";

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
  const soldOut = remaining <= 0;
  const maxSelectable = Math.min(MAX_PER_WALLET, remaining);

  useEffect(() => {
    if (maxSelectable > 0 && quantity > maxSelectable) {
      setQuantity(maxSelectable);
    }
  }, [maxSelectable, quantity]);

  const firstMintPayment = (quantity - 1) * 0.001;
  const laterMintPayment = quantity * 0.001;

  const prompt = useMemo(() => {
    return `I want to mint ${quantity} Trexion Genesis NFT(s).

Use my CURRENT Binance Agentic Wallet. Never use another wallet.

NETWORK:
- BNB Smart Chain Mainnet
- Chain ID: 56
- Currency: BNB

NFT CONTRACT:
${CONTRACT}

CONTRACT FUNCTIONS:
- mintedBy(address) returns uint256
- totalMinted() returns uint256
- MAX_SUPPLY() returns uint256
- MAX_PER_WALLET() returns uint256
- ADDITIONAL_MINT_PRICE() returns uint256
- mint(uint256 quantity) payable

MINT RULES:
- Maximum collection supply: 10,000 NFTs.
- Maximum lifetime mints per wallet: 10 NFTs.
- First NFT per wallet is FREE.
- Every additional NFT costs exactly 0.001 BNB.
- Transferring NFTs does not restore mint capacity.

TASK:
1. Confirm BNB Smart Chain Mainnet, chain ID 56.
2. Identify my currently connected wallet address.
3. Read totalMinted(), MAX_SUPPLY(), MAX_PER_WALLET(), and ADDITIONAL_MINT_PRICE().
4. Read mintedBy(my_wallet_address).
5. Calculate my remaining wallet allowance: 10 - mintedBy(my_wallet_address).
6. Confirm the requested quantity (${quantity}) does not exceed my remaining wallet allowance or collection supply. STOP if it does.
7. Calculate exact payment:
   - If mintedBy(my_wallet_address) == 0:
     payment = (${quantity} - 1) * 1000000000000000 wei.
   - If mintedBy(my_wallet_address) > 0:
     payment = ${quantity} * 1000000000000000 wei.
   - 1000000000000000 wei = 0.001 BNB.
   - First NFT is free. Do not charge for it.
8. Encode mint(uint256) with quantity ${quantity}.
   Function selector: 0xa0712d68
9. Prepare transaction:
   - To: ${CONTRACT}
   - Value: exact calculated BNB payment
   - Chain ID: 56
   - Function: mint(${quantity})
10. Show a preview with wallet, network, quantity, previous mint count, remaining wallet allowance, total supply minted, payment and estimated gas.
11. DO NOT execute before my explicit confirmation.
12. After confirmation, execute and verify the transaction receipt.
13. Report transaction hash, number minted and token ID range using the NFTsMinted event.

SAFETY:
- Never exceed 10 lifetime mints per wallet.
- Never exceed 10,000 total NFTs.
- Never charge for the first NFT.
- Never invent contract read values.
- Never execute unrelated transactions.
- If any read, calculation or network check fails, STOP.
- Do not claim success until the transaction receipt confirms success.`;
  }, [quantity]);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      alert("Copy failed. Please copy the prompt manually.");
    }
  }

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
            {stats ? stats.totalMinted.toLocaleString() : "Loading..."} / 10,000
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
          <span>First NFT per wallet</span>
          <strong className="green">FREE</strong>
        </div>

        <div className="mint-row">
          <span>Each additional NFT</span>
          <strong>0.001 BNB</strong>
        </div>

        <div className="mint-row">
          <span>Maximum per wallet</span>
          <strong className="green">10 NFTs</strong>
        </div>

        <div className="mint-row">
          <span>Maximum collection</span>
          <strong>10,000 NFTs</strong>
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
              onClick={() => setQuantity((v) => Math.max(1, v - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>

            <input
              id="mint-quantity"
              type="number"
              min={1}
              max={Math.max(1, maxSelectable)}
              value={quantity}
              onChange={(event) => {
                const value = Number(event.target.value);
                if (Number.isFinite(value)) {
                  setQuantity(
                    Math.min(
                      Math.max(1, maxSelectable),
                      Math.max(1, Math.floor(value))
                    )
                  );
                }
              }}
            />

            <button
              type="button"
              onClick={() =>
                setQuantity((v) => Math.min(maxSelectable, v + 1))
              }
              disabled={soldOut || quantity >= maxSelectable}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <div className="mint-row">
          <span>Estimated mint payment*</span>
          <strong className="green">
            {firstMintPayment.toFixed(3)} BNB
          </strong>
        </div>

        <button
          type="button"
          className="button button-primary mint-copy-button"
          onClick={copyPrompt}
          disabled={soldOut || loadError || !stats}
        >
          {soldOut
            ? "Collection Sold Out"
            : copied
              ? "✓ Prompt Copied"
              : "Copy Agentic Wallet Prompt"}
        </button>

        <p className="fine-print">
          *Payment shown assumes this wallet has never minted before.
          Previously minted wallets pay 0.001 BNB per NFT. Network gas fees
          apply. Agentic Wallet must verify your actual mint count.
        </p>

        <a
          className="mint-contract-link"
          href={EXPLORER}
          target="_blank"
          rel="noreferrer"
        >
          View new NFT contract on BscScan ↗
        </a>
      </div>

      <div className="mint-instructions">
        <button
          type="button"
          className="mint-instructions-toggle"
          onClick={() => setOpenInstructions((v) => !v)}
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
                  Open Binance App, go to Agentic Wallet settings and enable
                  Developer Mode. Select BNB Smart Chain Mainnet.
                </p>
              </div>
            </article>

            <article>
              <span>02</span>
              <div>
                <h4>Select your quantity</h4>
                <p>
                  Choose between 1 and 10 NFTs. Your actual remaining wallet
                  allowance will be checked by Agentic Wallet.
                </p>
              </div>
            </article>

            <article>
              <span>03</span>
              <div>
                <h4>Copy the mint prompt</h4>
                <p>
                  Copy the generated prompt and paste it into Binance Agentic
                  Wallet.
                </p>
              </div>
            </article>

            <article>
              <span>04</span>
              <div>
                <h4>Review and confirm</h4>
                <p>
                  Check your wallet address, mint quantity, exact BNB payment,
                  contract address and gas estimate before confirming.
                </p>
              </div>
            </article>

            <article>
              <span>05</span>
              <div>
                <h4>Receive your NFTs</h4>
                <p>
                  After the transaction succeeds, your Trexion Genesis NFTs
                  will be assigned to your wallet.
                </p>
              </div>
            </article>

            <p className="mint-warning">
              Always verify the contract address and transaction amount.
              Never approve a transaction you did not request.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
