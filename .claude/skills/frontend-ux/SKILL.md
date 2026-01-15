---
name: frontend-ux
description: Comprehensive frontend development skill focusing on beautiful, accessible UX/UI design using TypeScript, React (Vite), and Tailwind CSS. Covers design systems, component architecture, responsive design, accessibility, animations, performance, and modern UI patterns. Triggers include "create UI", "design component", "responsive layout", "accessibility audit", "animation", "design system", "UX review", "UI patterns", or explicit "/frontend-ux".
---

# Frontend UX/UI Development Skill

Comprehensive frontend development focusing on creating beautiful, accessible, and performant user interfaces using modern web technologies.

## Technology Stack

- **TypeScript** - Type-safe development
- **React** - Component-based architecture (with Vite for fast development)
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Radix UI / Headless UI** - Accessible primitives

---

## Core Principles

### 1. Design-First Thinking
Beautiful interfaces start with intentional design decisions, not code.

### 2. Accessibility by Default
Every component should be keyboard navigable and screen-reader friendly.

### 3. Performance Matters
Fast load times and smooth interactions are UX features.

### 4. Consistency is Key
Design systems ensure visual and behavioral consistency.

---

## Workflow Overview

Execute these 8 phases:
1. **Requirements & Context** - Understand the design goals
2. **Design System Foundation** - Establish tokens and primitives
3. **Component Architecture** - Plan component structure
4. **Responsive Strategy** - Define breakpoint behavior
5. **Accessibility Audit** - Ensure WCAG compliance
6. **Animation & Interaction** - Add polish and delight
7. **Implementation** - Build the components
8. **Review & Optimization** - Performance and polish

---

## Phase 1: Requirements & Context

**Goal**: Understand what you're building and for whom.

### Mode Selection

**Audit Mode** - Reviewing existing UI:
- User provides component or page
- Output: UX/accessibility issues, improvement recommendations

**Creation Mode** - Building new UI:
- User provides design brief or requirements
- Output: Fully implemented, accessible components

### Context Gathering

Gather:
- Target users and their context
- Brand guidelines (if any)
- Device/viewport requirements
- Accessibility requirements (WCAG level)
- Performance budgets

---

## Phase 2: Design System Foundation

**Goal**: Establish the visual language.

**Read**: `references/design-system.md` for detailed guidance.

### Design Tokens

```typescript
// tokens.ts
export const tokens = {
  colors: {
    // Semantic color naming
    primary: {
      50: '#eff6ff',  // Lightest
      500: '#3b82f6', // Base
      900: '#1e3a8a', // Darkest
    },
    neutral: { /* grayscale */ },
    success: { /* greens */ },
    warning: { /* oranges */ },
    error: { /* reds */ },
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    },
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
}
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { tokens } from './tokens'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.fontSize,
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.shadows,
    },
  },
  plugins: [],
} satisfies Config
```

---

## Phase 3: Component Architecture

**Goal**: Structure components for reusability and maintainability.

**Read**: `references/component-patterns.md` for detailed guidance.

### Component Hierarchy

```
src/
├── components/
│   ├── ui/              # Primitive components (Button, Input, Card)
│   ├── patterns/        # Composite patterns (SearchBar, DataTable)
│   ├── layouts/         # Layout components (Container, Grid, Stack)
│   └── features/        # Feature-specific (UserProfile, Dashboard)
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and helpers
└── styles/              # Global styles and tokens
```

### Component Template

```tsx
// components/ui/Button.tsx
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
        ghost: 'hover:bg-neutral-100',
        destructive: 'bg-error-500 text-white hover:bg-error-600',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
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
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
)
Button.displayName = 'Button'
```

### Composition Pattern

```tsx
// Compound component pattern
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>Content here</Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

---

## Phase 4: Responsive Strategy

**Goal**: Define how layouts adapt across screen sizes.

**Read**: `references/responsive-design.md` for detailed guidance.

### Breakpoint System

```typescript
// Tailwind default breakpoints
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
}
```

### Mobile-First Approach

```tsx
// Always start with mobile styles, then add larger breakpoints
<div className="
  grid 
  grid-cols-1        /* Mobile: single column */
  sm:grid-cols-2     /* Tablet: two columns */
  lg:grid-cols-3     /* Desktop: three columns */
  xl:grid-cols-4     /* Large: four columns */
  gap-4
">
```

### Container Patterns

```tsx
// Responsive container with max-width
<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Responsive Typography

```tsx
// Fluid typography
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>
```

---

## Phase 5: Accessibility Audit

**Goal**: Ensure WCAG 2.1 AA compliance.

**Read**: `references/accessibility.md` for detailed guidance.

### WCAG Checklist

#### Perceivable
- [ ] Color contrast ratios meet AA (4.5:1 text, 3:1 large text)
- [ ] Images have descriptive alt text
- [ ] Focus states are visible
- [ ] Content is readable at 200% zoom

#### Operable
- [ ] All interactive elements are keyboard accessible
- [ ] Focus order is logical
- [ ] No keyboard traps
- [ ] Skip links for navigation

#### Understandable
- [ ] Error messages are clear and helpful
- [ ] Form inputs have visible labels
- [ ] Language is declared in HTML
- [ ] Consistent navigation patterns

