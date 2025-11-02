import React from 'react';
import { Switch as AntdSwitch } from 'antd';
import type { SwitchProps as AntdSwitchProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const switchVariants = cva(
  'transition-all',
  {
    variants: {
      variant: {
        default: 'bg-muted data-[state=checked]:bg-primary',
        success: 'bg-muted data-[state=checked]:bg-success',
        warning: 'bg-muted data-[state=checked]:bg-warning',
        error: 'bg-muted data-[state=checked]:bg-error',
      },
      switchSize: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      switchSize: 'md',
    },
  }
);

export interface ISwitchProps extends AntdSwitchProps, VariantProps<typeof switchVariants> {
  switchSize?: 'sm' | 'md' | 'lg';
}

const Switch = React.forwardRef<HTMLButtonElement, ISwitchProps>(
  ({ className, variant, switchSize, ...props }, ref) => {
    const sizeMap = {
      sm: 'small',
      md: 'default',
      lg: 'default',
    } as const;

    return (
      <AntdSwitch
        className={cn(switchVariants({ variant, switchSize }), className)}
        size={switchSize ? sizeMap[switchSize] : 'default'}
        {...props}
      />
    );
  }
);

Switch.displayName = 'Switch';

export { Switch, switchVariants };

