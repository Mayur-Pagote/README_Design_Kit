import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MarkdownPreview } from './MarkdownPreview';
import { CodeEditor } from './CodeEditor';
import domtoimage from 'dom-to-image-more';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { formatDistanceToNow } from 'date-fns';
import { GitHubLoadDialog } from './GitHubLoadDialog';
import { getRepoReadme, createGist } from '@/services/githubService';
import {
  Code2,
  Eye,
  Download,
  Copy,
  Home,
  Image as ImageIcon,
  Github,
  CheckCircle2,
  Share2,
  ChevronDown
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { SaveToGitHubDialog } from '@/components/github/SaveToGitHubDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ReadmeEditorProps {
  className?: string;
}

const defaultMarkdown = '# My Awesome Project\n\nWelcome to my project! This README was designed with the Readme Design Kit.\n\n## 🚀 Features\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n## 🛠️ Installation\n\n```bash\nnpm install\n```\n\n## 📝 Usage\n\n```javascript\nconst example = "Hello World";\nconsole.log(example);\n```\n\n## 🤝 Contributing\n\nContributions are welcome! Please feel free to submit a Pull Request.\n\n## 📄 License\n\nThis project is licensed under the MIT License.';

export const ReadmeEditor: React.FC<ReadmeEditorProps> = ({ className }) => {
  const [markdownContent, setMarkdownContent] = useLocalStorage<string>('readme-editor-content', defaultMarkdown);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [showGithubDialog, setShowGithubDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [, setTick] = useState(0);

  // Update "time ago" counter every minute
  React.useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleMarkdownChange = (content: string) => {
    setMarkdownContent(content);
    setLastSaved(new Date());
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownContent);
    toast.success('Markdown copied to clipboard!');
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('README.md downloaded!');
  };

  const handleExportPNG = async () => {
    const element = document.getElementById('readme-preview-content');
    if (!element) {
      toast.error("Preview content not found");
      return;
    }
    const scrollWidth = element.scrollWidth;
    const scrollHeight = element.scrollHeight;
    try {
      const canvas = await domtoimage.toPng(element, {
        bgcolor: '#000000',
        width: scrollWidth,
        height: scrollHeight,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          overflow: 'visible',
          maxHeight: 'none',
          border: 'none',
          boxShadow: 'none'
        },
        quality: 1.0,
      });

      const link = document.createElement('a');
      link.download = 'readme-preview.png';
      link.href = canvas;
      link.click();
      toast.success('Preview exported as PNG!');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export image');
    }
  };

  const handleExportGist = async () => {
    const token = localStorage.getItem('github-token');
    if (!token) {
      toast.error('GitHub token not found. Please configure it in GitHub settings.');
      return;
    }

    const promise = createGist(token, markdownContent);

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

  const handleLoadFromGithub = async (username: string, repo: string) => {
    try {
      const readmeContent = await getRepoReadme(username, repo);
      setMarkdownContent(readmeContent);
      setLastSaved(new Date());
      toast.success(`Successfully loaded README from ${username}/${repo}`);
    } catch (error) {
      console.error('Failed to load README:', error);
      throw error;
    }
  };

  return (
    <div className={cn('h-screen flex flex-col bg-background', className)}>
      {/* Header */}
      <div className="flex-none border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-semibold text-lg">README Editor</span>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center text-xs text-muted-foreground mr-4">
              <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
              <span>Saved {formatDistanceToNow(lastSaved, { addSuffix: true })}</span>
            </div>
            
            <Separator orientation="vertical" className="h-8" />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleCopyMarkdown}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Markdown
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadMarkdown}>
                  <Download className="h-4 w-4 mr-2" />
                  Download .md
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportPNG}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Export as PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportGist}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Export Gist
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Github className="h-4 w-4 mr-1" />
                  GitHub
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowLoadDialog(true)}>
                  <Github className="h-4 w-4 mr-2" />
                  Import from GitHub
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowGithubDialog(true)}>
                  <Github className="h-4 w-4 mr-2" />
                  Save to GitHub
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <Home className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Side-by-Side Editor and Preview */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Code Editor */}
          <ResizablePanel defaultSize={50} minSize={30} className="flex flex-col border-r">
            <div className="flex-none flex items-center p-3 border-b bg-muted/50">
              <Code2 className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm font-medium">Markdown Editor</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <CodeEditor
                value={markdownContent}
                onChange={handleMarkdownChange}
                language="markdown"
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel - Live Preview */}
          <ResizablePanel defaultSize={50} minSize={30} className="flex flex-col">
            <div className="flex-none flex items-center p-3 border-b bg-muted/50">
              <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm font-medium">Live Preview</span>
            </div>
            <div 
              className="flex-1 overflow-auto bg-background p-6" 
              id="readme-preview-content"
            >
              <MarkdownPreview content={markdownContent} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* GitHub Dialogs */}
      <GitHubLoadDialog
        isOpen={showLoadDialog}
        onClose={() => setShowLoadDialog(false)}
        onLoad={handleLoadFromGithub}
      />

      <SaveToGitHubDialog
        open={showGithubDialog}
        onOpenChange={setShowGithubDialog}
        files={[{ path: 'README.md', content: markdownContent }]}
        defaultMessage="Update README.md using Readme Design Kit"
      />
    </div>
  );
};

export default ReadmeEditor;
