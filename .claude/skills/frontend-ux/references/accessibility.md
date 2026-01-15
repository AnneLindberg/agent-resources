# Accessibility (A11y) Guide

Building inclusive interfaces that work for everyone.

---

## WCAG 2.1 Overview

Web Content Accessibility Guidelines define three conformance levels:

| Level | Requirement | Target |
|-------|-------------|--------|
| **A** | Minimum | Essential accessibility |
| **AA** | Standard | Most common requirement |
| **AAA** | Enhanced | Maximum accessibility |

**Target AA compliance** for most projects.

---

## Four Principles (POUR)

### 1. Perceivable
Users can perceive the content.

### 2. Operable
Users can operate the interface.

### 3. Understandable
Users can understand the content and interface.

### 4. Robust
Content works with current and future technologies.

---

## Color & Contrast

### Contrast Ratios

| Element | AA Requirement | AAA Requirement |
|---------|---------------|-----------------|
| Normal text (< 18px) | 4.5:1 | 7:1 |
| Large text (≥ 18px bold, ≥ 24px) | 3:1 | 4.5:1 |
| UI components, graphics | 3:1 | 3:1 |

### Testing Tools

- Chrome DevTools → Accessibility panel
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Figma plugins: Stark, A11y - Color Contrast Checker

### Implementation

```tsx
// ✅ Good contrast
<p className="text-neutral-700 bg-white">
  4.5:1+ contrast ratio
</p>

// ❌ Poor contrast
<p className="text-neutral-400 bg-white">
  Only 2.6:1 - fails AA
</p>
```

### Don't Rely on Color Alone

```tsx
// ❌ Color only
<span className="text-red-500">Error</span>

// ✅ Color + icon + text
<span className="text-red-500 flex items-center gap-1">
  <AlertCircle className="w-4 h-4" aria-hidden="true" />
  Error: Invalid input
</span>
```

---

## Keyboard Navigation

### Focus Management

All interactive elements must be keyboard accessible:

```tsx
// ✅ Visible focus states
<button className="
  focus:outline-none 
  focus-visible:ring-2 
  focus-visible:ring-primary-500 
  focus-visible:ring-offset-2
">
  Focusable button
</button>

// Custom focus for dark backgrounds
<a className="
  focus-visible:ring-2 
  focus-visible:ring-white 
  focus-visible:ring-offset-2 
  focus-visible:ring-offset-neutral-900
">
  Link on dark
</a>
```

### Tab Order

```tsx
// Natural tab order (follows DOM)
<form>
  <input name="first" />  {/* Tab 1 */}
  <input name="last" />   {/* Tab 2 */}
  <button type="submit">Submit</button>  {/* Tab 3 */}
</form>

// Skip navigation link
<a 
  href="#main-content" 
  className="
    sr-only focus:not-sr-only 
    focus:absolute focus:top-4 focus:left-4
    focus:bg-white focus:p-4 focus:z-50
  "
>
  Skip to main content
</a>
```

### Focus Trap (Modals)

```tsx
import { useEffect, useRef } from 'react'

export function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const modal = modalRef.current
    const focusableElements = modal?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements?.[0] as HTMLElement
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement

    // Focus first element
    firstElement?.focus()

    // Trap focus
    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement?.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement?.focus()
      }
    }

    // Close on Escape
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleTab)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleTab)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {children}
    </div>
  )
}
```

---

## Semantic HTML

### Use Proper Elements

```tsx
// ✅ Semantic
<button onClick={handleClick}>Submit</button>
<a href="/page">Go to page</a>
<nav>Navigation</nav>
<main>Main content</main>
<article>Article</article>
<aside>Sidebar</aside>

// ❌ Non-semantic (avoid)
<div onClick={handleClick}>Submit</div>
<span onClick={navigateTo}>Go to page</span>
```

### Heading Hierarchy

```tsx
// ✅ Proper hierarchy
<h1>Page Title</h1>
<section>
  <h2>Section Title</h2>
  <h3>Subsection</h3>
</section>

// ❌ Skipped levels
<h1>Title</h1>
<h4>Jumped to H4</h4>
```

### Landmark Regions

```tsx
<body>
  <header>Site header</header>
  <nav aria-label="Main navigation">Nav links</nav>
  <main id="main-content">
    <article>Primary content</article>
    <aside>Related content</aside>
  </main>
  <footer>Site footer</footer>
</body>
```

---

## ARIA Attributes

### When to Use ARIA

1. **First**: Use native HTML elements
2. **Second**: Use ARIA to enhance if needed
3. **Never**: Use ARIA to fix broken HTML

### Common ARIA Patterns

#### Buttons with Icons Only

