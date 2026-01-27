// 1. Инициализация переменных и поиск элементов в HTML
const connectBtn = document.getElementById("connectBtn");
const accountSpan = document.getElementById("account");
const statusDot = document.getElementById("statusDot");
const tokenBalance = document.getElementById("tokenBalance");
const tokenName = document.getElementById("tokenName");
const tokenSymbol = document.getElementById("tokenSymbol");
const nftList = document.getElementById("nftList");

let provider;
let signer;
let erc20Contract;
let nftContract;

// 2. Функция подключения кошелька
connectBtn.onclick = async () => {
    try {
        if (!window.ethereum) {
            alert("MetaMask не установлен!");
            return;
        }

        // Запрашиваем окно MetaMask
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Настройка провайдера (Ethers v6)
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        const address = await signer.getAddress();

        // Обновляем интерфейс
        accountSpan.innerText = address;
        if (statusDot) {
            statusDot.classList.remove("offline");
            statusDot.style.background = "#10b981"; // Зеленый цвет
        }
        connectBtn.innerText = "Connected";

        // Загружаем данные контрактов
        initContracts();
        loadTokenData();
        loadNFTData();

    } catch (error) {
        console.error("Connection error:", error);
        alert("Ошибка подключения: " + error.message);
    }
};

function initContracts() {
    // Эти переменные (ERC20_ADDRESS, ERC20_ABI и т.д.) должны быть в твоем abi.js
    erc20Contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);
    nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
}

// 3. Логика ERC-20 (Баланс)
async function loadTokenData() {
    try {
        const name = await erc20Contract.name();
        const symbol = await erc20Contract.symbol();
        const balance = await erc20Contract.balanceOf(await signer.getAddress());
        const decimals = await erc20Contract.decimals();

        tokenName.innerText = name;
        tokenSymbol.innerText = symbol;
        tokenBalance.innerText = ethers.formatUnits(balance, decimals);
    } catch (e) {
        console.error("Ошибка ERC20:", e);
    }
}

// 4. Логика ERC-721 (NFT) - Универсальный способ без Enumerable
async function loadNFTData() {
    nftList.innerHTML = ""; // Очищаем список "Empty"

    try {
        const address = await signer.getAddress();
        
        // Проверяем первые 5 ID (0, 1, 2, 3, 4)
        // Так как у тебя в контракте нет Enumerable, мы просто перебираем ID
        for (let i = 0; i < 5; i++) {
            try {
                const owner = await nftContract.ownerOf(i);
                if (owner.toLowerCase() === address.toLowerCase()) {
                    const uri = await nftContract.tokenURI(i);
                    
                    const nftCard = document.createElement("div");
                    nftCard.className = "nft-item"; // Используем твой стиль из CSS
                    nftCard.innerHTML = `
                        <div style="background: linear-gradient(135deg, #6366f1, #a855f7); height: 80px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-bottom: 8px;">
                            #${i}
                        </div>
                        <div style="font-size: 0.7rem; color: #aaa; overflow: hidden; text-overflow: ellipsis;">${uri}</div>
                    `;
                    nftList.appendChild(nftCard);
                }
            } catch (err) {
                // ID не существует, пропускаем
            }
        }

        if (nftList.innerHTML === "") {
            nftList.innerHTML = "<div class='nft-item'>No NFTs found</div>";
        }
    } catch (e) {
        console.error("Ошибка NFT:", e);
        nftList.innerHTML = "<div class='nft-item'>Error</div>";
    }
}

// 5. Перевод токенов
document.getElementById("transferBtn").onclick = async () => {
    const to = document.getElementById("transferAddress").value;
    const amount = document.getElementById("transferAmount").value;
    const status = document.getElementById("txStatus");

    try {
        status.innerText = "Отправка транзакции...";
        const tx = await erc20Contract.transfer(to, ethers.parseUnits(amount, 18));
        status.innerText = `Хэш: ${tx.hash.substring(0, 15)}...`;
        await tx.wait();
        status.innerText = "Успешно переведено!";
        loadTokenData(); // Обновляем баланс
    } catch (e) {
        status.innerText = "Ошибка: " + e.message;
    }
};