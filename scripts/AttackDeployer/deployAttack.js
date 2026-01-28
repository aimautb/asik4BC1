const { ethers } = require("hardhat");

async function main() {
  const weakAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

  console.log("Deploying Attacker...");

  const Attacker = await ethers.getContractFactory("Attacker");
  const attacker = await Attacker.deploy(weakAddress);
  await attacker.waitForDeployment();

  console.log("Attacker deployed to:", await attacker.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});