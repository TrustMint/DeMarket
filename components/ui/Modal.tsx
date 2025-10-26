
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={onClose}>
      <div
        className="relative w-full max-w-lg rounded-lg bg-surface p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border-color pb-4">
          <h2 className="text-xl font-semibold text-on-surface">{title}</h2>
          <button onClick={onClose} className="text-on-surface-secondary hover:text-on-surface">&times;</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
