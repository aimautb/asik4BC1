const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token4 ERC-20 Tests", function () {
  let Token4, token;
  let owner, user1, user2;

  
  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    Token4 = await ethers.getContractFactory("Token4");
    token = await Token4.deploy();
    await token.waitForDeployment();
  });

  it("Should have correct name and symbol", async function () {
    expect(await token.name()).to.equal("Token4");
    expect(await token.symbol()).to.equal("TK4");
  });

  it("Should mint initial supply to owner", async function () {
    const totalSupply = await token.totalSupply();
    const ownerBalance = await token.balanceOf(owner.address);

    expect(ownerBalance).to.equal(totalSupply);
  });

  it("Should transfer tokens correctly", async function () {
    await token.transfer(user1.address, ethers.parseUnits("100", 18));

    const balance = await token.balanceOf(user1.address);
    expect(balance).to.equal(ethers.parseUnits("100", 18));
  });

  it("Should approve allowance", async function () {
    await token.approve(user1.address, ethers.parseUnits("500", 18));

    const allowance = await token.allowance(owner.address, user1.address);
    expect(allowance).to.equal(ethers.parseUnits("500", 18));
  });

  it("Should allow transferFrom when allowance is set", async function () {
    await token.approve(user1.address, ethers.parseUnits("200", 18));

    await token.connect(user1).transferFrom(
      owner.address,
      user2.address,
      ethers.parseUnits("200", 18)
    );

    const balance = await token.balanceOf(user2.address);
    expect(balance).to.equal(ethers.parseUnits("200", 18));
  });

  it("Should revert transfer if balance is insufficient", async function () {
    await expect(
      token.connect(user1).transfer(owner.address, 1)
    ).to.be.reverted;
  });

  it("Should allow only owner to mint tokens", async function () {
    await token.mint(user1.address, ethers.parseUnits("50", 18));

    const balance = await token.balanceOf(user1.address);
    expect(balance).to.equal(ethers.parseUnits("50", 18));
  });

  it("Should revert mint if called by non-owner", async function () {
    await expect(
      token.connect(user1).mint(user1.address, 100)
    ).to.be.reverted;
  });
});