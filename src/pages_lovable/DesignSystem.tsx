import { useState, useEffect, useRef, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, Check, Sun, Moon, Search, X, ArrowRightLeft, CheckCircle2, XCircle } from "lucide-react";
import {
  parseColor,
  rgbToHex,
  checkWcagCompliance,
  formatContrastRatio,
  brandColorPresets,
  type RGB,
  type WcagCompliance,
} from "@/lib/contrastUtils";

// Color token definitions with metadata
const coreTokens = [
  { name: "background", variable: "--background", hsl: "0 0% 100%", hex: "#FFFFFF", tailwind: "bg-background", usage: "Page backgrounds, main content areas", contrast: "N/A" },
  { name: "foreground", variable: "--foreground", hsl: "210 100% 17%", hex: "#002855", tailwind: "text-foreground", usage: "Primary text color on light backgrounds", contrast: "16:1 on white" },
  { name: "primary", variable: "--primary", hsl: "203 99% 43%", hex: "#0179D9", tailwind: "bg-primary / text-primary", usage: "Primary brand actions, buttons, links", contrast: "4.7:1 on white" },
  { name: "primary-foreground", variable: "--primary-foreground", hsl: "0 0% 100%", hex: "#FFFFFF", tailwind: "text-primary-foreground", usage: "Text on primary colored backgrounds", contrast: "4.7:1 on primary" },
  { name: "secondary", variable: "--secondary", hsl: "210 17% 95%", hex: "#F0F2F5", tailwind: "bg-secondary", usage: "Secondary backgrounds, subtle sections", contrast: "N/A" },
  { name: "secondary-foreground", variable: "--secondary-foreground", hsl: "210 100% 17%", hex: "#002855", tailwind: "text-secondary-foreground", usage: "Text on secondary backgrounds", contrast: "15:1 on secondary" },
  { name: "muted", variable: "--muted", hsl: "210 17% 95%", hex: "#F0F2F5", tailwind: "bg-muted", usage: "Muted backgrounds, disabled states", contrast: "N/A" },
  { name: "muted-foreground", variable: "--muted-foreground", hsl: "210 30% 35%", hex: "#3D5266", tailwind: "text-muted-foreground", usage: "Secondary text, captions (WCAG AA compliant)", contrast: "5.8:1 on white" },
  { name: "accent", variable: "--accent", hsl: "203 99% 43%", hex: "#0179D9", tailwind: "bg-accent", usage: "Accent highlights, hover states", contrast: "4.7:1 on white" },
  { name: "destructive", variable: "--destructive", hsl: "0 84% 60%", hex: "#EF4444", tailwind: "bg-destructive", usage: "Error states, delete actions, warnings", contrast: "4.5:1" },
  { name: "border", variable: "--border", hsl: "210 17% 85%", hex: "#D1D5DB", tailwind: "border-border", usage: "Borders, dividers, separators", contrast: "N/A" },
  { name: "ring", variable: "--ring", hsl: "203 99% 43%", hex: "#0179D9", tailwind: "ring-ring", usage: "Focus rings, input focus states", contrast: "4.7:1" },
];

const brandTokens = [
  { name: "honolulu-blue", variable: "--honolulu-blue", hsl: "203 99% 43%", hex: "#0179D9", tailwind: "bg-honolulu-blue", usage: "Primary brand blue - use for main CTAs and brand elements" },
  { name: "dark-navy", variable: "--dark-navy", hsl: "210 100% 17%", hex: "#002855", tailwind: "bg-dark-navy", usage: "Dark backgrounds, footer, hero overlays" },
  { name: "cool-gray", variable: "--cool-gray", hsl: "210 17% 95%", hex: "#F0F2F5", tailwind: "bg-cool-gray", usage: "Light gray backgrounds, cards, sections" },
  { name: "bright-orange", variable: "--bright-orange", hsl: "16 100% 60%", hex: "#FF6B35", tailwind: "bg-bright-orange", usage: "Accent color - use sparingly for highlights" },
  { name: "pure-white", variable: "--pure-white", hsl: "0 0% 100%", hex: "#FFFFFF", tailwind: "bg-pure-white", usage: "Pure white backgrounds and text on dark" },
];

