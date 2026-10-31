
import { NextResponse } from "next/server";
import { createPublicClient, http, formatUnits } from "viem";
import { bsc } from "viem/chains";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const CLAIM_CONTRACT =
  "0xb4921c02D58bBEF6F0999d74C45F6DC27a876876" as const;

const claimAbi = [
  {
    type: "function",
    name: "remainingCommunityAllocation",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "totalClaimed",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "getContractTokenBalance",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
] as const;

const client = createPublicClient({
  chain: bsc,
  transport: http("https://bsc-dataseed.binance.org/"),
});

export async function GET() {
  try {
    const [remaining, totalClaimed, contractBalance] =
      await Promise.all([
        client.readContract({
          address: CLAIM_CONTRACT,
          abi: claimAbi,
          functionName: "remainingCommunityAllocation",
        }),
        client.readContract({
          address: CLAIM_CONTRACT,
          abi: claimAbi,
          functionName: "totalClaimed",
        }),
        client.readContract({
          address: CLAIM_CONTRACT,
          abi: claimAbi,
          functionName: "getContractTokenBalance",
        }),
      ]);

    // Use BigInt() instead of BigInt literal syntax.
    const totalPool =
      BigInt("450000000") * BigInt("10") ** BigInt("18");

    // Actual amount claimed from the contract.
    const distributed = totalClaimed;

    const percentage =
      Number(
        (distributed * BigInt("10000")) / totalPool
      ) / 100;

    return NextResponse.json(
      {
        success: true,
        totalPool: formatUnits(totalPool, 18),
        remaining: formatUnits(remaining, 18),
        totalClaimed: formatUnits(totalClaimed, 18),
        distributed: formatUnits(distributed, 18),
        contractBalance: formatUnits(contractBalance, 18),
        percentage,
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("TREXION claim stats error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch live claim pool data.",
      },
      { status: 503 }
    );
  }
}
