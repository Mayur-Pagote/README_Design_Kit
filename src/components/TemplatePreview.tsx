import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Monitor, Smartphone, Star, User, Calendar, Tag, ArrowRight } from 'lucide-react';
import { ElementRenderer } from '@/components/ElementRenderer';
import { templateCategories } from '@/data/templates';
import type { Template } from '@/types/templates';

interface TemplatePreviewProps {
  template: Template;
  onUseTemplate: () => void;
}

export function TemplatePreview({ template, onUseTemplate }: TemplatePreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const categoryLabel = templateCategories.find(c => c.value === template.category)?.label;

  return (
    <div className="space-y-6">
      {/* Template Info */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{template.name}</h2>
              {template.featured && (
                <Badge variant="default" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{template.description}</p>
          </div>
          <Button onClick={onUseTemplate} className="flex items-center gap-2">
            Use This Template
            <ArrowRight className="h-4 w-4" />
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
        <div className="flex border rounded-lg p-1">
          <Button
            variant={viewMode === 'desktop' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('desktop')}
            className="flex items-center gap-2"
          >
            <Monitor className="h-4 w-4" />
            Desktop
          </Button>
          <Button
            variant={viewMode === 'mobile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('mobile')}
            className="flex items-center gap-2"
          >
            <Smartphone className="h-4 w-4" />
            Mobile
          </Button>
        </div>
      </div>

      {/* Preview */}
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div 
                className={`
                  transition-all duration-300 mx-auto bg-white dark:bg-gray-900 
                  ${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-4xl'}
                `}
              >
                <div className="p-6 space-y-4 min-h-[400px]">
                  {template.elements.map((element, index) => (
                    <ElementRenderer 
                      key={`${element.id}-${index}`} 
                      element={element} 
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Template Structure</CardTitle>
              <CardDescription>
                This template contains {template.elements.length} elements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {template.elements.map((element, index) => (
                  <div key={`${element.id}-structure`} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium capitalize">{element.type.replace('-', ' ')}</div>
                      <div className="text-sm text-muted-foreground">
                        {element.type === 'header' && `Level ${(element as any).level} heading`}
                        {element.type === 'text' && 'Text content'}
                        {element.type === 'banner' && `${(element as any).variant} banner`}
                        {element.type === 'tech-stack' && `${(element as any).technologies?.length || 0} technologies`}
                        {element.type === 'table' && `${(element as any).rows?.length || 0} rows table`}
                        {element.type === 'code-block' && `${(element as any).language} code`}
                        {element.type === 'image' && 'Image element'}
                        {element.type === 'badge' && `${(element as any).variant} badge`}
                        {element.type === 'divider' && `${(element as any).dividerStyle} divider`}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {element.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Use Template Button */}
      <div className="flex justify-center pt-4">
        <Button size="lg" onClick={onUseTemplate} className="flex items-center gap-2">
          Use This Template
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
