import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
// Added Rocket and Brain to the imports below
import { Monitor, Smartphone, Star, User, Calendar, Tag, ArrowRight, Copy, Github, Rocket, Brain } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { toast } from "sonner";
import { generateMarkdown } from "@/utils/markdownGenerator";
import { ElementRenderer } from '@/components/ElementRenderer';
import { templateCategories } from '@/data/templates';
import type { Template } from '@/types/templates';

interface TemplatePreviewProps {
  template: Template;
  onUseTemplate: () => void;
}

export function TemplatePreview({ template, onUseTemplate }: TemplatePreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [githubUsername, setGithubUsername] = useState('Mayur-Pagote'); 
  const [repoName, setRepoName] = useState('README_Design_Kit');
  const [projectTitle, setProjectTitle] = useState('Portfolio Dashboard'); 
  const [learningTech, setLearningTech] = useState('System Design');

  const { theme } = useTheme();
  const categoryLabel = templateCategories.find(c => c.value === template.category)?.label;

  // Handles all placeholders including the new ones for Template VIII
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
      // Logic fix: favor the processed markdown if it exists, otherwise generate from elements
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
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{template.name}</h2>
            {template.featured && (
              <Badge variant="default" className="text-xs ml-1 mt-1 pointer-events-none">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">{template.description}</p>
        </div>

        {/* Dynamic Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/30">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2">
              <User className="h-3 w-3" /> GitHub Username
            </label>
            <Input 
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              className="bg-background h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2">
              <Github className="h-3 w-3" /> Main Repository
            </label>
            <Input 
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              className="bg-background h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2">
              <Rocket className="h-3 w-3" /> Current Project
            </label>
            <Input 
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="bg-background h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2">
              <Brain className="h-3 w-3" /> Current Focus
            </label>
            <Input 
              value={learningTech}
              onChange={(e) => setLearningTech(e.target.value)}
              className="bg-background h-8 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={onUseTemplate} className="flex items-center gap-2">
            Use This Template
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleCopyMarkdown} className="flex items-center gap-2">
            <Copy className="h-4 w-4" />
            Copy Markdown
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
          <div className="flex items-center gap-1"><User className="h-4 w-4" /> {template.author}</div>
          <div className="flex items-center gap-1"><Tag className="h-4 w-4" /> {categoryLabel}</div>
          <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Updated {template.updated.toLocaleDateString()}</div>
        </div>

        <Separator />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Live Preview</h3>
        <div className="flex border rounded-lg p-1 bg-muted/50">
          <Button
            variant={viewMode === 'desktop' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('desktop')}
            className="flex items-center gap-2"
          >
            <Monitor className="h-4 w-4" /> Desktop
          </Button>
          <Button
            variant={viewMode === 'mobile' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('mobile')}
            className="flex items-center gap-2"
          >
            <Smartphone className="h-4 w-4" /> Mobile
          </Button>
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview Rendering</TabsTrigger>
          <TabsTrigger value="structure">Component Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-4">
          <Card className="overflow-hidden border-2">
            <CardContent className="p-0">
              <div
                className={`
                  transition-all duration-300 mx-auto bg-white dark:bg-slate-950
                  ${viewMode === 'mobile' ? 'max-w-[375px] border-x shadow-2xl' : 'max-w-full'}
                `}
              >
                <div className="p-6 space-y-4 min-h-[400px]">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Template Elements</CardTitle>
              <CardDescription>
                This template is composed of {template.elements?.length || 0} core elements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {template.elements?.map((element, index) => (
                  <div key={`${element.id}-structure`} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium capitalize">{element.type.replace(/-/g, ' ')}</div>
                      <div className="text-xs text-muted-foreground italic">
                        ID: {element.id}
                      </div>
                    </div>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {element.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}