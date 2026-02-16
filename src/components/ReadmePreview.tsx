import {
  README_EXPORT_PRESETS,
  type ReadmeExportPreset,
} from '@/config/readmeExportPresets';
import { generateMarkdown as generateMarkdownUtil } from '@/utils/markdownGenerator';
import { useRef, useState, useEffect } from 'react';
import { Download, Copy, Share2, Sun, Moon, Eclipse, Undo, Redo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ElementRenderer } from '@/components/ElementRenderer';
import type { ElementType } from '@/types/elements';
import { useTheme } from '@/components/theme-provider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { createGist } from '@/services/githubService';
import { toast } from 'sonner';
import { useHistory } from '@/contexts/HistoryContext';

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
  const { undo, redo, canUndo, canRedo } = useHistory();
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const { theme: globalTheme } = useTheme();
  const isMobile = useIsMobile();

  // Local preview theme state
  const [previewTheme, setPreviewTheme] = useState<'github-light' | 'github-dark' | 'github-dimmed'>('github-dark');

  // Sync preview theme with global theme initially
  useEffect(() => {
    const isGlobalDark = globalTheme === 'dark' ||
      (globalTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setPreviewTheme(isGlobalDark ? 'github-dark' : 'github-light');
  }, [globalTheme]);

  const filteredElements =
    preset === 'default'
      ? elements
      : elements.filter((el) =>
        README_EXPORT_PRESETS[preset]?.allowedTypes.includes(el.type)
      );

  const generateMarkdown = (): string =>
    generateMarkdownUtil(filteredElements, globalTheme);

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

  const handleExportGist = async () => {
    const token = localStorage.getItem('github-token');
    if (!token) {
      toast.error('GitHub token not found. Please configure it in settings.');
      return;
    }

    const markdown = generateMarkdown();
    const promise = createGist(token, markdown);

    toast.promise(promise, {
      loading: 'Creating Gist...',
      success: (data: any) => {
        return (
          <div className="flex flex-col gap-1">
            <span className="font-medium">Gist created successfully!</span>
            <a
              href={data.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary underline py-1"
            >
              View on GitHub
            </a>
          </div>
        );
      },
      error: (err: any) => `Failed to create Gist: ${err.message}`,
    });
  };

  const getViewModeDescription = () => {
    return 'Shows all README elements with complete formatting and styling';
  };

  return (
    <div className="h-full flex flex-col">
      <div className={`border-b border-border p-3 md:p-4 bg-muted/50 ${isMobile ? 'mt-6' : ''}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-4">
            <h3 className="font-medium text-base md:text-lg">README Preview</h3>

            {/* Theme Switcher */}
            <div className="flex items-center bg-background/50 border border-border p-1 rounded-full shadow-inner">
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 rounded-full transition-all duration-300 ${previewTheme === 'github-light' ? 'bg-background shadow-sm text-yellow-500 scale-110' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setPreviewTheme('github-light')}
                title="GitHub Light"
              >
                <Sun className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 rounded-full transition-all duration-300 ${previewTheme === 'github-dimmed' ? 'bg-background shadow-sm text-blue-400 scale-110' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setPreviewTheme('github-dimmed')}
                title="GitHub Dark Dimmed"
              >
                <Eclipse className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 rounded-full transition-all duration-300 ${previewTheme === 'github-dark' ? 'bg-background shadow-sm text-purple-500 scale-110' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setPreviewTheme('github-dark')}
                title="GitHub Dark"
              >
                <Moon className="h-4 w-4" />
              </Button>
            </div>
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

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportGist}
              disabled={!filteredElements.length}
              className="flex-1 sm:flex-initial touch-manipulation"
              title="Export to Gist"
            >
              <Share2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="ml-1.5">Export Gist</span>
            </Button>
          </div>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground">{getViewModeDescription()}</p>
      </div>

      <Tabs defaultValue="preview" className="flex-1 flex flex-col">
        <div className="flex items-center gap-4 mx-4 mt-4">
          <TabsList className="w-fit">
            <TabsTrigger value="preview">Visual Preview</TabsTrigger>
            <TabsTrigger value="markdown">Markdown Code</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-1 bg-muted/50 border border-border p-1 rounded-md shadow-inner">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-sm hover:bg-background hover:shadow-sm transition-all"
              onClick={undo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
            >
              <Undo className="h-3.5 w-3.5" />
            </Button>
            <div className="w-px h-4 bg-border/50 mx-0.5" />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-sm hover:bg-background hover:shadow-sm transition-all"
              onClick={redo}
              disabled={!canRedo}
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <TabsContent value="preview" className="flex-1 overflow-auto p-4">
          <div
            ref={previewRef}
            className={`p-10 rounded-2xl shadow-xl max-w-4xl mx-auto border transition-all duration-500 ${previewTheme}`}
            style={{
              fontFamily: 'Inter, sans-serif',
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
