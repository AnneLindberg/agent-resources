# Performance Optimization Guide

Building fast, efficient React applications.

---

## Core Web Vitals

### The Three Metrics

| Metric | Target | What It Measures |
|--------|--------|------------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Loading performance |
| **INP** (Interaction to Next Paint) | < 200ms | Interactivity |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Visual stability |

### Measuring

```tsx
// Using web-vitals library
import { onLCP, onINP, onCLS } from 'web-vitals'

onLCP(console.log)
onINP(console.log)
onCLS(console.log)
```

---

## Bundle Size Optimization

### Analyze Bundle

```bash
# Vite
npx vite-bundle-visualizer

# Create React App
npm run build -- --stats
npx webpack-bundle-analyzer build/bundle-stats.json
```

### Code Splitting

```tsx
// Route-based splitting
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  )
}
```

### Dynamic Imports

```tsx
// Load heavy component on demand
const HeavyChart = lazy(() => import('./components/HeavyChart'))

function Dashboard() {
  const [showChart, setShowChart] = useState(false)

  return (
    <>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </>
  )
}
```

### Tree Shaking

```tsx
// ❌ Imports entire library
import _ from 'lodash'
_.debounce(fn, 300)

// ✅ Imports only what's needed
import debounce from 'lodash/debounce'
debounce(fn, 300)

// ✅ Or use a smaller alternative
import { debounce } from 'lodash-es'
```

---

## React Performance

### Avoiding Re-renders

```tsx
// useMemo for expensive computations
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name))
}, [items])

// useCallback for stable function references
const handleClick = useCallback((id: string) => {
  setSelectedId(id)
}, [])

// memo for component memoization
const ExpensiveList = memo(function ExpensiveList({ items }) {
  return items.map(item => <Item key={item.id} {...item} />)
})
```

### When NOT to Optimize

```tsx
// ❌ Premature optimization
const handleClick = useCallback(() => {
  setCount(c => c + 1)
}, []) // Simple state update, no need for useCallback

// ✅ Only optimize when there's a measurable problem
// Use React DevTools Profiler first
```

### Keys Best Practices

```tsx
// ❌ Using index as key (causes bugs with reordering)
{items.map((item, index) => <Item key={index} {...item} />)}

// ✅ Using stable, unique identifier
{items.map(item => <Item key={item.id} {...item} />)}
```

### Virtualization for Long Lists

```tsx
import { useVirtualizer } from '@tanstack/react-virtual'

function VirtualList({ items }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // row height
  })

  return (
    <div ref={parentRef} className="h-[400px] overflow-auto">
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: virtualRow.start,
              height: virtualRow.size,
            }}
          >
            {items[virtualRow.index].content}
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## Image Optimization

### Modern Formats

```tsx
<picture>
  <source srcSet="/image.avif" type="image/avif" />
  <source srcSet="/image.webp" type="image/webp" />
  <img src="/image.jpg" alt="Description" />
</picture>
```

### Lazy Loading

```tsx
// Native lazy loading
<img src="/image.jpg" loading="lazy" alt="Description" />

// With aspect ratio to prevent CLS
<div className="aspect-video relative">
  <img 
    src="/image.jpg" 
    loading="lazy"
    className="absolute inset-0 w-full h-full object-cover"
    alt="Description"
  />
</div>
```

### Responsive Images

```tsx
<img
  src="/hero-800.jpg"
  srcSet="
    /hero-400.jpg 400w,
    /hero-800.jpg 800w,
    /hero-1200.jpg 1200w
  "
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
  alt="Hero image"
/>
```

### Placeholder Strategies

```tsx
// Blur placeholder
<div className="relative">
  <img 
    src="/placeholder-blur.jpg" 
    className="absolute inset-0 blur-lg scale-110"
    aria-hidden="true"
  />
  <img 
    src="/actual-image.jpg" 
    loading="lazy"
    onLoad={(e) => e.currentTarget.previousSibling.remove()}
  />
