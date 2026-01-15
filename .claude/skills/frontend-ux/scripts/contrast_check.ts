#!/usr/bin/env npx ts-node

/**
 * Contrast Check Script
 * Checks color contrast ratios for WCAG AA compliance
 * 
 * Usage: npx ts-node contrast_check.ts "#3b82f6" "#ffffff"
 */

interface ContrastResult {
  ratio: number
  normalText: 'pass' | 'fail'
  largeText: 'pass' | 'fail'
  uiComponents: 'pass' | 'fail'
}

/**
 * Parse hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`)
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

/**
 * Calculate relative luminance
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)
  
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check WCAG AA compliance
 */
function checkContrast(foreground: string, background: string): ContrastResult {
  const ratio = getContrastRatio(foreground, background)
  
  return {
    ratio: Math.round(ratio * 100) / 100,
    normalText: ratio >= 4.5 ? 'pass' : 'fail',
    largeText: ratio >= 3 ? 'pass' : 'fail',
    uiComponents: ratio >= 3 ? 'pass' : 'fail',
  }
}

// CLI usage
const args = process.argv.slice(2)

if (args.length < 2) {
  console.log('Color Contrast Checker')
  console.log('======================')
  console.log('')
  console.log('Usage: npx ts-node contrast_check.ts <foreground> <background>')
  console.log('')
  console.log('Example:')
  console.log('  npx ts-node contrast_check.ts "#3b82f6" "#ffffff"')
  console.log('')
  console.log('WCAG AA Requirements:')
  console.log('  Normal text: 4.5:1')
  console.log('  Large text:  3:1 (18pt or 14pt bold)')
  console.log('  UI elements: 3:1')
  process.exit(0)
}

const [foreground, background] = args

try {
  const result = checkContrast(foreground, background)
  
  console.log('')
  console.log(`Contrast Check: ${foreground} on ${background}`)
  console.log('═'.repeat(50))
  console.log('')
  console.log(`Contrast Ratio: ${result.ratio}:1`)
  console.log('')
  console.log('WCAG AA Compliance:')
  console.log(`  Normal text (4.5:1): ${result.normalText === 'pass' ? '✅ Pass' : '❌ Fail'}`)
  console.log(`  Large text  (3:1):   ${result.largeText === 'pass' ? '✅ Pass' : '❌ Fail'}`)
  console.log(`  UI elements (3:1):   ${result.uiComponents === 'pass' ? '✅ Pass' : '❌ Fail'}`)
  console.log('')
  
  if (result.normalText === 'fail') {
    const needed = 4.5
    console.log(`⚠️  Need ${needed}:1 for normal text, have ${result.ratio}:1`)
    console.log('   Consider darkening the foreground or lightening the background.')
  }
} catch (error) {
  console.error('Error:', (error as Error).message)
  process.exit(1)
}

export { getContrastRatio, checkContrast, hexToRgb, getLuminance }
