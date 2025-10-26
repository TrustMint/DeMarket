import React from 'react';
// FIX: Corrected import paths for a root-level component.
import { Logo } from './components/icons/Logo';
import { ConnectWalletButton } from './components/ConnectWalletButton';
import { CartIcon } from './components/CartIcon';
import { SearchBar } from './components/SearchBar';

interface HeaderProps {
    onShowCreateListing: () => void;
    onCartClick: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onShowCreateListing, onCartClick, searchQuery, setSearchQuery }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-glass-border bg-background/80 shadow-glass backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 md:px-8">
        <a href="/" className="flex items-center space-x-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="hidden sm:inline-block font-bold text-lg">DeMarket</span>
        </a>
        
        <div className="flex-1 max-w-xl">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
            <CartIcon onClick={onCartClick} />
            <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
};
