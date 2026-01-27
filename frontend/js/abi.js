const ERC20_ADDRESS = "0x8db370Ef9E88EE6ACB5590049FCad22423C597ae";
const NFT_ADDRESS = "0x02e78C27231eFe446cA39030bfB340a3f44bc0D5"; 

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function getMessage() view returns (string)" 
];

const NFT_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
    "function tokenURI(uint256 tokenId) view returns (string)",
    "function name() view returns (string)"
];