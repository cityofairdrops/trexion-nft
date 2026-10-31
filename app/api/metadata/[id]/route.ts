
import { NextResponse } from "next/server";

const TOTAL_SUPPLY = 10000;

const BASE_METADATA = {
  description:
    "The official Trexion NFT collection on BNB Smart Chain. Each NFT represents a unique token in the 10,000-piece collection.",
  image:
    "https://raw.githubusercontent.com/cityofairdrops/trexion-nft/main/trexion.png",
  attributes: [
    {
      trait_type: "Collection",
      value: "Trexion",
    },
    {
      trait_type: "Edition",
      value: "Genesis",
    },
    {
      trait_type: "Supply",
      value: "10,000",
    },
  ],
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const tokenId = Number(id);

  if (
    !Number.isInteger(tokenId) ||
    tokenId < 1 ||
    tokenId > TOTAL_SUPPLY
  ) {
    return NextResponse.json(
      { error: "NFT does not exist" },
      { status: 404 }
    );
  }

  const metadata = {
    name: `Trexion #${tokenId}`,
    description: BASE_METADATA.description,
    image: BASE_METADATA.image,
    attributes: [
      ...BASE_METADATA.attributes,
      {
        trait_type: "Token ID",
        value: tokenId,
      },
    ],
  };

  return NextResponse.json(metadata, {
    headers: {
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400",
    },
  });
}
