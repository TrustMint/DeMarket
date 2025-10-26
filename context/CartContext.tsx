import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import type { Listing, CartItem, CartState } from '../types';

const CartContext = createContext<CartState | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (listing: Listing) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.listing.id === listing.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.listing.id === listing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { listing, quantity: 1 }];
    });
  };

  const removeFromCart = (listingId: number) => {
    setItems(prevItems => prevItems.filter(item => item.listing.id !== listingId));
  };

  const updateQuantity = (listingId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(listingId);
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.listing.id === listingId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);
  
  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => {
      const price = item.listing.discountPrice ?? item.listing.price;
      return total + (price * item.quantity);
    }, 0);
  }, [items]);

  const value = { items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartState => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
