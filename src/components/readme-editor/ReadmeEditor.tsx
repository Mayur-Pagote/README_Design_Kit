import React, { useState } from 'react';
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
import { 
  Code2, 
  Eye, 
  MessageSquare, 
  Download, 
  Copy, 
  Settings, 
  Sparkles,
  Bot
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { readmeAI } from '@/services/readmeAIService';

interface ReadmeEditorProps {
  className?: string;
}

export const ReadmeEditor: React.FC<ReadmeEditorProps> = ({ className }) => {
  const [markdownContent, setMarkdownContent] = useState<string>('# My Awesome Project\n\nWelcome to my project! This README was generated with AI assistance.\n\n## 🚀 Features\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n## 🛠️ Installation\n\n```bash\nnpm install\n```\n\n## 📝 Usage\n\n```javascript\nconst example = "Hello World";\nconsole.log(example);\n```\n\n## 🤝 Contributing\n\nContributions are welcome! Please feel free to submit a Pull Request.\n\n## 📄 License\n\nThis project is licensed under the MIT License.');
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }>>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [isAutoTyping, setIsAutoTyping] = useState(false);

  const handleMarkdownChange = (content: string) => {
    setMarkdownContent(content);
  };

  // Auto-typing effect for applying AI generated content
  const autoTypeContent = async (newContent: string) => {
    setIsAutoTyping(true);
    setActiveTab('code'); // Switch to code tab
    
    // Clear current content first
    setMarkdownContent('');
    
    // Type character by character with variable speed
    const lines = newContent.split('\n');
    let currentContent = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Add the line character by character
      for (let j = 0; j <= line.length; j++) {
        currentContent = lines.slice(0, i).join('\n') + (i > 0 ? '\n' : '') + line.slice(0, j);
        setMarkdownContent(currentContent);
        
        // Variable typing speed - slower for special characters
        const char = line[j];
        let delay = 20;
        if (char === '#' || char === '*' || char === '`') delay = 100;
        else if (char === ' ') delay = 30;
        else if (char === '\n') delay = 150;
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      // Add newline at end of each line (except last)
      if (i < lines.length - 1) {
        currentContent += '\n';
        setMarkdownContent(currentContent);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    setIsAutoTyping(false);
    
    // Auto-switch to preview after typing is complete
    setTimeout(() => {
      setActiveTab('preview');
      toast.success('Content applied! Switch to code tab to edit further.');
    }, 500);
  };

  const handleChatMessage = async (message: string) => {
    setIsGenerating(true);
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

      // Determine the type of request and use appropriate AI method
      let aiResponse: string;
      
      if (message.toLowerCase().includes('create') || message.toLowerCase().includes('generate')) {
        // Generate new content
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
        toast.success('Content automatically applied to editor!');
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
              Powered by Gemini
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
            
            <Button variant="outline" size="sm" onClick={handleCopyMarkdown}>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleDownloadMarkdown}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
              <Settings className="h-4 w-4" />
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
                <div className="flex items-center space-x-1">
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    isGenerating ? "bg-orange-500 animate-pulse" : "bg-green-500"
                  )}></div>
                  <span className="text-xs text-muted-foreground">
                    {isGenerating ? "Generating..." : "Ready"}
                  </span>
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
                      className="h-full"
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
    </div>
  );
};

export default ReadmeEditor;
