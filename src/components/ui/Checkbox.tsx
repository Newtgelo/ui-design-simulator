import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from '@phosphor-icons/react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  label, 
  error, 
  className, 
  checked, 
  disabled,
  ...props 
}) => {
  return (
    <label className={cn(
      "flex items-center gap-2 cursor-pointer group select-none",
      disabled && "cursor-not-allowed opacity-50",
      className
    )}>
      <div className="relative">
        <input 
          type="checkbox" 
          className="peer sr-only" 
          checked={checked}
          disabled={disabled}
          readOnly
          {...props} 
        />
        <div className={cn(
          "w-5 h-5 rounded-[calc(var(--radius-theme)*0.5)] border-2 border-bordercolor bg-surface flex items-center justify-center transition-all theme-transition",
          "peer-checked:bg-primary peer-checked:border-primary",
          "group-hover:border-primary/50",
          error && "border-danger group-hover:border-danger",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20"
        )}>
          {checked && <Check weight="bold" size={12} className="text-white" />}
        </div>
      </div>
      {label && (
        <span className={cn(
          "text-sm font-medium theme-transition",
          error ? "text-danger" : "text-tx"
        )}>
          {label}
        </span>
      )}
    </label>
  );
};
