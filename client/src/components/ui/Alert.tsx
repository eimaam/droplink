import React from 'react';
import { Alert as AntdAlert } from 'antd';
import type { AlertProps as AntdAlertProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const alertVariants = cva(
  'rounded-lg font-mono transition-all',
  {
    variants: {
      variant: {
        default: 'bg-surface border-border text-text-primary',
        info: 'bg-info/10 border-info text-info',
        success: 'bg-success/10 border-success text-success',
        warning: 'bg-warning/10 border-warning text-warning',
        error: 'bg-error/10 border-error text-error',
        primary: 'bg-primary/10 border-primary text-primary',
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface IAlertProps extends AntdAlertProps, VariantProps<typeof alertVariants> {}

const Alert: React.FC<IAlertProps> = ({ className, variant, size, type, ...props }) => {
  const typeMap = {
    default: 'info',
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
    primary: 'info',
  } as const;

  return (
    <AntdAlert
      className={cn(alertVariants({ variant, size }), className)}
      type={variant ? typeMap[variant] : type}
      {...props}
    />
  );
};

Alert.displayName = 'Alert';

export { Alert, alertVariants };

