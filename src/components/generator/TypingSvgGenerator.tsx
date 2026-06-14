import { useState, useCallback, useEffect } from "react"; // Removed 'React' import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  GripVertical,
  Copy,
  RefreshCw,
  // Eye,
  // FileText removed - not being used
} from "lucide-react";
import { toast } from "sonner"; // Changed from useToast to sonner toast

interface TypingLine {
  id: string;
  text: string;
}

interface TypingSvgConfig {
  lines: TypingLine[];
  color: string;
  fontSize: number;
  typingSpeed: number;
  pauseDuration: number;
  loop: boolean;
  showCursor: boolean;
  center: boolean;
  width: number;
  height: number;
  fontFamily: string;
}

const DEFAULT_CONFIG: TypingSvgConfig = {
  lines: [
    { id: "1", text: "Front-End Developer" },
    { id: "2", text: "UI/UX Enthusiast" },
    { id: "3", text: "Open Source Contributor" },
  ],
  color: "#4F46E5",
  fontSize: 24,
  typingSpeed: 100,
  pauseDuration: 1500,
  loop: true,
  showCursor: true,
  center: true,
  width: 500,
  height: 60,
  fontFamily: "Fira Code, monospace",
};

const PRESET_COLORS = [
  "#4F46E5", "#EF4444", "#10B981", "#F59E0B", "#3B82F6",
  "#EC4899", "#8B5CF6", "#06B6D4", "#6B7280", "#000000",
];

const FONT_FAMILIES = [
  { label: "Fira Code", value: "Fira Code" },
  { label: "Courier New", value: "Courier New" },
  { label: "Consolas", value: "Consolas" },
  { label: "Menlo", value: "Menlo" },
  { label: "SF Mono", value: "SF Mono" },
];

const SPEED_PRESETS = {
  "Very Slow": 200,
  "Slow": 150,
  "Medium": 100,
  "Fast": 50,
  "Very Fast": 25,
};

