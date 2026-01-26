import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Monitor, Smartphone, User, Calendar, Copy, Github, Rocket, Brain, FileCode, Settings2, Code2 } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { toast } from "sonner";
import { generateMarkdown } from "@/utils/markdownGenerator";
import { ElementRenderer } from '@/components/ElementRenderer';
import { templateCategories } from '@/data/templates';
import type { Template } from '@/types/templates';

interface TemplatePreviewProps {
  template: Template;
  onUseTemplate?: () => void; 
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [githubUsername, setGithubUsername] = useState('Mayur-Pagote'); 
  const [repoName, setRepoName] = useState('README_Design_Kit');
  const [projectTitle, setProjectTitle] = useState('Portfolio Dashboard'); 
  const [learningTech, setLearningTech] = useState('System Design');
  const [activeTab, setActiveTab] = useState('preview');

  const { theme } = useTheme();
  const categoryLabel = templateCategories.find(c => c.value === template.category)?.label;

  const hasProjectPlaceholder = useMemo(() => template.markdown?.includes('{flagship_project_name}'), [template.markdown]);
  const hasTechPlaceholder = useMemo(() => template.markdown?.includes('{current_learning_tech}'), [template.markdown]);

  const processedMarkdown = useMemo(() => {
    if (!template.markdown) return '';
    
    return template.markdown
      .replace(/{username}/g, githubUsername || 'Mayur-Pagote')
      .replace(/{repo}/g, repoName || 'README_Design_Kit')
      .replace(/{main_repo}/g, repoName || 'README_Design_Kit')
      .replace(/{flagship_project_name}/g, projectTitle || 'Portfolio Dashboard')
      .replace(/{current_learning_tech}/g, learningTech || 'System Design'); 
  }, [template.markdown, githubUsername, repoName, projectTitle, learningTech]);

  const handleCopyMarkdown = async () => {
    try {
      const contentToCopy = template.markdown 
        ? processedMarkdown 
        : generateMarkdown(template.elements || [], theme);

      await navigator.clipboard.writeText(contentToCopy);
      toast.success("Markdown copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy markdown");
    }
  };

  return (
    /* FIXED: Added 'overflow-y-auto lg:overflow-hidden' 
       This allows the whole page to scroll on mobile, but uses split-pane scrolling on desktop */
    <div className="flex flex-col lg:flex-row h-full gap-0 lg:gap-6 overflow-y-auto lg:overflow-hidden">
      
      {/* LEFT COLUMN: Settings & Info (Sidebar) */}
      {/* FIXED: Removed overflow-y-auto for mobile (handled by parent), kept for desktop */}
      <div className="w-full lg:w-[340px] shrink-0 flex flex-col gap-6 lg:border-r lg:pr-6 p-6 lg:pb-0 lg:p-0 lg:pt-0 lg:overflow-y-auto">
        
        {/* Header Info */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Badge variant="outline" className="w-fit mb-2">
               {categoryLabel}
            </Badge>
            <h2 className="text-3xl font-bold leading-tight">{template.name}</h2>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
               <span className="flex items-center gap-1"><User className="h-3 w-3" /> {template.author}</span>
               <span className="flex items-center gap-1">•</span>
               <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {template.updated.toLocaleDateString()}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {template.description}
          </p>
        </div>

        <Separator />

        {/* Customization Inputs */}
        <div className="space-y-4 flex-1">
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
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                className="h-9 text-sm bg-background"
                placeholder="e.g. Mayur-Pagote"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-2">
                <Code2 className="h-3 w-3" /> Repository Name
              </label>
              <Input 
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                className="h-9 text-sm bg-background"
                placeholder="e.g. README_Design_Kit"
              />
            </div>

            {hasProjectPlaceholder && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1">
                <label className="text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-2">
                  <Rocket className="h-3 w-3" /> Project Name
                </label>
                <Input 
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="h-9 text-sm bg-background"
                />
              </div>
            )}

            {hasTechPlaceholder && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1">
                <label className="text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-2">
                  <Brain className="h-3 w-3" /> Learning Focus
                </label>
                <Input 
                  value={learningTech}
                  onChange={(e) => setLearningTech(e.target.value)}
                  className="h-9 text-sm bg-background"
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-auto pb-4 lg:pb-0">
          <Button 
            onClick={handleCopyMarkdown} 
            className="w-full font-semibold h-11 shadow-lg shadow-primary/20 hover:scale-100 cursor-pointer" 
            size="lg"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Markdown Code
          </Button>
        </div>
      </div>

      {/* RIGHT COLUMN: Preview Area */}
      {/* FIXED: On mobile, give it a fixed height so it doesn't squish. Parent will scroll. */}
      <div className="flex-1 min-w-0 flex flex-col h-[600px] lg:h-auto bg-muted/10 rounded-xl border overflow-hidden shadow-sm shrink-0 mb-6 lg:mb-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
          
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-background/50 backdrop-blur-sm">
            <TabsList className="h-9">
              <TabsTrigger value="preview" className="text-xs px-4">
                 <Monitor className="h-3.5 w-3.5 mr-2" /> Preview
              </TabsTrigger>
              <TabsTrigger value="markdown" className="text-xs px-4">
                 <FileCode className="h-3.5 w-3.5 mr-2" /> Markdown
              </TabsTrigger>
            </TabsList>

            {activeTab === 'preview' && (
              <div className="flex bg-muted border rounded-lg p-0.5">
                <Button
                  variant={viewMode === 'desktop' ? 'secondary' : 'ghost'}
                  size="sm"
                  className="h-7 w-8 px-0"
                  onClick={() => setViewMode('desktop')}
                  title="Desktop View"
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'mobile' ? 'secondary' : 'ghost'}
                  size="sm"
                  className="h-7 w-8 px-0"
                  onClick={() => setViewMode('mobile')}
                  title="Mobile View"
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {activeTab === 'markdown' && (
               <Button size="sm" variant="ghost" className="h-8 text-xs" onClick={handleCopyMarkdown}>
                  <Copy className="h-3.5 w-3.5 mr-2" /> Copy Code
               </Button>
            )}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden bg-slate-50/50 dark:bg-slate-950/30 relative">
            <TabsContent value="preview" className="mt-0 h-full overflow-y-auto p-4 lg:p-8">
               <div
                  className={`
                    transition-all duration-300 mx-auto bg-white dark:bg-slate-950 shadow-xl border rounded-lg overflow-hidden
                    ${viewMode === 'mobile' ? 'max-w-[375px] border-x-[6px] border-y-[12px] border-slate-800 rounded-[30px]' : 'max-w-4xl w-full min-h-[500px]'}
                  `}
                >
                  <div className={`p-6 lg:p-10 ${viewMode === 'mobile' ? 'text-xs' : ''}`}>
                    {template.markdown ? (
                      <div 
                        className="prose dark:prose-invert max-w-none break-words"
                        dangerouslySetInnerHTML={{ __html: processedMarkdown }} 
                      />
                    ) : (
                      template.elements?.map((element, index) => (
                        <ElementRenderer key={`${element.id}-${index}`} element={element} />
                      ))
                    )}
                  </div>
                </div>
            </TabsContent>

            <TabsContent value="markdown" className="mt-0 h-full p-0">
               <pre className="h-full w-full p-6 overflow-auto text-xs font-mono bg-slate-950 text-slate-50 leading-relaxed">
                  {processedMarkdown || "No markdown available for this template."}
               </pre>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}