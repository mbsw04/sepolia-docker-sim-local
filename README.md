# Sepolia Docker Simulation

This project simulates a local Ethereum testnet (Sepolia-style) using Docker and Anvil, with two user containers interacting with a smart contract that manages digital asset ownership, transfer, and usage.

---

## 🧱 Project Structure

```
sepolia-docker-sim/
│
├── contracts/
│   └── AssetManager.sol        # Smart contract
│
├── shared/
│   └── abi.json                # ABI (update after compiling contract)
│
├── user-a/
│   ├── Dockerfile              # Docker config for User A
│   ├── index.js                # CLI: create asset
│   └── package.json            # Ethers dependency
│
├── user-b/
│   ├── Dockerfile              # Docker config for User B
│   ├── index.js                # CLI: use and transfer asset
│   └── package.json            # Ethers dependency
│
└── docker-compose.yml          # Services: local node + two users
```

---

##  Smart Contract (`AssetManager.sol`)

- **createAsset(cid)**: Create new asset linked to a GLB file (via CID)
- **transferAsset(id, to)**: Transfer ownership
- **useAsset(id)**: Mark asset as in use
- **releaseAsset(id)**: Release asset from usage

---

##  How It Works

- `sepolia-node`: Local Ethereum testnet (Anvil)
- `user-a` and `user-b`: Simulated users with CLI scripts
- All services share a Docker network

---

##  Usage

### 1. Build and Start

```bash
docker-compose build
docker-compose up -d
```

### 2. Deploy Smart Contract
Use `forge`, `hardhat`, or `ethers.js` to deploy `AssetManager.sol` to `sepolia-node`, then update `CONTRACT_ADDRESS` in `docker-compose.yml`.

### 3. Create an Asset (User A)

```bash
docker-compose run user-a create mymodel.glb
```

### 4. Use or Transfer Asset (User B)

```bash
docker-compose run user-b use 1
docker-compose run user-b transfer 1 0xRecipientAddress
```

---

##  Simulated Environment

- Runs entirely locally (no Infura or real Sepolia)
- No real ETH required
- Test wallets use Anvil defaults

---

##  Next Steps

- Compile the contract and update `shared/abi.json`
- Deploy contract and get address
- Expand with more users or a REST API/UI

---
