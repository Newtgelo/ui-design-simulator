import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ className, label, error, icon, ...props }) => {
  return (
    <div className="space-y-1 w-full">
      {label && <label className="text-xs font-medium text-muted block theme-transition">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted theme-transition">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full bg-surface border border-bordercolor text-tx rounded-[var(--radius-theme)] py-2.5 focus:outline-none focus:ring-4 focus:border-primary/50 transition-all duration-200 theme-transition shadow-[var(--shadow-theme)]',
            icon ? 'pl-10 pr-4' : 'px-4',
            error ? 'border-danger focus:ring-danger/20' : 'focus:ring-primary/10',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-danger mt-1 theme-transition flex items-center gap-1">
          <i className="ph-fill ph-warning-circle"></i> {error}
        </p>
      )}
    </div>
  );
};
