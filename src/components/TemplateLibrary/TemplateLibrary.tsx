import { useState, useMemo } from 'react';
import { Search, Grid, List, Star, Heart, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TemplatePreview } from './TemplatePreview';
import { useTemplatePreferences } from '@/hooks/useTemplatePreferences';
import { sampleTemplates, templateCategories, popularTags } from '@/data/templates';
import type { Template, TemplateCategory } from '@/types/templates';
import UserInput from '../UserInput';
import { TemplateCard } from './TemplateCard';
import { TemplateListItem } from './TemplateListItem';

interface TemplateLibraryProps {
  onSelectTemplate: (template: Template, username: string, repo: string) => void;
  onStartFromScratch: () => void;
}

export function TemplateLibrary({ onSelectTemplate, onStartFromScratch }: TemplateLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('Mayur-Pagote');
  const [repo, setRepo] = useState('README_Design_Kit');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // State for the Preview Popup
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
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => template.tags.includes(tag));

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
  };

  // --- ACTIONS ---

  // Triggered when "Use This Template" is clicked INSIDE the popup
  const handleConfirmUseTemplate = (template: Template) => {
    addToRecentlyUsed(template.id);
    onSelectTemplate(template, username, repo);
    setPreviewTemplate(null);
  };

  // Triggered when a card is clicked in the grid
  const handleCardClick = (template: Template) => {
    addToRecentlyViewed(template.id);
    setPreviewTemplate(template); // Opens the popup
  };

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
  };
  
  const handleRepoChange = (newRepo: string) => { 
    setRepo(newRepo);
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

          <UserInput 
            onUsernameChange={handleUsernameChange}
            defaultUsername="Mayur-Pagote"
            onRepoChange={handleRepoChange}  
            defaultRepo="README_Design_Kit" 
          />

          {/* Filters */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1 transition-transform duration-200 ease-out hover:-translate-y-[2px]">
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
               <SelectTrigger className="w-full lg:w-[200px] transition-transform duration-200 ease-out hover:-translate-y-[2px]">
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
            </div>  
               
            {/* Filter Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1 rounded-lg">
                <TabsTrigger
                  value="all"
                  className="mr-2 transition-all duration-200 ease-out hover:-translate-y-[2px] text-xs md:text-base hover:bg-purple-300 hover:text-black hover:font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  All Templates
                </TabsTrigger>
                <TabsTrigger
                  value="featured"
                  className="transition-all duration-200 ease-out hover:-translate-y-[2px] text-xs md:text-base hover:bg-purple-300 hover:text-black hover:font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  <Star className="h-4 w-4 md:mr-2" />
                  Featured
                </TabsTrigger>
                <TabsTrigger
                  value="favorites"
                  className="transition-all duration-200 ease-out hover:-translate-y-[2px] text-xs md:text-base hover:bg-purple-300 hover:text-black hover:font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  <Heart className="h-4 w-4 md:mr-2" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger
                  value="recent"
                  className="transition-all duration-200 ease-out hover:-translate-y-[2px] text-xs md:text-base hover:bg-purple-300 hover:text-black hover:font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  <Clock className="h-4 w-4 md:mr-2" />
                  Recent
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Popular Tags */}
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm font-medium text-muted-foreground mr-2">Popular tags:</span>
              {popularTags.slice(0, 8).map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-sm"
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
            {filteredTemplates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                isFavorite={preferences.favorites.includes(template.id)}
                onSelect={() => handleCardClick(template)} 
                onToggleFavorite={() => toggleFavorite(template.id)}
              />
            ))}
          </div>
        ) : (
          <div className="grid space-y-4">
            {filteredTemplates.map(template => (
              <TemplateListItem
                key={template.id}
                template={template}
                isFavorite={preferences.favorites.includes(template.id)}
                onSelect={() => handleCardClick(template)}
                onPreview={() => handleCardClick(template)}
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

      {/* Template Preview Dialog - PERFECT BOX */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        {/* max-w-[95vw] and h-[90vh] makes it a big professional window */}
        <DialogContent className="template-scroll max-w-[95vw] w-[1400px] h-[90vh] overflow-hidden p-0 gap-0 border-none bg-background/95 backdrop-blur-xl">
          <DialogHeader className="sr-only">
            <DialogTitle>{previewTemplate?.name}</DialogTitle>
          </DialogHeader>
          {previewTemplate && (
            <div className="h-full overflow-hidden p-6">
              <TemplatePreview
                template={previewTemplate}
                onUseTemplate={() => handleConfirmUseTemplate(previewTemplate)}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
