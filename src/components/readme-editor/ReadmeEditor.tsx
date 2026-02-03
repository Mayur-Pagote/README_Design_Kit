import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatPanel } from './ChatPanel';
import { MarkdownPreview } from './MarkdownPreview';
import { CodeEditor } from './CodeEditor';
import { APIKeySettings } from './APIKeySettings';
import domtoimage from 'dom-to-image-more';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { formatDistanceToNow } from 'date-fns';
import { GitHubLoadDialog } from './GitHubLoadDialog';
import { getRepoReadme, createGist } from '@/services/githubService';
import {
  Code2,
  Eye,
  MessageSquare,
  Download,
  Copy,
  Settings,
  Sparkles,
  Bot,
  Home,
  Check,
  X,
  RotateCcw,
  Image as ImageIcon,
  Github,
  CheckCircle2,
  Share2,
  ChevronDown,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { readmeAI } from '@/services/readmeAIService';
import { webSearchService } from '@/services/webSearchService';
import { githubReadmeGenerator } from '@/services/githubReadmeGeneratorService';
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

const defaultMarkdown ='# My Awesome Project\n\nWelcome to my project! This README was generated with AI assistance.\n\n## 🚀 Features\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n## 🛠️ Installation\n\n```bash\nnpm install\n```\n\n## 📝 Usage\n\n```javascript\nconst example = "Hello World";\nconsole.log(example);\n```\n\n## 🤝 Contributing\n\nContributions are welcome! Please feel free to submit a Pull Request.\n\n## 📄 License\n\nThis project is licensed under the MIT License.';

export const ReadmeEditor: React.FC<ReadmeEditorProps> = ({ className }) => {
  const [markdownContent, setMarkdownContent] = useLocalStorage<string>('readme-editor-content', defaultMarkdown);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }>
  >([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showGithubDialog, setShowGithubDialog] = useState(false);
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const autoTypingCancelled = useRef(false);
  const generationCancelled = useRef(false);
  const [, setTick] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const updateApiKey = () => {
      const apiKey = localStorage.getItem('gemini_api_key');
      if (apiKey) {
        githubReadmeGenerator.setApiKey(apiKey);
      }
    };

    updateApiKey();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'gemini_api_key') {
        updateApiKey();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const handleApiKeyUpdate = () => {
      updateApiKey();
    };

    window.addEventListener('gemini-api-key-updated', handleApiKeyUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('gemini-api-key-updated', handleApiKeyUpdate);
    };
  }, []);

  const handleMarkdownChange = (content: string) => {
    setMarkdownContent(content);
    setLastSaved(new Date());
  };

  const autoTypeContent = async (newContent: string) => {
    setIsAutoTyping(true);
    autoTypingCancelled.current = false;
    setActiveTab('code');

    setMarkdownContent(newContent);
    setLastSaved(new Date());
    setIsAutoTyping(false);

    setTimeout(() => {
      setActiveTab('preview');
      toast.success('Content applied! Switch to code tab to edit further.');
    }, 50);
  };

  const handleChatMessage = async (message: string) => {
    setIsGenerating(true);
    generationCancelled.current = false;
    const newUserMessage = { role: 'user' as const, content: message, timestamp: new Date() };
    setChatHistory((prev) => [...prev, newUserMessage]);

    try {
      if (!readmeAI.isConfigured()) {
        const errorMessage = {
          role: 'assistant' as const,
          content:
            'I need a Gemini API key to help you. Please configure your API key in the settings to enable AI features.',
          timestamp: new Date(),
        };
        setChatHistory((prev) => [...prev, errorMessage]);
        setIsGenerating(false);
        toast.error('Gemini API key not configured');
        return;
      }

      let aiResponse: string;

      const githubUrlMatch = message.match(/https:\/\/github\.com\/[a-zA-Z0-9-._]+\/[a-zA-Z0-9-._]+/);
      if (githubUrlMatch && (message.toLowerCase().includes('analyze') || message.toLowerCase().includes('generate'))) {
        const repoUrl = githubUrlMatch[0];
        toast.info(`Analyzing GitHub repository: ${repoUrl}`);

        try {
          const githubToken = localStorage.getItem('github-token') || undefined;
          const result = await githubReadmeGenerator.generateRepoDocs(repoUrl, githubToken);
          aiResponse = result.documentation;
          toast.success('GitHub repository analysis complete!');
        } catch (error) {
          console.warn('GitHub analysis failed, falling back to standard generation:', error);
          if (message.toLowerCase().includes('create') || message.toLowerCase().includes('generate')) {
            aiResponse = await readmeAI.generateReadmeContent(message, {
              currentReadme: markdownContent,
              projectType: 'web application',
            });
          } else {
            aiResponse = await readmeAI.answerReadmeQuestion(message, markdownContent);
          }
        }
      } else {
        const usernameMatch = message.match(/(?:github\.com\/|@|user(?:name)?\s+)([a-zA-Z0-9-_]+)/i);
        const mentionsProfile =
          message.toLowerCase().includes('profile') ||
          message.toLowerCase().includes('github') ||
          message.toLowerCase().includes('linkedin') ||
          usernameMatch;

        if (mentionsProfile && usernameMatch) {
          const username = usernameMatch[1];
          toast.info(`Searching for ${username}'s profile across platforms...`);

          try {
            aiResponse = await webSearchService.generatePersonalizedReadme(message, username, true);
            toast.success('Generated personalized README using profile data!');
          } catch (error) {
            console.warn('Enhanced search failed, falling back to standard generation:', error);
            if (message.toLowerCase().includes('create') || message.toLowerCase().includes('generate')) {
              aiResponse = await readmeAI.generateReadmeContent(message, {
                currentReadme: markdownContent,
                projectType: 'web application',
              });
            } else {
              aiResponse = await readmeAI.answerReadmeQuestion(message, markdownContent);
            }
          }
        } else if (message.toLowerCase().includes('create') || message.toLowerCase().includes('generate')) {
          aiResponse = await readmeAI.generateReadmeContent(message, {
            currentReadme: markdownContent,
            projectType: 'web application',
          });
        } else if (message.toLowerCase().includes('improve') || message.toLowerCase().includes('enhance')) {
          aiResponse = await readmeAI.improveExistingReadme(markdownContent, message);
        } else {
          aiResponse = await readmeAI.answerReadmeQuestion(message, markdownContent);
        }
      }

      if (generationCancelled.current) {
        setIsGenerating(false);
        return;
      }

      const assistantMessage = {
        role: 'assistant' as const,
        content: aiResponse,
        timestamp: new Date(),
      };

      setChatHistory((prev) => [...prev, assistantMessage]);
      setIsGenerating(false);

      if (aiResponse.includes('# ') && aiResponse.includes('## ')) {
        await autoTypeContent(aiResponse);
        toast.success('Reset Successful');
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage = {
        role: 'assistant' as const,
        content: `I encountered an error: ${
          error instanceof Error ? error.message : 'Unknown error occurred'
        }. Please try again or check your API key configuration.`,
        timestamp: new Date(),
      };
      setChatHistory((prev) => [...prev, errorMessage]);
      setIsGenerating(false);
      toast.error('Failed to generate AI response');
    }
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

  const handleApplyAIGeneration = (generatedMarkdown: string) => {
    autoTypeContent(generatedMarkdown);
    toast.success('AI-generated content applied!');
  };

  const handleExportPNG = async () => {
    const element = document.getElementById('readme-preview-content');
    if (!element) {
      toast.error('Switch to Preview tab to export image');
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
          boxShadow: 'none',
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
      toast.error('GitHub token not found. Please configure it in settings.');
      setShowSettings(true);
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
      toast.success(`Successfully loaded README from ${username}/${repo}`);
    } catch (error) {
      console.error('Failed to load README:', error);
      throw error;
    }
  };

  return (
    <div className={cn('h-screen flex flex-col bg-background overflow-hidden', className)}>
      {/* Header */}
      <div className="flex-none border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-12 sm:h-14 items-center px-2 sm:px-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-1">
              <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span className="font-semibold text-base sm:text-lg line-clamp-1">
                AI README Editor
              </span>
            </div>
            <Badge variant="secondary" className="hidden xs:inline-flex text-[10px] sm:text-xs px-1.5 py-0">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by Gemini 2.0 + GitHub
            </Badge>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-auto">
              <TabsList className="grid w-full grid-cols-2 h-8 sm:h-9">
                <TabsTrigger
                  value="code"
                  className="flex items-center space-x-1 px-2 text-xs sm:text-sm"
                >
                  <Code2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Code</span>
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="flex items-center space-x-1 px-2 text-xs sm:text-sm"
                >
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Preview</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Separator orientation="vertical" className="h-6 sm:h-8 hidden xs:block" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-9 sm:px-2 sm:w-auto"
                >
                  <Download className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Export</span>
                  <ChevronDown className="hidden sm:inline h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleCopyMarkdown}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Markdown
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadMarkdown}>
                  <Download className="h-4 w-4 mr-2" />
                  Download MD
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
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-9 sm:px-2 sm:w-auto"
                >
                  <Github className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">GitHub</span>
                  <ChevronDown className="hidden sm:inline h-3 w-3 ml-1" />
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

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
              <Link to="/">
                <Home className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Mobile layout: stacked (AI Assistant on top, Preview/Code below) */}
        <div className="flex h-full flex-col md:hidden overflow-y-auto">
          {/* AI Assistant */}
          <div className="flex-1 border-b">
            <div className="flex items-center justify-between px-2 py-2 sm:px-3 sm:py-3 border-b bg-muted/50">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs sm:text-sm font-medium">AI Assistant</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="relative">
                  {!showResetConfirm ? (
                    <motion.button
                      className="px-2 py-1 text-xs sm:text-sm border rounded-md bg-background flex items-center space-x-1"
                      onClick={() => setShowResetConfirm(true)}
                      initial={{ x: 0 }}
                      animate={{ x: 0 }}
                      exit={{ x: -20 }}
                    >
                      <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden xs:inline">Reset</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      className="flex space-x-1"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => {
                          generationCancelled.current = true;
                          autoTypingCancelled.current = true;
                          setChatHistory([]);
                          setMarkdownContent(defaultMarkdown);
                          setShowResetConfirm(false);
                          toast.success('Chat history cleared!');
                        }}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setShowResetConfirm(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center space-x-1">
                  <div
                    className={cn(
                      'h-2 w-2 rounded-full',
                      isGenerating ? 'bg-orange-500 animate-pulse' : 'bg-green-500'
                    )}
                  />
                  <span className="text-[10px] sm:text-xs text-muted-foreground">
                    {isGenerating ? 'Generating...' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>

            <ChatPanel
              onMessage={handleChatMessage}
              onApplyGeneration={handleApplyAIGeneration}
              isGenerating={isGenerating}
              chatHistory={chatHistory}
            />
          </div>

          {/* Live Preview / Code */}
          <div className="flex-1">
            <div className="flex-none flex items-center justify-between px-2 py-2 sm:px-3 sm:py-3 border-b bg-muted/50">
              <div className="flex items-center space-x-2">
                {activeTab === 'code' ? (
                  <>
                    <Code2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs sm:text-sm font-medium">Markdown Editor</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs sm:text-sm font-medium">Live Preview</span>
                  </>
                )}
              </div>

              <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                <span>Saved</span>
              </div>

              <div className="flex items-center space-x-1">
                <div
                  className={cn(
                    'h-2 w-2 rounded-full',
                    isAutoTyping ? 'bg-orange-500 animate-pulse' : 'bg-green-500'
                  )}
                />
                <span className="text-[10px] sm:text-xs text-muted-foreground">
                  {isAutoTyping ? 'Typing...' : 'Live'}
                </span>
              </div>
            </div>

            <div className="h-full overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'code' && (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <CodeEditor
                      value={markdownContent}
                      onChange={handleMarkdownChange}
                      language="markdown"
                      readOnly={isAutoTyping}
                    />
                  </motion.div>
                )}

                {activeTab === 'preview' && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full overflow-auto bg-background"
                    id="readme-preview-content"
                  >
                    <MarkdownPreview content={markdownContent} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Desktop layout: resizable split (unchanged behaviour) */}
        <ResizablePanelGroup
          direction="horizontal"
          className="hidden md:flex h-full"
        >
          {/* Left - AI Assistant */}
          <ResizablePanel defaultSize={50} minSize={30} className="flex flex-col">
            <div className="h-full overflow-hidden">
              <div className="flex items-center justify-between px-3 py-3 border-b bg-muted/50">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">AI Assistant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    {!showResetConfirm ? (
                      <motion.button
                        className="px-2 py-1 text-sm border rounded-md bg-background flex items-center space-x-1"
                        onClick={() => setShowResetConfirm(true)}
                        initial={{ x: 0 }}
                        animate={{ x: 0 }}
                        exit={{ x: -20 }}
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>Reset</span>
                      </motion.button>
                    ) : (
                      <motion.div
                        className="flex space-x-1"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-2 py-1"
                          onClick={() => {
                            generationCancelled.current = true;
                            autoTypingCancelled.current = true;
                            setChatHistory([]);
                            setMarkdownContent(defaultMarkdown);
                            setShowResetConfirm(false);
                            toast.success('Chat history cleared!');
                          }}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-2 py-1"
                          onClick={() => setShowResetConfirm(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex items-center space-x-1">
                    <div
                      className={cn(
                        'h-2 w-2 rounded-full',
                        isGenerating ? 'bg-orange-500 animate-pulse' : 'bg-green-500'
                      )}
                    />
                    <span className="text-xs text-muted-foreground">
                      {isGenerating ? 'Generating...' : 'Ready'}
                    </span>
                  </div>
                </div>
              </div>

              <ChatPanel
                onMessage={handleChatMessage}
                onApplyGeneration={handleApplyAIGeneration}
                isGenerating={isGenerating}
                chatHistory={chatHistory}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right - Code / Preview */}
          <ResizablePanel defaultSize={50} minSize={30} className="flex flex-col">
            <div className="h-full overflow-hidden flex flex-col">
              <div className="flex-none flex items-center justify-between px-3 py-3 border-b bg-muted/50">
                <div className="flex items-center space-x-2">
                  {activeTab === 'code' ? (
                    <>
                      <Code2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Markdown Editor</span>
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Live Preview</span>
                    </>
                  )}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                  <span>Saved {formatDistanceToNow(lastSaved, { addSuffix: true })}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div
                    className={cn(
                      'h-2 w-2 rounded-full',
                      isAutoTyping ? 'bg-orange-500 animate-pulse' : 'bg-green-500'
                    )}
                  />
                  <span className="text-xs text-muted-foreground">
                    {isAutoTyping ? 'Typing...' : 'Live'}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeTab === 'code' && (
                    <motion.div
                      key="code"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="h-full"
                    >
                      <CodeEditor
                        value={markdownContent}
                        onChange={handleMarkdownChange}
                        language="markdown"
                        readOnly={isAutoTyping}
                      />
                    </motion.div>
                  )}

                  {activeTab === 'preview' && (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="h-full overflow-auto bg-background"
                      id="readme-preview-content"
                    >
                      <MarkdownPreview content={markdownContent} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <APIKeySettings open={showSettings} onOpenChange={setShowSettings} />

      <GitHubLoadDialog
        isOpen={showLoadDialog}
        onClose={() => setShowLoadDialog(false)}
        onLoad={handleLoadFromGithub}
      />

      <SaveToGitHubDialog
        open={showGithubDialog}
        onOpenChange={setShowGithubDialog}
        files={[{ path: 'README.md', content: markdownContent }]}
        defaultMessage="Update README.md created with Readme Design Kit"
      />
    </div>
  );
};

export default ReadmeEditor;
