const hre = require("hardhat");

async function main() {
  console.log("Deploying Token5...");

  const Token5 = await hre.ethers.getContractFactory("Token5");
  const token = await Token5.deploy();

  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("Token5 deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});