# Responsive Design Guide

Mobile-first, flexible layouts that work across all screen sizes.

---

## Core Philosophy

**Mobile-First**: Start with mobile styles, then add complexity for larger screens.

```tsx
// ✅ Mobile-first approach
<div className="text-sm md:text-base lg:text-lg">
  Scales up with screen size
</div>

// ❌ Desktop-first (avoid)
<div className="text-lg md:text-base sm:text-sm">
  Harder to maintain
</div>
```

---

## Breakpoint System

### Tailwind Defaults

| Breakpoint | Min Width | Target Devices |
|------------|-----------|----------------|
| `sm` | 640px | Mobile landscape, large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops, desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Ultra-wide displays |

### Usage Pattern

```tsx
// Stack on mobile, side-by-side on desktop
<div className="flex flex-col lg:flex-row gap-4">
  <aside className="w-full lg:w-64">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```

---

## Layout Patterns

### Container

Centered content with max-width and responsive padding:

```tsx
// components/layouts/Container.tsx
interface ContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export function Container({ 
  children, 
  size = 'lg',
  className 
}: ContainerProps) {
  const maxWidths = {
    sm: 'max-w-2xl',     // 672px
    md: 'max-w-4xl',     // 896px
    lg: 'max-w-6xl',     // 1152px
    xl: 'max-w-7xl',     // 1280px
    full: 'max-w-full',
  }

  return (
    <div 
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        maxWidths[size],
        className
      )}
    >
      {children}
    </div>
  )
}
```

### Responsive Grid

```tsx
// Auto-fit grid that adapts to content
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// CSS Grid auto-fit pattern
<div className="grid gap-4" style={{ 
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' 
}}>
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Stack (Vertical Spacing)

```tsx
// components/layouts/Stack.tsx
interface StackProps {
  children: React.ReactNode
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Stack({ children, gap = 'md', className }: StackProps) {
  const gaps = {
    xs: 'space-y-1',
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8',
  }

  return (
    <div className={cn('flex flex-col', gaps[gap], className)}>
      {children}
    </div>
  )
}
```

---

## Responsive Navigation

### Mobile Hamburger Pattern

```tsx
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="relative">
      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6">
        <NavLinks />
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
          <NavLinks mobile />
        </div>
      )}
    </nav>
  )
}
```

---

## Responsive Typography

### Fluid Type Scale

```tsx
// Headings that scale with viewport
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
  Hero Headline
</h1>

<h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
  Section Title
</h2>

// Body text that's readable on all devices
<p className="text-base md:text-lg leading-relaxed max-w-prose">
  Content that remains readable with optimal line length.
</p>
```

### Clamp for Fluid Sizing (CSS)

```css
/* globals.css */
.fluid-heading {
  font-size: clamp(2rem, 5vw, 4rem);
}

.fluid-body {
  font-size: clamp(1rem, 2vw, 1.25rem);
}
```

---

## Responsive Images

### Aspect Ratio Container

```tsx
// Fixed aspect ratio
<div className="aspect-video relative overflow-hidden rounded-lg">
  <img 
    src="/image.jpg" 
    alt="Description"
    className="absolute inset-0 w-full h-full object-cover"
  />
</div>

// Common ratios: aspect-square, aspect-video (16:9), aspect-[4/3]
```

### Responsive Image Sizing

```tsx
// Full width on mobile, constrained on desktop
<img
  src="/hero.jpg"
  alt="Hero image"
  className="w-full md:max-w-2xl mx-auto rounded-xl"
/>
```

### Art Direction (different images per breakpoint)

```tsx
<picture>
  <source media="(min-width: 1024px)" srcSet="/hero-desktop.jpg" />
  <source media="(min-width: 640px)" srcSet="/hero-tablet.jpg" />
  <img src="/hero-mobile.jpg" alt="Hero" className="w-full" />
</picture>
```

---

## Responsive Spacing

### Section Spacing

```tsx
// More breathing room on larger screens
<section className="py-12 sm:py-16 md:py-20 lg:py-24">
  <Container>Content here</Container>
