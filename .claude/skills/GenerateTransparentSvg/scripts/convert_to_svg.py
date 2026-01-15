import argparse
import sys
import os

def main():
    parser = argparse.ArgumentParser(description='Convert transparent PNG to SVG using Contour Tracing.')
    parser.add_argument('--input', required=True, help='Path to input PNG file')
    parser.add_argument('--output', required=True, help='Path to output SVG file')
    parser.add_argument('--threshold', type=int, default=127, help='Alpha threshold for transparency (0-255)')
    
    args = parser.parse_args()
    
    input_path = args.input
    output_path = args.output
    
    if not os.path.exists(input_path):
        print(f"Error: Input file '{input_path}' not found.")
        sys.exit(1)

    try:
        import cv2
        import numpy as np
    except ImportError:
        print("Error: Required libraries 'opencv-python' (cv2) or 'numpy' not found.")
        print("Please install them using: pip install opencv-python numpy")
        sys.exit(1)

    # Read the image with alpha channel
    img = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)
    
    if img is None:
        print(f"Error: Could not read image '{input_path}'. Ensure it is a valid image file.")
        sys.exit(1)

    # Check if image has alpha channel
    if img.shape[2] != 4:
        print("Warning: Input image does not appear to have an alpha channel. Assuming black background for contours.")
        # If no alpha, convert to grayscale and threshold
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)
    else:
        # Extract alpha channel
        alpha = img[:, :, 3]
        # Threshold alpha channel to start finding contours
        _, thresh = cv2.threshold(alpha, args.threshold, 255, cv2.THRESH_BINARY)

    # Find contours
    # cv2.CHAIN_APPROX_SIMPLE compresses horizontal, vertical, and diagonal segments
    # cv2.CHAIN_APPROX_TC89_L1 or KCOS might give better 'vector-like' results for some shapes
    contours, hierarchy = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if not contours:
        print("Warning: No contours found. output SVG might be empty.")

    # Start writing SVG manually to avoid external svgwrite dependency if possible, 
    # but for robustness we keep it simple.
    
    height, width = img.shape[:2]
    
    with open(output_path, 'w') as f:
        f.write(f'<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">')
        f.write(f'<path d="')
        
        for contour in contours:
            # Flatten the contour array
            if len(contour) < 3:
                continue
                
            # Move to first point
            start_point = contour[0][0]
            f.write(f"M {start_point[0]},{start_point[1]} ")
            
            # Draw lines to subsequent points
            for i in range(1, len(contour)):
                point = contour[i][0]
                f.write(f"L {point[0]},{point[1]} ")
            
            # Close path
            f.write("Z ")
            
        f.write(f'" fill="black" />')
        f.write('</svg>')

    print(f"Successfully converted '{input_path}' to '{output_path}'")

if __name__ == "__main__":
    main()
