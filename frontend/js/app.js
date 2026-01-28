let provider = null;
let signer = null;
let userAccount = null;

let tokenContract = null;
let nftContract = null;
const rpcProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");


const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Token4 address
const NFT_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // MyNFT address

// ABI for token and NFT
const TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address,uint256) returns (bool)"
];

const NFT_ABI = [
  "function ownerOf(uint256) view returns (address)",
  "function tokenURI(uint256) view returns (string)"
];


const connectBtn = document.getElementById("connectBtn");
const changeBtn = document.getElementById("changeBtn");
const disconnectBtn = document.getElementById("disconnectBtn");
const accountEl = document.getElementById("account");

const tokenInfoEl = document.getElementById("tokenInfo");
const balanceEl = document.getElementById("balance");
const refreshBalanceBtn = document.getElementById("refreshBalanceBtn");
const sendBtn = document.getElementById("sendBtn");
const txHashEl = document.getElementById("txHash");

const refreshNFTsBtn = document.getElementById("refreshNFTsBtn");
const nftList = document.getElementById("nftList");


connectBtn.onclick = async () => {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return;
  }

  await ethereum.request({ method: "eth_requestAccounts" });

  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  userAccount = await signer.getAddress();

  accountEl.innerText = `Connected: ${userAccount}`;
  changeBtn.disabled = false;
  refreshBalanceBtn.disabled = false;
  sendBtn.disabled = false;
  refreshNFTsBtn.disabled = false;

  await loadTokenInfo();
  await loadNFTs();
};


changeBtn.onclick = async () => {
  await ethereum.request({
    method: "wallet_requestPermissions",
    params: [{ eth_accounts: {} }],
  });

  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });

  userAccount = accounts[0];
  signer = await provider.getSigner();

  accountEl.innerText = `Connected: ${userAccount}`;

  await loadTokenInfo();
  await loadNFTs();
};

disconnectBtn.onclick = () => {
  provider = null;
  signer = null;
  userAccount = null;
  tokenContract = null;
  nftContract = null;

  accountEl.innerText = "Not connected";
  changeBtn.disabled = true;
  refreshBalanceBtn.disabled = true;
  sendBtn.disabled = true;
  refreshNFTsBtn.disabled = true;

  tokenInfoEl.innerText = "Token: -";
  balanceEl.innerText = "Balance: -";
  txHashEl.innerText = "";
  nftList.innerHTML = "";
};


async function loadTokenInfo() {
  tokenContract = new ethers.Contract(
    TOKEN_ADDRESS,
    TOKEN_ABI,
    rpcProvider
  );

  const name = await tokenContract.name();
  const symbol = await tokenContract.symbol();
  const balance = await tokenContract.balanceOf(userAccount);

  tokenInfoEl.innerText = `Token: ${name} (${symbol})`;
  balanceEl.innerText = `Balance: ${ethers.formatUnits(balance, 18)}`;
}


refreshBalanceBtn.onclick = async () => {
  await loadTokenInfo();
};


sendBtn.onclick = async () => {
const to = document.getElementById("to").value;
const amount = document.getElementById("amount").value;


if (!to || !amount) {
alert("Please enter recipient and amount");
return;
}


try {
const tokenWithSigner = tokenContract.connect(signer);


const tx = await tokenWithSigner.transfer(
to,
ethers.parseUnits(amount, 18)
);


txHashEl.innerText = `TX sent: ${tx.hash}`;
await tx.wait();


await loadTokenInfo();
} catch (error) {
console.error(error);
txHashEl.innerText = `Error: ${error.message}`;
}
};

function ipfsToHttp(uri) {
if (!uri) return "";
return uri.replace(
"ipfs://",
"https://gateway.pinata.cloud/ipfs/"
);
} 

async function loadNFTs() {
  nftContract = new ethers.Contract(
    NFT_ADDRESS,
    NFT_ABI,
    rpcProvider
  );

  nftList.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    try {
      
      const uri = await nftContract.tokenURI(i);

      
      const metadataUrl = ipfsToHttp(uri);

      
      const meta = await fetch(metadataUrl).then(r => r.json());

     
      const li = document.createElement("li");
      li.innerText = meta.name;

      const img = document.createElement("img");
      img.src = ipfsToHttp(meta.image);
      img.style.maxWidth = "200px";
      img.style.marginTop = "8px";
      img.style.borderRadius = "10px";

      li.appendChild(img);
      nftList.appendChild(li);
    } catch (e) {
        console.error(`Failed to load NFT #${i}:`, e);
    }
  }
}


refreshNFTsBtn.onclick = async () => {
  await loadNFTs();
};


if (window.ethereum) {
  ethereum.on("accountsChanged", () => {
    location.reload();
  });

  ethereum.on("chainChanged", () => {
    location.reload();
  });
}
const HARDHAT_CHAIN_ID = 31337;
const HARDHAT_CHAIN_ID_HEX = '0x7a69'; // Hex for 31337

connectBtn.onclick = async () => {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return;
  }

  try {
    // First, try to switch to Hardhat network
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: HARDHAT_CHAIN_ID_HEX }],
    });
  } catch (switchError) {
    // If network not added, add it
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: HARDHAT_CHAIN_ID_HEX,
              chainName: 'Hardhat Local',
              rpcUrls: ['http://127.0.0.1:8545'],
              nativeCurrency: {
                name: 'Hardhat ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              blockExplorerUrls: null, // No explorer for local
            },
          ],
        });
      } catch (addError) {
        console.error(addError);
        alert("Failed to add Hardhat network");
        return;
      }
    } else {
      console.error(switchError);
      alert("Failed to switch to Hardhat network");
      return;
    }
  }

  // Now request accounts
  await ethereum.request({ method: "eth_requestAccounts" });

  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  userAccount = await signer.getAddress();

  // Double-check chain after connection
  const network = await provider.getNetwork();
  if (network.chainId !== BigInt(HARDHAT_CHAIN_ID)) {
    alert("Please switch to Hardhat local network (chain ID 31337)");
    return;
  }

  accountEl.innerText = `Connected: ${userAccount}`;
  changeBtn.disabled = false;
  refreshBalanceBtn.disabled = false;
  sendBtn.disabled = false;
  refreshNFTsBtn.disabled = false;

  await loadTokenInfo();
  await loadNFTs();
};

// Update changeBtn to also check chain
changeBtn.onclick = async () => {
  await ethereum.request({
    method: "wallet_requestPermissions",
    params: [{ eth_accounts: {} }],
  });

  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });

  userAccount = accounts[0];
  signer = await provider.getSigner();

  // Check chain again
  const network = await provider.getNetwork();
  if (network.chainId !== BigInt(HARDHAT_CHAIN_ID)) {
    alert("Please switch to Hardhat local network (chain ID 31337)");
    return;
  }

  accountEl.innerText = `Connected: ${userAccount}`;

  await loadTokenInfo();
  await loadNFTs();
};

// ... (rest of your code)

// Update event listeners to handle chain changes
if (window.ethereum) {
  ethereum.on("accountsChanged", () => {
    location.reload();
  });

  ethereum.on("chainChanged", (chainId) => {
    if (parseInt(chainId, 16) !== HARDHAT_CHAIN_ID) {
      alert("Network changed. Please switch back to Hardhat local (chain ID 31337)");
      disconnectBtn.onclick(); // Auto-disconnect on wrong chain
    }
    location.reload();
  });
}