// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StrongCon {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 balance = balances[msg.sender];
        require(balance > 0, "No balance");

        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: balance}("");
        require(sent, "Failed to send Ether");
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}