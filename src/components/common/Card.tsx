import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  ...props
}: CardProps) {
  const baseStyles = 'bg-bg-surface border border-gray-200 rounded-md';
  
  const variantStyles = {
    default: 'shadow-sm',
    elevated: 'shadow-md',
  };
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };
  
  const hoverStyles = hover ? 'transition-shadow duration-200 hover:shadow-lg' : '';
  
  const classes = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`.trim();
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
