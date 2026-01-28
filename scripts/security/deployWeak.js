const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying WeakCon...");

  const WeakCon = await ethers.getContractFactory("WeakCon");
  const weak = await WeakCon.deploy();
  await weak.waitForDeployment();

  console.log("WeakCon deployed to:", await weak.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});