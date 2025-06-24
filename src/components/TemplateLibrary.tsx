import { useState, useMemo } from 'react';
import { Search, Grid, List, Star, Heart, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TemplatePreview } from './TemplatePreview';
import { TemplateThumbnail } from './TemplateThumbnail';
import { useTemplatePreferences } from '@/hooks/useTemplatePreferences';
import { sampleTemplates, templateCategories, popularTags } from '@/data/templates';
import type { Template, TemplateCategory } from '@/types/templates';

interface TemplateLibraryProps {
  onSelectTemplate: (template: Template) => void;
  onStartFromScratch: () => void;
}

export function TemplateLibrary({ onSelectTemplate, onStartFromScratch }: TemplateLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  const { preferences, toggleFavorite: toggleTemplateFavorite, addToRecentlyViewed, addToRecentlyUsed } = useTemplatePreferences();
  // Filter templates based on current filters and active tab
  const filteredTemplates = useMemo(() => {
    let templates = sampleTemplates;

    // Apply tab-specific filtering first
    if (activeTab === 'featured') {
      templates = templates.filter(template => template.featured);
    } else if (activeTab === 'favorites') {
      templates = templates.filter(template => preferences.favorites.includes(template.id));
    } else if (activeTab === 'recent') {
      const recentIds = preferences.recentlyUsed;
      templates = templates
        .filter(template => recentIds.includes(template.id))
        .sort((a, b) => recentIds.indexOf(a.id) - recentIds.indexOf(b.id));
    }

    // Apply other filters
    return templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(tag => template.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchQuery, selectedCategory, selectedTags, activeTab, preferences.favorites, preferences.recentlyUsed]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  const toggleFavorite = (templateId: string) => {
    toggleTemplateFavorite(templateId);
  };
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTags([]);
    setActiveTab('all');
  };const handleTemplateSelect = (template: Template) => {
    addToRecentlyUsed(template.id);
    onSelectTemplate(template);
  };

  const handleTemplatePreview = (template: Template) => {
    addToRecentlyViewed(template.id);
    setPreviewTemplate(template);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">README Template Library</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Choose from our curated collection of professional README templates
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline"
                onClick={onStartFromScratch}
                className="flex items-center gap-2"
              >
                Start from Scratch
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as TemplateCategory | 'all')}>
                <SelectTrigger className="w-full lg:w-[200px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {templateCategories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>            {/* Filter Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">
                  All Templates
                </TabsTrigger>
                <TabsTrigger value="featured">
                  <Star className="h-4 w-4 mr-2" />
                  Featured
                </TabsTrigger>
                <TabsTrigger value="favorites">
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="recent">
                  <Clock className="h-4 w-4 mr-2" />
                  Recent
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Popular Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-muted-foreground mr-2">Popular tags:</span>
              {popularTags.slice(0, 8).map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Active Filters */}
            {(selectedTags.length > 0 || selectedCategory !== 'all' || searchQuery) && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <Badge variant="secondary">
                    {templateCategories.find(c => c.value === selectedCategory)?.label}
                  </Badge>
                )}
                {selectedTags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Template Grid/List */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {filteredTemplates.length} of {sampleTemplates.length} templates
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map(template => (              <TemplateCard
                key={template.id}
                template={template}
                isFavorite={preferences.favorites.includes(template.id)}
                onSelect={() => handleTemplateSelect(template)}
                onPreview={() => handleTemplatePreview(template)}
                onToggleFavorite={() => toggleFavorite(template.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTemplates.map(template => (              <TemplateListItem
                key={template.id}
                template={template}
                isFavorite={preferences.favorites.includes(template.id)}
                onSelect={() => handleTemplateSelect(template)}
                onPreview={() => handleTemplatePreview(template)}
                onToggleFavorite={() => toggleFavorite(template.id)}
              />
            ))}
          </div>
        )}

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No templates found matching your criteria
            </p>
            <Button onClick={clearFilters}>Clear filters</Button>
          </div>
        )}
      </div>

      {/* Template Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{previewTemplate?.name}</DialogTitle>
          </DialogHeader>
          {previewTemplate && (
            <TemplatePreview
              template={previewTemplate}
              onUseTemplate={() => {
                handleTemplateSelect(previewTemplate);
                setPreviewTemplate(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface TemplateCardProps {
  template: Template;
  isFavorite: boolean;
  onSelect: () => void;
  onPreview: () => void;
  onToggleFavorite: () => void;
}

function TemplateCard({ template, isFavorite, onSelect, onPreview, onToggleFavorite }: TemplateCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
        <TemplateThumbnail template={template} className="w-full h-full" />
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{template.name}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {template.description}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {templateCategories.find(c => c.value === template.category)?.label}
            </Badge>
            {template.featured && (
              <Badge variant="default" className="text-xs">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {template.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {template.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{template.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={onSelect} className="flex-1">
              Use Template
            </Button>
            <Button size="sm" variant="outline" onClick={onPreview}>
              Preview
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface TemplateListItemProps {
  template: Template;
  isFavorite: boolean;
  onSelect: () => void;
  onPreview: () => void;
  onToggleFavorite: () => void;
}

function TemplateListItem({ template, isFavorite, onSelect, onPreview, onToggleFavorite }: TemplateListItemProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">        <div className="flex items-center gap-4">
          <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <TemplateThumbnail template={template} className="w-full h-full" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{template.description}</p>
                
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {templateCategories.find(c => c.value === template.category)?.label}
                  </Badge>
                  {template.featured && (
                    <Badge variant="default" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {template.popularity}% popularity
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleFavorite}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button size="sm" variant="outline" onClick={onPreview}>
                  Preview
                </Button>
                <Button size="sm" onClick={onSelect}>
                  Use Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
