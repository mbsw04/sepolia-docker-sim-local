
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AssetManager {
    struct Asset {
        address owner;
        string ipfsCid;
        bool inUse;
        address user;
    }

    uint256 public assetCounter;
    mapping(uint256 => Asset) public assets;

    event AssetCreated(uint256 assetId, address creator, string cid);
    event AssetTransferred(uint256 assetId, address from, address to);
    event AssetUsed(uint256 assetId, address user);
    event AssetReleased(uint256 assetId);

    function createAsset(string memory cid) public returns (uint256) {
        assetCounter++;
        assets[assetCounter] = Asset(msg.sender, cid, false, address(0));
        emit AssetCreated(assetCounter, msg.sender, cid);
        return assetCounter;
    }

    function transferAsset(uint256 id, address to) public {
        require(msg.sender == assets[id].owner, "Not asset owner");
        assets[id].owner = to;
        emit AssetTransferred(id, msg.sender, to);
    }

    function useAsset(uint256 id) public {
        require(msg.sender == assets[id].owner, "Not asset owner");
        assets[id].inUse = true;
        assets[id].user = msg.sender;
        emit AssetUsed(id, msg.sender);
    }

    function releaseAsset(uint256 id) public {
        require(msg.sender == assets[id].user, "Not asset user");
        assets[id].inUse = false;
        assets[id].user = address(0);
        emit AssetReleased(id);
    }
}
