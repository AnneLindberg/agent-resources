# Animation & Motion Design Guide

Thoughtful motion that enhances UX without overwhelming users.

---

## Core Principles

### 1. Purpose Over Polish
Every animation should serve a UX goal:
- **Feedback** - Confirm user actions
- **Orientation** - Show spatial relationships
- **Focus** - Direct attention
- **Continuity** - Maintain context during changes

### 2. Subtle by Default
Animation should enhance, not distract.

### 3. Respect Preferences
Always support `prefers-reduced-motion`.

---

## Timing Guidelines

### Duration Scale

| Type | Duration | Use Case |
|------|----------|----------|
| Micro | 100-150ms | Button states, toggles |
| Fast | 150-200ms | Hovers, simple reveals |
| Normal | 200-300ms | Menus, panels |
| Slow | 300-500ms | Page transitions, modals |
| Deliberate | 500ms+ | Complex animations, emphasis |

### General Rules

- Small elements → faster animations
- Large movements → slower animations
- Entrance → slower than exit
- Keep total animation under 1 second

---

## Easing Functions

### Common Easing Curves

```tsx
// CSS
transition-timing-function: ease-out;     // Natural deceleration (most UI)
transition-timing-function: ease-in;      // Acceleration (exits)
transition-timing-function: ease-in-out;  // Symmetrical (looping)
transition-timing-function: linear;       // Constant (progress bars)

// Custom cubic-bezier
transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);  // Expressive ease-out
```

### Tailwind Easing

```tsx
<div className="transition-transform duration-200 ease-out hover:scale-105">
  Smooth scale
</div>
```

### When to Use Each

| Easing | Use Case |
|--------|----------|
| `ease-out` | Entrances, reveals, opening |
| `ease-in` | Exits, closing, hiding |
| `ease-in-out` | Move between states |
| `linear` | Progress, loading bars |

---

## Tailwind Transitions

### Basic Transitions

```tsx
// Color transition
<button className="
  bg-primary-500 
  transition-colors duration-200 
  hover:bg-primary-600
">
  Hover me
</button>

// Transform transition
<div className="
  transition-transform duration-300 ease-out
  hover:scale-105 hover:-translate-y-1
">
  Lift on hover
</div>

// Opacity transition
<div className="
  transition-opacity duration-200
  opacity-0 group-hover:opacity-100
">
  Fade in on parent hover
</div>
```

### Transition All Properties

```tsx
// Multiple properties
<div className="
  transition-all duration-200
  hover:bg-primary-100 hover:shadow-lg hover:scale-102
">
  Multi-property transition
</div>

// Specific properties (better performance)
<div className="
  transition-[transform,box-shadow] duration-200
  hover:scale-105 hover:shadow-lg
">
  Optimized transition
</div>
```

### Custom Animations

```typescript
// tailwind.config.ts
theme: {
  extend: {
    animation: {
      'fade-in': 'fadeIn 0.3s ease-out',
      'fade-out': 'fadeOut 0.2s ease-in',
      'slide-up': 'slideUp 0.3s ease-out',
      'slide-down': 'slideDown 0.3s ease-out',
      'scale-in': 'scaleIn 0.2s ease-out',
      'spin-slow': 'spin 3s linear infinite',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeOut: {
        '0%': { opacity: '1' },
        '100%': { opacity: '0' },
      },
      slideUp: {
        '0%': { transform: 'translateY(10px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      slideDown: {
        '0%': { transform: 'translateY(-10px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      scaleIn: {
        '0%': { transform: 'scale(0.95)', opacity: '0' },
        '100%': { transform: 'scale(1)', opacity: '1' },
      },
    },
  },
}
```

Usage:

```tsx
<div className="animate-fade-in">Fading in</div>
<div className="animate-slide-up">Sliding up</div>
```

---

## Framer Motion

### Basic Animations

```tsx
import { motion } from 'framer-motion'

// Simple fade
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  Content
</motion.div>

// Slide + fade
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  Content
</motion.div>
```

### AnimatePresence for Exit Animations

```tsx
import { AnimatePresence, motion } from 'framer-motion'

function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[50%] translate-y-[-50%] bg-white rounded-xl"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

### Staggered Children

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
}

function List({ items }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map(item => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.content}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

### Layout Animations

```tsx
// Automatic layout animation
<motion.div layout className="...">
  Content that can change size
</motion.div>

// Shared layout animation
<motion.div layoutId="shared-element">
  Animates between positions
</motion.div>
```

### Gesture Animations

```tsx
// Hover and tap
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.15 }}
>
  Interactive button
</motion.button>

// Drag
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300 }}
  dragElastic={0.2}
>
  Draggable element
</motion.div>
```

---

## Common Animation Patterns

### Loading States

```tsx
// Skeleton pulse
<div className="animate-pulse">
  <div className="h-4 bg-neutral-200 rounded w-3/4" />
  <div className="h-4 bg-neutral-200 rounded w-1/2 mt-2" />
</div>

// Spinner
<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
  <circle 
    className="opacity-25" 
    cx="12" cy="12" r="10" 
    stroke="currentColor" 
    strokeWidth="4"
    fill="none"
  />
  <path 
    className="opacity-75" 
    fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
  />
</svg>
```

### Notification Toast

```tsx
const toastVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
}

<motion.div
  variants={toastVariants}
  initial="hidden"
  animate="visible"
  exit="exit"
  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
>
  Toast message
</motion.div>
```

### Dropdown Menu

```tsx
const menuVariants = {
  hidden: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.15 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
}

<AnimatePresence>
  {isOpen && (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute top-full mt-2 bg-white shadow-lg rounded-lg"
    >
      {menuItems}
    </motion.div>
  )}
</AnimatePresence>
```

### Page Transitions

```tsx
// In your page component
const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

<motion.div
  variants={pageVariants}
  initial="initial"
  animate="animate"
  exit="exit"
  transition={{ duration: 0.3 }}
>
  Page content
</motion.div>
```

---

## Reduced Motion Support

### CSS Approach

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Tailwind Classes

```tsx
<div className="
  motion-safe:animate-bounce
  motion-reduce:animate-none
">
  Respects motion preferences
</div>
```

### Framer Motion Hook

```tsx
import { useReducedMotion } from 'framer-motion'

function AnimatedCard() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
    >
      Card content
    </motion.div>
  )
}
```

### Custom Hook

```tsx
import { useState, useEffect } from 'react'

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(query.matches)

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }, [])

  return prefersReducedMotion
}
```

---

## Performance Tips

### Hardware Acceleration

Only animate these properties for smooth 60fps:
- `transform` (translate, scale, rotate)
- `opacity`

```tsx
// ✅ GPU-accelerated
<div className="transition-transform hover:translate-x-2" />

// ❌ Triggers layout (avoid)
<div className="transition-all hover:ml-2" />
```

### will-change

```tsx
// Use sparingly - only on elements about to animate
<div className="will-change-transform hover:scale-105">
  Pre-optimized element
</div>
```

### Avoid Layout Thrashing

```tsx
// ❌ Animating width/height
<div className="transition-all hover:w-64" />

// ✅ Use transform instead
<div className="transition-transform origin-left hover:scale-x-150" />
```

---

## Best Practices

### Do's

✅ Keep animations under 500ms  
✅ Use `ease-out` for entrances  
✅ Animate `transform` and `opacity` only  
✅ Support `prefers-reduced-motion`  
✅ Use animation to guide attention  

### Don'ts

❌ Animate for decoration alone  
❌ Use long, distracting animations  
❌ Animate layout-triggering properties  
❌ Force animations on users  
❌ Block interaction during animations  