</section>
```

### Component Spacing

```tsx
// Cards with responsive gap
<div className="grid gap-4 sm:gap-6 lg:gap-8">
  {/* cards */}
</div>

// Form with responsive spacing
<form className="space-y-4 sm:space-y-6">
  {/* fields */}
</form>
```

---

## Hiding/Showing Content

### Responsive Visibility

```tsx
// Only on mobile
<div className="block md:hidden">Mobile only</div>

// Only on desktop
<div className="hidden md:block">Desktop only</div>

// Hide on specific breakpoint
<div className="block sm:hidden md:block">
  Visible on mobile and desktop, hidden on tablet
</div>
```

### Content Truncation

```tsx
// Truncate on mobile, full on desktop
<p className="truncate md:whitespace-normal">
  Long text that gets truncated on small screens
</p>

// Line clamp
<p className="line-clamp-2 md:line-clamp-none">
  Multi-line text limited to 2 lines on mobile
</p>
```

---

## Touch-Friendly Design

### Touch Targets

Minimum 44x44px for interactive elements:

```tsx
// Good touch target
<button className="min-h-[44px] min-w-[44px] p-3">
  <Icon className="w-6 h-6" />
</button>

// Increased padding on mobile
<a className="py-3 px-4 sm:py-2 sm:px-3">
  Link
</a>
```

### Hover vs Touch

```tsx
// Hover only on devices that support it
<button className="
  bg-primary-500
  [@media(hover:hover)]:hover:bg-primary-600
  active:bg-primary-700
">
  Button
</button>
```

---

## Testing Responsive Layouts

### Viewport Testing Checklist

- [ ] 320px - Small phones (iPhone SE)
- [ ] 375px - Standard phones (iPhone)
- [ ] 414px - Large phones (iPhone Plus)
- [ ] 768px - Tablets portrait
- [ ] 1024px - Tablets landscape / laptops
- [ ] 1280px - Desktop
- [ ] 1920px - Large desktop

### useMediaQuery Hook

```tsx
import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
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

// Usage
function Component() {
  const isMobile = useMediaQuery('(max-width: 639px)')
  
  return isMobile ? <MobileView /> : <DesktopView />
}
```

---

## Common Patterns

### Responsive Table

```tsx
// Stack on mobile, table on desktop
<div className="overflow-x-auto">
  <table className="w-full min-w-[600px]">
    {/* Table content */}
  </table>
</div>

// Or: Card-based on mobile
<div className="hidden md:block">
  <Table />
</div>
<div className="md:hidden">
  {data.map(item => <MobileCard key={item.id} {...item} />)}
</div>
```

### Responsive Modal/Drawer

```tsx
// Full screen on mobile, centered modal on desktop
<div className="
  fixed inset-0 md:inset-auto 
  md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
  w-full md:max-w-lg md:rounded-xl
  bg-white
">
  {/* Modal content */}
</div>
```

### Responsive Form Layout

```tsx
<form className="space-y-6">
  {/* Full width on mobile, side-by-side on desktop */}
  <div className="grid gap-4 sm:grid-cols-2">
    <Input label="First Name" />
    <Input label="Last Name" />
  </div>
  
  {/* Always full width */}
  <Textarea label="Message" />
  
  {/* Right-aligned button on desktop */}
  <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
    <Button variant="secondary">Cancel</Button>
    <Button>Submit</Button>
  </div>
</form>
```

---

## Best Practices

### Do's

✅ Start mobile-first  
✅ Use semantic breakpoints (content dictates breakpoints)  
✅ Test on real devices  
✅ Consider touch interactions on mobile  
✅ Use `min-h-screen` for full-page layouts  

### Don'ts

❌ Hide important content on mobile  
❌ Use fixed pixel widths  
❌ Forget landscape orientation  
❌ Make touch targets smaller than 44px  
❌ Rely only on hover states  