const metallicTokens = [
  { name: "metallic-silver", variable: "--metallic-silver", hsl: "0 0% 75%", hex: "#C0C0C0", tailwind: "text-[hsl(var(--metallic-silver))]", usage: "Decorative only - fails contrast for text", contrast: "2.6:1 ⚠️" },
  { name: "chrome-highlight", variable: "--chrome-highlight", hsl: "0 0% 85%", hex: "#D9D9D9", tailwind: "bg-[hsl(var(--chrome-highlight))]", usage: "Chrome highlights, polished elements", contrast: "N/A" },
  { name: "platinum-light", variable: "--platinum-light", hsl: "0 0% 92%", hex: "#EBEBEB", tailwind: "bg-[hsl(var(--platinum-light))]", usage: "Light platinum backgrounds", contrast: "N/A" },
  { name: "luxury-white", variable: "--luxury-white", hsl: "0 0% 98%", hex: "#FAFAFA", tailwind: "bg-[hsl(var(--luxury-white))]", usage: "Premium white, subtle off-white", contrast: "N/A" },
];

// Accessible text tokens for dark/colored backgrounds
const accessibleTextTokens = [
  { name: "text-on-dark", variable: "--text-on-dark", hsl: "0 0% 100%", hex: "#FFFFFF", tailwind: "text-[hsl(var(--text-on-dark))]", usage: "Primary text on dark navy backgrounds", contrast: "15:1 on navy" },
  { name: "text-on-dark-muted", variable: "--text-on-dark-muted", hsl: "220 15% 80%", hex: "#C5C9D1", tailwind: "text-[hsl(var(--text-on-dark-muted))]", usage: "Secondary text on dark backgrounds", contrast: "8.5:1 on navy" },
  { name: "text-on-primary", variable: "--text-on-primary", hsl: "0 0% 100%", hex: "#FFFFFF", tailwind: "text-[hsl(var(--text-on-primary))]", usage: "Primary text on brand blue backgrounds", contrast: "4.7:1 on primary" },
  { name: "text-on-primary-muted", variable: "--text-on-primary-muted", hsl: "203 30% 90%", hex: "#D9E8F2", tailwind: "text-[hsl(var(--text-on-primary-muted))]", usage: "Secondary text on brand blue", contrast: "4.5:1 on primary" },
];

const gradients = [
  { name: "gradient-primary", class: "gradient-primary", css: "linear-gradient(135deg, hsl(var(--honolulu-blue)), hsl(var(--metallic-silver)))", usage: "Primary brand gradient for hero sections" },
  { name: "gradient-luxury", class: "gradient-luxury", css: "linear-gradient(180deg, hsl(var(--luxury-white)), hsl(var(--chrome-highlight)))", usage: "Luxury feel backgrounds" },
  { name: "gradient-metallic", class: "gradient-metallic", css: "linear-gradient(135deg, hsl(var(--chrome-highlight)), hsl(var(--metallic-silver)))", usage: "Metallic chrome effect" },
  { name: "gradient-subtle", class: "gradient-subtle", css: "linear-gradient(180deg, hsl(var(--background)), hsl(var(--muted)))", usage: "Subtle section transitions" },
];

const shadows = [
  { name: "shadow-brand", class: "shadow-brand", css: "0 10px 30px -10px hsl(var(--honolulu-blue) / 0.3)", usage: "Brand-colored shadow for primary elements" },
  { name: "shadow-luxury", class: "shadow-luxury", css: "0 4px 20px -4px hsl(var(--metallic-silver) / 0.2)", usage: "Subtle luxury shadow" },
  { name: "shadow-metallic", class: "shadow-metallic", css: "0 8px 32px -8px hsl(var(--dark-navy) / 0.15)", usage: "Metallic effect shadow" },
  { name: "shadow-elegant", class: "shadow-elegant", css: "0 10px 30px -10px hsl(var(--primary) / 0.3)", usage: "Elegant shadow for cards" },
];

