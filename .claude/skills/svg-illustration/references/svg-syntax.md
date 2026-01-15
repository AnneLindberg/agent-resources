# SVG Syntax Reference

Detailed reference for creating SVG illustrations.

---

## Basic Elements

### Rectangle
```xml
<rect x="10" y="10" width="80" height="60" rx="5" ry="5" fill="#FF6B6B"/>
```
- `x`, `y`: Position
- `width`, `height`: Dimensions
- `rx`, `ry`: Corner radius (for rounded rectangles)

### Circle
```xml
<circle cx="50" cy="50" r="40" fill="#4ECDC4"/>
```
- `cx`, `cy`: Center position
- `r`: Radius

### Ellipse
```xml
<ellipse cx="50" cy="50" rx="40" ry="25" fill="#FFE66D"/>
```
- `cx`, `cy`: Center position
- `rx`, `ry`: Horizontal and vertical radius

### Line
```xml
<line x1="10" y1="10" x2="90" y2="90" stroke="#333" stroke-width="2"/>
```
- `x1`, `y1`: Start point
- `x2`, `y2`: End point

### Polygon
```xml
<polygon points="50,10 90,90 10,90" fill="#9B5DE5"/>
```
- `points`: List of x,y coordinates

### Polyline
```xml
<polyline points="10,10 50,50 90,10" fill="none" stroke="#333" stroke-width="2"/>
```
- Like polygon but doesn't auto-close

---

## Path Element

The most powerful and flexible element.

### Commands

| Command | Name | Parameters | Example |
|---------|------|------------|---------|
| M | Move to | x, y | `M 10 20` |
| L | Line to | x, y | `L 50 50` |
| H | Horizontal line | x | `H 80` |
| V | Vertical line | y | `V 30` |
| C | Cubic bezier | x1,y1 x2,y2 x,y | `C 20,20 40,20 50,10` |
| Q | Quadratic bezier | x1,y1 x,y | `Q 25,25 50,50` |
| A | Arc | rx,ry rot large-arc sweep x,y | `A 25,25 0 0,1 50,50` |
| Z | Close path | - | `Z` |

Lowercase = relative coordinates (from current point)

### Example: Heart Shape
```xml
<path d="M 50 30 
         C 50 20, 40 10, 25 10 
         C 10 10, 0 25, 0 40 
         C 0 60, 20 80, 50 100 
         C 80 80, 100 60, 100 40 
         C 100 25, 90 10, 75 10 
         C 60 10, 50 20, 50 30 Z" 
      fill="#FF6B6B"/>
```

---

## Styling

### Fill
```xml
<rect fill="#FF6B6B"/>
<rect fill="rgb(255, 107, 107)"/>
<rect fill="hsl(0, 100%, 71%)"/>
<rect fill="url(#gradient)"/>
<rect fill="none"/>
```

### Stroke
```xml
<path 
  stroke="#333"
  stroke-width="2"
  stroke-linecap="round"    <!-- butt | round | square -->
  stroke-linejoin="round"   <!-- miter | round | bevel -->
  stroke-dasharray="5,3"    <!-- dash pattern -->
  stroke-opacity="0.5"
/>
```

### Opacity
```xml
<rect opacity="0.5"/>           <!-- Whole element -->
<rect fill-opacity="0.5"/>      <!-- Fill only -->
<rect stroke-opacity="0.5"/>    <!-- Stroke only -->
```

---

## Gradients

### Linear Gradient
```xml
<defs>
  <linearGradient id="sunset" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#FF6B6B"/>
    <stop offset="100%" stop-color="#FFE66D"/>
  </linearGradient>
</defs>
<rect fill="url(#sunset)"/>
```

### Radial Gradient
```xml
<defs>
  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="white"/>
    <stop offset="100%" stop-color="#FF6B6B"/>
  </radialGradient>
</defs>
<circle fill="url(#glow)"/>
```

---

## Transforms

```xml
<!-- Applied to any element or group -->
<g transform="translate(10, 20)">...</g>
<g transform="rotate(45, 50, 50)">...</g>   <!-- rotate around point -->
<g transform="scale(1.5)">...</g>
<g transform="scale(1.5, 2)">...</g>        <!-- non-uniform -->
<g transform="skewX(10)">...</g>

<!-- Combined -->
<g transform="translate(50, 50) rotate(45) scale(0.5)">...</g>
```

---

## Groups and Reuse

### Groups
```xml
<g id="face" fill="#333">
  <circle cx="25" cy="50" r="5"/>  <!-- Left eye -->
  <circle cx="75" cy="50" r="5"/>  <!-- Right eye -->
</g>
```

### Defs (Definitions for reuse)
```xml
<defs>
  <circle id="dot" r="5" fill="#333"/>
</defs>
<use href="#dot" x="25" y="50"/>
<use href="#dot" x="75" y="50"/>
```

### Symbols
```xml
<symbol id="icon-star" viewBox="0 0 24 24">
  <path d="..."/>
</symbol>
<use href="#icon-star" x="0" y="0" width="24" height="24"/>
```

---

## Clipping and Masking

### Clip Path
```xml
<defs>
  <clipPath id="circle-clip">
    <circle cx="50" cy="50" r="40"/>
  </clipPath>
</defs>
<image href="photo.jpg" clip-path="url(#circle-clip)"/>
```

### Mask
```xml
<defs>
  <mask id="fade-mask">
    <rect width="100" height="100" fill="url(#fade-gradient)"/>
  </mask>
</defs>
<rect mask="url(#fade-mask)"/>
```

---

## Filters

### Drop Shadow
```xml
<defs>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.3"/>
  </filter>
</defs>
<rect filter="url(#shadow)"/>
```

### Blur
```xml
<defs>
  <filter id="blur">
    <feGaussianBlur stdDeviation="3"/>
  </filter>
</defs>
```

---

## Animation (CSS)

```xml
<style>
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  .animated {
    animation: pulse 2s ease-in-out infinite;
    transform-origin: center;
  }
</style>
<circle class="animated" cx="50" cy="50" r="20"/>
```

---

## Optimization Tips

1. **Simplify paths**: Remove unnecessary points
2. **Use shapes**: `<circle>` is smaller than a circular `<path>`
3. **Remove metadata**: Editor adds unnecessary data
4. **Limit precision**: `12.34` not `12.3456789`
5. **Combine paths**: Multiple paths can often be one
6. **Use CSS**: External styles for repeated patterns
7. **Minify**: Remove whitespace for production
