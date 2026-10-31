
"use client";

import { useCallback, useEffect, useState } from "react";

const TOKEN_ADDRESS =
  "0x01B556f8c495df20Bcb10e43bf854228B1e8Fcc2";

const CLAIM_ADDRESS =
  "0xb4921c02D58bBEF6F0999d74C45F6DC27a876876";

const NFT_ADDRESS =
  "0xe9BBc5164375d0C7c7b340CE7DC1fA2de35a5720";

const POOL = 450_000_000;

type ClaimStats = {
  success: boolean;
  totalPool: string;
  remaining: string;
  totalClaimed: string;
  distributed: string;
  contractBalance: string;
  percentage: number;
  updatedAt: string;
};

function formatNumber(value: string | number) {
  return Number(value).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
}

export default function ClaimPanel() {
  const [stats, setStats] = useState<ClaimStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState("");
  const [refreshError, setRefreshError] = useState(false);

  const loadStats = useCallback(async () => {
    try {
      const response = await fetch("/api/claim-stats", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch claim statistics");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error("Claim statistics unavailable");
      }

      setStats(data);
      setRefreshError(false);
    } catch (error) {
      console.error(error);
      setRefreshError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();

    const interval = setInterval(loadStats, 30_000);

    return () => clearInterval(interval);
  }, [loadStats]);

  async function copyText(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(""), 2000);
    } catch {
      setCopied("Copy failed");
      setTimeout(() => setCopied(""), 2000);
    }
  }

  const agenticPrompt = `I want to claim my TREXION token allocation.

Network: BNB Smart Chain Mainnet (Chain ID: 56)

My NFT collection contract:
${NFT_ADDRESS}

My TREXION token contract:
${TOKEN_ADDRESS}

My TREXION claim contract:
${CLAIM_ADDRESS}

Claim rules:
- Each originally minted NFT earns 45,000 TREXION.
- Maximum eligible NFTs per wallet: 10.
- Maximum allocation per wallet: 450,000 TREXION.
- Claim fee: exactly 0.00015 BNB per successful claim.
- Previously claimed NFTs cannot be claimed again.
- If I minted additional NFTs after an earlier claim, I can claim only the newly eligible NFTs.
- Transferring NFTs does not transfer the original minter's claim entitlement.

Please perform these steps:

1. Confirm that I am on BNB Smart Chain Mainnet (Chain ID 56).

2. Identify my active wallet address.

3. Read mintedBy(my wallet address) from the NFT contract at:
${NFT_ADDRESS}

4. Read getWalletClaimStatus(my wallet address) from the claim contract:
${CLAIM_ADDRESS}

5. Read getClaimableNFTs(my wallet address) and getClaimableAmount(my wallet address) from the claim contract.

6. Calculate and clearly show:
   - Total NFTs originally minted by my wallet.
   - NFTs already claimed.
   - Newly claimable NFTs.
   - TREXION amount I will receive.
   - Claim fee of exactly 0.00015 BNB.

7. Check that the claim contract has enough TREXION available by reading getContractTokenBalance().

8. Verify that the claim contract and token contract addresses match the addresses above.

9. If I am eligible, prepare a transaction calling claim() on:
${CLAIM_ADDRESS}

The transaction must:
- Call claim() with no function arguments.
- Send exactly 0.00015 BNB as msg.value.
- Use BNB Smart Chain Mainnet.
- Not approve tokens or transfer NFTs.
- Not interact with any unrelated contract.

10. Show me the complete transaction details and request my explicit confirmation before submitting it.

11. Do not submit the transaction without my confirmation.

If I am not eligible, explain why and do not submit a transaction.

Important: Never ask me to expose my private key or seed phrase.`;

  const percentage = Math.min(
    100,
    Math.max(0, stats?.percentage ?? 0)
  );

  return (
    <section className="trexion-claim">
      <div className="claim-container">
        <div className="claim-heading">
          <span className="claim-eyebrow">
            TREXION COMMUNITY DISTRIBUTION
          </span>

          <h2>Claim Your TREXION</h2>

          <p>
            Your NFTs unlock your TREXION allocation.
            No website wallet connection required.
          </p>
        </div>

        <div className="claim-pool-card">
          <div className="claim-pool-top">
            <div>
              <span className="claim-label">
                REMAINING COMMUNITY POOL
              </span>

              <div className="claim-remaining">
                {loading && !stats
                  ? "Loading..."
                  : stats
                    ? `${formatNumber(stats.remaining)}`
                    : "Unavailable"}
                <span> TREXION</span>
              </div>
            </div>

            <div className="claim-live">
              <span className="claim-live-dot" />
              LIVE
            </div>
          </div>

          <div className="claim-progress-track">
            <div
              className="claim-progress-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="claim-progress-labels">
            <span>
              {percentage.toFixed(2)}% distributed
            </span>
            <span>100%</span>
          </div>

          <div className="claim-pool-stats">
            <div>
              <span>Total community pool</span>
              <strong>{formatNumber(POOL)} TREXION</strong>
            </div>

            <div>
              <span>Already distributed</span>
              <strong>
                {stats
                  ? `${formatNumber(stats.distributed)} TREXION`
                  : "—"}
              </strong>
            </div>

            <div>
              <span>Claim contract reserve</span>
              <strong>
                {stats
                  ? `${formatNumber(stats.contractBalance)} TREXION`
                  : "—"}
              </strong>
            </div>
          </div>

          {refreshError && (
            <p className="claim-error">
              Live data could not be refreshed. Showing the last
              successfully retrieved values, if available.
            </p>
          )}

          <button
            className="claim-refresh"
            onClick={loadStats}
            type="button"
          >
            ↻ Refresh pool data
          </button>
        </div>

        <div className="claim-allocation-card">
          <span className="claim-label">YOUR NFT ALLOCATION</span>

          <div className="claim-allocation-amount">
            45,000 <span>TREXION / NFT</span>
          </div>

          <p>
            Every originally minted NFT earns 45,000 TREXION.
            Maximum allocation: 450,000 TREXION per wallet.
          </p>

          <div className="claim-rules">
            <div>
              <span>Per NFT</span>
              <strong>45,000 TREXION</strong>
            </div>

            <div>
              <span>Maximum NFTs</span>
              <strong>10</strong>
            </div>

            <div>
              <span>Maximum per wallet</span>
              <strong>450,000 TREXION</strong>
            </div>

            <div>
              <span>Fee per claim</span>
              <strong>0.00015 BNB</strong>
            </div>
          </div>
        </div>

        <div className="claim-action-card">
          <span className="claim-step">HOW TO CLAIM</span>

          <h3>Claim using your Agentic Wallet</h3>

          <p>
            Copy the prompt below and paste it into your
            Agentic Wallet. It will check your eligibility,
            prepare the transaction, and ask for your approval.
          </p>

          <div className="claim-prompt-box">
            <div className="claim-prompt-header">
              <span>AGENTIC WALLET PROMPT</span>
              <span>READY TO COPY</span>
            </div>

            <div className="claim-prompt-preview">
              I want to claim my TREXION token allocation.
              Check my original NFT mints, calculate my
              unclaimed allocation, and prepare a claim()
              transaction with exactly 0.00015 BNB. Show
              the transaction and ask for my confirmation
              before submitting.
            </div>

            <button
              className="claim-copy-prompt"
              onClick={() =>
                copyText(agenticPrompt, "prompt")
              }
              type="button"
            >
              {copied === "prompt"
                ? "✓ Prompt Copied"
                : "Copy Agentic Wallet Prompt"}
            </button>
          </div>

          <div className="claim-notice">
            <strong>Important:</strong> Your Agentic Wallet must
            support BNB Smart Chain transactions and contract
            interactions. Always review the transaction and
            confirm it yourself.
          </div>
        </div>

        <div className="claim-contracts-card">
          <span className="claim-label">OFFICIAL CONTRACT ADDRESSES</span>

          <div className="claim-address-row">
            <div>
              <span>TREXION TOKEN</span>
              <code>{TOKEN_ADDRESS}</code>
            </div>

            <button
              type="button"
              onClick={() =>
                copyText(TOKEN_ADDRESS, "token")
              }
            >
              {copied === "token" ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="claim-address-row">
            <div>
              <span>TREXION CLAIM CONTRACT</span>
              <code>{CLAIM_ADDRESS}</code>
            </div>

            <button
              type="button"
              onClick={() =>
                copyText(CLAIM_ADDRESS, "claim")
              }
            >
              {copied === "claim" ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="claim-address-row">
            <div>
              <span>NFT COLLECTION</span>
              <code>{NFT_ADDRESS}</code>
            </div>

            <button
              type="button"
              onClick={() =>
                copyText(NFT_ADDRESS, "nft")
              }
            >
              {copied === "nft" ? "Copied" : "Copy"}
            </button>
          </div>

          <a
            className="claim-explorer-link"
            href={`https://bscscan.com/address/${CLAIM_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Claim Contract on BscScan ↗
          </a>

          <a
            className="claim-explorer-link"
            href={`https://bscscan.com/address/${TOKEN_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View TREXION Token on BscScan ↗
          </a>
        </div>

        <p className="claim-footer">
          TREXION operates on BNB Smart Chain.
          Each successful claim requires 0.00015 BNB.
          Claim eligibility is verified by the smart contract.
        </p>
      </div>
    </section>
  );
}
