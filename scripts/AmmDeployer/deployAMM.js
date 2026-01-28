const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const tokenA = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const tokenB = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const AMM = await hre.ethers.getContractFactory("SimpleAMM");
  const amm = await AMM.deploy(tokenA, tokenB);

  await amm.waitForDeployment();

  console.log("AMM deployed to:", await amm.getAddress());
}

main().catch(console.error);