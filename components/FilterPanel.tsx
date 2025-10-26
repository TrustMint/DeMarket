import React from 'react';
import { CATEGORIES } from '../constants';
import type { FilterState } from '../types';
import { Label } from './ui/Label';
import { StarIcon } from './icons/StarIcon';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (name: keyof FilterState, value: any) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const newPriceRange = [...filters.priceRange] as [number, number];
    const value = e.target.value === '' ? (index === 0 ? 0 : 10000) : parseInt(e.target.value, 10);
    newPriceRange[index] = value;
    if (newPriceRange[0] > newPriceRange[1]) {
        newPriceRange[1] = newPriceRange[0];
    }
    onFilterChange('priceRange', newPriceRange);
  };
  
  return (
    <div className="p-6 bg-surface/80 rounded-xl border border-glass-border shadow-glass backdrop-blur-xl">
      <h3 className="text-xl font-semibold mb-6">Фильтры</h3>
      <div className="space-y-6">
        <div>
          <Label>Категория</Label>
          <div className="space-y-2 mt-2">
            {CATEGORIES.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => onFilterChange('category', name)}
                className={`w-full flex items-center p-3 rounded-lg text-left transition-colors duration-200 ${
                  filters.category === name
                    ? 'bg-primary/20 text-primary font-semibold'
                    : 'hover:bg-surface-light'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <Label>Диапазон цен</Label>
          <div className="flex items-center gap-2 mt-2">
            <input type="number" placeholder="Min" value={filters.priceRange[0]} onChange={(e) => handlePriceChange(e, 0)} className="w-full rounded-md border border-border-color bg-surface-light px-3 py-2 text-on-surface placeholder-on-surface-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            <span>-</span>
            <input type="number" placeholder="Max" value={filters.priceRange[1]} onChange={(e) => handlePriceChange(e, 1)} className="w-full rounded-md border border-border-color bg-surface-light px-3 py-2 text-on-surface placeholder-on-surface-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>

        <div>
          <Label>Минимальный рейтинг</Label>
           <div className="flex items-center space-x-1 mt-2 cursor-pointer">
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star} onClick={() => onFilterChange('minRating', star)} className="focus:outline-none p-1 rounded-full hover:bg-surface-light transition-colors">
                 <StarIcon className={`h-6 w-6 ${star <= filters.minRating ? 'text-yellow-400' : 'text-gray-600'}`} />
              </button>
            ))}
          </div>
          {filters.minRating > 0 && (
            <button onClick={() => onFilterChange('minRating', 0)} className="text-xs text-primary hover:underline mt-2">
              Сбросить рейтинг
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