```tsx
<button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>

<button aria-label="Add to favorites">
  <HeartIcon aria-hidden="true" />
</button>
```

#### Expandable Content

```tsx
const [isOpen, setIsOpen] = useState(false)

<button
  aria-expanded={isOpen}
  aria-controls="dropdown-menu"
  onClick={() => setIsOpen(!isOpen)}
>
  Menu
</button>

<ul id="dropdown-menu" hidden={!isOpen}>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

#### Live Regions (Announcements)

```tsx
// Announce dynamic content
<div role="status" aria-live="polite">
  {successMessage}
</div>

// Urgent announcements
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

#### Progress Indicators

```tsx
<div 
  role="progressbar" 
  aria-valuenow={75} 
  aria-valuemin={0} 
  aria-valuemax={100}
  aria-label="Upload progress"
>
  75%
</div>
```

---

## Form Accessibility

### Labels

```tsx
// ✅ Explicit label
<label htmlFor="email">Email address</label>
<input id="email" type="email" />

// ✅ Implicit label (wrapping)
<label>
  Email address
  <input type="email" />
</label>

// ❌ No label
<input type="email" placeholder="Email" />
```

### Error Messages

```tsx
<div>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-describedby="email-error"
    aria-invalid={!!error}
  />
  {error && (
    <p id="email-error" role="alert" className="text-error-500 text-sm mt-1">
      {error}
    </p>
  )}
</div>
```

### Required Fields

```tsx
<label htmlFor="name">
  Name <span aria-hidden="true" className="text-error-500">*</span>
  <span className="sr-only">(required)</span>
</label>
<input id="name" required aria-required="true" />
```

### Fieldsets for Related Inputs

```tsx
<fieldset>
  <legend>Shipping Address</legend>
  <input name="street" aria-label="Street address" />
  <input name="city" aria-label="City" />
  <input name="zip" aria-label="ZIP code" />
</fieldset>
```

---

## Screen Reader Utilities

### Visually Hidden (sr-only)

```tsx
// Tailwind's sr-only class
<span className="sr-only">Opens in new window</span>

// Custom implementation
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Usage Examples

```tsx
// Icon-only button with screen reader text
<button>
  <span className="sr-only">Delete item</span>
  <TrashIcon aria-hidden="true" />
</button>

// Additional context for links
<a href="/settings">
  Settings
  <span className="sr-only">for your account</span>
</a>
```

---

## Images & Media

### Alt Text

```tsx
// Informative images
<img src="/chart.png" alt="Sales grew 25% in Q4 2024" />

// Decorative images
<img src="/decoration.svg" alt="" aria-hidden="true" />

// Complex images
<figure>
  <img src="/chart.png" alt="Quarterly sales chart" aria-describedby="chart-desc" />
  <figcaption id="chart-desc">
    Q1: $10M, Q2: $12M, Q3: $11M, Q4: $15M
  </figcaption>
</figure>
```

### Video & Audio

```tsx
<video controls>
  <source src="/video.mp4" type="video/mp4" />
  <track kind="captions" src="/captions.vtt" srclang="en" label="English" />
</video>
```

---

## Reduced Motion

### Respecting Preferences

```tsx
// CSS approach
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

// Tailwind
<div className="motion-safe:animate-bounce motion-reduce:animate-none">
  Animated element
</div>
```

### React Hook

```tsx
import { useReducedMotion } from 'framer-motion'

function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Content
    </motion.div>
  )
}
```

---

## Testing Checklist

### Manual Testing

- [ ] Navigate entire page with keyboard only
- [ ] Test with screen reader (VoiceOver, NVDA, JAWS)
- [ ] Check color contrast ratios
- [ ] Verify at 200% zoom
- [ ] Test with reduced motion enabled
- [ ] Verify focus states are visible

### Automated Tools

- **axe DevTools** - Browser extension
- **Lighthouse** - Built into Chrome DevTools
- **eslint-plugin-jsx-a11y** - Linting rules
- **jest-axe** - Testing library

### eslint-plugin-jsx-a11y Setup

```bash
npm install eslint-plugin-jsx-a11y --save-dev
```

```javascript
// .eslintrc.js
module.exports = {
  extends: ['plugin:jsx-a11y/recommended'],
  plugins: ['jsx-a11y'],
}
```

### jest-axe Testing

```tsx
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('Button has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

---

## Best Practices

### Do's

✅ Use semantic HTML first  
✅ Provide visible focus indicators  
✅ Write descriptive alt text  
✅ Ensure 4.5:1 contrast for text  
✅ Test with keyboard and screen reader  

### Don'ts

❌ Remove focus outlines without replacement  
❌ Use color as the only indicator  
❌ Trap keyboard focus unintentionally  
❌ Auto-play audio/video  
❌ Skip heading levels  
