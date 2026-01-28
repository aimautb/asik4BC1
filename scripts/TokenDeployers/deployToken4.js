const hre = require("hardhat");

async function main() {
  console.log("Deploying Token4...");

  const Token4 = await hre.ethers.getContractFactory("Token4");
  const token = await Token4.deploy();

  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("Token4 deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});