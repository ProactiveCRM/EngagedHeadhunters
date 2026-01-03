// WCAG Color Contrast Utilities
// Based on WCAG 2.1 guidelines: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface WcagCompliance {
  ratio: number;
  aa: {
    normalText: boolean;
    largeText: boolean;
    uiComponents: boolean;
  };
  aaa: {
    normalText: boolean;
    largeText: boolean;
  };
}

/**
 * Convert HEX color to RGB
 */
export function hexToRgb(hex: string): RGB | null {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Handle shorthand (e.g., #F63 -> #FF6633)
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  
  if (hex.length !== 6) return null;
  
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  s = s / 100;
  l = l / 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

/**
 * Convert RGB to HEX
 */
export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`.toUpperCase();
}

/**
 * Parse any color format to RGB
 * Supports: HEX (#FF6B35), RGB (rgb(255, 107, 53)), HSL (hsl(16, 100%, 60%))
 */
export function parseColor(color: string): RGB | null {
  color = color.trim();
  
  // HEX format
  if (color.startsWith('#')) {
    return hexToRgb(color);
  }
  
  // RGB format: rgb(255, 107, 53)
  const rgbMatch = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1]),
      g: parseInt(rgbMatch[2]),
      b: parseInt(rgbMatch[3])
    };
  }
  
  // HSL format: hsl(16, 100%, 60%)
  const hslMatch = color.match(/^hsl\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)$/i);
  if (hslMatch) {
    return hslToRgb(
      parseInt(hslMatch[1]),
      parseInt(hslMatch[2]),
      parseInt(hslMatch[3])
    );
  }
  
  // Try parsing as plain HEX without #
  if (/^[a-fA-F0-9]{3,6}$/.test(color)) {
    return hexToRgb(color);
  }
  
  return null;
}

/**
 * Calculate relative luminance according to WCAG 2.1
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
export function getLuminance(rgb: RGB): number {
  const [rs, gs, bs] = [rgb.r, rgb.g, rgb.b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate WCAG contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(fg: RGB, bg: RGB): number {
  const L1 = getLuminance(fg);
  const L2 = getLuminance(bg);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check WCAG compliance for a color combination
 * 
 * WCAG 2.1 Requirements:
 * - AA Normal Text: 4.5:1
 * - AA Large Text (≥18pt or ≥14pt bold): 3:1
 * - AA UI Components & Graphics: 3:1
 * - AAA Normal Text: 7:1
 * - AAA Large Text: 4.5:1
 */
export function checkWcagCompliance(fg: RGB, bg: RGB): WcagCompliance {
  const ratio = getContrastRatio(fg, bg);
  
  return {
    ratio,
    aa: {
      normalText: ratio >= 4.5,
      largeText: ratio >= 3,
      uiComponents: ratio >= 3
    },
    aaa: {
      normalText: ratio >= 7,
      largeText: ratio >= 4.5
    }
  };
}

/**
 * Format contrast ratio for display (e.g., "4.52:1")
 */
export function formatContrastRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}

/**
 * Brand color presets for quick testing
 */
export const brandColorPresets = [
  { name: 'Primary on White', fg: '#006DB0', bg: '#FFFFFF' },
  { name: 'White on Navy', fg: '#FFFFFF', bg: '#002855' },
  { name: 'Orange on White', fg: '#FF6B35', bg: '#FFFFFF' },
  { name: 'Navy on Cool Gray', fg: '#002855', bg: '#F0F2F5' },
  { name: 'Muted on White', fg: '#4A6B8A', bg: '#FFFFFF' },
  { name: 'White on Primary', fg: '#FFFFFF', bg: '#006DB0' },
] as const;
