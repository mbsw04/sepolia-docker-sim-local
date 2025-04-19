
const { ethers } = require("ethers");
const args = process.argv.slice(2);

async function main() {
  const provider = new ethers.JsonRpcProvider("http://sepolia-node:8545");
  const wallet = new ethers.Wallet("0x8b3a350cf5c34c9194ca3a545d8bf2e7a56a1e1b0f6e59fb55b14489c2a8e0f9", provider);
  const abi = require("../shared/abi.json");
  const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

  const action = args[0];
  const id = args[1];

  if (action === "use") {
    const tx = await contract.useAsset(id);
    await tx.wait();
    console.log("Asset used:", id);
  } else if (action === "transfer") {
    const to = args[2];
    const tx = await contract.transferAsset(id, to);
    await tx.wait();
    console.log("Asset transferred:", id, "to", to);
  }
}

main().catch(console.error);
