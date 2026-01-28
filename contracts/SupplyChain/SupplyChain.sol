// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChain {
    enum Status { Created, InTransit, Delivered }

    struct Item {
        string name;
        Status status;
    }

    mapping(uint256 => Item) public items;
    uint256 public itemCount;

    event ItemCreated(uint256 id, string name);
    event StatusUpdated(uint256 id, Status status);

    function createItem(string calldata name) external {
        items[itemCount] = Item(name, Status.Created);
        emit ItemCreated(itemCount, name);
        itemCount++;
    }

    function shipItem(uint256 id) external {
        require(items[id].status == Status.Created, "Wrong status");
        items[id].status = Status.InTransit;
        emit StatusUpdated(id, Status.InTransit);
    }

    function deliverItem(uint256 id) external {
        require(items[id].status == Status.InTransit, "Wrong status");
        items[id].status = Status.Delivered;
        emit StatusUpdated(id, Status.Delivered);
    }
}