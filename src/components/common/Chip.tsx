import type { HTMLAttributes, ReactNode } from 'react';

export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type ChipSize = 'sm' | 'md';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  icon?: ReactNode;
}

export default function Chip({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
  ...props
}: ChipProps) {
  const baseStyles = 'inline-flex items-center gap-1 font-semibold rounded-pill';
  
  const variantStyles = {
    default: 'bg-bg-chip text-accent-primary',
    primary: 'bg-primary-100 text-primary-600',
    success: 'bg-green-500/10 text-green-500',
    warning: 'bg-orange-100 text-orange-500',
    danger: 'bg-red-500/10 text-red-500',
  };
  
  const sizeStyles = {
    sm: 'text-xs px-2 py-1',
    md: 'text-xs px-3 py-1.5',
  };
  
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();
  
  return (
    <span className={classes} {...props}>
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </span>
  );
}
