import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { CloseIcon } from './icons/CloseIcon';

interface CartViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartView: React.FC<CartViewProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div
        className="relative w-full max-w-md h-full bg-background/80 border-l border-glass-border shadow-glass backdrop-blur-xl animate-slide-in flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <h2 className="text-xl font-semibold text-on-surface">Корзина ({totalItems})</h2>
          <button onClick={onClose} className="p-1 rounded-full text-on-surface-secondary hover:bg-surface-light hover:text-on-surface">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
            <p className="text-lg">Ваша корзина пуста</p>
            <p className="text-on-surface-secondary mt-2">Добавьте товары, чтобы они появились здесь.</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {items.map(({ listing, quantity }) => (
              <div key={listing.id} className="flex items-start gap-4">
                <img src={listing.imageUrl} alt={listing.title} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-on-surface">{listing.title}</h3>
                  <p className="text-primary font-bold mt-1">${(listing.discountPrice ?? listing.price).toLocaleString('en-US')}</p>
                   <div className="flex items-center mt-2">
                    <input 
                      type="number" 
                      value={quantity} 
                      onChange={(e) => updateQuantity(listing.id, parseInt(e.target.value) || 1)}
                      className="w-16 text-center bg-surface-light border border-glass-border rounded-md"
                      min="1"
                    />
                   </div>
                </div>
                <button onClick={() => removeFromCart(listing.id)} className="p-1 text-on-surface-secondary hover:text-error">
                  <CloseIcon className="w-5 h-5"/>
                </button>
              </div>
            ))}
          </div>
        )}
        
        {items.length > 0 && (
          <div className="p-6 border-t border-glass-border mt-auto">
            <div className="flex justify-between items-center mb-4 text-lg">
              <span className="font-semibold">Итого:</span>
              <span className="font-bold text-primary">${totalPrice.toLocaleString('en-US')}</span>
            </div>
            <Button className="w-full !py-3">Перейти к оформлению</Button>
          </div>
        )}
      </div>
    </div>
  );
};
