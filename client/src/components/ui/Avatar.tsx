import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import type { AvatarProps as AntdAvatarProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const avatarVariants = cva(
  'inline-flex items-center justify-center rounded-full overflow-hidden font-mono font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        gradient: 'bg-gradient-to-br from-primary to-primary-light text-primary-foreground',
        outline: 'border-2 border-primary text-primary bg-transparent',
      },
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
        '2xl': 'h-20 w-20 text-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface IAvatarProps extends Omit<AntdAvatarProps, 'size'>, VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<HTMLSpanElement, IAvatarProps>(
  ({ className, variant, size, ...props }, ref) => {
    const sizeMap = {
      sm: 32,
      md: 40,
      lg: 48,
      xl: 64,
      '2xl': 80,
    };

    return (
      <AntdAvatar
        className={cn(avatarVariants({ variant, size }), className)}
        size={size ? sizeMap[size] : 40}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar, avatarVariants };

