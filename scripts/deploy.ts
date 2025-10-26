// FIX: Use a named import for `ethers` to correctly access Hardhat's ethers helper functions.
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // --- EXAMPLE PARAMETERS ---
  // In a real deployment, these would come from a config file or environment variables
  const arbitratorAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual Kleros arbitrator address
  const tokenAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual USDT/USDC address on the network
  const sellerAddress = deployer.address; // Example: seller is the deployer
  const price = ethers.parseUnits("100", 6); // Example: 100 USDT (assuming 6 decimals)

  const ArbitrableEscrow = await ethers.getContractFactory("ArbitrableEscrow");
  const escrow = await ArbitrableEscrow.deploy(
    arbitratorAddress,
    tokenAddress,
    sellerAddress,
    price
  );

  await escrow.waitForDeployment();
  const contractAddress = await escrow.getAddress();

  console.log(`ArbitrableEscrow deployed to: ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  // Using `process.exit(1)` to correctly signal a failure exit status in a Hardhat script.
  // The TypeScript error `Property 'exit' does not exist on type 'Process'` can occur if node types are not properly loaded in the environment.
  process.exit(1);
});