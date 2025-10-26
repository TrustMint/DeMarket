
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ children, className, ...props }) => {
  return (
    <label
      className={`mb-2 block text-sm font-medium text-on-surface-secondary ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};
