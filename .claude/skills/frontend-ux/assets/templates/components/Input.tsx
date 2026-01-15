import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Input Component
 * 
 * A form input with label, helper text, and error states.
 * Fully accessible with proper ARIA attributes.
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="you@example.com"
 *   helperText="We'll never share your email"
 * />
 * 
 * <Input
 *   label="Password"
 *   type="password"
 *   error="Password must be at least 8 characters"
 * />
 * ```
 */

const inputVariants = cva(
  [
    'flex w-full rounded-md border bg-white px-3 py-2 text-sm',
    'placeholder:text-neutral-400',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-neutral-300',
          'focus-visible:border-primary-500 focus-visible:ring-primary-500',
        ],
        error: [
          'border-error-500',
          'focus-visible:border-error-500 focus-visible:ring-error-500',
        ],
      },
      inputSize: {
        sm: 'h-8 text-sm',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
)

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Label text displayed above the input */
  label?: string
  /** Helper text displayed below the input */
  helperText?: string
  /** Error message - also sets variant to error */
  error?: string
  /** Icon to display on the left side */
  leftIcon?: ReactNode
  /** Icon to display on the right side */
  rightIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const helperTextId = `${inputId}-helper`
    const errorId = `${inputId}-error`

    // Use error variant if error prop is provided
    const effectiveVariant = error ? 'error' : variant

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
            {label}
            {required && (
              <>
                <span aria-hidden="true" className="ml-1 text-error-500">*</span>
                <span className="sr-only">(required)</span>
              </>
            )}
          </label>
        )}

        {/* Input wrapper for icons */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={
              [
                helperText && helperTextId,
                error && errorId,
              ].filter(Boolean).join(' ') || undefined
            }
            className={cn(
              inputVariants({ variant: effectiveVariant, inputSize, className }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10'
            )}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Helper text */}
        {helperText && !error && (
          <p id={helperTextId} className="mt-1.5 text-sm text-neutral-500">
            {helperText}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p
            id={errorId}
            role="alert"
            className="mt-1.5 text-sm text-error-500"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { inputVariants }
