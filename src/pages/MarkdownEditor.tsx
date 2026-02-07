import { useLocation } from 'react-router-dom';
import MarkdownPreview from '../components/MarkdownPreview';
import MarkdownCode from '../components/MarkdownCode';
import {ResizablePanelGroup, ResizablePanel, ResizableHandle} from '@/components/ui/resizable';
import type { Template } from '@/types/templates';
import { templateCategories } from '@/data/templates';
import { Badge } from '@/components/ui/badge';
import { Calendar, Code2, Github, Settings2, User } from 'lucide-react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const MarkdownEditor = () => {
  const location = useLocation();
  const { template, username: initialUsername, repo: initialRepo } = (location.state as { template: Template, username: string, repo: string }) || {};

  const [username, setUsername] = useState(initialUsername || 'Mayur-Pagote');
  const [repoName, setRepoName] = useState(initialRepo || 'README_Design_Kit');
  
  const usernameTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const repoNameTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSetUsername = useCallback((value: string) => {
    if (usernameTimeoutRef.current) clearTimeout(usernameTimeoutRef.current);
    usernameTimeoutRef.current = setTimeout(() => {
      setUsername(value);
    }, 300);
  }, []);

  const debouncedSetRepoName = useCallback((value: string) => {
    if (repoNameTimeoutRef.current) clearTimeout(repoNameTimeoutRef.current as unknown as number);
    repoNameTimeoutRef.current = setTimeout(() => {
      setRepoName(value);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (usernameTimeoutRef.current) clearTimeout(usernameTimeoutRef.current as unknown as number);
      if (repoNameTimeoutRef.current) clearTimeout(repoNameTimeoutRef.current as unknown as number);
    };
  }, []);

  const categoryLabel = templateCategories.find(c => c.value === template.category)?.label;

  const markdownContent = template?.markdown || '# No template selected';
  
  const finalMarkdown = template 
    ? markdownContent.replace(/{username}/g, username || '').replace(/{repo}/g, repoName || '')
    : markdownContent;

  return (
    <>
      <div className="space-y-4 mx-8">
        <div className="space-y-2">
          <Badge variant="outline" className="w-fit mb-2 border-primary/30 text-primary">
              {categoryLabel}
          </Badge>
          <h2 className="text-3xl font-bold leading-tight">{template.name}</h2>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><User className="h-3 w-3 text-primary/70" /> {template.author}</span>
              <span className="flex items-center gap-1">•</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-primary/70" /> {template.updated.toLocaleDateString()}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed my-4">
          {template.description}
        </p>
      </div>
      <Separator />
      <div className="space-y-4 flex-1 m-2 mx-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 uppercase tracking-wider">
            <Settings2 className="h-4 w-4" />
            <span>Configuration</span>
          </div>
          
          <div className="grid gap-4 bg-muted/30 p-4 rounded-xl border">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-2">
                <Github className="h-3 w-3" /> GitHub Username
              </label>
              <Input 
                defaultValue={username}
                onChange={(e) => debouncedSetUsername(e.target.value)}
                className="h-9 text-sm bg-background"
                placeholder="e.g. Mayur-Pagote"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-2">
                <Code2 className="h-3 w-3" /> Repository Name
              </label>
              <Input 
                defaultValue={repoName}
                onChange={(e) => debouncedSetRepoName(e.target.value)}
                className="h-9 text-sm bg-background"
                placeholder="e.g. README_Design_Kit"
              />
            </div>
          </div>
        </div>
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel>
          <div className="h-full p-4 overflow-auto">
            <h2 className="text-2xl font-bold mb-4">
              Markdown Preview
            </h2>
            <MarkdownPreview markdown={finalMarkdown} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div className="h-full p-4 overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Markdown Code</h2>
            <MarkdownCode markdown={finalMarkdown} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default MarkdownEditor;
