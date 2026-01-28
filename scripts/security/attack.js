const { ethers } = require("hardhat");

async function main() {
  const weakAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
  const attackerAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

  const weak = await ethers.getContractAt("WeakCon", weakAddress);
  const attacker = await ethers.getContractAt("Attacker", attackerAddress);

  console.log("Funding WeakCon with 5 ETH...");
  await weak.deposit({ value: ethers.parseEther("5") });

  console.log("WeakCon balance before attack:",
    ethers.formatEther(await weak.getContractBalance())
  );

  console.log("Launching attack...");
  await attacker.attack({ value: ethers.parseEther("1") });

  console.log("WeakCon balance after attack:",
    ethers.formatEther(await weak.getContractBalance())
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});