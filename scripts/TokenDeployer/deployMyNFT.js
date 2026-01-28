const hre = require("hardhat");

async function main() {
  console.log("Deploying MyNFT...");

  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const nft = await MyNFT.deploy();
  await nft.waitForDeployment();

  const address = await nft.getAddress();
  console.log("MyNFT deployed to:", address);

  const [owner] = await hre.ethers.getSigners();

  const METADATA_CID = "bafybeigmt7cp5avqe5krytkhouvqijrb4maxjwscfqnqke5xc2euq7pjta";

  await nft.mint(
    owner.address,
    `ipfs://${METADATA_CID}/nft1.json`
  );

  await nft.mint(
    owner.address,
    `ipfs://${METADATA_CID}/nft2.json`
  );

  await nft.mint(
    owner.address,
    `ipfs://${METADATA_CID}/nft3.json`
  );

  console.log("Minted 3 NFTs with metadata to:", owner.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});