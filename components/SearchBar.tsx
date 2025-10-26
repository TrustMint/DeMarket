import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon className="h-5 w-5 text-on-surface-secondary" />
      </div>
      <input
        type="text"
        placeholder="Поиск по товарам..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-glass-border bg-surface/80 py-2.5 pl-10 pr-4 text-on-surface placeholder-on-surface-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
};
