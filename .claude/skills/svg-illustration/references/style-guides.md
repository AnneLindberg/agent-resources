# Style Guides

Detailed examples for each illustration style.

---

## Cute / Kawaii Style

Friendly, approachable, and expressive characters.

### Key Characteristics
- **Shapes**: Rounded, soft, organic
- **Proportions**: Large heads, small bodies (chibi-like)
- **Colors**: Pastels or bright, saturated colors
- **Faces**: Simple but expressive (dot eyes, curved mouths)
- **Details**: Blush marks, shine spots, small accessories

### Color Palettes

**Soft Pastels**
```
Primary:   #FFB5B5 (soft pink)
Secondary: #B5E5FF (soft blue)  
Accent:    #FFE5B5 (soft yellow)
Dark:      #5A5A5A (soft black)
```

**Bright & Cheerful**
```
Primary:   #FF6B6B (coral red)
Secondary: #4ECDC4 (teal)
Accent:    #FFE66D (yellow)
Dark:      #2D1810 (warm black)
```

### Face Expressions

```xml
<!-- Happy -->
<g id="happy-face">
  <ellipse cx="20" cy="20" rx="3" ry="4" fill="#2D1810"/>  <!-- Left eye -->
  <ellipse cx="40" cy="20" rx="3" ry="4" fill="#2D1810"/>  <!-- Right eye -->
  <circle cx="21" cy="18" r="1" fill="white"/>             <!-- Eye shine -->
  <circle cx="41" cy="18" r="1" fill="white"/>             <!-- Eye shine -->
  <ellipse cx="12" cy="28" rx="5" ry="3" fill="#FFB5B5" opacity="0.6"/>  <!-- Blush -->
  <ellipse cx="48" cy="28" rx="5" ry="3" fill="#FFB5B5" opacity="0.6"/>  <!-- Blush -->
  <path d="M22 32 Q30 40 38 32" stroke="#2D1810" stroke-width="2" fill="none"/>  <!-- Smile -->
</g>

<!-- Excited -->
<g id="excited-face">
  <circle cx="20" cy="20" r="5" fill="#2D1810"/>  <!-- Big eyes -->
  <circle cx="40" cy="20" r="5" fill="#2D1810"/>
  <circle cx="22" cy="18" r="2" fill="white"/>    <!-- Eye shine -->
  <circle cx="42" cy="18" r="2" fill="white"/>
  <ellipse cx="30" cy="35" rx="8" ry="6" fill="#2D1810"/>  <!-- Open mouth -->
  <ellipse cx="30" cy="33" rx="6" ry="3" fill="#FF9999"/>  <!-- Tongue -->
</g>

<!-- Sleepy -->
<g id="sleepy-face">
  <path d="M15 20 L25 20" stroke="#2D1810" stroke-width="2"/>  <!-- Closed eyes -->
  <path d="M35 20 L45 20" stroke="#2D1810" stroke-width="2"/>
  <path d="M25 32 Q30 35 35 32" stroke="#2D1810" stroke-width="2" fill="none"/>  <!-- Small smile -->
</g>
```

### Example: Kawaii Tomato

```xml
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <!-- Leaf -->
  <ellipse cx="26" cy="10" rx="8" ry="5" fill="#6B8E23" transform="rotate(-30 26 10)"/>
  <ellipse cx="38" cy="10" rx="8" ry="5" fill="#6B8E23" transform="rotate(30 38 10)"/>
  <!-- Stem -->
  <rect x="30" y="6" width="4" height="10" rx="2" fill="#4A7C23"/>
  <!-- Body -->
  <ellipse cx="32" cy="40" rx="26" ry="22" fill="#FF6347"/>
  <!-- Highlight -->
  <ellipse cx="20" cy="32" rx="8" ry="5" fill="#FF7F6B" opacity="0.5"/>
  <!-- Face -->
  <ellipse cx="22" cy="40" rx="4" ry="5" fill="#2D1810"/>
  <ellipse cx="42" cy="40" rx="4" ry="5" fill="#2D1810"/>
  <circle cx="24" cy="38" r="2" fill="white"/>
  <circle cx="44" cy="38" r="2" fill="white"/>
  <ellipse cx="14" cy="48" rx="5" ry="3" fill="#FFB5B5" opacity="0.5"/>
  <ellipse cx="50" cy="48" rx="5" ry="3" fill="#FFB5B5" opacity="0.5"/>
  <path d="M26 52 Q32 58 38 52" stroke="#2D1810" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</svg>
```

---

## Flat / Minimal Style

Clean, professional, and highly legible at small sizes.

