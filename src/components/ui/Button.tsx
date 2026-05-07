import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md',
  isLoading, 
  children, 
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary text-[var(--color-primary-foreground)] hover:opacity-90 shadow-[var(--shadow-theme)] shadow-primary/20',
    secondary: 'bg-secondary text-[var(--color-secondary-foreground)] hover:opacity-90 shadow-[var(--shadow-theme)] shadow-secondary/20',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5',
    ghost: 'bg-transparent text-muted hover:text-tx hover:bg-bordercolor',
    danger: 'bg-danger text-white hover:opacity-90 shadow-[var(--shadow-theme)] shadow-danger/20',
  };

  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    icon: 'p-2',
  };

  return (
    <button
      className={cn(
        'rounded-[var(--radius-theme)] font-medium active:scale-95 theme-transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap',
        variants[variant],
        sizes[size || 'md'],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <i className="ph ph-spinner animate-spin"></i>}
      {children}
    </button>
  );
};
