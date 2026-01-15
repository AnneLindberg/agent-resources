---
name: svg-illustration
description: Expert SVG illustration skill for creating custom icons, mascots, and UI graphics. Creates cute characters (tomatoes for pomodoro, avatars for profiles), decorative elements, and interface icons. ALWAYS asks user for style preferences before creating. Triggers include "create SVG", "icon for", "mascot", "illustration", "cute graphic", "UI icon", or explicit "/svg-illustration".
---

# SVG Illustration Skill

Expert at creating custom SVG illustrations, icons, mascots, and UI graphics for applications. Specializes in cute, expressive characters and clean interface elements.

---

## Important: User Consultation First

**ALWAYS ask the user before creating any SVG**. Gather:

1. **Purpose**: What is this SVG for? (icon, mascot, decoration, etc.)
2. **Style preference**: What aesthetic? (cute/kawaii, minimal, hand-drawn, geometric, etc.)
3. **Color palette**: Specific colors or match existing design system?
4. **Size/complexity**: Simple icon or detailed illustration?
5. **Output location**: Where should the SVG be saved?

Only proceed after user confirms preferences.

---

## Workflow Overview

Execute these 5 phases:
1. **Consultation** - Gather user requirements and preferences
2. **Style Selection** - Confirm aesthetic direction
3. **Creation** - Generate the SVG code
4. **Delivery** - Save to specified location
5. **Iteration** - Refine based on feedback

---

## Phase 1: Consultation

**Goal**: Understand exactly what the user needs.

### Required Questions

Ask ALL of these before proceeding:

```
1. What is the SVG for? (e.g., "tomato icon for pomodoro timer", "avatar for profile page")
2. What style would you prefer?
   - Cute/kawaii (rounded, expressive, friendly)
   - Flat/minimal (clean lines, simple shapes)
   - Hand-drawn/sketchy (organic, playful)
   - Geometric/modern (sharp, structured)
   - Other (describe)
3. Any specific colors? Or should I match your existing palette?
4. What size context? (small icon 24px, medium 48px, large illustration 200px+)
5. Where should I save the file? (folder path or component file)
```

### Context Gathering

Also note:
- Existing design system colors (if available)
- App theme (light/dark mode support needed?)
- Related icons that should match

---

## Phase 2: Style Selection

**Goal**: Confirm the visual direction with examples.

### Style Descriptions

#### Cute/Kawaii
- Rounded shapes, soft edges
- Expressive faces (dot eyes, simple smiles)
- Pastel or vibrant colors
- Friendly, approachable feel

**Best for**: Mascots, gamification elements, friendly apps

#### Flat/Minimal
- Clean geometric shapes
- Limited color palette (2-3 colors)
- No gradients or shadows
- Maximum clarity at small sizes

**Best for**: Navigation icons, toolbars, system UI

#### Hand-Drawn/Sketchy
- Organic, imperfect lines
- Stroke-based rather than filled
- Playful, casual feel
- Variable line weights

**Best for**: Creative apps, personal projects, illustrations

#### Geometric/Modern
- Sharp angles, precise shapes
- Bold colors, high contrast
- Structured, professional feel
- Often uses negative space

**Best for**: Corporate apps, dashboards, professional tools

---

## Phase 3: Creation

**Goal**: Generate the SVG code.

### SVG Best Practices

#### Structure
```xml
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 [width] [height]"
  width="[size]"
  height="[size]"
  aria-label="[description for accessibility]"
  role="img"
>
  <!-- Group related elements -->
  <g id="[element-name]">
    <!-- SVG content -->
  </g>
</svg>
```

#### Optimization Rules
- Use `viewBox` for scalability
- Prefer `<path>` over multiple basic shapes when smaller
- Remove unnecessary attributes (editor metadata)
- Use CSS variables for themeable colors
- Keep decimal precision to 2 places max
- Group related elements with `<g>` tags

#### Accessibility
- Always include `aria-label` describing the image
- Use `role="img"` for decorative/informational images
- For interactive icons, use `role="button"` with proper labeling

#### Themeable Colors

Use CSS custom properties for light/dark mode support:
```xml
<svg>
  <style>
    .primary { fill: var(--icon-primary, #FF6B6B); }
    .secondary { fill: var(--icon-secondary, #4ECDC4); }
    .accent { fill: var(--icon-accent, #FFE66D); }
  </style>
  <path class="primary" d="..." />
</svg>
```

---

## Phase 4: Delivery

**Goal**: Save the SVG to the specified location.

### Output Options

#### As Standalone File
Save as `.svg` file in the specified folder:
```
project/
├── assets/
│   └── icons/
│       └── tomato.svg
```

