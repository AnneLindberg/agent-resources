# GenerateTransparentSvg Skill

A skill for generating transparent SVG assets by combining Claude's image generation with a local vectorization script.

## Usage

This skill is intended to be used by the Claude agent. When a user requests an SVG or vector graphic:

1.  **Generate**: The agent generates a transparent PNG.
2.  **Convert**: The agent runs the included Python script to convert the PNG to SVG.

## Requirements

-   **Python 3.x**
-   **Libraries**:
    -   `opencv-python` (cv2)
    -   `numpy`
    -   `svgwrite` (optional, for cleaner creation, otherwise manual XML writing)

## Installation

Ensure the required Python libraries are installed:

```bash
pip install opencv-python numpy
```

## detailed workflow

1.  User asks for "an SVG of a cute robot".
2.  Agent generates a PNG of "cute robot, flat vector style, transparent background".
3.  Agent saves PNG to a temporary or project location.
4.  Agent runs `python .claude/skills/GenerateTransparentSvg/scripts/convert_to_svg.py --input robot.png --output robot.svg`.
5.  Agent confirms success and mentions the file to the user.
