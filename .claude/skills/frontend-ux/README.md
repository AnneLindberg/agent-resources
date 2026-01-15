# Frontend UX/UI Development Skill

A comprehensive frontend development skill for creating beautiful, accessible, and performant user interfaces using TypeScript, React (Vite), and Tailwind CSS.

## The Problem

Creating beautiful UIs isn't just about making things "look good." It requires:
- Consistent design systems
- Accessible components
- Responsive layouts
- Smooth animations
- Performance optimization

## What This Skill Does

This skill enables Claude to build and review frontend interfaces across four pillars:

### 1. Design Systems
Foundation for consistent interfaces:
- Design tokens (colors, spacing, typography)
- Tailwind CSS configuration
- Component variants with `class-variance-authority`
- Dark mode support

### 2. Component Architecture
Scalable patterns for React:
- TypeScript-first development
- Composable component patterns
- Custom hooks for reusable logic
- Testing strategies with Vitest/Testing Library

### 3. Accessibility (A11y)
WCAG 2.1 AA compliance:
- Keyboard navigation
- Screen reader support
- Focus management
- ARIA attributes

### 4. Animation & Polish
Delightful interactions:
- Framer Motion patterns
- Tailwind transitions
- Reduced motion support
- Loading states and skeletons

## 8-Phase Workflow

1. **Requirements & Context** - Understand design goals
2. **Design System Foundation** - Establish tokens and primitives
3. **Component Architecture** - Plan component structure
4. **Responsive Strategy** - Define breakpoint behavior
5. **Accessibility Audit** - Ensure WCAG compliance
6. **Animation & Interaction** - Add polish and delight
7. **Implementation** - Build the components
8. **Review & Optimization** - Performance and polish

## Usage

```
/frontend-ux                              # Start frontend development
/frontend-ux create a button component   # Create new component
/frontend-ux audit this form             # Accessibility audit
/frontend-ux add animation               # Animation implementation
/frontend-ux design system setup         # Configure design system
/frontend-ux responsive layout           # Mobile-first layout
```

## Included Tools

### TypeScript Scripts

| Script | Purpose |
|--------|---------|
| `generate_component.ts` | Scaffold new component with types |
| `audit_accessibility.ts` | Check for WCAG violations |
| `analyze_bundle.ts` | Review bundle size |
| `generate_tokens.ts` | Generate design token files |
| `extract_colors.ts` | Extract colors from design file |
| `contrast_check.ts` | Check color contrast ratios |

### Templates

- **Component templates** - Button, Card, Input, Modal, etc.
- **Layout templates** - Container, Grid, Stack, Sidebar
- **Pattern templates** - Forms, Tables, Navigation

## Project Structure

```
frontend-ux/
├── SKILL.md                    # Main skill workflow
├── README.md                   # This file
├── references/
│   ├── design-system.md        # Design tokens guide
│   ├── component-patterns.md   # React component patterns
│   ├── responsive-design.md    # Mobile-first strategies
│   ├── accessibility.md        # WCAG compliance guide
│   ├── animation.md            # Motion design principles
│   ├── performance.md          # Core Web Vitals optimization
│   └── output-template.md      # Deliverable templates
├── scripts/
│   ├── generate_component.ts
│   ├── audit_accessibility.ts
│   ├── analyze_bundle.ts
│   ├── generate_tokens.ts
│   ├── extract_colors.ts
│   └── contrast_check.ts
└── assets/
    └── templates/
        ├── components/
        │   ├── Button.tsx
        │   ├── Card.tsx
        │   ├── Input.tsx
        │   └── Modal.tsx
        ├── layouts/
        │   ├── Container.tsx
        │   ├── Grid.tsx
        │   └── Stack.tsx
        └── config/
            ├── tailwind.config.ts
            └── tokens.ts
```

## Key Patterns

### Component Variants (CVA)

```tsx
const buttonVariants = cva('base-styles', {
  variants: {
    variant: { primary: '...', secondary: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})
```

### Composition Pattern

```tsx
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>Content</Card.Content>
</Card>
```

### Accessibility Pattern

```tsx
<button
  type="button"
  aria-label="Close dialog"
  aria-pressed={isPressed}
>
  <XIcon aria-hidden="true" />
</button>
```

## Quick Reference

### Color Contrast (WCAG AA)

| Type | Ratio |
|------|-------|
| Normal text | 4.5:1 |
| Large text | 3:1 |
| UI components | 3:1 |

### Animation Durations

| Type | Duration |
|------|----------|
| Micro-interactions | 100-200ms |
| UI transitions | 200-300ms |
| Page transitions | 300-500ms |

### Breakpoints

| Name | Width | Use Case |
|------|-------|----------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |

## Installation

This skill is designed for use with Claude. To use it:

1. Place the `frontend-ux/` folder in your `.claude/skills/` directory
2. Invoke with `/frontend-ux` or related triggers

## Triggers

The skill activates on:
- "create UI"
- "design component"
- "responsive layout"
- "accessibility audit"
- "animation"
- "design system"
- "UX review"
- "UI patterns"
- Explicit `/frontend-ux`

## Technology Stack

- **TypeScript** - Type safety
- **React 18+** - Component framework
- **Vite** - Build tool
- **Tailwind CSS 3+** - Styling
- **Framer Motion** - Animations
- **class-variance-authority** - Component variants
- **Radix UI / Headless UI** - Accessible primitives
- **Vitest + Testing Library** - Testing

## License

Part of the agent-resources skill collection.
