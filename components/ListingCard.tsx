import React from 'react';
import type { Listing } from '../types';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { Rating } from './Rating';
import { CartPlusIcon } from './icons/CartPlusIcon';

interface ListingCardProps {
  listing: Listing;
  onSelect: (listing: Listing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onSelect }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when adding to cart
    addToCart(listing);
  };

  return (
    <div 
      className="group relative rounded-xl border border-glass-border bg-surface/70 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out h-full flex flex-col shadow-lg hover:shadow-glow hover:border-primary/50"
      onClick={() => onSelect(listing)}
    >
      <div 
        className="absolute inset-0 bg-surface/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="relative pb-[75%]"> {/* 4:3 Aspect Ratio */}
          <img src={listing.imageUrl} alt={listing.title} className="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          {listing.discountPrice && (
             <div className="absolute top-3 left-3 bg-error text-white text-xs font-bold px-2 py-1 rounded-full">
              SALE
             </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-lg text-on-surface flex-grow mb-2">{listing.title}</h3>
          <div className="flex items-center mb-2">
            <Rating value={listing.rating} />
            <span className="text-xs text-on-surface-secondary ml-2">({listing.reviews} отзывов)</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className={`font-bold text-2xl ${listing.discountPrice ? 'text-error' : 'text-secondary'}`}>
                ${(listing.discountPrice ?? listing.price).toLocaleString('en-US')}
            </p>
            {listing.discountPrice && (
                 <p className="text-base text-on-surface-secondary line-through">
                    ${listing.price.toLocaleString('en-US')}
                </p>
            )}
          </div>
        </div>
        <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-y-0 translate-y-2">
           <Button onClick={handleAddToCart} variant='primary' className="rounded-full !p-3 shadow-lg">
                <CartPlusIcon className="w-5 h-5"/>
           </Button>
        </div>
      </div>
    </div>
  );
};
