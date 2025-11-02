import React from 'react';
import { Input } from 'antd';
import type { TextAreaProps as AntdTextAreaProps } from 'antd/es/input';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const { TextArea: AntdTextArea } = Input;

const textareaVariants = cva(
  'w-full rounded-lg transition-all font-mono resize-none',
  {
    variants: {
      variant: {
        default: 'bg-background border-border text-text-primary hover:border-primary focus:border-primary',
        filled: 'bg-surface border-transparent text-text-primary hover:bg-surface-hover focus:bg-background',
        ghost: 'bg-transparent border-transparent text-text-primary hover:bg-surface/50',
      },
      textareaSize: {
        sm: 'min-h-[80px] text-sm px-3 py-2',
        md: 'min-h-[120px] text-base px-4 py-3',
        lg: 'min-h-[160px] text-lg px-5 py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      textareaSize: 'md',
    },
  }
);

export interface ITextareaProps extends AntdTextAreaProps, VariantProps<typeof textareaVariants> {
  textareaSize?: 'sm' | 'md' | 'lg';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ className, variant, textareaSize, ...props }, ref) => {
    return (
      <AntdTextArea
        ref={ref}
        className={cn(textareaVariants({ variant, textareaSize }), className)}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };

