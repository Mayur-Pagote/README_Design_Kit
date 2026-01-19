import {
  README_EXPORT_PRESETS,
  type ReadmeExportPreset,
} from '@/config/readmeExportPresets';
import { generateMarkdown as generateMarkdownUtil } from '@/utils/markdownGenerator';
import { useRef, useState } from 'react';
import { Download, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ElementRenderer } from '@/components/ElementRenderer';
import type { ElementType } from '@/types/elements';
import { useTheme } from '@/components/theme-provider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';

interface ReadmePreviewProps {
  elements: ElementType[];
  preset: ReadmeExportPreset;
  onPresetChange: (preset: ReadmeExportPreset) => void;
}

export function ReadmePreview({
  elements,
  preset,
  onPresetChange,
}: ReadmePreviewProps) {
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const filteredElements =
    preset === 'default'
      ? elements
      : elements.filter((el) =>
        README_EXPORT_PRESETS[preset]?.allowedTypes.includes(el.type)
      );

  const generateMarkdown = (): string =>
    generateMarkdownUtil(filteredElements, theme);

  const copyToClipboard = async () => {
    const markdown = generateMarkdown();
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadMarkdown = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getViewModeDescription = () => {
    return 'Shows all README elements with complete formatting and styling';
  };

  return (
    <div className="h-full flex flex-col">
      <div className={`border-b border-border p-3 md:p-4 bg-muted/50 ${isMobile ? 'mt-6' : ''}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-base md:text-lg">README Preview</h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <select
              className="border rounded px-2 py-1.5 text-xs md:text-sm bg-background flex-1 sm:flex-initial min-w-[140px]"
              value={preset}
              onChange={(e) =>
                onPresetChange(e.target.value as ReadmeExportPreset)
              }
            >
              <option value="default">Default Export</option>
              <option value="openSource">Open Source</option>
              <option value="personal">Personal / Portfolio</option>
              <option value="professional">Professional</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              disabled={!filteredElements.length}
              className="flex-1 sm:flex-initial touch-manipulation"
            >
              <Copy className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="ml-1.5">Copy</span>
            </Button>

            {copied && <span className="text-green-500 text-xs md:text-sm">Copied!</span>}

            <Button
              variant="outline"
              size="sm"
              onClick={downloadMarkdown}
              disabled={!filteredElements.length}
              className="flex-1 sm:flex-initial touch-manipulation"
            >
              <Download className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="ml-1.5">Download</span>
            </Button>
          </div>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground">{getViewModeDescription()}</p>
      </div>

      <Tabs defaultValue="preview" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 w-fit">
          <TabsTrigger value="preview">Visual Preview</TabsTrigger>
          <TabsTrigger value="markdown">Markdown Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="flex-1 overflow-auto p-4">
          <div
            ref={previewRef}
            className="p-10 rounded-2xl shadow-xl max-w-4xl mx-auto border"
            style={{
              background: isDark ? '#18181b' : '#ffffff',
              fontFamily: 'Inter, sans-serif',
              color: isDark ? '#f3f4f6' : '#1e293b',
              lineHeight: '1.75',
            }}
          >
            {filteredElements.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <p className="text-2xl font-semibold mb-3">Your README is empty</p>
                <p className="text-sm text-gray-500">Add elements from the sidebar to get started</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredElements.map((element) => (
                  <ElementRenderer key={element.id} element={element} isPreview />
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="markdown" className="p-6 whitespace-pre-wrap font-mono text-sm">
          {generateMarkdown()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
