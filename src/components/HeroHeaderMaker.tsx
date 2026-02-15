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
import { Check, Copy, ExternalLink, Wand2, Type, Palette, Layout, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface HeroHeaderMakerProps {
  onAddHeader: (url: string, alt: string) => void;
}

const BANNER_TYPES = [
  { label: 'Wave', value: 'wave' },
  { label: 'Rect', value: 'rect' },
  { label: 'Soft', value: 'soft' },
  { label: 'Rounded', value: 'rounded' },
  { label: 'Cylinder', value: 'cylinder' },
  { label: 'Waving', value: 'waving' },
  { label: 'Slice', value: 'slice' },
  { label: 'Outline', value: 'outline' },
];

const ANIMATIONS = [
  { label: 'None', value: 'none' },
  { label: 'Twinkling', value: 'twinkling' },
  { label: 'Waving', value: 'waving' },
  { label: 'Fade In', value: 'fadeIn' },
  { label: 'Scale In', value: 'scaleIn' },
];

const PRESET_COLORS = [
  { name: 'Slate', value: '0f172a' },
  { name: 'Indigo', value: '4f46e5' },
  { name: 'Rose', value: 'e11d48' },
  { name: 'Emerald', value: '059669' },
  { name: 'Amber', value: 'd97706' },
  { name: 'Sky', value: '0284c7' },
  { name: 'Violet', value: '7c3aed' },
  { name: 'GitHub', value: '24292f' },
];

export default function HeroHeaderMaker({ onAddHeader }: HeroHeaderMakerProps) {
  const [text, setText] = useState('My Awesome Project');
  const [type, setType] = useState('wave');
  const [color, setColor] = useState('4f46e5');
  const [animation, setAnimation] = useState('none');
  const [fontSize, setFontSize] = useState('70');
  const [fontColor, setFontColor] = useState('ffffff');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => {
      const params = new URLSearchParams({
        type: type,
        color: color,
        text: text,
        animation: animation === 'none' ? '' : animation,
        fontSize: fontSize,
        fontColor: fontColor,
      });

      // Filter out empty animation
      if (animation === 'none') params.delete('animation');

      setPreviewUrl(`https://capsule-render.vercel.app/api?${params.toString()}`);
      setIsUpdating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [text, type, color, animation, fontSize, fontColor]);

  const handleCopy = () => {
    const markdown = `![Header](${previewUrl})`;
    navigator.clipboard.writeText(markdown);
    toast.success('Markdown copied to clipboard!');
  };

  const triggerColorPicker = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) input.click();
  };

  return (
    <div className="space-y-6 py-2 text-foreground">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Design Controls */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="header-text" className="flex items-center gap-2">
              <Type className="h-4 w-4 text-primary" />
              Project Title
            </Label>
            <Input
              id="header-text"
              placeholder="e.g. My Awesome Project"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Layout className="h-4 w-4 text-primary" />
                Banner Style
              </Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="z-[300]">
                  {BANNER_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Animation
              </Label>
              <Select value={animation} onValueChange={setAnimation}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent className="z-[300]">
                  {ANIMATIONS.map((a) => (
                    <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-primary" />
                Theme Color (Hex)
              </Label>
              <div className="flex gap-2">
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value.replace('#', ''))}
                  className="font-mono text-xs bg-background shrink"
                />
                <input
                  type="color"
                  id="header-color-picker"
                  className="sr-only"
                  onChange={(e) => setColor(e.target.value.replace('#', ''))}
                  value={color.startsWith('#') ? color : `#${color}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-10 h-10 p-0 shrink-0 overflow-hidden bg-background hover:bg-muted"
                  onClick={() => triggerColorPicker('header-color-picker')}
                >
                  <div className="w-full h-full" style={{ backgroundColor: `#${color}` }} />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-primary" />
                Font Color (Hex)
              </Label>
              <div className="flex gap-2">
                <Input
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value.replace('#', ''))}
                  className="font-mono text-xs bg-background shrink"
                />
                <input
                  type="color"
                  id="font-color-picker"
                  className="sr-only"
                  onChange={(e) => setFontColor(e.target.value.replace('#', ''))}
                  value={fontColor.startsWith('#') ? fontColor : `#${fontColor}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-10 h-10 p-0 shrink-0 overflow-hidden bg-background hover:bg-muted"
                  onClick={() => triggerColorPicker('font-color-picker')}
                >
                  <div className="w-full h-full" style={{ backgroundColor: `#${fontColor}` }} />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="font-size" className="flex items-center gap-2">
              <Type className="h-4 w-4 text-primary" />
              Font Size
            </Label>
            <Input
              id="font-size"
              type="number"
              min="10"
              max="200"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="bg-background"
            />
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Live Preview</Label>
              {isUpdating && <span className="text-[10px] text-muted-foreground animate-pulse">Generating SVG...</span>}
            </div>
            <div className="h-[140px] rounded-xl border border-border bg-muted/30 flex items-center justify-center p-4 relative overflow-hidden group">
              {/* Grid Pattern Background for transparency check */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '15px 15px' }} />

              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Header Preview"
                  className={`relative z-10 max-w-full h-auto transition-all duration-300 ${isUpdating ? 'opacity-50 grayscale' : 'opacity-100'}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://img.shields.io/badge/error-api_unavailable-red';
                  }}
                />
              )}

              {previewUrl && (
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => window.open(previewUrl, '_blank')}>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quick Presets</Label>
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
          className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
          onClick={() => previewUrl && onAddHeader(previewUrl, text)}
        >
          <Wand2 className="h-4 w-4" />
          Add to README
        </Button>
      </div>
    </div>
  );
}
