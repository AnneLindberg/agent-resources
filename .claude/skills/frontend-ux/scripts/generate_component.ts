#!/usr/bin/env npx ts-node

/**
 * Generate Component Script
 * Creates a new component with TypeScript types, CVA variants, and test file
 * 
 * Usage: npx ts-node generate_component.ts ComponentName
 */

import * as fs from 'fs'
import * as path from 'path'

const componentName = process.argv[2]

if (!componentName) {
  console.error('Usage: npx ts-node generate_component.ts ComponentName')
  process.exit(1)
}

const componentDir = path.join(process.cwd(), 'src', 'components', 'ui', componentName)

// Component template
const componentTemplate = `import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const ${componentName.toLowerCase()}Variants = cva(
  [
    'inline-flex items-center justify-center',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default: 'bg-neutral-100 text-neutral-900',
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface ${componentName}Props
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${componentName.toLowerCase()}Variants> {}

export const ${componentName} = forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(${componentName.toLowerCase()}Variants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
${componentName}.displayName = '${componentName}'

export { ${componentName.toLowerCase()}Variants }
`

// Test template
const testTemplate = `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ${componentName} } from './${componentName}'

describe('${componentName}', () => {
  it('renders correctly', () => {
    render(<${componentName}>Content</${componentName}>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    render(<${componentName} variant="primary">Content</${componentName}>)
    const element = screen.getByText('Content')
    expect(element).toHaveClass('bg-primary-500')
  })

  it('applies size classes', () => {
    render(<${componentName} size="lg">Content</${componentName}>)
    const element = screen.getByText('Content')
    expect(element).toHaveClass('h-12')
  })

  it('merges custom className', () => {
    render(<${componentName} className="custom-class">Content</${componentName}>)
    expect(screen.getByText('Content')).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<${componentName} ref={ref}>Content</${componentName}>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
`

// Index export template
const indexTemplate = `export * from './${componentName}'
`

// Create directory and files
try {
  fs.mkdirSync(componentDir, { recursive: true })
  
  fs.writeFileSync(
    path.join(componentDir, `${componentName}.tsx`),
    componentTemplate
  )
  
  fs.writeFileSync(
    path.join(componentDir, `${componentName}.test.tsx`),
    testTemplate
  )
  
  fs.writeFileSync(
    path.join(componentDir, 'index.ts'),
    indexTemplate
  )

  console.log(`✅ Created ${componentName} component:`)
  console.log(`   ${componentDir}/${componentName}.tsx`)
  console.log(`   ${componentDir}/${componentName}.test.tsx`)
  console.log(`   ${componentDir}/index.ts`)
  console.log('')
  console.log(`📝 Don't forget to add export to src/components/ui/index.ts:`)
  console.log(`   export * from './${componentName}'`)
} catch (error) {
  console.error('Error creating component:', error)
  process.exit(1)
}