#### Robust
- [ ] Valid HTML structure
- [ ] ARIA attributes used correctly
- [ ] Works with assistive technologies

### Accessible Component Patterns

```tsx
// Accessible button
<button
  type="button"
  aria-label="Close dialog"
  aria-pressed={isPressed}
  onClick={handleClick}
>
  <XIcon aria-hidden="true" />
</button>

// Accessible form field
<div>
  <label htmlFor="email" className="block text-sm font-medium">
    Email
  </label>
  <input
    id="email"
    type="email"
    aria-describedby="email-hint email-error"
    aria-invalid={!!error}
    className="..."
  />
  <p id="email-hint" className="text-sm text-neutral-500">
    We'll never share your email
  </p>
  {error && (
    <p id="email-error" role="alert" className="text-sm text-error-500">
      {error}
    </p>
  )}
</div>
```

---

## Phase 6: Animation & Interaction

**Goal**: Add polish through thoughtful motion.

**Read**: `references/animation.md` for detailed guidance.

### Animation Principles

1. **Purpose** - Animation should serve UX, not distract
2. **Duration** - 150-300ms for UI, 300-500ms for emphasis
3. **Easing** - Use natural curves, not linear
4. **Reduce Motion** - Respect user preferences

### Tailwind Transitions

```tsx
// Simple transitions
<button className="transition-colors duration-200 hover:bg-primary-600">
  Hover me
</button>

// Transform transitions
<div className="transition-transform duration-300 hover:scale-105">
  Scale on hover
</div>
```

### Framer Motion Patterns

```tsx
import { motion } from 'framer-motion'

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
>
  Content
</motion.div>

// Staggered list
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

<motion.ul variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

### Reduced Motion Support

```tsx
// Hook for respecting user preferences
import { useReducedMotion } from 'framer-motion'

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Respects motion preferences
    </motion.div>
  )
}

// CSS approach
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Phase 7: Implementation

**Goal**: Build the components following best practices.

### File Naming Conventions

```
components/
├── ui/
│   ├── Button.tsx          # PascalCase for components
│   ├── Button.test.tsx     # Co-located tests
│   └── index.ts            # Barrel exports
├── hooks/
│   └── useMediaQuery.ts    # camelCase with use prefix
└── lib/
    └── cn.ts               # camelCase for utilities
```

### Component Checklist

Before shipping a component, verify:

- [ ] TypeScript types are complete and exported
- [ ] Props are documented with JSDoc comments
- [ ] Component supports `className` prop for customization
- [ ] `forwardRef` is used for DOM element access
- [ ] Accessibility attributes are present
- [ ] Focus states are visible
- [ ] Responsive behavior is tested
- [ ] Dark mode is supported (if applicable)

### Testing Strategy

```tsx
// Component test structure
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('supports disabled state', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

---

## Phase 8: Review & Optimization

**Goal**: Polish and optimize for production.

**Read**: `references/performance.md` for detailed guidance.

### Performance Checklist

- [ ] Images are optimized (WebP, lazy loading)
- [ ] Bundle size is reasonable (< 200KB initial)
- [ ] Code splitting is implemented for routes
- [ ] Fonts are preloaded
- [ ] CSS is purged of unused styles
- [ ] Core Web Vitals are green

### Code Review Focus Areas

1. **Consistency** - Does it match design system?
2. **Accessibility** - Keyboard nav, screen reader friendly?
3. **Performance** - Any unnecessary re-renders?
4. **Responsiveness** - Works on all breakpoints?
5. **Edge Cases** - Empty states, loading, errors?

### Final Polish

- [ ] Add loading skeletons
- [ ] Implement error boundaries
- [ ] Add empty state designs
- [ ] Test with real content (not lorem ipsum)
- [ ] Cross-browser testing

---

## UI Patterns Library

### Common Patterns

| Pattern | Use Case |
|---------|----------|
| Modal/Dialog | Focused actions, confirmations |
| Drawer/Sidebar | Navigation, filters, additional context |
| Toast/Notification | Feedback messages |
| Dropdown/Menu | Action menus, selection |
| Tabs | Content organization |
| Accordion | Collapsible content |
| Data Table | Structured data display |
| Form | User input collection |
| Card | Content containers |
| Skeleton | Loading states |

### Pattern Implementation

**Run**: `scripts/generate_component.ts` to scaffold components.

---

## Quick Reference

### Color Contrast

| Level | Normal Text | Large Text |
|-------|-------------|------------|
| AA | 4.5:1 | 3:1 |
| AAA | 7:1 | 4.5:1 |

### Animation Durations

| Type | Duration |
|------|----------|
| Micro-interactions | 100-200ms |
| UI transitions | 200-300ms |
| Page transitions | 300-500ms |
| Complex animations | 500-1000ms |

### Z-Index Scale

```typescript
const zIndex = {
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
}
```

---

## Scripts Reference

| Script | Purpose |
|--------|---------|
| `generate_component.ts` | Scaffold new component with types |
| `audit_accessibility.ts` | Check for WCAG violations |
| `analyze_bundle.ts` | Review bundle size |
| `generate_tokens.ts` | Generate design token files |
| `extract_colors.ts` | Extract colors from design file |
| `contrast_check.ts` | Check color contrast ratios |
