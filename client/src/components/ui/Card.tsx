import React from 'react';
import { Card as AntdCard } from 'antd';
import type { CardProps as AntdCardProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const cardVariants = cva(
  'rounded-xl transition-all',
  {
    variants: {
      variant: {
        default: 'bg-card border border-border',
        elevated: 'bg-card border border-border shadow-lg',
        ghost: 'bg-transparent',
        outline: 'bg-transparent border-2 border-border',
        gradient: 'bg-gradient-to-br from-card to-surface border border-primary/20',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-12',
      },
      hover: {
        true: 'hover:border-primary hover:shadow-xl hover:shadow-primary/20 cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      hover: false,
    },
  }
);

export interface ICardProps extends Omit<AntdCardProps, 'className' | 'variant'>, VariantProps<typeof cardVariants> {
  className?: string;
  children?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, ICardProps>(
  ({ className, variant, padding, hover, children, ...props }, ref) => {
    return (
      <AntdCard
        className={cn(cardVariants({ variant, padding, hover }), className)}
        bordered={false}
        {...props}
      >
        {children}
      </AntdCard>
    );
  }
);

Card.displayName = 'Card';

export { Card, cardVariants };

