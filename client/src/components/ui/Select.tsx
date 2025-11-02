import React from 'react';
import { Select as AntdSelect } from 'antd';
import type { SelectProps as AntdSelectProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const selectVariants = cva(
  'w-full rounded-lg transition-all font-mono',
  {
    variants: {
      variant: {
        default: 'bg-background border-border text-text-primary',
        filled: 'bg-surface border-transparent text-text-primary',
        ghost: 'bg-transparent border-transparent text-text-primary',
      },
      selectSize: {
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      selectSize: 'md',
    },
  }
);

export interface ISelectProps extends Omit<AntdSelectProps, 'size'>, VariantProps<typeof selectVariants> {
  selectSize?: 'sm' | 'md' | 'lg';
}

const Select = React.forwardRef<HTMLSelectElement, ISelectProps>(
  ({ className, variant, selectSize, ...props }, ref) => {
    const sizeMap = {
      sm: 'small',
      md: 'middle',
      lg: 'large',
    } as const;

    return (
      <AntdSelect
        className={cn(selectVariants({ variant, selectSize }), className)}
        size={selectSize ? sizeMap[selectSize] : 'middle'}
        {...props}
      />
    );
  }
);

Select.displayName = 'Select';

export { Select, selectVariants };

