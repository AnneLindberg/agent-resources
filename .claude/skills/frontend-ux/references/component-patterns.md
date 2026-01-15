# React Component Patterns

This guide covers TypeScript-first React component patterns for building scalable, maintainable UI libraries.

---

## Core Principles

1. **Type Safety** - Leverage TypeScript for better DX and fewer bugs
2. **Composition** - Build complex UIs from simple primitives
3. **Accessibility** - Bake a11y into every component
4. **Customization** - Allow style overrides without breaking functionality

---

## Basic Component Structure

### Simple Component

```tsx
// components/ui/Badge.tsx
import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error'
}

export function Badge({
  variant = 'default',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-neutral-100 text-neutral-800': variant === 'default',
          'bg-green-100 text-green-800': variant === 'success',
          'bg-yellow-100 text-yellow-800': variant === 'warning',
          'bg-red-100 text-red-800': variant === 'error',
        },
        className
      )}
      {...props}
    />
  )
}
```

---

## ForwardRef Pattern

Use `forwardRef` when users need DOM access:

```tsx
// components/ui/Input.tsx
import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm',
          'placeholder:text-neutral-400',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-error-500 focus-visible:ring-error-500',
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'
```

---

## Class Variance Authority (CVA)

For components with multiple variants:

```tsx
// components/ui/Button.tsx
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles (always applied)
  [
    'inline-flex items-center justify-center rounded-md font-medium',
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
          'border-2 border-neutral-300 bg-transparent',
          'hover:bg-neutral-100',
          'focus-visible:ring-neutral-500',
        ],
        ghost: [
          'bg-transparent',
          'hover:bg-neutral-100',
          'focus-visible:ring-neutral-500',
        ],
        destructive: [
          'bg-error-500 text-white',
          'hover:bg-error-600',
          'focus-visible:ring-error-500',
        ],
        link: [
          'text-primary-500 underline-offset-4',
          'hover:underline',
          'focus-visible:ring-primary-500',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'

// Export variants for external use
export { buttonVariants }
```

---

## Compound Component Pattern

For complex, related components:

```tsx
// components/ui/Card.tsx
import { createContext, useContext, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Context for potential shared state
const CardContext = createContext<{ variant?: string }>({})

// Root component
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated'
}

function CardRoot({ variant = 'default', className, ...props }: CardProps) {
  return (
    <CardContext.Provider value={{ variant }}>
      <div
        className={cn(
          'rounded-xl bg-white',
          {
            'border border-neutral-200': variant === 'default' || variant === 'bordered',
            'shadow-lg': variant === 'elevated',
          },
          className
        )}
        {...props}
      />
    </CardContext.Provider>
  )
}

// Sub-components
function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-neutral-500', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props} />
  )
}

function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
}

// Attach sub-components
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
})
```

### Usage

```tsx
<Card variant="elevated">
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description text</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Card content goes here</p>
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

---

## Polymorphic Component Pattern

Components that can render as different elements:

```tsx
// components/ui/Box.tsx
import { forwardRef, type ElementType, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type BoxProps<T extends ElementType = 'div'> = {
  as?: T
  className?: string
} & ComponentPropsWithoutRef<T>

type BoxComponent = <T extends ElementType = 'div'>(
  props: BoxProps<T> & { ref?: React.Ref<Element> }
) => React.ReactElement | null

export const Box: BoxComponent = forwardRef(function Box<T extends ElementType = 'div'>(
  { as, className, ...props }: BoxProps<T>,
  ref: React.Ref<Element>
) {
  const Component = as || 'div'
  return <Component ref={ref} className={cn(className)} {...props} />
})
```

### Usage

```tsx
<Box as="section" className="py-8">Section content</Box>
<Box as="article" className="prose">Article content</Box>
<Box as="button" onClick={handleClick}>Button</Box>
```

---

## Slot Pattern (Radix-inspired)

For maximum composition flexibility:

```tsx
// components/ui/Slot.tsx
import { Children, cloneElement, isValidElement, type ReactNode, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
}

export function Slot({ children, ...props }: SlotProps) {
  if (isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      ...children.props,
      className: cn(props.className, children.props.className),
    })
  }
  
  if (Children.count(children) > 1) {
    Children.only(null) // This will throw
  }
  
  return null
}

// Usage in Button
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants(), className)}
        {...props}
      />
    )
  }
)
```

### Usage

```tsx
// As button (default)
<Button>Click me</Button>

// As link (asChild)
<Button asChild>
  <a href="/page">Go to page</a>
</Button>
```

---

## Custom Hook Patterns

### useToggle

```tsx
import { useState, useCallback } from 'react'

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  
  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  
  return [value, { toggle, setTrue, setFalse }] as const
}
```

### useDisclosure (for modals, menus)

```tsx
import { useState, useCallback } from 'react'

export function useDisclosure(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen)
  
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen(v => !v), [])
  
  return { isOpen, open, close, toggle }
}
```

### useMediaQuery

```tsx
import { useState, useEffect } from 'react'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

// Preset hooks
export const useIsMobile = () => useMediaQuery('(max-width: 639px)')
export const useIsTablet = () => useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
```

---

## Utility Functions

### cn (className merge)

```tsx
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### createContext with default

```tsx
import { createContext, useContext } from 'react'

export function createSafeContext<T>(defaultValue?: T) {
  const Context = createContext<T | undefined>(defaultValue)
  
  function useContextSafe() {
    const value = useContext(Context)
    if (value === undefined) {
      throw new Error('useContext must be used within a Provider')
    }
    return value
  }
  
  return [Context.Provider, useContextSafe] as const
}
```

---

## Component Organization

### File Structure

```
components/
├── ui/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── index.ts          # Barrel exports
├── patterns/
│   ├── SearchBar/
│   ├── DataTable/
│   └── index.ts
└── index.ts
```

### Barrel Exports

```tsx
// components/ui/index.ts
export * from './Button'
export * from './Card'
export * from './Input'
// ...

// Usage
import { Button, Card, Input } from '@/components/ui'
```

---

## Best Practices

### Do's

✅ Use `forwardRef` for all DOM-wrapping components  
✅ Extend HTML attributes for native props  
✅ Support `className` for customization  
✅ Use CVA for variant management  
✅ Co-locate tests with components  

### Don'ts

❌ Hardcode styles without className support  
❌ Create overly-specific components  
❌ Nest too many compound components  
❌ Forget displayName for forwardRef components  
❌ Mix styling approaches (inline + Tailwind + CSS)  
