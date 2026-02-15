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
import { Copy, Heart, Coffee, Shield, CreditCard, Palette, Layout, Ghost } from 'lucide-react';
import { toast } from 'sonner';

interface SupportStudioMakerProps {
  onAddElements: (elements: any[]) => void;
}

const SUPPORT_PLATFORMS = [
  { id: 'github-sponsors', label: 'GitHub Sponsors', icon: <Shield className="h-4 w-4" />, color: 'EA4AAA' },
  { id: 'buy-me-a-coffee', label: 'Buy Me a Coffee', icon: <Coffee className="h-4 w-4" />, color: 'FFDD00' },
  { id: 'ko-fi', label: 'Ko-fi', icon: <Heart className="h-4 w-4" />, color: 'FF5E5B' },
  { id: 'patreon', label: 'Patreon', icon: <Ghost className="h-4 w-4" />, color: 'F96854' },
  { id: 'paypal', label: 'PayPal', icon: <CreditCard className="h-4 w-4" />, color: '003087' },
];

const BADGE_STYLES = [
  { label: 'Flat', value: 'flat' },
  { label: 'Flat Square', value: 'flat-square' },
  { label: 'For the Badge', value: 'for-the-badge' },
  { label: 'Plastic', value: 'plastic' },
  { label: 'Social', value: 'social' },
];

