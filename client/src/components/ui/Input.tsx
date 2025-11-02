import React from 'react';
import { Input as AntdInput } from 'antd';
import type { InputProps as AntdInputProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputVariants = cva(
  'w-full rounded-lg transition-all font-mono',
  {
    variants: {
      variant: {
        default: 'bg-background border-border text-text-primary hover:border-primary focus:border-primary',
        filled: 'bg-surface border-transparent text-text-primary hover:bg-surface-hover focus:bg-background',
        ghost: 'bg-transparent border-transparent text-text-primary hover:bg-surface/50',
      },
      inputSize: {
        sm: 'h-8 text-sm px-3',
        md: 'h-10 text-base px-4',
        lg: 'h-12 text-lg px-5',
      },
      state: {
        default: '',
        error: 'border-error focus:border-error',
        success: 'border-success focus:border-success',
        warning: 'border-warning focus:border-warning',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
      state: 'default',
    },
  }
);

export interface IInputProps extends Omit<AntdInputProps, 'size'>, VariantProps<typeof inputVariants> {
  inputSize?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'error' | 'success' | 'warning';
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, variant, inputSize, state, ...props }, ref) => {
    const sizeMap = {
      sm: 'small',
      md: 'middle',
      lg: 'large',
    } as const;

    return (
      <AntdInput
        ref={ref}
        className={cn(inputVariants({ variant, inputSize, state }), className)}
        size={inputSize ? sizeMap[inputSize] : 'middle'}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };

