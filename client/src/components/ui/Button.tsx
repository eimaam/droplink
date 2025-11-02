import React from 'react';
import { Button as AntdButton } from 'antd';
import type { ButtonProps as AntdButtonProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'subtle';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'default' | 'icon';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none font-mono',
  {
    variants: {
      variant: {
        default: 'bg-primary hover:bg-primary-dark text-primary-foreground shadow-lg hover:shadow-glow-primary',
        primary: 'bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground shadow-lg hover:shadow-glow-primary',
        secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground shadow',
        outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
        ghost: 'bg-transparent hover:bg-primary/10 text-primary',
        link: 'bg-transparent underline-offset-4 hover:underline text-primary',
        destructive: 'bg-destructive hover:bg-destructive/80 text-destructive-foreground shadow',
        subtle: 'bg-muted hover:bg-muted-foreground/20 text-muted-foreground',
      },
      size: {
        default: 'h-10 py-2 px-4 text-sm',
        sm: 'h-8 px-3 text-xs rounded-md',
        md: 'h-10 px-4 text-sm rounded-md',
        lg: 'h-12 px-6 text-base rounded-lg',
        xl: 'h-14 px-8 text-lg rounded-xl',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const variantToAntdType: Record<ButtonVariant, AntdButtonProps['type'] | undefined> = {
  default: 'primary',
  primary: 'primary',
  secondary: 'default',
  outline: 'default',
  ghost: 'text',
  link: 'link',
  destructive: 'primary',
  subtle: 'default',
};

const sizeToAntdSize: Record<ButtonSize, AntdButtonProps['size']> = {
  sm: 'small',
  md: 'middle',
  lg: 'large',
  xl: 'large',
  default: 'middle',
  icon: 'middle',
};

export interface IButtonProps extends Omit<AntdButtonProps, 'type' | 'size'>, VariantProps<typeof buttonVariants> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant = 'primary', size = 'default', fullWidth, isLoading, children, ...props }, ref) => {
    return (
      <AntdButton
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        type={variant ? variantToAntdType[variant] : undefined}
        size={size ? sizeToAntdSize[size] : undefined}
        loading={isLoading || props.loading}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {children}
      </AntdButton>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

