import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Check, Copy, ExternalLink, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

interface CustomBadgeMakerProps {
  onAddBadge: (url: string, label: string) => void;
}

const PRESET_COLORS = [
  { name: 'Bright Green', value: '4c1' },
  { name: 'Green', value: '97ca00' },
  { name: 'Yellow Green', value: 'a4a61d' },
  { name: 'Yellow', value: 'dfb317' },
  { name: 'Orange', value: 'fe7d37' },
  { name: 'Red', value: 'e05d44' },
  { name: 'Blue', value: '007ec6' },
  { name: 'Light Grey', value: '9f9f9f' },
];

const BADGE_STYLES = [
  { label: 'Flat', value: 'flat' },
  { label: 'Flat Square', value: 'flat-square' },
  { label: 'For the Badge', value: 'for-the-badge' },
  { label: 'Plastic', value: 'plastic' },
  { label: 'Social', value: 'social' },
];

export default function CustomBadgeMaker({ onAddBadge }: CustomBadgeMakerProps) {
  const [label, setLabel] = useState('Build');
  const [message, setMessage] = useState('Passing');
  const [color, setColor] = useState('31c854');
  const [style, setStyle] = useState('flat');
  const [logo, setLogo] = useState('');
  const [logoColor, setLogoColor] = useState('white');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => {
      // Shields.io replacement rules:
      // Dash (-) -> Double Dash (--)
      // Underscore (_) -> Double Underscore (__)
      // Space ( ) -> Underscore (_)
      const processShieldsParam = (str: string) => {
        return str
          .replace(/-/g, '--')
          .replace(/_/g, '__')
          .replace(/\s+/g, '_');
      };

      const encodedLabel = encodeURIComponent(processShieldsParam(label));
      const encodedMessage = encodeURIComponent(processShieldsParam(message));

      let url = `https://img.shields.io/badge/${encodedLabel}-${encodedMessage}-${color}?style=${style}`;

      if (logo) {
        url += `&logo=${encodeURIComponent(logo)}`;
        if (logoColor) {
          url += `&logoColor=${encodeURIComponent(logoColor)}`;
        }
      }

      setPreviewUrl(url);
      setIsUpdating(false);
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [label, message, color, style, logo, logoColor]);

  const handleCopy = () => {
    const markdown = `![${label}](${previewUrl})`;
    navigator.clipboard.writeText(markdown);
    toast.success('Markdown copied to clipboard!');
  };

  const getNormalizedHex = (hex: string) => {
    const clean = hex.replace('#', '');
    if (clean.length === 3) return clean.split('').map(c => c + c).join('');
    if (clean.length === 6) return clean;
    return '000000';
  };

  const triggerColorPicker = () => {
    const input = document.getElementById('native-color-picker') as HTMLInputElement;
    if (input) input.click();
  };

  return (
    <div className="space-y-6 py-2 text-foreground">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="badge-label">Label</Label>
              <Input
                id="badge-label"
                placeholder="e.g. Build"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="badge-message">Message</Label>
              <Input
                id="badge-message"
                placeholder="e.g. Passing"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent className="z-[300]">
                  {BADGE_STYLES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Icon (SimpleIcons)</Label>
              <Input
                placeholder="e.g. react, github"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Badge Color (Hex)</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="31c854"
                  value={color}
                  onChange={(e) => setColor(e.target.value.replace('#', ''))}
                  className="font-mono text-xs bg-background shrink"
                />
                <input
                  type="color"
                  id="native-color-picker"
                  className="sr-only"
                  onChange={(e) => setColor(e.target.value.replace('#', ''))}
                  value={`#${getNormalizedHex(color)}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-10 h-10 p-0 shrink-0 overflow-hidden bg-background hover:bg-muted"
                  onClick={triggerColorPicker}
                  title="Open Color Palette"
                >
                  <div
                    className="w-full h-full"
                    style={{ backgroundColor: color.length === 3 || color.length === 6 ? `#${color}` : 'transparent' }}
                  />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Icon Color</Label>
              <Input
                placeholder="white, ff0000"
                value={logoColor}
                onChange={(e) => setLogoColor(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>
        </div>

        {/* Right: Preview & Presets */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Live Preview</Label>
              {isUpdating && <span className="text-[10px] text-muted-foreground animate-pulse">Updating...</span>}
            </div>
            <div className="h-[80px] rounded-xl border border-border bg-muted/30 flex items-center justify-center p-4 relative overflow-hidden group">
              {/* Grid Pattern Background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '15px 15px' }} />

              <img
                src={previewUrl}
                alt="Badge Preview"
                className={`relative z-10 transition-all duration-300 hover:scale-110 ${isUpdating ? 'opacity-50 grayscale' : 'opacity-100'}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://img.shields.io/badge/error-invalid_params-red';
                }}
              />

              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => window.open(previewUrl, '_blank')}>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quick Color Presets</Label>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`group relative h-8 rounded-md border border-border transition-all hover:scale-105 active:scale-95 ${color === c.value ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                  style={{ backgroundColor: `#${c.value}` }}
                  title={c.name}
                >
                  {color === c.value && (
                    <Check className="h-3 w-3 text-white absolute inset-0 m-auto drop-shadow-sm" />
                  )}
                  <span className="sr-only">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          variant="secondary"
          className="flex-1 gap-2 border border-border/50 text-foreground"
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4" />
          Copy Markdown
        </Button>
        <Button
          type="button"
          className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/20"
          onClick={() => onAddBadge(previewUrl, label)}
        >
          <Wand2 className="h-4 w-4" />
          Add to README
        </Button>
      </div>
    </div>
  );
}
