import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Warning, Info, XCircle } from '@phosphor-icons/react';

interface AlertProps {
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ type, title, message, className }) => {
  const styles = {
    success: 'bg-success/10 border-success/20 text-success',
    warning: 'bg-warning/10 border-warning/20 text-warning',
    danger: 'bg-danger/10 border-danger/20 text-danger',
    info: 'bg-info/10 border-info/20 text-info',
  };

  const icons = {
    success: <CheckCircle weight="fill" className="text-xl mt-0.5" />,
    warning: <Warning weight="fill" className="text-xl mt-0.5" />,
    danger: <XCircle weight="fill" className="text-xl mt-0.5" />,
    info: <Info weight="fill" className="text-xl mt-0.5" />,
  };

  return (
    <div
      className={cn(
        'border px-4 py-3 rounded-[var(--radius-theme)] flex items-start gap-3 theme-transition',
        styles[type],
        className
      )}
    >
      {icons[type]}
      <div>
        <h5 className="font-semibold text-sm">{title}</h5>
        <p className="text-xs opacity-90">{message}</p>
      </div>
    </div>
  );
};
