import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import logoImage from '../../assets/images/droplink-logo-dark.png';

const logoVariants = cva(
  'inline-flex items-center gap-2 transition-all',
  {
    variants: {
      size: {
        xs: 'text-sm',
        sm: 'text-base',
        md: 'text-xl',
        lg: 'text-2xl',
        xl: 'text-3xl',
        '2xl': 'text-4xl',
      },
      variant: {
        default: 'text-foreground',
        gradient: 'text-gradient',
        muted: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const logoImageSizes = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-12 h-12',
  '2xl': 'w-16 h-16',
};

export interface ILogoProps extends VariantProps<typeof logoVariants> {
  showText?: boolean;
  showImage?: boolean;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  animated?: boolean;
  href?: string;
  onClick?: () => void;
}

export const Logo: React.FC<ILogoProps> = ({
  size = 'md',
  variant = 'default',
  showText = true,
  showImage = true,
  className,
  imageClassName,
  textClassName,
  animated = false,
  href,
  onClick,
}) => {
  const Component = animated ? motion.div : 'div';
  const animationProps = animated
    ? {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      }
    : {};

  const content = (
    <Component
      className={cn(
        logoVariants({ size, variant }),
        (href || onClick) && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...animationProps}
    >
      {showImage && (
        <img
          src={logoImage}
          alt="DropLink Logo"
          className={cn(
            'object-contain rounded-lg',
            logoImageSizes[size || 'md'],
            imageClassName
          )}
        />
      )}
      {showText && (
        <span className={cn('font-bold font-mono', textClassName)}>
          DropLink
        </span>
      )}
    </Component>
  );

  if (href) {
    return (
      <a href={href} className="inline-flex">
        {content}
      </a>
    );
  }

  return content;
};

Logo.displayName = 'Logo';

