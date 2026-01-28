const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying StrongCon...");

  const StrongCon = await ethers.getContractFactory("StrongCon");
  const strong = await StrongCon.deploy();
  await strong.waitForDeployment();

  console.log("StrongCon deployed to:", await strong.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});