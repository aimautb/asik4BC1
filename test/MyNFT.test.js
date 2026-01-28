const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT ERC-721 Tests", function () {
  let MyNFT, nft;
  let owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    MyNFT = await ethers.getContractFactory("MyNFT");
    nft = await MyNFT.deploy();
    await nft.waitForDeployment();
  });

  it("Should mint NFT correctly", async function () {
    await nft.mint(owner.address, "ipfs://nft1");

    expect(await nft.ownerOf(0)).to.equal(owner.address);
  });

  it("Should return correct tokenURI", async function () {
    await nft.mint(owner.address, "ipfs://nft1");

    expect(await nft.tokenURI(0)).to.equal("ipfs://nft1");
  });

  it("Should transfer NFT between accounts", async function () {
    await nft.mint(owner.address, "ipfs://nft1");

    await nft.transferFrom(owner.address, user1.address, 0);

    expect(await nft.ownerOf(0)).to.equal(user1.address);
  });

  it("Should approve and allow transferFrom", async function () {
    await nft.mint(owner.address, "ipfs://nft1");

    await nft.approve(user1.address, 0);

    await nft.connect(user1).transferFrom(
      owner.address,
      user2.address,
      0
    );

    expect(await nft.ownerOf(0)).to.equal(user2.address);
  });

  it("Should allow only owner to mint NFT", async function () {
    await expect(
      nft.connect(user1).mint(user1.address, "ipfs://hack")
    ).to.be.reverted;
  });
});