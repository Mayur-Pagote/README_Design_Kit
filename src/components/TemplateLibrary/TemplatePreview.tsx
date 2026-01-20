import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Monitor, Smartphone, Star, User, Calendar, Tag, ArrowRight, Copy, Github } from 'lucide-react';
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
  // 1. COMPONENT STATE (Must be inside the function)
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [githubUsername, setGithubUsername] = useState('Mayur-Pagote'); 
  const [repoName, setRepoName] = useState('README_Design_Kit');

  const { theme } = useTheme();
  const categoryLabel = templateCategories.find(c => c.value === template.category)?.label;

  // 2. DYNAMIC REPLACEMENT LOGIC
  const processedMarkdown = useMemo(() => {
    if (!template.markdown) return '';
    
    return template.markdown
      .replace(/{username}/g, githubUsername || 'Mayur-Pagote')
      .replace(/{repo}/g, repoName || 'README_Design_Kit'); 
  }, [template.markdown, githubUsername, repoName]);

  const handleCopyMarkdown = async () => {
    if (!template.elements) return;
    try {
      const markdown = generateMarkdown(template.elements, theme);
      await navigator.clipboard.writeText(markdown);
      toast.success("Markdown copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy markdown");
    }
  };

  return (
    <div className="space-y-6">
      {/* Template Info Section */}
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

        {/* 3. DYNAMIC INPUTS: Fixes "setRepoName is never read" and broken links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/30">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-2">
              <User className="h-3 w-3" /> GitHub Username
            </label>
            <Input 
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              placeholder="Enter username..."
              className="bg-background"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-2">
              <Github className="h-3 w-3" /> Repository Name
            </label>
            <Input 
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="Enter repository name..."
              className="bg-background"
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

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {template.author}
          </div>
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4" />
            {categoryLabel}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Updated {template.updated.toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            {template.popularity}% popularity
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {template.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Separator />
      </div>

      {/* Preview Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Live Preview</h3>
        <div className="flex border rounded-lg p-1 bg-muted/50">
          <Button
            variant={viewMode === 'desktop' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('desktop')}
            className="flex items-center gap-2"
          >
            <Monitor className="h-4 w-4" />
            Desktop
          </Button>
          <Button
            variant={viewMode === 'mobile' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('mobile')}
            className="flex items-center gap-2"
          >
            <Smartphone className="h-4 w-4" />
            Mobile
          </Button>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview Rendering</TabsTrigger>
          <TabsTrigger value="structure">Component Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div
                className={`
                  transition-all duration-300 mx-auto bg-white dark:bg-slate-950
                  ${viewMode === 'mobile' ? 'max-w-sm border-x shadow-2xl' : 'max-w-full'}
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

      {/* Final Action Row */}
      <div className="flex justify-center gap-4 pt-6 border-t">
        <Button size="lg" onClick={onUseTemplate} className="gap-2 px-8">
          Apply Template
          <ArrowRight className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="lg" onClick={handleCopyMarkdown} className="gap-2 px-8">
          <Copy className="h-5 w-5" />
          Get Markdown
        </Button>
      </div>
    </div>
  );
}