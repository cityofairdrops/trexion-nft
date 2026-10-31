
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const RPC_URL = "https://bsc-dataseed.binance.org/";
const CONTRACT = "0xe9BBc5164375d0C7c7b340CE7DC1fA2de35a5720";

// totalMinted() function selector
const TOTAL_MINTED_SELECTOR = "0xa2309ff8";
const MAX_SUPPLY = 10_000;

export async function GET() {
  try {
    const response = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_call",
        params: [
          {
            to: CONTRACT,
            data: TOTAL_MINTED_SELECTOR,
          },
          "latest",
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("BNB Chain RPC request failed");
    }

    const result = await response.json();

    if (result.error || !result.result) {
      throw new Error("Could not read totalMinted()");
    }

    const totalMinted = Number(BigInt(result.result));

    if (
      !Number.isSafeInteger(totalMinted) ||
      totalMinted < 0 ||
      totalMinted > MAX_SUPPLY
    ) {
      throw new Error("Invalid on-chain supply value");
    }

    return NextResponse.json(
      {
        totalMinted,
        maxSupply: MAX_SUPPLY,
        remaining: MAX_SUPPLY - totalMinted,
        percentage: (totalMinted / MAX_SUPPLY) * 100,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Mint stats error:", error);

    return NextResponse.json(
      { error: "Unable to load live mint progress" },
      { status: 503 }
    );
  }
}
