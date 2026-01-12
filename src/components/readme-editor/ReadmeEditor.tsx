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
import { getRepoReadme } from '@/services/githubService';
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
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { readmeAI } from '@/services/readmeAIService';
import { webSearchService } from '@/services/webSearchService';
import { githubReadmeGenerator } from '@/services/githubReadmeGeneratorService';
import { SaveToGitHubDialog } from '@/components/github/SaveToGitHubDialog';
// import { setFlagsFromString } from 'v8';

interface ReadmeEditorProps {
  className?: string;
}

const defaultMarkdown = '# My Awesome Project\n\nWelcome to my project! This README was generated with AI assistance.\n\n## 🚀 Features\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n## 🛠️ Installation\n\n```bash\nnpm install\n```\n\n## 📝 Usage\n\n```javascript\nconst example = "Hello World";\nconsole.log(example);\n```\n\n## 🤝 Contributing\n\nContributions are welcome! Please feel free to submit a Pull Request.\n\n## 📄 License\n\nThis project is licensed under the MIT License.';

export const ReadmeEditor: React.FC<ReadmeEditorProps> = ({ className }) => {
  const [markdownContent, setMarkdownContent] = useLocalStorage<string>('readme-editor-content', defaultMarkdown);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }>>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showGithubDialog, setShowGithubDialog] = useState(false);
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
const [showLoadDialog, setShowLoadDialog] = useState(false);
  const autoTypingCancelled = useRef(false);
  const generationCancelled = useRef(false);
  const [, setTick] = useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(timer);
  }, []);
  // Configure GitHub README generator with API key
  React.useEffect(() => {
    const updateApiKey = () => {
      const apiKey = localStorage.getItem('gemini_api_key');
      if (apiKey) {
        githubReadmeGenerator.setApiKey(apiKey);
      }
    };

    // Initial setup
    updateApiKey();

    // Listen for storage changes (when API key is updated in settings)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'gemini_api_key') {
        updateApiKey();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events from the same window
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

  // Auto-typing effect for applying AI generated content - instant speed
  const autoTypeContent = async (newContent: string) => {
    setIsAutoTyping(true);
    autoTypingCancelled.current = false;
    setActiveTab('code'); // Switch to code tab

    // Apply content instantly for better user experience
    setMarkdownContent(newContent);
    setLastSaved(new Date());
    setIsAutoTyping(false);

    // Auto-switch to preview after content is applied
    setTimeout(() => {
      setActiveTab('preview');
      toast.success('Content applied! Switch to code tab to edit further.');
    }, 50);
  };

  const handleChatMessage = async (message: string) => {
    setIsGenerating(true);
    generationCancelled.current = false;
    const newUserMessage = { role: 'user' as const, content: message, timestamp: new Date() };
    setChatHistory(prev => [...prev, newUserMessage]);

    try {
      // Check if AI is configured
      if (!readmeAI.isConfigured()) {
        const errorMessage = {
          role: 'assistant' as const,
          content: 'I need a Gemini API key to help you. Please configure your API key in the settings to enable AI features.',
          timestamp: new Date()
        };
        setChatHistory(prev => [...prev, errorMessage]);
        setIsGenerating(false);
        toast.error('Gemini API key not configured');
        return;
      }

      // Enhanced AI response generation with web search grounding
      let aiResponse: string;

      // Check if the message contains a GitHub repository URL for analysis
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
          // Fallback to standard generation
          if (message.toLowerCase().includes('create') || message.toLowerCase().includes('generate')) {
            aiResponse = await readmeAI.generateReadmeContent(message, {
              currentReadme: markdownContent,
              projectType: 'web application'
            });
          } else {
            aiResponse = await readmeAI.answerReadmeQuestion(message, markdownContent);
          }
        }
      } else {
        // Check if the message mentions a username for profile-based generation
        const usernameMatch = message.match(/(?:github\.com\/|@|user(?:name)?\s+)([a-zA-Z0-9-_]+)/i);
        const mentionsProfile = message.toLowerCase().includes('profile') ||
          message.toLowerCase().includes('github') ||
          message.toLowerCase().includes('linkedin') ||
          usernameMatch;

        if (mentionsProfile && usernameMatch) {
          // Use enhanced web search for profile-based README generation
          const username = usernameMatch[1];
          toast.info(`Searching for ${username}'s profile across platforms...`);

          try {
            aiResponse = await webSearchService.generatePersonalizedReadme(message, username, true);
            toast.success('Generated personalized README using profile data!');
          } catch (error) {
            console.warn('Enhanced search failed, falling back to standard generation:', error);
            // Fallback to standard generation
            if (message.toLowerCase().includes('create') || message.toLowerCase().includes('generate')) {
              aiResponse = await readmeAI.generateReadmeContent(message, {
                currentReadme: markdownContent,
                projectType: 'web application'
              });
            } else {
              aiResponse = await readmeAI.answerReadmeQuestion(message, markdownContent);
            }
          }
        } else if (message.toLowerCase().includes('create') || message.toLowerCase().includes('generate')) {
          // Standard content generation
          aiResponse = await readmeAI.generateReadmeContent(message, {
            currentReadme: markdownContent,
            projectType: 'web application'
          });
        } else if (message.toLowerCase().includes('improve') || message.toLowerCase().includes('enhance')) {
          // Improve existing content
          aiResponse = await readmeAI.improveExistingReadme(markdownContent, message);
        } else {
          // Answer questions or provide general help
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
        timestamp: new Date()
      };

      setChatHistory(prev => [...prev, assistantMessage]);
      setIsGenerating(false);

      // Auto-apply and type the content if it's markdown
      if (aiResponse.includes('# ') && aiResponse.includes('## ')) {
        await autoTypeContent(aiResponse);
        toast.success('Reset Successful');
      }

    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage = {
        role: 'assistant' as const,
        content: `I encountered an error: ${error instanceof Error ? error.message : 'Unknown error occurred'}. Please try again or check your API key configuration.`,
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, errorMessage]);
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
    // Auto-apply and type the content
    autoTypeContent(generatedMarkdown);
    toast.success('AI-generated content applied!');
  };
  const handleExportPNG = async () => {
    const element = document.getElementById('readme-preview-content');
    if (!element) {
      toast.error("Switch to Preview tab to export image");
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

  const handleLoadFromGithub = async (username: string, repo: string) => {
    try {
      const readmeContent = await getRepoReadme(username, repo);
      setMarkdownContent(readmeContent);
      // If you implemented the Auto-Save feature, update the timestamp too:
      // setLastSaved(new Date()); 
      toast.success(`Successfully loaded README from ${username}/${repo}`);
    } catch (error) {
      console.error('Failed to load README:', error);
      throw error; // Re-throw so the dialog can show the error
    }
  };

  return (
    <div className={cn('h-screen flex flex-col bg-background', className)}>
      {/* Header */}
      <div className="flex-none border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-semibold text-lg">AI README Editor</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by Gemini 2.0 Flash Lite + GitHub
            </Badge>
           

          </div>

          <div className="flex items-center space-x-2 ml-auto">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="code" className="flex items-center space-x-1">
                  <Code2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Code</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Preview</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Separator orientation="vertical" className="h-6" />
             <Button variant="outline" size="sm" onClick={() => setShowLoadDialog(true)} title="Load from GitHub">
              <Github className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Import</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyMarkdown}>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>

            <Button variant="outline" size="sm" onClick={handleDownloadMarkdown}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPNG} title="Export as PNG">
              <ImageIcon className="h-4 w-4 mr-1" />
              Export PNG

            </Button>

            <Button variant="outline" size="sm" onClick={() => setShowGithubDialog(true)} title="Save to GitHub">
              <Github className="h-4 w-4 mr-1" />
              Save to GitHub
            </Button>

            <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
              <Settings className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="sm">
              <Link to="/">
                <Home className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Fixed Height */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Chat Only */}
          <ResizablePanel defaultSize={50} minSize={30} className="flex flex-col">
            <div className="h-full overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b bg-muted/50">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">AI Assistant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    {!showResetConfirm ? (
                      <motion.button className="px-2 py-1 text-sm border rounded-md bg-background flex items-center space-x-1"
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
                        <Button variant="outline" size="sm" className="px-2 py-1"
                          onClick={() => {
                            generationCancelled.current = true;
                            autoTypingCancelled.current = true;
                            setChatHistory([]);
                            setMarkdownContent(defaultMarkdown);
                            setShowResetConfirm(false);
                            toast.success("Chat history cleared!");
                          }}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="px-2 py-1"
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
                        "h-2 w-2 rounded-full",
                        isGenerating ? "bg-orange-500 animate-pulse" : "bg-green-500"
                      )}
                    ></div>
                    <span className="text-xs text-muted-foreground">
                      {isGenerating ? "Generating..." : "Ready"}
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

          {/* Right Panel - Code/Preview Toggle */}
          <ResizablePanel defaultSize={50} minSize={30} className="flex flex-col">
            <div className="h-full overflow-hidden flex flex-col">
              <div className="flex-none flex items-center justify-between p-3 border-b bg-muted/50">
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
                <div className="flex items-center text-xs text-muted-foreground transition-all duration-500 ease-in-out">
                  <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                  <span className="hidden sm:inline">
                    Saved {formatDistanceToNow(lastSaved, { addSuffix: true })}
                  </span>
                  <span className="sm:hidden">Saved</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    isAutoTyping ? "bg-orange-500 animate-pulse" : "bg-green-500"
                  )}></div>
                  <span className="text-xs text-muted-foreground">
                    {isAutoTyping ? "Typing..." : "Live"}
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

      {/* Settings Modal */}
      <APIKeySettings
        open={showSettings}
        onOpenChange={setShowSettings}
      />

    {/* GitHub Load Modal */}
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
