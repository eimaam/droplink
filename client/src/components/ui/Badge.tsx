import React from 'react';
import { Badge as AntdBadge } from 'antd';
import type { BadgeProps as AntdBadgeProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full font-mono font-medium transition-all',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        success: 'bg-success text-foreground',
        warning: 'bg-warning text-foreground',
        error: 'bg-error text-foreground',
        outline: 'bg-transparent border-2 border-primary text-primary',
        ghost: 'bg-primary/10 text-primary',
      },
      size: {
        sm: 'h-5 px-2 text-xs',
        md: 'h-6 px-3 text-sm',
        lg: 'h-7 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface IBadgeProps extends Omit<AntdBadgeProps, 'size'>, VariantProps<typeof badgeVariants> {
  children?: React.ReactNode;
}

const Badge: React.FC<IBadgeProps> = ({ className, variant, size, children, ...props }) => {
  if (children && typeof children === 'string') {
    return (
      <span className={cn(badgeVariants({ variant, size }), className)}>
        {children}
      </span>
    );
  }

  return (
    <AntdBadge
      className={cn(className)}
      {...props}
    >
      {children}
    </AntdBadge>
  );
};

Badge.displayName = 'Badge';

export { Badge, badgeVariants };