export function TypingSvgGenerator() {
  const [config, setConfig] = useState<TypingSvgConfig>(DEFAULT_CONFIG);
  const [markdownCode, setMarkdownCode] = useState<string>("");
  // const [previewError, setPreviewError] = useState<boolean>(false);

  const generateSvgUrl = useCallback(() => {
  const validLines = config.lines
    .map((line) => line.text.trim())
    .filter(Boolean);

  const customEncode = (str: string) =>
    encodeURIComponent(str)
      .replace(/%3B/g, ";")
      .replace(/%20/g, "+");

  const separator = ";";

  const query = [
    `font=${customEncode(config.fontFamily)}`,
    `size=${config.fontSize}`,
    `pause=${config.pauseDuration}`,
    `color=${config.color.replace("#", "")}`,
    `center=${config.center}`,
    `vCenter=true`,
    `width=${config.width}`,
    `height=${config.height}`,
    `repeat=${config.loop}`,
    `separator=${separator}`,
    `lines=${customEncode(validLines.join(separator))}`,
  ].join("&");
    
    return `https://readme-typing-svg.demolab.com?$query)}`;
  }, [config]);

  const generateMarkdown = useCallback(() => {
    const svgUrl = generateSvgUrl();
    const markdown = `[![Typing SVG](${svgUrl})](https://git.io/typing-svg)`;
    setMarkdownCode(markdown);
    return markdown;
  }, [generateSvgUrl]);

  const addLine = () => {
    const newLine = {
      id: Date.now().toString(),
      text: "New Line",
    };
    setConfig((prev) => ({
      ...prev,
      lines: [...prev.lines, newLine],
    }));
  };

  const removeLine = (id: string) => {
    if (config.lines.length <= 1) {
      toast.error("Cannot remove", {
        description: "You need at least one line of text",
      });
      return;
    }
    setConfig((prev) => ({
      ...prev,
      lines: prev.lines.filter((line) => line.id !== id),
    }));
  };

  const updateLineText = (id: string, text: string) => {
    setConfig((prev) => ({
      ...prev,
      lines: prev.lines.map((line) =>
        line.id === id ? { ...line, text } : line
      ),
    }));
  };

  const moveLineUp = (index: number) => {
    if (index === 0) return;
    const newLines = [...config.lines];
    [newLines[index], newLines[index - 1]] = [newLines[index - 1], newLines[index]];
    setConfig({ ...config, lines: newLines });
  };

  const moveLineDown = (index: number) => {
    if (index === config.lines.length - 1) return;
    const newLines = [...config.lines];
    [newLines[index], newLines[index + 1]] = [newLines[index + 1], newLines[index]];
    setConfig({ ...config, lines: newLines });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdownCode);
      toast.success("Copied!", {
        description: "Markdown code copied to clipboard",
      });
    } catch (err) {
      toast.error("Error", {
        description: "Failed to copy to clipboard",
      });
    }
  };

  const resetToDefault = () => {
    setConfig(DEFAULT_CONFIG);
    toast.success("Reset", {
      description: "Settings reset to default",
    });
  };

  useEffect(() => {
    generateMarkdown();
    setPreviewError(false);
  }, [config, generateMarkdown]);

  // Handle preview image error
  //const handlePreviewError = () => {
  //setPreviewError(true);
  //};

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-7xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Typing SVG Generator</h1>
        <p className="text-muted-foreground">
          Create animated typing SVGs for your GitHub README profile with live preview
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Panel - Configuration */}
        <div className="space-y-6">
          {/* Text Lines Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Text Lines</span>
                <Button onClick={addLine} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Line
                </Button>
              </CardTitle>
              <CardDescription>
                Add, remove, or reorder the lines to be typed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {config.lines.map((line, index) => (
                  <div key={line.id} className="flex items-center gap-2 p-2 border rounded-lg">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                    <Input
                      value={line.text}
                      onChange={(e) => updateLineText(line.id, e.target.value)}
                      placeholder="Enter text..."
                      className="flex-1"
                    />
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveLineUp(index)}
                        disabled={index === 0}
                        className="h-8 w-8"
                      >
                        ↑
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveLineDown(index)}
                        disabled={index === config.lines.length - 1}
                        className="h-8 w-8"
                      >
                        ↓
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLine(line.id)}
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Typography Section */}
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Customize text appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Text Color</Label>
                <div className="flex gap-2 mt-2 flex-wrap items-center">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        config.color === color
                          ? "border-primary scale-110 ring-2 ring-primary ring-offset-2"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setConfig({ ...config, color })}
                    />
                  ))}
                  <Input
                    type="color"
                    value={config.color}
                    onChange={(e) => setConfig({ ...config, color: e.target.value })}
                    className="w-12 h-8 p-1"
                  />
                </div>
              </div>

              <div>
                <Label>Font Size: {config.fontSize}px</Label>
                <Slider
                  value={[config.fontSize]}
                  onValueChange={([value]) => setConfig({ ...config, fontSize: value })}
                  min={12}
                  max={48}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Font Family</Label>
                <Select
                  value={config.fontFamily}
                  onValueChange={(value) => setConfig({ ...config, fontFamily: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_FAMILIES.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Animation Settings Section */}
          <Card>
            <CardHeader>
              <CardTitle>Animation Settings</CardTitle>
              <CardDescription>Control the typing animation behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Typing Speed</Label>
                <Select
                  value={config.typingSpeed.toString()}
                  onValueChange={(value) => {
                    const speed = parseInt(value);
                    setConfig({ ...config, typingSpeed: speed });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SPEED_PRESETS).map(([name, speed]) => (
                      <SelectItem key={name} value={speed.toString()}>
                        {name} ({speed}ms)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-2">
                  <Slider
                    value={[config.typingSpeed]}
                    onValueChange={([value]) => setConfig({ ...config, typingSpeed: value })}
                    min={20}
                    max={200}
                    step={5}
                  />
                </div>
              </div>

              <div>
                <Label>Pause Duration: {config.pauseDuration}ms</Label>
                <Slider
                  value={[config.pauseDuration]}
                  onValueChange={([value]) => setConfig({ ...config, pauseDuration: value })}
                  min={500}
                  max={5000}
                  step={100}
                  className="mt-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Loop Animation</Label>
                <Switch
                  checked={config.loop}
                  onCheckedChange={(checked) => setConfig({ ...config, loop: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Show Cursor</Label>
                <Switch
                  checked={config.showCursor}
                  onCheckedChange={(checked) => setConfig({ ...config, showCursor: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Center Text</Label>
                <Switch
                  checked={config.center}
                  onCheckedChange={(checked) => setConfig({ ...config, center: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Dimensions Section */}
          <Card>
            <CardHeader>
              <CardTitle>Dimensions</CardTitle>
              <CardDescription>Adjust the SVG canvas size</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Width: {config.width}px</Label>
                <Slider
                  value={[config.width]}
                  onValueChange={([value]) => setConfig({ ...config, width: value })}
                  min={300}
                  max={800}
                  step={10}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Height: {config.height}px</Label>
                <Slider
                  value={[config.height]}
                  onValueChange={([value]) => setConfig({ ...config, height: value })}
                  min={30}
                  max={150}
                  step={5}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Preview & Code */}
        <div className="space-y-6">
          {/* Live Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Live Preview</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetToDefault}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateMarkdown()}
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>See your typing SVG in action</CardDescription>
            </CardHeader>
            <CardContent>
              
              <div className="flex items-center justify-center min-h-[200px] border rounded-lg p-6 bg-muted/20">
                
                  <img
                    key={generateSvgUrl()}
                    src={generateSvgUrl()}
                    alt="Typing SVG Preview"
                    className="max-w-full bg-transparent"
                  />
                
              </div>
            </CardContent>
          </Card>

          {/* Markdown Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Markdown Code</span>
                <Button onClick={copyToClipboard}>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Code
                </Button>
              </CardTitle>
              <CardDescription>
                Copy this code and paste it into your GitHub README
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm whitespace-pre-wrap break-all">
                  {markdownCode}
                </code>
              </pre>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Add multiple lines to create a typing animation sequence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Use the up/down arrows to reorder the animation sequence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Adjust typing speed to control the animation tempo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Enable loop for continuous animation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Preview updates automatically as you make changes</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