### Key Characteristics
- **Shapes**: Geometric, precise
- **Colors**: Limited palette (2-3 colors max)
- **Details**: Minimal, only essential elements
- **Strokes**: Consistent width, often stroke-only
- **Style**: No gradients, no shadows

### Color Palettes

**Monochrome**
```
Primary:   #1A1A2E (near black)
Secondary: #E5E5E5 (light gray)
Accent:    #4A90D9 (blue accent)
```

**Brand Colors**
```
Primary:   [Brand color]
Secondary: #FFFFFF (white)
Accent:    [Darker brand shade]
```

### Icon Guidelines

```xml
<!-- Use consistent stroke width -->
<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- Stroke-only approach -->
  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor"/>
  <path d="M12 8 L12 12 L16 12" fill="none" stroke="currentColor"/>
</svg>
```

### Example: Minimal Timer Icon

```xml
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="13" r="9" fill="none" stroke="#1A1A2E" stroke-width="2"/>
  <path d="M12 7 L12 13 L16 13" fill="none" stroke="#1A1A2E" stroke-width="2" stroke-linecap="round"/>
  <path d="M10 2 L14 2" stroke="#1A1A2E" stroke-width="2" stroke-linecap="round"/>
</svg>
```

---

## Hand-Drawn / Sketchy Style

Organic, playful, and personal feeling.

### Key Characteristics
- **Lines**: Imperfect, slightly wobbly
- **Strokes**: Variable width, hand-drawn feel
- **Fill**: Often unfilled or lightly textured
- **Style**: Charming imperfection

### Techniques

**Wobbly Lines**: Add slight variations to paths
```xml
<!-- Instead of perfect line -->
<path d="M10 50 L90 50"/>
<!-- Use slightly curved path -->
<path d="M10 50 Q30 48 50 51 Q70 49 90 50"/>
```

**Variable Stroke**: Use stroke-dasharray creatively
```xml
<path stroke-dasharray="0.5 2 3 2" stroke-linecap="round"/>
```

**Multiple Strokes**: Layer for texture
```xml
<g opacity="0.8">
  <path d="M10 50 Q50 48 90 50" stroke="#333" stroke-width="2"/>
  <path d="M10 52 Q50 54 90 52" stroke="#333" stroke-width="1" opacity="0.5"/>
</g>
```

### Example: Sketchy Checkbox

```xml
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <!-- Wobbly square -->
  <path d="M4 5 Q5 4 19 5 Q21 6 20 19 Q19 21 5 20 Q3 19 4 5" 
        fill="none" stroke="#333" stroke-width="2"/>
  <!-- Sketchy checkmark -->
  <path d="M7 12 Q8 13 10 15 Q14 10 17 7" 
        fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>
</svg>
```

---

## Geometric / Modern Style

Sharp, structured, and professional.

### Key Characteristics
- **Shapes**: Angular, precise geometry
- **Colors**: Bold, high contrast
- **Composition**: Grid-based, symmetrical
- **Style**: Often uses negative space

### Color Palettes

**Bold Contrast**
```
Primary:   #0D0D0D (black)
Secondary: #FFFFFF (white)
Accent:    #FF3366 (hot pink)
```

**Corporate**
```
Primary:   #1E3A5F (navy)
Secondary: #F5F5F5 (off-white)
Accent:    #00C2FF (cyan)
```

### Techniques

**Negative Space**
```xml
<svg viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#1E3A5F"/>
  <circle cx="50" cy="50" r="30" fill="#F5F5F5"/>
  <!-- Icon cut out of circle -->
  <path d="M40 50 L50 60 L65 40" fill="none" stroke="#1E3A5F" stroke-width="6"/>
</svg>
```

**Grid Alignment**
```xml
<!-- Everything on 4px grid -->
<rect x="8" y="8" width="32" height="32"/>  <!-- Positions divisible by 4 -->
```

### Example: Geometric Profile Icon

```xml
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="48" height="48" fill="#1E3A5F"/>
  <!-- Head (geometric circle) -->
  <circle cx="24" cy="18" r="10" fill="#F5F5F5"/>
  <!-- Body (geometric arc) -->
  <path d="M8 48 Q8 32 24 32 Q40 32 40 48" fill="#F5F5F5"/>
</svg>
```

---

## Quick Reference

| Style | Shapes | Colors | Details | Best For |
|-------|--------|--------|---------|----------|
| Kawaii | Rounded | Bright/Pastel | Faces, blush | Mascots, fun apps |
| Minimal | Geometric | 2-3 colors | Essential only | Icons, UI |
| Sketchy | Organic | Any | Texture | Creative, personal |
| Geometric | Angular | Bold | Negative space | Corporate, modern |
