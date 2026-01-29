README — Assignment 4 — Blockchain dApp Project

🎥 Demo Video: https://youtu.be/yFwdZTNM_Qg?si=Cnas9P_kPet3B-hR

🚀 Overview

This project is a full implementation of a blockchain-based decentralized application (dApp) covering:

✔ Part 1 — ERC-20 Token
✔ Part 2 — ERC-721 NFT with IPFS metadata
✔ Part 3 — Frontend interaction (MetaMask + ethers.js)
✔ Part 4 — Security Exercises
✔ Part 5 — Automated Market Maker (AMM)
✔ Part 6 — Industrial Use Case (Supply Chain)
✔ Part 7 — Gas Reporting & Comparison
✔ Part 8 — Final Demonstration Video

The application runs on a local Hardhat network (chainId = 31337) and interacts with smart contracts using a minimal frontend.

⸻

📦 Project Structure

├── contracts/
│   ├── Token4.sol
│   ├── MyNFT.sol
│   ├── SimpleAMM.sol
│   └── SupplyChain.sol
├── scripts/
│   ├── deployToken4.js
│   ├── deployMyNFT.js
│   ├── deployAMM.js
│   ├── deploySupply.js
│   └── txSupply.js
├── test/
│   ├── token4.test.js
│   ├── nft.test.js
│   ├── amm.test.js
│   └── supplyChain.test.js
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── styles/style.css
├── hardhat.config.js
├── package.json
└── README.md

⸻

🛠️ Getting Started

1. Install Dependencies

npm install

2. Start Hardhat Node

npx hardhat node

Keep this terminal open.

3. Deploy Contracts

In a new terminal:

npx hardhat run scripts/deployToken4.js --network localhost
npx hardhat run scripts/deployMyNFT.js --network localhost
npx hardhat run scripts/deployAMM.js --network localhost
npx hardhat run scripts/deploySupply.js --network localhost

4. Run Frontend

In another terminal:

npx serve frontend

Open in browser:

http://localhost:5000

⸻

💻 Frontend Interaction

📌 MetaMask

Make sure MetaMask is set to:

Network: Hardhat Local (chainId 31337)

Connect, change accounts, and interact with tokens and NFTs.

⸻

🧪 Smart Contracts

⸻

🪙 Part 1 — ERC-20 Token (Token4)

Standard ERC-20 with mint, transfer, approve, transferFrom.

Tests verify:
✔ name/symbol
✔ initial supply
✔ transfers
✔ allowances
✔ owner-only minting

⸻

🎨 Part 2 — ERC-721 NFT (MyNFT)

Minting with IPFS metadata support (tokenURI).
Frontend displays images using an IPFS gateway.

⸻

⚔️ Part 4 — Security Exercise

Tested vulnerable contract, applied fix, and verified behavior via tests.

⸻

🔁 Part 5 — Simple AMM (Automated Market Maker)

Implements constant product formula:

x * y = k

Allows:
✔ addLiquidity()
✔ swapAforB()

All tests passing.

⸻

📦 Part 6 — Supply Chain Use Case

Supply Chain contract simulates real tracking:

Item created
Item shipped
Item delivered
Final status: 2

Test and demo transactions prove this workflow.

⸻

💡 Gas Report (Part 7)

Gas usage was recorded for key methods including:
 • token transfer
 • minting
 • NFT functions
 • AMM liquidity and swap functions

Comparison screenshots included in final documentation.

⸻

🎥 Demo Video (Part 8)

In the video we cover:

🔹 Deploying smart contracts
🔹 Connecting MetaMask
🔹 ERC-20 token transfer
🔹 NFT with IPFS images
🔹 AMM tests and behavior
🔹 Supply Chain workflow
🔹 Gas report comparison

Watch here ▶ https://youtu.be/yFwdZTNM_Qg?si=Cnas9P_kPet3B-hR

⸻

📸 Screenshots for Submission

Be sure to include:

Section Recommended Screenshot
ERC-20 Info Token balance & transfer
NFT Frontend with image
AMM Tests Passing results
Supply Chain Output of txSupply.js
Gas Report Before vs After

⸻

🧠 Notes
 • This project runs exclusively on Hardhat local network.
 • IPFS metadata is loaded via public gateway.
 • MetaMask network auto-switch handling included.

⸻

📚 Learning Outcomes

By completing this project, you've demonstrated:

✔ Understanding of ERC-20 and ERC-721
✔ Smart contract development and testing
✔ Blockchain frontend integration
✔ DeFi primitive implementation (AMM)
✔ Security awareness in smart contract design
✔ Industrial use case modeling
✔ Gas optimization practice

⸻

🤝 Thank You

Thank you for watching our demo.
If you have questions or need clarifications — feel free to reach out! 💪
