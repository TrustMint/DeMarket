
import React from 'react';
import { useWallet } from '../context/WalletContext';
import { WalletIcon } from './icons/WalletIcon';
import { Button } from './ui/Button';

export const ConnectWalletButton: React.FC = () => {
    const { isConnected, address, connectWallet, disconnectWallet } = useWallet();

    const formatAddress = (addr: string | null) => {
        if (!addr) return '';
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    if (isConnected) {
        return (
            <div className="flex items-center space-x-3">
                <span className="text-on-surface-secondary text-sm font-mono">{formatAddress(address)}</span>
                <Button onClick={disconnectWallet} variant="secondary">
                    Отключить
                </Button>
            </div>
        );
    }

    return (
        <Button onClick={connectWallet} variant="primary">
            <WalletIcon className="mr-2 h-5 w-5" />
            Подключить кошелек
        </Button>
    );
};
