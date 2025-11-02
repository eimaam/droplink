import React from 'react';
import { Divider as AntdDivider } from 'antd';
import type { DividerProps as AntdDividerProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const dividerVariants = cva(
  'transition-all',
  {
    variants: {
      variant: {
        default: 'border-border',
        primary: 'border-primary',
        gradient: 'border-0 bg-gradient-to-r from-transparent via-primary to-transparent h-px',
      },
      spacing: {
        sm: 'my-2',
        md: 'my-4',
        lg: 'my-6',
        xl: 'my-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      spacing: 'md',
    },
  }
);

export interface IDividerProps extends AntdDividerProps, VariantProps<typeof dividerVariants> {}

const Divider: React.FC<IDividerProps> = ({ className, variant, spacing, ...props }) => {
  if (variant === 'gradient') {
    return <div className={cn(dividerVariants({ variant, spacing }), className)} />;
  }

  return (
    <AntdDivider
      className={cn(dividerVariants({ variant, spacing }), className)}
      {...props}
    />
  );
};

Divider.displayName = 'Divider';

export { Divider, dividerVariants };

