import { createContext, useContext, forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Card Component
 * 
 * A compound component for content containers with header, content, and footer.
 * 
 * @example
 * ```tsx
 * <Card variant="elevated">
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *     <Card.Description>Card description text</Card.Description>
 *   </Card.Header>
 *   <Card.Content>
 *     <p>Card content goes here</p>
 *   </Card.Content>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 */

const cardVariants = cva(
  [
    'rounded-xl bg-white',
    'transition-shadow duration-200',
  ],
  {
    variants: {
      variant: {
        default: 'border border-neutral-200',
        bordered: 'border-2 border-neutral-300',
        elevated: 'shadow-lg hover:shadow-xl',
        ghost: 'bg-transparent',
      },
      padding: {
        none: '',
        sm: '[&>*]:p-4',
        md: '[&>*]:p-6',
        lg: '[&>*]:p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
)

// Context for card configuration
interface CardContextValue {
  variant?: 'default' | 'bordered' | 'elevated' | 'ghost'
}

const CardContext = createContext<CardContextValue>({})

// Root Card component
export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

function CardRoot({ className, variant, padding, ...props }: CardProps) {
  return (
    <CardContext.Provider value={{ variant: variant ?? 'default' }}>
      <div
        className={cn(cardVariants({ variant, padding, className }))}
        {...props}
      />
    </CardContext.Provider>
  )
}

// Card Header
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5', className)}
      {...props}
    />
  )
}

// Card Title
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

function CardTitle({ className, as: Component = 'h3', ...props }: CardTitleProps) {
  return (
    <Component
      className={cn(
        'text-xl font-semibold leading-none tracking-tight text-neutral-900',
        className
      )}
      {...props}
    />
  )
}

// Card Description
interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn('text-sm text-neutral-500', className)}
      {...props}
    />
  )
}

// Card Content
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div className={cn('pt-0', className)} {...props} />
  )
}

// Card Footer
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn('flex items-center pt-0', className)}
      {...props}
    />
  )
}

// Card Image
interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'video' | 'square' | 'wide'
}

function CardImage({ 
  className, 
  aspectRatio = 'video',
  alt = '',
  ...props 
}: CardImageProps) {
  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
  }

  return (
    <div className={cn('relative overflow-hidden rounded-t-xl', aspectClasses[aspectRatio])}>
      <img
        className={cn('absolute inset-0 h-full w-full object-cover', className)}
        alt={alt}
        {...props}
      />
    </div>
  )
}

// Compose Card with sub-components
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
  Image: CardImage,
})

export { cardVariants }
