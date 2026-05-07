import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({ className, title, subtitle, children, ...props }) => {
  return (
    <div
      className={cn(
        'bg-surface border border-bordercolor rounded-[var(--radius-theme)] p-6 shadow-[var(--shadow-theme)] hover:shadow-md transition-shadow duration-300 theme-transition',
        className
      )}
      {...props}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h4 className="font-bold">{title}</h4>}
          {subtitle && <p className="text-sm text-muted mt-1 theme-transition">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};
