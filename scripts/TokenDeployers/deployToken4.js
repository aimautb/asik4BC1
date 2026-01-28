const hre = require("hardhat");

async function main() {
  console.log("Starting deployment..."); 

  const Token4 = await hre.ethers.getContractFactory("Token4");
  const token = await Token4.deploy();

  await token.waitForDeployment();

  console.log("Token4 deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});