export default function SupportStudioMaker({ onAddElements }: SupportStudioMakerProps) {
  const [platformData, setPlatformData] = useState<Record<string, string>>({
    'github-sponsors': '',
    'buy-me-a-coffee': '',
    'ko-fi': '',
    'patreon': '',
    'paypal': '',
  });

  const [globalColor, setGlobalColor] = useState('EA4AAA');
  const [useGlobalColor, setUseGlobalColor] = useState(false);
  const [badgeStyle, setBadgeStyle] = useState('for-the-badge');
  const [previews, setPreviews] = useState<Record<string, string>>({});

  // helper to escape Shields.io strings
  const escapeShields = (str: string) => {
    return str
      .replace(/-/g, '--')
      .replace(/_/g, '__')
      .replace(/\s+/g, '_');
  };

  useEffect(() => {
    const newPreviews: Record<string, string> = {};
    SUPPORT_PLATFORMS.forEach(p => {
      const username = platformData[p.id];
      if (username) {
        const color = useGlobalColor ? globalColor : p.color;
        // Construct Shields.io URLs for support badges
        // Use the id directly as logo name, as it matches SimpleIcons slugs (ko-fi, buy-me-a-coffee)
        const logoName = p.id;
        const escapedLabel = escapeShields(p.label);
        const escapedStatus = escapeShields(username);
        newPreviews[p.id] = `https://img.shields.io/badge/${escapedLabel}-${escapedStatus}-${color}?style=${badgeStyle}&logo=${logoName}&logoColor=white`;
      }
    });
    setPreviews(newPreviews);
  }, [platformData, globalColor, useGlobalColor, badgeStyle]);

  const handleInputChange = (id: string, value: string) => {
    setPlatformData(prev => ({ ...prev, [id]: value }));
  };

  const handleAddAll = () => {
    const elementsToAdd = SUPPORT_PLATFORMS
      .filter(p => platformData[p.id])
      .map(p => ({
        id: `${p.id}-${Date.now()}`,
        type: 'image',
        src: previews[p.id],
        alt: p.label,
        width: 'auto',
        height: '35',
        hiddenFor: [],
      }));

    if (elementsToAdd.length > 0) {
      onAddElements(elementsToAdd);
      toast.success(`Added ${elementsToAdd.length} support badges!`);
    } else {
      toast.error('Please enter at least one platform ID.');
    }
  };

  const triggerColorPicker = () => {
    const input = document.getElementById('global-color-picker') as HTMLInputElement;
    if (input) input.click();
  };

  return (
    <div className="space-y-6 py-2 text-foreground">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Configuration */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Layout className="h-4 w-4" /> Platforms Configuration
            </Label>
            {SUPPORT_PLATFORMS.map((p) => (
              <div key={p.id} className="space-y-1.5 animate-in slide-in-from-left-2 duration-300">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 rounded bg-muted">
                    {p.icon}
                  </div>
                  <Label htmlFor={p.id} className="text-sm font-medium">{p.label}</Label>
                </div>
                <Input
                  id={p.id}
                  placeholder={`Your ${p.label} username/ID`}
                  value={platformData[p.id]}
                  onChange={(e) => handleInputChange(p.id, e.target.value)}
                  className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Styling & Preview */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Palette className="h-4 w-4" /> Global Styling
            </Label>

            <div className="space-y-3 p-4 rounded-xl border border-border bg-muted/20">
              <div className="flex items-center justify-between">
                <Label htmlFor="use-global-color" className="cursor-pointer">Unified Branding Color</Label>
                <div
                  className={`w-10 h-5 rounded-full transition-all cursor-pointer relative ${useGlobalColor ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                  onClick={() => setUseGlobalColor(!useGlobalColor)}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${useGlobalColor ? 'left-5.5' : 'left-0.5'}`} />
                </div>
              </div>

              {useGlobalColor && (
                <div className="flex gap-2 animate-in fade-in zoom-in-95 duration-200">
                  <Input
                    value={globalColor}
                    onChange={(e) => setGlobalColor(e.target.value.replace('#', ''))}
                    className="font-mono text-xs bg-background shrink"
                  />
                  <input
                    type="color"
                    id="global-color-picker"
                    className="sr-only"
                    onChange={(e) => setGlobalColor(e.target.value.replace('#', ''))}
                    value={globalColor.startsWith('#') ? globalColor : `#${globalColor}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-10 h-10 p-0 shrink-0 overflow-hidden bg-background hover:bg-muted"
                    onClick={triggerColorPicker}
                  >
                    <div className="w-full h-full" style={{ backgroundColor: `#${globalColor}` }} />
                  </Button>
                </div>
              )}

              <div className="space-y-2 pt-2">
                <Label>Badge Style</Label>
                <Select value={badgeStyle} onValueChange={setBadgeStyle}>
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
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Live Branding Preview</Label>
            <div className="min-h-[140px] p-6 rounded-xl border border-dashed border-border flex flex-col items-center justify-center gap-3 bg-muted/10 relative overflow-hidden group">
              {/* Pattern Background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '15px 15px' }} />

              {Object.keys(previews).length > 0 ? (
                <div className="flex flex-wrap justify-center gap-3 relative z-10 w-full animate-in fade-in duration-500">
                  {SUPPORT_PLATFORMS.map(p => previews[p.id] && (
                    <img key={p.id} src={previews[p.id]} alt={p.label} className="h-8 shadow-sm hover:scale-105 transition-transform cursor-help" title={`${p.label}: ${platformData[p.id]}`} />
                  ))}
                </div>
              ) : (
                <div className="text-center space-y-2 opacity-40">
                  <Ghost className="h-10 w-10 mx-auto" />
                  <p className="text-xs">Enter IDs to see your branded suite</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 flex flex-col sm:flex-row gap-3 border-t border-border/50">
        <Button
          type="button"
          variant="outline"
          className="flex-1 gap-2 border-border/50 text-foreground hover:bg-muted/50"
          onClick={() => {
            const markdown = Object.values(previews).map(url => `![](${url})`).join(' ');
            navigator.clipboard.writeText(markdown);
            toast.success('Suite Markdown copied!');
          }}
          disabled={Object.keys(previews).length === 0}
        >
          <Copy className="h-4 w-4" />
          Copy Suite
        </Button>
        <Button
          type="button"
          className="flex-1 gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 shadow-lg"
          onClick={handleAddAll}
          disabled={Object.keys(previews).length === 0}
        >
          <Heart className="h-4 w-4 fill-white" />
          Add Suite to README
        </Button>
      </div>
    </div>
  );
}
