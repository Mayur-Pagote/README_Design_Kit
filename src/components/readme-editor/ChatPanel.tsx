import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check,
  Loader2,
  MessageSquare,
  Zap,
  FileText,
  Code2
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { readmeAI } from '@/services/readmeAIService';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatPanelProps {
  onMessage: (message: string) => void;
  onApplyGeneration: (markdown: string) => void;
  isGenerating: boolean;
  chatHistory: ChatMessage[];
}

const SUGGESTED_PROMPTS = [
  "Create a README for a React web application",
  "Add installation and usage instructions",
  "Generate a professional project description",
  "Add badges and tech stack section",
  "Create contributing guidelines",
  "Add API documentation section"
];

export const ChatPanel: React.FC<ChatPanelProps> = ({
  onMessage,
  onApplyGeneration,
  isGenerating,
  chatHistory
}) => {
  const [inputValue, setInputValue] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatHistory, isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isGenerating) {
      onMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    if (!isGenerating) {
      onMessage(prompt);
    }
  };

  const handleCopyMessage = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const extractMarkdownFromMessage = (content: string): string | null => {
    const markdownMatch = content.match(/```markdown\n([\s\S]*?)\n```/);
    return markdownMatch ? markdownMatch[1] : null;
  };

  const handleApplyMarkdown = (content: string) => {
    const extractedMarkdown = extractMarkdownFromMessage(content);
    if (extractedMarkdown) {
      onApplyGeneration(extractedMarkdown);
    } else {
      // If no markdown code block, use the entire message as markdown
      onApplyGeneration(content);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Chat Messages */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {chatHistory.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Welcome to AI README Editor</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Chat with AI to generate, improve, and customize your README. 
                    Start with a suggestion below or ask anything!
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {chatHistory.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex gap-3",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.role === 'assistant' && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}

                <Card className={cn(
                  "max-w-[85%] transition-colors",
                  message.role === 'user' 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted/50 hover:bg-muted/70"
                )}>
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {message.role === 'assistant' ? (
                          <div className="text-sm leading-relaxed">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs opacity-70">
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleCopyMessage(message.content, index)}
                          >
                            {copiedIndex === index ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                          
                          {message.role === 'assistant' && extractMarkdownFromMessage(message.content) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs"
                              onClick={() => handleApplyMarkdown(message.content)}
                            >
                              <Code2 className="h-3 w-3 mr-1" />
                              Apply
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {message.role === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 justify-start"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <Card className="bg-muted/50">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
        </ScrollArea>
      </div>

      {/* Suggested Prompts */}
      {chatHistory.length === 0 && (
        <div className="p-4 border-t bg-muted/30">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
              <Zap className="h-4 w-4" />
              <span>Quick Start</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {SUGGESTED_PROMPTS.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start h-auto py-2 px-3 text-left whitespace-normal"
                  onClick={() => handleSuggestedPrompt(prompt)}
                  disabled={isGenerating}
                >
                  <FileText className="h-3 w-3 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs">{prompt}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask AI to help with your README... (Press Enter to send, Shift+Enter for new line)"
              className="min-h-[60px] max-h-[120px] resize-none pr-12"
              disabled={isGenerating}
            />
            <Button
              type="submit"
              size="sm"
              className="absolute bottom-2 right-2 h-8 w-8 p-0"
              disabled={!inputValue.trim() || isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Tip: Be specific about what you want in your README for better results
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
