import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Button Component
 * 
 * A versatile button component with multiple variants and sizes.
 * Supports loading states, icons, and full accessibility.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * 
 * <Button variant="secondary" isLoading>
 *   Submitting...
 * </Button>
 * ```
 */

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-md font-medium',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-500 text-white',
          'hover:bg-primary-600',
          'focus-visible:ring-primary-500',
        ],
        secondary: [
          'bg-neutral-100 text-neutral-900',
          'hover:bg-neutral-200',
          'focus-visible:ring-neutral-500',
        ],
        outline: [
          'border-2 border-neutral-300 bg-transparent text-neutral-700',
          'hover:bg-neutral-100',
          'focus-visible:ring-neutral-500',
        ],
        ghost: [
          'bg-transparent text-neutral-700',
          'hover:bg-neutral-100',
          'focus-visible:ring-neutral-500',
        ],
        destructive: [
          'bg-error-500 text-white',
          'hover:bg-error-600',
          'focus-visible:ring-error-500',
        ],
        link: [
          'text-primary-500 underline-offset-4 bg-transparent',
          'hover:underline',
          'focus-visible:ring-primary-500',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10 p-0',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show loading spinner and disable interactions */
  isLoading?: boolean
  /** Icon to display before children */
  leftIcon?: React.ReactNode
  /** Icon to display after children */
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { buttonVariants }
