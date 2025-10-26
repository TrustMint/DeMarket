import React from 'react';
import { useCart } from '../context/CartContext';
import { CartIcon as CartSvgIcon } from './icons/CartIcon';

interface CartIconProps {
  onClick: () => void;
}

export const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const { totalItems } = useCart();
  return (
    <button onClick={onClick} className="relative p-2 rounded-full hover:bg-surface-light">
      <CartSvgIcon className="w-6 h-6 text-on-surface" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">
          {totalItems}
        </span>
      )}
    </button>
  );
};