const buttonVariants = [
  { variant: "default", label: "Default", usage: "Primary actions" },
  { variant: "destructive", label: "Destructive", usage: "Delete/danger actions" },
  { variant: "outline", label: "Outline", usage: "Secondary actions" },
  { variant: "secondary", label: "Secondary", usage: "Less prominent actions" },
  { variant: "ghost", label: "Ghost", usage: "Tertiary actions, menus" },
  { variant: "link", label: "Link", usage: "Inline links" },
  { variant: "hero", label: "Hero", usage: "Hero section CTAs on dark backgrounds" },
  { variant: "heroOutline", label: "Hero Outline", usage: "Secondary hero CTAs" },
  { variant: "cta", label: "CTA", usage: "Call-to-action buttons" },
] as const;

const buttonSizes = ["default", "sm", "lg", "xl", "icon"] as const;

// Filter function for tokens
function filterTokens<T extends { name: string; hsl?: string; hex?: string; tailwind?: string; usage: string; class?: string; css?: string }>(
  tokens: T[],
  query: string
): T[] {
  if (!query.trim()) return tokens;
  const lowerQuery = query.toLowerCase();
  return tokens.filter(token =>
    token.name.toLowerCase().includes(lowerQuery) ||
    token.hsl?.toLowerCase().includes(lowerQuery) ||
    token.hex?.toLowerCase().includes(lowerQuery) ||
    token.tailwind?.toLowerCase().includes(lowerQuery) ||
    token.usage.toLowerCase().includes(lowerQuery) ||
    token.class?.toLowerCase().includes(lowerQuery) ||
    token.css?.toLowerCase().includes(lowerQuery)
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`Copied: ${label}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 rounded hover:bg-muted transition-colors"
      title={`Copy ${label}`}
    >
      {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
    </button>
  );
}

interface ColorToken {
  name: string;
  variable: string;
  hsl: string;
  hex: string;
  tailwind: string;
  usage: string;
  contrast?: string;
}

function ColorSwatch({ token }: { token: ColorToken }) {
  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <div
        className="w-full h-16 rounded-md mb-3 border border-border"
        style={{ backgroundColor: `hsl(${token.hsl})` }}
      />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm">{token.name}</span>
          <CopyButton text={`var(${token.variable})`} label="CSS variable" />
        </div>
        <div className="text-xs space-y-1 text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>HSL: {token.hsl}</span>
            <CopyButton text={token.hsl} label="HSL" />
          </div>
          <div className="flex items-center justify-between">
            <span>Hex: {token.hex}</span>
            <CopyButton text={token.hex} label="Hex" />
          </div>
          <div className="flex items-center justify-between">
            <span>Tailwind: {token.tailwind}</span>
            <CopyButton text={token.tailwind} label="Tailwind" />
          </div>
          {token.contrast && (
            <div className="flex items-center justify-between">
              <span className={token.contrast.includes('⚠️') ? 'text-amber-600' : 'text-green-600'}>
                Contrast: {token.contrast}
              </span>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground pt-2 border-t border-border">
          {token.usage}
        </p>
      </div>
    </div>
  );
}

function GradientSwatch({ gradient }: { gradient: typeof gradients[0] }) {
  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <div
        className={`w-full h-16 rounded-md mb-3 ${gradient.class}`}
      />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm">{gradient.name}</span>
          <CopyButton text={gradient.class} label="class" />
        </div>
        <p className="text-xs text-muted-foreground">{gradient.usage}</p>
      </div>
    </div>
  );
}

function ShadowSwatch({ shadow }: { shadow: typeof shadows[0] }) {
  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <div
        className={`w-full h-16 rounded-md mb-3 bg-background ${shadow.class}`}
      />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm">{shadow.name}</span>
          <CopyButton text={shadow.class} label="class" />
        </div>
        <p className="text-xs text-muted-foreground">{shadow.usage}</p>
      </div>
    </div>
  );
}

// Compliance Badge Component
function ComplianceBadge({ 
  pass, 
  label, 
  requirement 
}: { 
  pass: boolean; 
  label: string; 
  requirement: string;
}) {
  return (
    <div className={`flex flex-col items-center p-3 rounded-lg border ${
      pass 
        ? 'bg-green-50 border-green-200' 
        : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-center gap-1 mb-1">
        {pass ? (
          <CheckCircle2 className="w-4 h-4 text-green-600" />
        ) : (
          <XCircle className="w-4 h-4 text-red-500" />
        )}
        <span className={`font-semibold text-sm ${pass ? 'text-green-700' : 'text-red-600'}`}>
          {pass ? 'Pass' : 'Fail'}
        </span>
      </div>
      <span className="text-xs font-medium text-foreground">{label}</span>
      <span className="text-xs text-muted-foreground">{requirement}</span>
    </div>
  );
}

// Color Contrast Checker Component
function ContrastChecker() {
  const [foregroundColor, setForegroundColor] = useState("#002855");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [fgInput, setFgInput] = useState("#002855");
  const [bgInput, setBgInput] = useState("#FFFFFF");

  // Parse colors and calculate compliance
  const compliance = useMemo<WcagCompliance | null>(() => {
    const fg = parseColor(foregroundColor);
    const bg = parseColor(backgroundColor);
    if (!fg || !bg) return null;
    return checkWcagCompliance(fg, bg);
  }, [foregroundColor, backgroundColor]);

  // Handle color input changes
  const handleFgChange = (value: string) => {
    setFgInput(value);
    const parsed = parseColor(value);
    if (parsed) {
      setForegroundColor(rgbToHex(parsed));
    }
  };

  const handleBgChange = (value: string) => {
    setBgInput(value);
    const parsed = parseColor(value);
    if (parsed) {
      setBackgroundColor(rgbToHex(parsed));
    }
  };

  // Handle native color picker changes
  const handleFgPickerChange = (value: string) => {
    setForegroundColor(value.toUpperCase());
    setFgInput(value.toUpperCase());
  };

  const handleBgPickerChange = (value: string) => {
    setBackgroundColor(value.toUpperCase());
    setBgInput(value.toUpperCase());
  };

  // Swap colors
  const swapColors = () => {
    setForegroundColor(backgroundColor);
    setBackgroundColor(foregroundColor);
    setFgInput(backgroundColor);
    setBgInput(foregroundColor);
  };

  // Apply preset
  const applyPreset = (fg: string, bg: string) => {
    setForegroundColor(fg);
    setBackgroundColor(bg);
    setFgInput(fg);
    setBgInput(bg);
  };

  return (
    <div className="space-y-6">
      {/* Color Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Foreground Input */}
        <div className="space-y-2">
          <Label htmlFor="fg-color" className="text-sm font-medium">
            Foreground (Text) Color
          </Label>
          <div className="flex gap-2">
            <input
              type="color"
              value={foregroundColor}
              onChange={(e) => handleFgPickerChange(e.target.value)}
              className="w-12 h-10 rounded border border-border cursor-pointer"
            />
            <Input
              id="fg-color"
              value={fgInput}
              onChange={(e) => handleFgChange(e.target.value)}
              placeholder="#002855 or rgb(0, 40, 85)"
              className="flex-1"
            />
          </div>
        </div>

        {/* Background Input */}
        <div className="space-y-2">
          <Label htmlFor="bg-color" className="text-sm font-medium">
            Background Color
          </Label>
          <div className="flex gap-2">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => handleBgPickerChange(e.target.value)}
              className="w-12 h-10 rounded border border-border cursor-pointer"
            />
            <Input
              id="bg-color"
              value={bgInput}
              onChange={(e) => handleBgChange(e.target.value)}
              placeholder="#FFFFFF or hsl(0, 0%, 100%)"
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={swapColors}
          className="gap-2"
        >
          <ArrowRightLeft className="w-4 h-4" />
          Swap Colors
        </Button>
      </div>

      {/* Live Preview */}
      <div 
        className="rounded-lg p-6 border border-border"
        style={{ backgroundColor }}
      >
        <h3 
          className="text-2xl font-bold mb-2"
          style={{ color: foregroundColor }}
        >
          Large Heading Text
        </h3>
        <p 
          className="text-base mb-3"
          style={{ color: foregroundColor }}
        >
          This is regular body text to test readability. WCAG requires at least 4.5:1 contrast ratio for normal text.
        </p>
        <p 
          className="text-sm"
          style={{ color: foregroundColor }}
        >
          Small caption text (14px) — should still be clearly readable
        </p>
        <div className="mt-4 flex gap-2">
          <button
            className="px-4 py-2 rounded text-sm font-medium border-2"
            style={{ 
              color: foregroundColor, 
              borderColor: foregroundColor,
              backgroundColor: 'transparent'
            }}
          >
            Sample Button
          </button>
          <button
            className="px-4 py-2 rounded text-sm font-medium"
            style={{ 
              backgroundColor: foregroundColor, 
              color: backgroundColor 
            }}
          >
            Filled Button
          </button>
        </div>
      </div>

      {/* Contrast Ratio Display */}
      {compliance && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-muted rounded-full">
            <span className="text-sm text-muted-foreground">Contrast Ratio:</span>
            <span className={`text-2xl font-bold ${
              compliance.ratio >= 7 
                ? 'text-green-600' 
                : compliance.ratio >= 4.5 
                  ? 'text-amber-600' 
                  : 'text-red-500'
            }`}>
              {formatContrastRatio(compliance.ratio)}
            </span>
          </div>
        </div>
      )}

      {/* WCAG Compliance Badges */}
      {compliance && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <ComplianceBadge
            pass={compliance.aa.normalText}
            label="AA Normal"
            requirement="≥ 4.5:1"
          />
          <ComplianceBadge
            pass={compliance.aaa.normalText}
            label="AAA Normal"
            requirement="≥ 7:1"
          />
          <ComplianceBadge
            pass={compliance.aa.largeText}
            label="AA Large"
            requirement="≥ 3:1"
          />
          <ComplianceBadge
            pass={compliance.aaa.largeText}
            label="AAA Large"
            requirement="≥ 4.5:1"
          />
          <ComplianceBadge
            pass={compliance.aa.uiComponents}
            label="UI Components"
            requirement="≥ 3:1"
          />
        </div>
      )}

      {/* Quick Presets */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Quick Presets:</p>
        <div className="flex flex-wrap gap-2">
          {brandColorPresets.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              size="sm"
              onClick={() => applyPreset(preset.fg, preset.bg)}
              className="text-xs"
            >
              <span
                className="w-3 h-3 rounded-full border border-border mr-2"
                style={{ backgroundColor: preset.fg }}
              />
              <span
                className="w-3 h-3 rounded-full border border-border mr-2"
                style={{ backgroundColor: preset.bg }}
              />
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      {/* WCAG Guidelines */}
      <div className="p-4 bg-muted/50 rounded-lg text-sm">
        <h4 className="font-semibold mb-2">WCAG 2.1 Contrast Requirements</h4>
        <ul className="space-y-1 text-muted-foreground">
          <li><strong>AA Normal Text:</strong> 4.5:1 minimum for text under 18pt (or 14pt bold)</li>
          <li><strong>AA Large Text:</strong> 3:1 minimum for text 18pt+ (or 14pt+ bold)</li>
          <li><strong>AAA Normal Text:</strong> 7:1 enhanced contrast for best readability</li>
          <li><strong>UI Components:</strong> 3:1 minimum for interactive elements and graphics</li>
        </ul>
      </div>
    </div>
  );
}