#### As React Component
If requested, wrap in a component:
```tsx
// Tomato.tsx
export const TomatoIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24"
    className={className}
    aria-label="Tomato"
  >
    {/* SVG content */}
  </svg>
);
```

### File Naming
- Use kebab-case: `pomodoro-tomato.svg`
- Be descriptive: `profile-avatar-happy.svg`
- Include variant if applicable: `tomato-active.svg`, `tomato-inactive.svg`

---

## Phase 5: Iteration

**Goal**: Refine based on user feedback.

### Common Adjustments
- Color tweaks
- Size adjustments
- Expression changes (for characters)
- Adding/removing details
- Animation properties (if needed)

Ask after delivery:
> "Does this look right? Any adjustments needed to the colors, size, or style?"

---

## Common Use Cases

### App Mascots
- Pomodoro tomato (cute, with face)
- Task checkbox character
- Notification bell with expression
- Loading spinner character

### Profile/Avatar Elements
- Default user avatar
- Achievement badges
- Status indicators
- Mood icons

### UI Icons
- Navigation icons
- Action buttons
- Status indicators
- Empty state illustrations

### Decorative Elements
- Background patterns
- Dividers and separators
- Corner decorations
- Celebration confetti

---

## Example: Cute Tomato for Pomodoro

User request: "I need a cute tomato for my pomodoro timer app"

### Consultation Response:
> "I'd love to create a cute tomato for your pomodoro timer! A few questions:
> 1. Style: Should it be kawaii-cute (with a face) or more minimal?
> 2. Colors: Classic red tomato, or match your app's color scheme?
> 3. Size: Will this be a small icon (24-48px) or a larger illustration?
> 4. States: Do you need different versions (active, completed, paused)?
> 5. Where should I save it?"

### After user confirms (kawaii, red, 64px, active only, src/assets/):

```xml
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 64 64"
  width="64"
  height="64"
  aria-label="Cute tomato"
  role="img"
>
  <!-- Stem and leaf -->
  <g id="stem">
    <path d="M32 8 L32 14" stroke="#4A7C23" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="28" cy="10" rx="6" ry="4" fill="#6B8E23" transform="rotate(-20 28 10)"/>
    <ellipse cx="36" cy="10" rx="6" ry="4" fill="#6B8E23" transform="rotate(20 36 10)"/>
  </g>
  
  <!-- Body -->
  <ellipse id="body" cx="32" cy="38" rx="24" ry="22" fill="#FF6347"/>
  
  <!-- Highlight -->
  <ellipse cx="22" cy="30" rx="6" ry="4" fill="#FF7F6B" opacity="0.6"/>
  
  <!-- Face -->
  <g id="face">
    <!-- Eyes -->
    <ellipse cx="24" cy="38" rx="3" ry="4" fill="#2D1810"/>
    <ellipse cx="40" cy="38" rx="3" ry="4" fill="#2D1810"/>
    <!-- Eye shine -->
    <circle cx="25" cy="36" r="1.5" fill="white"/>
    <circle cx="41" cy="36" r="1.5" fill="white"/>
    <!-- Blush -->
    <ellipse cx="18" cy="44" rx="4" ry="2" fill="#FF9999" opacity="0.5"/>
    <ellipse cx="46" cy="44" rx="4" ry="2" fill="#FF9999" opacity="0.5"/>
    <!-- Smile -->
    <path d="M26 48 Q32 54 38 48" stroke="#2D1810" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>
</svg>
```

---

## Quick Reference

### Size Guidelines

| Context | Size | Complexity |
|---------|------|------------|
| Toolbar icon | 16-24px | Very simple |
| Navigation icon | 24-32px | Simple |
| Feature icon | 32-48px | Moderate detail |
| Mascot/illustration | 64-128px | Full detail |
| Hero illustration | 200px+ | High detail |

### Color Palettes by Style

| Style | Primary | Secondary | Accent |
|-------|---------|-----------|--------|
| Kawaii | Soft pastels | White/cream | Blush pink |
| Minimal | Neutral gray | White | Brand color |
| Playful | Bright primary | Complementary | Yellow/gold |
| Professional | Brand color | Dark gray | Accent |

### Emotion Expressions (for characters)

| Emotion | Eyes | Mouth |
|---------|------|-------|
| Happy | Curved up (◠) | Smile (⌣) |
| Excited | Wide open (◉) | Open smile (D) |
| Sleepy | Half closed (−) | Slight smile (~) |
| Focused | Normal (•) | Flat line (—) |
| Complete | Closed happy (‿) | Big smile (◡) |

---

## References

**Read**: `references/svg-syntax.md` for detailed SVG element reference
**Read**: `references/style-guides.md` for detailed style examples
**Read**: `examples/` folder for ready-to-use SVG templates
