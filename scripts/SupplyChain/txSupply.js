const hre = require("hardhat");

async function main() {
  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const supplyChain = await hre.ethers.getContractAt(
    "SupplyChain",
    address
  );

 
  const tx1 = await supplyChain.createItem("Laptop");
  await tx1.wait();
  console.log("Item created");


  const tx2 = await supplyChain.shipItem(0);
  await tx2.wait();
  console.log("Item shipped");


  const tx3 = await supplyChain.deliverItem(0);
  await tx3.wait();
  console.log("Item delivered");


  const item = await supplyChain.items(0);
  console.log("Final status:", item.status);
}

main().catch(console.error);