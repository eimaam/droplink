import React from 'react';
import { Spin } from 'antd';
import type { SpinProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const spinnerVariants = cva(
  'flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'text-primary',
        secondary: 'text-text-secondary',
        white: 'text-foreground',
      },
      size: {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ISpinnerProps extends SpinProps, VariantProps<typeof spinnerVariants> {
  fullScreen?: boolean;
}

const Spinner: React.FC<ISpinnerProps> = ({ 
  className, 
  variant, 
  size, 
  fullScreen,
  ...props 
}) => {
  const sizeMap = {
    sm: 'small',
    md: 'default',
    lg: 'large',
    xl: 'large',
  } as const;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <Spin 
          className={cn(spinnerVariants({ variant, size }), className)}
          size={size ? sizeMap[size] : 'default'}
          {...props}
        />
      </div>
    );
  }

  return (
    <Spin 
      className={cn(spinnerVariants({ variant, size }), className)}
      size={size ? sizeMap[size] : 'default'}
      {...props}
    />
  );
};

Spinner.displayName = 'Spinner';

export { Spinner, spinnerVariants };

