# Output Templates

Templates for frontend development deliverables.

---

## Component Audit Report

```markdown
# Component Audit: [Component Name]

## Overview
- **Component**: [Name]
- **Location**: `src/components/[path]`
- **Audit Date**: [Date]

## Accessibility Score: [X/10]

### Issues Found

| Priority | Issue | Location | Recommendation |
|----------|-------|----------|----------------|
| 🔴 Critical | Missing label | Line 45 | Add `aria-label` or visible label |
| 🟡 Medium | Low contrast | Button text | Increase contrast to 4.5:1 |
| 🟢 Low | Missing focus ring | Hover state | Add `focus-visible:ring-2` |

### Detailed Findings

#### 1. [Issue Title]
**Severity**: Critical / Medium / Low
**Location**: `Component.tsx:45`

**Current Code**:
```tsx
// Current implementation
```

**Recommended Fix**:
```tsx
// Fixed implementation
```

**Why This Matters**: [Explanation]

---

## Recommendations Summary

### Critical (Fix Immediately)
- [ ] Issue 1

### Medium (Fix Soon)
- [ ] Issue 2

### Low (Nice to Have)
- [ ] Issue 3

---

## Resources
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Component Patterns Reference](./references/component-patterns.md)
```

---

## New Component Template

```tsx
// components/ui/[ComponentName].tsx
import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * [ComponentName] - Brief description of the component
 * 
 * @example
 * ```tsx
 * <ComponentName variant="primary" size="md">
 *   Content
 * </ComponentName>
 * ```
 */

const componentVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ComponentNameProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  /** Optional: Description of this prop */
  customProp?: string
}

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant, size, customProp, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
ComponentName.displayName = 'ComponentName'

export { componentVariants }
```

---

## Component Test Template

```tsx
// components/ui/[ComponentName].test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { ComponentName } from './ComponentName'

expect.extend(toHaveNoViolations)

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName>Content</ComponentName>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    render(<ComponentName variant="secondary">Content</ComponentName>)
    const element = screen.getByText('Content')
    expect(element).toHaveClass('bg-neutral-100')
  })

  it('applies size classes', () => {
    render(<ComponentName size="lg">Content</ComponentName>)
    const element = screen.getByText('Content')
    expect(element).toHaveClass('h-12')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<ComponentName ref={ref}>Content</ComponentName>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('merges custom className', () => {
    render(<ComponentName className="custom-class">Content</ComponentName>)
    expect(screen.getByText('Content')).toHaveClass('custom-class')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<ComponentName>Content</ComponentName>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  describe('interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(<ComponentName onClick={handleClick}>Content</ComponentName>)
      await user.click(screen.getByText('Content'))
      
      expect(handleClick).toHaveBeenCalledOnce()
    })
  })
})
```

---

## Design System Documentation

```markdown
# [Project] Design System

## Colors

### Primary
| Token | Hex | Use |
|-------|-----|-----|
| `primary.50` | #eff6ff | Backgrounds |
| `primary.500` | #3b82f6 | Buttons, links |
| `primary.600` | #2563eb | Hover states |

### Neutral
| Token | Hex | Use |
|-------|-----|-----|
| `neutral.50` | #fafafa | Page backgrounds |
| `neutral.500` | #71717a | Muted text |
| `neutral.900` | #18181b | Headings |

### Semantic
| Token | Hex | Use |
|-------|-----|-----|
| `success.500` | #22c55e | Success states |
| `warning.500` | #f59e0b | Warning states |
| `error.500` | #ef4444 | Error states |

---

## Typography

### Scale
| Name | Size | Weight | Use |
|------|------|--------|-----|
| Display | 48px | Bold | Hero headlines |
| H1 | 36px | Bold | Page titles |
| H2 | 30px | Semibold | Section headers |
| Body | 16px | Regular | Paragraphs |
| Small | 14px | Regular | Helper text |

### Font Family
- **Sans**: Inter, system-ui, sans-serif
- **Mono**: JetBrains Mono, monospace

---

## Spacing

8-point grid system:

| Token | Pixels | Use |
|-------|--------|-----|
| `space-1` | 4px | Tight element spacing |
| `space-2` | 8px | Element spacing |
| `space-4` | 16px | Component spacing |
| `space-8` | 32px | Section spacing |
| `space-16` | 64px | Page sections |

---

## Components

### Button
Variants: `primary`, `secondary`, `ghost`, `destructive`
Sizes: `sm`, `md`, `lg`

### Card
Variants: `default`, `bordered`, `elevated`

### Input
States: `default`, `focus`, `error`, `disabled`

---

## Usage

```tsx
import { Button, Card, Input } from '@/components/ui'

<Button variant="primary" size="md">
  Click me
</Button>
```
```

---

## UI Review Checklist

```markdown
# UI Review Checklist: [Feature/Component]

## Visual Design
- [ ] Follows design system tokens
- [ ] Proper spacing using 8-pt grid
- [ ] Typography hierarchy is clear
- [ ] Color contrast meets AA (4.5:1)
- [ ] Consistent rounded corners
- [ ] Appropriate shadows/elevation

## Responsiveness
- [ ] Mobile layout (320px)
- [ ] Tablet layout (768px)
- [ ] Desktop layout (1024px+)
- [ ] Touch targets ≥ 44px on mobile
- [ ] No horizontal scrolling

## Accessibility
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Focus states visible
- [ ] Keyboard navigable
- [ ] Screen reader tested
- [ ] Color not only indicator

## Interactions
- [ ] Hover states present
- [ ] Active/pressed states
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Animations respect prefers-reduced-motion

## Performance
- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] No layout shift (CLS < 0.1)
- [ ] Fast interactions (INP < 200ms)

## Code Quality
- [ ] TypeScript types complete
- [ ] No console errors
- [ ] Tests passing
- [ ] No unused imports
```

---

## Implementation Summary

```markdown
# Implementation Summary: [Feature Name]

## What Was Built
Brief description of the feature/component.

## Files Changed

### New Files
- `src/components/ui/NewComponent.tsx` - Component implementation
- `src/components/ui/NewComponent.test.tsx` - Tests

### Modified Files
- `src/components/ui/index.ts` - Added export
- `src/styles/globals.css` - Added new animations

## Key Decisions

### Design Choices
1. **[Decision]**: [Rationale]
2. **[Decision]**: [Rationale]

### Technical Choices
1. **Used CVA for variants**: Enables type-safe variant management
2. **forwardRef pattern**: Allows consumers to access DOM element

## Testing
- Unit tests: ✅ Passing
- Accessibility: ✅ No violations
- Cross-browser: ✅ Chrome, Firefox, Safari

## Usage Example

```tsx
import { NewComponent } from '@/components/ui'

<NewComponent variant="primary" size="md">
  Content here
</NewComponent>
```

## Known Limitations
- [Any limitations or future improvements]

## Related PRs/Issues
- Related to #123
- Closes #456
```
