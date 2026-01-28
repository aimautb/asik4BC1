const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleAMM", function () {
  let tokenA, tokenB, amm, owner, user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const Token4 = await ethers.getContractFactory("Token4");
    tokenA = await Token4.deploy();
    await tokenA.waitForDeployment();

    const Token5 = await ethers.getContractFactory("Token5");
    tokenB = await Token5.deploy();
    await tokenB.waitForDeployment();

    const AMM = await ethers.getContractFactory("SimpleAMM");
    amm = await AMM.deploy(
      await tokenA.getAddress(),
      await tokenB.getAddress()
    );
    await amm.waitForDeployment();

    await tokenA.transfer(user.address, ethers.parseUnits("1000", 18));
    await tokenB.transfer(user.address, ethers.parseUnits("1000", 18));
  });

  it("adds liquidity", async () => {
    await tokenA.connect(user).approve(
      await amm.getAddress(),
      ethers.parseUnits("500", 18)
    );
    await tokenB.connect(user).approve(
      await amm.getAddress(),
      ethers.parseUnits("500", 18)
    );

    await amm.connect(user).addLiquidity(
      ethers.parseUnits("500", 18),
      ethers.parseUnits("500", 18)
    );

    expect(await amm.reserveA())
      .to.equal(ethers.parseUnits("500", 18));
  });

  it("swaps tokenA for tokenB", async () => {
    await tokenA.connect(user).approve(
      await amm.getAddress(),
      ethers.parseUnits("100", 18)
    );
    await tokenB.connect(user).approve(
      await amm.getAddress(),
      ethers.parseUnits("100", 18)
    );

    await amm.connect(user).addLiquidity(
      ethers.parseUnits("100", 18),
      ethers.parseUnits("100", 18)
    );

    await tokenA.connect(user).approve(
      await amm.getAddress(),
      ethers.parseUnits("10", 18)
    );

    await amm.connect(user).swapAforB(
      ethers.parseUnits("10", 18)
    );

    expect(await tokenB.balanceOf(user.address))
      .to.be.gt(0);
  });
});