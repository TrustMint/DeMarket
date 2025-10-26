import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

// FIX: The config object is not explicitly typed to avoid a TypeScript type issue with the network configuration.
// Hardhat will still correctly parse this configuration at runtime.
const config = {
  solidity: "0.8.24",
  networks: {
    arbitrumSepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      arbitrumSepolia: process.env.ARBISCAN_API_KEY || ""
    }
  },
};

export default config;
