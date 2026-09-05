import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive' | 'highlighted';
}

const cardVariants = {
  default: 'bg-neutral-100 border border-neutral-200 shadow-sm dark:bg-neutral-900 dark:border-neutral-800',
  elevated: 'surface-layered shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-default',
  interactive: 'surface-layered shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer',
  highlighted: 'bg-primary-50 border-l-4 border-l-primary-500 border-neutral-200 shadow-sm dark:bg-primary-950/30 dark:border-neutral-800',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl p-6 transition-all edge-highlight',
          cardVariants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4 space-y-1.5', className)} {...props} />
);

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-card-title', className)} {...props} />
);

export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-secondary', className)} {...props} />
);

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('space-y-4', className)} {...props} />
);

export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-6 flex items-center justify-between', className)} {...props} />
);
