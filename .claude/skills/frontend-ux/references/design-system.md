# Design System Guide

Establishing a consistent design foundation is critical for scalable UI development. This reference covers design tokens, Tailwind configuration, and theme management.

---

## Design Tokens

Design tokens are the atomic values that define your visual language. They ensure consistency across your entire application.

### Why Tokens?

| Without Tokens | With Tokens |
|----------------|-------------|
| `#3b82f6` scattered everywhere | `colors.primary.500` |
| Magic numbers in spacing | `spacing.md` (16px) |
| Inconsistent font sizes | `fontSize.lg` |
| Hard-to-update styles | Single source of truth |

---

## Token Structure

### Colors

```typescript
export const colors = {
  // Brand colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',  // Base
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  
  // Neutral (grayscale)
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },
  
  // Semantic colors
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },
}
```

### Semantic Color Usage

| Token | Use Case |
|-------|----------|
| `primary.500` | Primary buttons, links, focus rings |
| `primary.600` | Primary hover states |
| `neutral.50` | Page backgrounds (light mode) |
| `neutral.900` | Page backgrounds (dark mode) |
| `neutral.700` | Body text |
| `neutral.500` | Muted text, placeholders |
| `success.500` | Success messages, checkmarks |
| `error.500` | Error messages, destructive actions |

---

### Spacing

8-point grid system for consistent rhythm:

```typescript
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
}
```

### Spacing Guidelines

| Use Case | Token | Pixels |
|----------|-------|--------|
| Element spacing (tight) | `space-1` to `space-2` | 4-8px |
| Element spacing (normal) | `space-3` to `space-4` | 12-16px |
| Section spacing | `space-8` to `space-12` | 32-48px |
| Page sections | `space-16` to `space-24` | 64-96px |

---

### Typography

```typescript
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],       // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],      // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],    // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],     // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],// 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px
    '5xl': ['3rem', { lineHeight: '1' }],          // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }],       // 60px
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
}
```

### Typography Scale

| Element | Size | Weight | Use |
|---------|------|--------|-----|
| Display | `5xl`-`6xl` | Bold | Hero headlines |
| H1 | `4xl` | Bold | Page titles |
| H2 | `3xl` | Semibold | Section headers |
| H3 | `2xl` | Semibold | Subsections |
| H4 | `xl` | Medium | Card titles |
| Body | `base` | Normal | Paragraphs |
| Small | `sm` | Normal | Helper text, labels |
| Caption | `xs` | Normal | Captions, timestamps |

---

### Border Radius

```typescript
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
}
```

### Radius Guidelines

| Component | Radius |
|-----------|--------|
| Buttons | `md` to `lg` |
| Cards | `lg` to `xl` |
| Inputs | `md` |
| Pills/Tags | `full` |
| Avatars | `full` |
| Modals | `xl` to `2xl` |

---

### Shadows

```typescript
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
}
```

---

## Tailwind Configuration

### Complete Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Add other colors...
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config
```

---

## Dark Mode

### Implementation

```tsx
// Theme toggle component
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const stored = localStorage.getItem('theme')
    
    if (stored === 'dark' || (!stored && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggle = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'light' : 'dark')
  }

  return (
    <button onClick={toggle} aria-label="Toggle theme">
      {isDark ? '🌙' : '☀️'}
    </button>
  )
}
```

### Dark Mode Utilities

```tsx
// Component with dark mode support
<div className="
  bg-white text-neutral-900
  dark:bg-neutral-900 dark:text-neutral-100
">
  <p className="text-neutral-600 dark:text-neutral-400">
    Muted text
  </p>
</div>
```

---

## CSS Custom Properties

For runtime theme switching:

```css
/* globals.css */
:root {
  --color-primary: 59 130 246; /* RGB values */
  --color-background: 255 255 255;
  --color-foreground: 9 9 11;
}

.dark {
  --color-primary: 96 165 250;
  --color-background: 9 9 11;
  --color-foreground: 250 250 250;
}
```

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      background: 'rgb(var(--color-background) / <alpha-value>)',
      foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
    },
  },
}
```

---

## Best Practices

### Do's

✅ Use semantic token names (`primary`, `error`) not color names (`blue`, `red`)  
✅ Start with design tokens before writing CSS  
✅ Use the 8-point grid for spacing  
✅ Design for dark mode from the start  
✅ Keep color palette limited (3-5 primary shades)  

### Don'ts

❌ Use magic numbers (`padding: 13px`)  
❌ Create one-off colors inline  
❌ Mix design systems (Tailwind + custom + Bootstrap)  
❌ Forget hover/focus/active states  
❌ Ignore accessible color contrast  
