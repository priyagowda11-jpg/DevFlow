import * as React from 'react';
import { cn } from '@/lib/utils';
import { Search, Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  typeVariant?: 'text' | 'email' | 'password' | 'search';
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, success, typeVariant = 'text', leftIcon, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === 'password' || typeVariant === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-text-main dark:text-neutral-200">
            {label}
          </label>
        )}
        <div className="relative group">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-500 transition-colors">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            className={cn(
              'w-full rounded-lg border bg-neutral-50 px-3 py-2 text-sm transition-all outline-none interactive-sink',
              'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
              'focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500',
              error
                ? 'border-accent-500 focus:border-accent-500 dark:border-accent-600'
                : success
                  ? 'border-primary-500 focus:border-primary-500'
                  : 'border-neutral-200 focus:border-primary-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50',
              leftIcon && 'pl-10',
              className
            )}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main dark:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-xs text-accent-600 dark:text-accent-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
