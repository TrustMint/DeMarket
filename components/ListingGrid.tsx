import React from 'react';
import type { Listing } from '../types';
import { ListingCard } from './ListingCard';
import { Spinner } from './ui/Spinner';

interface ListingGridProps {
  listings: Listing[];
  onSelectListing: (listing: Listing) => void;
  isLoading: boolean;
}

export const ListingGrid: React.FC<ListingGridProps> = ({ listings, onSelectListing, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-surface/80 rounded-xl border border-glass-border">
        <h3 className="text-xl font-semibold">Товары не найдены</h3>
        <p className="text-on-surface-secondary mt-2">Попробуйте изменить параметры поиска или фильтры.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {listings.map((listing, index) => (
        <div key={listing.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
          <ListingCard listing={listing} onSelect={onSelectListing} />
        </div>
      ))}
    </div>
  );
};
