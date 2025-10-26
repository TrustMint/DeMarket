
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import type { WalletState } from '../types';

const WalletContext = createContext<WalletState | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    // This is a mock connection. In a real app, you'd use ethers.js with MetaMask or WalletConnect.
    console.log("Connecting wallet...");
    try {
      // Simulate async connection and getting accounts
      await new Promise(resolve => setTimeout(resolve, 500)); 
      const mockAddress = "0x" + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      setAddress(mockAddress);
      setIsConnected(true);
      console.log(`Wallet connected: ${mockAddress}`);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    console.log("Disconnecting wallet...");
    setIsConnected(false);
    setAddress(null);
  }, []);

  const value = { isConnected, address, connectWallet, disconnectWallet };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletState => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
