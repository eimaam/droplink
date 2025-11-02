import React from 'react';
import { Modal as AntdModal } from 'antd';
import type { ModalProps as AntdModalProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const modalVariants = cva(
  'rounded-xl',
  {
    variants: {
      variant: {
        default: 'bg-card',
        centered: 'bg-card',
        fullscreen: 'bg-background',
      },
      size: {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface IModalProps extends Omit<AntdModalProps, 'variant'>, VariantProps<typeof modalVariants> {}

const Modal: React.FC<IModalProps> = ({ className, variant, size, ...props }) => {
  return (
    <AntdModal
      className={cn(modalVariants({ variant, size }), className)}
      centered={variant === 'centered'}
      {...props}
    />
  );
};

Modal.displayName = 'Modal';

export { Modal, modalVariants };

