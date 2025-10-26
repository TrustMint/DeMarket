
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-border-color bg-surface">
      <div className="container mx-auto p-4 text-center text-on-surface-secondary">
        <p>&copy; {new Date().getFullYear()} DeMarket. Все права защищены (или нет).</p>
      </div>
    </footer>
  );
};
