
const { ethers } = require("ethers");
const args = process.argv.slice(2);

async function main() {
  const provider = new ethers.JsonRpcProvider("http://sepolia-node:8545");
  const wallet = new ethers.Wallet("0x59c6995e998f97a5a004497e5da0db3f8b928c6c2c8c3bb3ee3c6f0a6e5c4b52", provider);
  const abi = require("../shared/abi.json");
  const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

  const action = args[0];
  if (action === "create") {
    const cid = args[1] || "blank-cid";
    const tx = await contract.createAsset(cid);
    await tx.wait();
    console.log("Asset created:", cid);
  }
}

main().catch(console.error);