type CategoryKey = 'brand' | 'core' | 'metallic' | 'accessible' | 'gradients' | 'shadows';

export default function DesignSystem() {
  const [darkPreview, setDarkPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCategories, setVisibleCategories] = useState<Record<CategoryKey, boolean>>({
    brand: true,
    core: true,
    metallic: true,
    accessible: true,
    gradients: true,
    shadows: true,
  });
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: "/" to focus search, "Escape" to clear
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setSearchQuery("");
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter all token arrays
  const filteredBrandTokens = filterTokens(brandTokens, searchQuery);
  const filteredCoreTokens = filterTokens(coreTokens, searchQuery);
  const filteredMetallicTokens = filterTokens(metallicTokens, searchQuery);
  const filteredAccessibleTokens = filterTokens(accessibleTextTokens, searchQuery);
  const filteredGradients = filterTokens(gradients, searchQuery);
  const filteredShadows = filterTokens(shadows, searchQuery);

  // Calculate total results
  const totalResults = 
    (visibleCategories.brand ? filteredBrandTokens.length : 0) +
    (visibleCategories.core ? filteredCoreTokens.length : 0) +
    (visibleCategories.metallic ? filteredMetallicTokens.length : 0) +
    (visibleCategories.accessible ? filteredAccessibleTokens.length : 0) +
    (visibleCategories.gradients ? filteredGradients.length : 0) +
    (visibleCategories.shadows ? filteredShadows.length : 0);

  const hasActiveSearch = searchQuery.trim().length > 0;
  const noResults = hasActiveSearch && totalResults === 0;

  const toggleCategory = (key: CategoryKey) => {
    setVisibleCategories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const categoryLabels: Record<CategoryKey, string> = {
    brand: "Brand",
    core: "Core",
    metallic: "Metallic",
    accessible: "Accessible",
    gradients: "Gradients",
    shadows: "Shadows",
  };

  return (
    <>
      <Helmet>
        <title>Design System | EngagedHeadhunters</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card sticky top-0 z-50">
          <div className="container py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">EngagedHeadhunters Design System</h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Living documentation for semantic color tokens, components, and patterns
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Search Input */}
                <div className="relative flex-1 lg:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search tokens... (press /)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-9"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <span className="text-xs text-muted-foreground hidden sm:inline">v1.0.0</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDarkPreview(!darkPreview)}
                >
                  {darkPreview ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                  {darkPreview ? "Light" : "Dark"}
                </Button>
              </div>
            </div>

            {/* Category Filters & Results Count */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-xs text-muted-foreground mr-1">Filter:</span>
              {(Object.keys(visibleCategories) as CategoryKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => toggleCategory(key)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    visibleCategories[key]
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {categoryLabels[key]}
                </button>
              ))}
              <span className="ml-auto text-xs text-muted-foreground">
                {hasActiveSearch ? (
                  <span className={noResults ? "text-destructive" : ""}>
                    {totalResults} result{totalResults !== 1 ? "s" : ""} found
                  </span>
                ) : (
                  <span>{totalResults} tokens</span>
                )}
              </span>
            </div>
          </div>
        </header>

        <main className="container py-8 space-y-12">
          {/* No Results State */}
          {noResults && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground mb-4">No tokens match "{searchQuery}"</p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear search
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Brand Colors */}
          {visibleCategories.brand && filteredBrandTokens.length > 0 && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Brand Colors
                    {hasActiveSearch && <span className="text-sm font-normal text-muted-foreground ml-2">({filteredBrandTokens.length})</span>}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Core brand palette derived from the EngagedHeadhunters logo
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {filteredBrandTokens.map((token) => (
                      <ColorSwatch key={token.name} token={token} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Core Semantic Tokens */}
          {visibleCategories.core && filteredCoreTokens.length > 0 && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Core Semantic Tokens
                    {hasActiveSearch && <span className="text-sm font-normal text-muted-foreground ml-2">({filteredCoreTokens.length})</span>}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Use these tokens instead of raw colors for consistency and theme support
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredCoreTokens.map((token) => (
                      <ColorSwatch key={token.name} token={token} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Metallic Accents */}
          {visibleCategories.metallic && filteredMetallicTokens.length > 0 && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Metallic Accents
                    {hasActiveSearch && <span className="text-sm font-normal text-muted-foreground ml-2">({filteredMetallicTokens.length})</span>}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Premium metallic tones for luxury feel and chrome effects
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredMetallicTokens.map((token) => (
                      <ColorSwatch key={token.name} token={token} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Accessible Text Tokens */}
          {visibleCategories.accessible && filteredAccessibleTokens.length > 0 && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-700 rounded text-xs font-bold">AA</span>
                    Accessible Text Tokens
                    {hasActiveSearch && <span className="text-sm font-normal text-muted-foreground ml-2">({filteredAccessibleTokens.length})</span>}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    WCAG AA compliant text colors for dark and colored backgrounds. Use these instead of opacity-based text.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredAccessibleTokens.map((token) => (
                      <ColorSwatch key={token.name} token={token} />
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 text-sm mb-2">✓ Use These Instead Of:</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• <code className="bg-green-100 px-1 rounded">text-[hsl(var(--text-on-dark-muted))]</code> instead of <code className="bg-red-100 px-1 rounded line-through">text-white/70</code></li>
                      <li>• <code className="bg-green-100 px-1 rounded">text-[hsl(var(--text-on-primary-muted))]</code> instead of <code className="bg-red-100 px-1 rounded line-through">text-primary-foreground/80</code></li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Gradients */}
          {visibleCategories.gradients && filteredGradients.length > 0 && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Gradients
                    {hasActiveSearch && <span className="text-sm font-normal text-muted-foreground ml-2">({filteredGradients.length})</span>}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Pre-defined gradient classes for consistent styling
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredGradients.map((gradient) => (
                      <GradientSwatch key={gradient.name} gradient={gradient} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Shadows */}
          {visibleCategories.shadows && filteredShadows.length > 0 && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Shadows
                    {hasActiveSearch && <span className="text-sm font-normal text-muted-foreground ml-2">({filteredShadows.length})</span>}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Brand-aligned shadow presets for depth and elevation
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredShadows.map((shadow) => (
                      <ShadowSwatch key={shadow.name} shadow={shadow} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Color Contrast Checker - always visible, not filterable */}
          {!hasActiveSearch && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    🎨 Color Contrast Checker
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Test any color combination for WCAG accessibility compliance
                  </p>
                </CardHeader>
                <CardContent>
                  <ContrastChecker />
                </CardContent>
              </Card>
            </section>
          )}

          {/* Typography - always visible, not filterable */}
          {!hasActiveSearch && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Typography</CardTitle>
                  <p className="text-muted-foreground">
                    Inter font family with defined weights and scale
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-4 pb-2 border-b border-border">
                      <span className="text-xs text-muted-foreground w-20">H1</span>
                      <h1 className="text-4xl font-bold">Heading One</h1>
                      <code className="text-xs bg-muted px-2 py-1 rounded">text-4xl font-bold</code>
                    </div>
                    <div className="flex items-baseline gap-4 pb-2 border-b border-border">
                      <span className="text-xs text-muted-foreground w-20">H2</span>
                      <h2 className="text-3xl font-bold">Heading Two</h2>
                      <code className="text-xs bg-muted px-2 py-1 rounded">text-3xl font-bold</code>
                    </div>
                    <div className="flex items-baseline gap-4 pb-2 border-b border-border">
                      <span className="text-xs text-muted-foreground w-20">H3</span>
                      <h3 className="text-2xl font-semibold">Heading Three</h3>
                      <code className="text-xs bg-muted px-2 py-1 rounded">text-2xl font-semibold</code>
                    </div>
                    <div className="flex items-baseline gap-4 pb-2 border-b border-border">
                      <span className="text-xs text-muted-foreground w-20">H4</span>
                      <h4 className="text-xl font-semibold">Heading Four</h4>
                      <code className="text-xs bg-muted px-2 py-1 rounded">text-xl font-semibold</code>
                    </div>
                    <div className="flex items-baseline gap-4 pb-2 border-b border-border">
                      <span className="text-xs text-muted-foreground w-20">Body</span>
                      <p className="text-base">Body text for paragraphs</p>
                      <code className="text-xs bg-muted px-2 py-1 rounded">text-base</code>
                    </div>
                    <div className="flex items-baseline gap-4 pb-2 border-b border-border">
                      <span className="text-xs text-muted-foreground w-20">Small</span>
                      <p className="text-sm text-muted-foreground">Small secondary text</p>
                      <code className="text-xs bg-muted px-2 py-1 rounded">text-sm text-muted-foreground</code>
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm font-medium mb-2">Font Weights</p>
                    <div className="flex flex-wrap gap-4">
                      <span className="font-normal">400 Normal</span>
                      <span className="font-medium">500 Medium</span>
                      <span className="font-bold">700 Bold</span>
                      <span className="font-extrabold">800 Extra Bold</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Button Variants - always visible, not filterable */}
          {!hasActiveSearch && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Button Variants</CardTitle>
                  <p className="text-muted-foreground">
                    All available button styles with usage guidelines
                  </p>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Variants on light background */}
                  <div>
                    <h3 className="font-semibold mb-4">On Light Background</h3>
                    <div className="flex flex-wrap gap-4 p-6 bg-background border border-border rounded-lg">
                      {buttonVariants.filter(v => !v.variant.startsWith('hero')).map((btn) => (
                        <div key={btn.variant} className="text-center">
                          <Button variant={btn.variant as any}>{btn.label}</Button>
                          <p className="text-xs text-muted-foreground mt-2">{btn.usage}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hero variants on dark background */}
                  <div>
                    <h3 className="font-semibold mb-4">On Dark Background (Hero Variants)</h3>
                    <div className="flex flex-wrap gap-4 p-6 bg-[hsl(var(--dark-navy))] rounded-lg">
                      {buttonVariants.filter(v => v.variant.startsWith('hero') || v.variant === 'cta').map((btn) => (
                        <div key={btn.variant} className="text-center">
                          <Button variant={btn.variant as any}>{btn.label}</Button>
                          <p className="text-xs text-white/70 mt-2">{btn.usage}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <h3 className="font-semibold mb-4">Button Sizes</h3>
                    <div className="flex flex-wrap items-center gap-4">
                      {buttonSizes.filter(s => s !== 'icon').map((size) => (
                        <Button key={size} size={size}>
                          {size === 'default' ? 'Default' : size.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Contrast Accessibility - always visible, not filterable */}
          {!hasActiveSearch && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Contrast & Accessibility</CardTitle>
                  <p className="text-muted-foreground">
                    WCAG AA compliant color combinations
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Light backgrounds */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm">Light Backgrounds</h3>
                      <div className="bg-background p-4 rounded-lg border border-border">
                        <p className="text-foreground">text-foreground on bg-background ✓</p>
                        <p className="text-muted-foreground text-sm">text-muted-foreground ✓</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-foreground">text-foreground on bg-muted ✓</p>
                        <p className="text-muted-foreground text-sm">text-muted-foreground ✓</p>
                      </div>
                      <div className="bg-primary p-4 rounded-lg">
                        <p className="text-primary-foreground">text-primary-foreground on bg-primary ✓</p>
                      </div>
                    </div>

                    {/* Dark backgrounds */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm">Dark Backgrounds</h3>
                      <div className="bg-[hsl(var(--dark-navy))] p-4 rounded-lg">
                        <p className="text-white">text-white on dark-navy ✓</p>
                        <p className="text-white/70 text-sm">text-white/70 (11.7:1 ratio) ✓</p>
                      </div>
                      <div className="bg-[hsl(var(--honolulu-blue))] p-4 rounded-lg">
                        <p className="text-white">text-white on honolulu-blue ✓</p>
                      </div>
                      <div className="bg-destructive p-4 rounded-lg">
                        <p className="text-destructive-foreground">text-destructive-foreground ✓</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h4 className="font-semibold text-amber-800 text-sm">⚠️ Avoid These Combinations</h4>
                    <ul className="text-sm text-amber-700 mt-2 space-y-1">
                      <li>• text-muted-foreground on dark backgrounds</li>
                      <li>• text-white on light backgrounds</li>
                      <li>• Low opacity text (&lt;70%) on any background</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Code Examples - always visible, not filterable */}
          {!hasActiveSearch && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Code Examples</CardTitle>
                  <p className="text-muted-foreground">
                    Common patterns and usage examples
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Primary Button</span>
                      <CopyButton text='<Button className="bg-primary text-primary-foreground">Request Talent</Button>' label="code" />
                    </div>
                    <pre className="text-xs overflow-x-auto">
                      <code>{`<Button className="bg-primary text-primary-foreground">
  Request Talent
</Button>`}</code>
                    </pre>
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Dark Section</span>
                      <CopyButton text='<section className="bg-[hsl(var(--dark-navy))]"><p className="text-white/70">Content</p></section>' label="code" />
                    </div>
                    <pre className="text-xs overflow-x-auto">
                      <code>{`<section className="bg-[hsl(var(--dark-navy))]">
  <h2 className="text-white">Heading</h2>
  <p className="text-white/70">Readable secondary text</p>
</section>`}</code>
                    </pre>
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Card with Shadow</span>
                      <CopyButton text='<Card className="shadow-brand"><CardContent>...</CardContent></Card>' label="code" />
                    </div>
                    <pre className="text-xs overflow-x-auto">
                      <code>{`<Card className="shadow-brand">
  <CardContent>
    Premium card with brand shadow
  </CardContent>
</Card>`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-6 mt-12">
          <div className="container text-center text-sm text-muted-foreground">
            <p>EngagedHeadhunters Design System • Internal Documentation</p>
            <p className="mt-1">Always use semantic tokens. Never use raw hex colors in components.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
