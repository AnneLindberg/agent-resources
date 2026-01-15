---
name: GenerateTransparentSvg
description: Generates a transparent PNG using Claude's image generation capabilities and converts it into a clean, scalable SVG file with no background. Use this when the user needs a vector asset, icon, or illustration.
---

# GenerateTransparentSvg Skill

This skill allows you to generate high-quality SVG assets by first creating a transparent PNG and then vectorizing it.

## Process

### Step 1: Generate Transparent PNG
Use your image generation tool to create the initial asset. Since you cannot directly generate SVGs, you must generate a high-quality PNG with a transparent background first.

**Crucial requirements for the image generation:**
1.  **Transparency**: The background MUST be transparent.
2.  **Style**: Use "flat vector", "minimalist", "line art", or "icon" styles for best vectorization results. Avoid gradients, complex shading, or photo-realistic textures.
3.  **Contrast**: High contrast between the subject and the background is essential.

**Prompt Template:**
"Generate a [style, e.g., flat vector] illustration of [description] with a transparent background. Ensure clean lines, solid colors, and no background fill. High contrast, suitable for vector conversion."

### Step 2: Convert to SVG
Once the PNG is generated and saved, use the `scripts/convert_to_svg.py` script to convert it to an SVG.

**Command:**
```bash
python .claude/skills/GenerateTransparentSvg/scripts/convert_to_svg.py --input "[path_to_generated_png]" --output "[desired_output_name].svg"
```

**Options:**
- `--input`: Path to the source PNG file.
- `--output`: Path for the resulting SVG file.
- `--threshold`: (Optional) Alpha threshold for transparency (0-255, default 127).

### Step 3: Verify and Present
1.  Verify the SVG was created successfully.
2.  Present the SVG file to the user.