</div>

// Skeleton placeholder
<div className="aspect-video bg-neutral-200 animate-pulse" />
```

---

## CSS Performance

### Tailwind Optimization

```typescript
// tailwind.config.ts - Purge unused CSS
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // Tailwind v3 automatically purges in production
}
```

### Avoid Expensive Selectors

```css
/* ❌ Expensive */
.parent * { }
.item:nth-child(odd) { }

/* ✅ Direct class names */
.child { }
.item-odd { }
```

### contain Property

```css
/* Isolate layout/paint/style calculations */
.card {
  contain: layout style paint;
}

/* For offscreen content */
.offscreen-section {
  content-visibility: auto;
  contain-intrinsic-size: 500px; /* estimated height */
}
```

---

## Font Optimization

### Preload Critical Fonts

```html
<link 
  rel="preload" 
  href="/fonts/inter-var.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin 
/>
```

### Font Display

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-display: swap; /* Show fallback, then swap */
}
```

### Subset Fonts

```css
/* Only Latin characters */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153;
}
```

---

## Network Optimization

### Preconnect to Origins

```html
<link rel="preconnect" href="https://api.example.com" />
<link rel="dns-prefetch" href="https://api.example.com" />
```

### Prefetch Likely Navigation

```tsx
// Prefetch on hover
<Link 
  to="/dashboard" 
  onMouseEnter={() => prefetchRoute('/dashboard')}
>
  Dashboard
</Link>
```

### Data Fetching Patterns

```tsx
// Parallel fetching
const [user, posts] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
])

// React Query/TanStack Query for caching
const { data } = useQuery({
  queryKey: ['user', id],
  queryFn: () => fetchUser(id),
  staleTime: 5 * 60 * 1000, // 5 minutes
})
```

---

## Animation Performance

### GPU-Accelerated Properties

```tsx
// ✅ Smooth (composite-only)
<div className="transition-transform hover:translate-x-4" />
<div className="transition-opacity hover:opacity-50" />

// ❌ Janky (triggers layout)
<div className="transition-all hover:ml-4" />
<div className="transition-all hover:w-64" />
```

### will-change (Use Sparingly)

```tsx
// Only on elements about to animate
<div className="will-change-transform hover:scale-105">
  Optimized for animation
</div>
```

---

## Monitoring & Debugging

### React DevTools Profiler

1. Open React DevTools → Profiler tab
2. Click record, interact with app, stop recording
3. Look for components with long render times
4. Use "Highlight updates" to see re-renders

### Performance API

```tsx
// Measure specific operations
performance.mark('fetch-start')
await fetchData()
performance.mark('fetch-end')
performance.measure('fetch-duration', 'fetch-start', 'fetch-end')

// Log all measures
const measures = performance.getEntriesByType('measure')
console.log(measures)
```

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
- name: Lighthouse
  uses: treosh/lighthouse-ci-action@v10
  with:
    urls: |
      https://example.com/
      https://example.com/dashboard
    budgetPath: ./budget.json
```

---

## Performance Budget

### Example Budget

```json
{
  "resourceSizes": [
    { "resourceType": "script", "budget": 200 },
    { "resourceType": "stylesheet", "budget": 50 },
    { "resourceType": "image", "budget": 500 },
    { "resourceType": "total", "budget": 1000 }
  ],
  "timings": [
    { "metric": "first-contentful-paint", "budget": 1500 },
    { "metric": "largest-contentful-paint", "budget": 2500 },
    { "metric": "interactive", "budget": 3000 }
  ]
}
```

---

## Best Practices

### Do's

✅ Measure before optimizing  
✅ Use production builds for testing  
✅ Code split routes and heavy components  
✅ Lazy load images below the fold  
✅ Use system fonts as fallback  

### Don'ts

❌ Premature optimization  
❌ useMemo/useCallback everywhere  
❌ Block main thread with heavy JS  
❌ Load unused JavaScript  
❌ Use large unoptimized images  
