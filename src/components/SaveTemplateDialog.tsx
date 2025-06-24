import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Save, X } from 'lucide-react';
import { templateCategories } from '@/data/templates';
import { TemplateUtils } from '@/utils/templateUtils';
import type { ElementType } from '@/types/elements';
import type { TemplateCategory } from '@/types/templates';

interface SaveTemplateDialogProps {
  elements: ElementType[];
  onSave?: (templateData: any) => void;
}

export function SaveTemplateDialog({ elements, onSave }: SaveTemplateDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [templateCategory, setTemplateCategory] = useState<TemplateCategory>('personal-projects');
  const [templateTags, setTemplateTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [saving, setSaving] = useState(false);

  const templateStats = elements.length > 0 ? TemplateUtils.getTemplateStats({
    id: 'temp',
    name: templateName,
    description: templateDescription,
    category: templateCategory,
    tags: templateTags,
    author: 'User',
    version: '1.0.0',
    popularity: 0,
    created: new Date(),
    updated: new Date(),
    featured: false,
    thumbnail: '',
    elements,
  }) : null;

  const addTag = () => {
    if (newTag.trim() && !templateTags.includes(newTag.trim())) {
      setTemplateTags([...templateTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTemplateTags(templateTags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    if (!templateName.trim()) return;

    setSaving(true);
    try {
      const templateData = TemplateUtils.elementsToTemplate(elements, {
        name: templateName,
        description: templateDescription,
        category: templateCategory,
        tags: templateTags,
        author: 'User',
      });

      // Here you would typically save to your backend or storage
      console.log('Saving template:', templateData);
      
      // Store in localStorage for demo purposes
      const savedTemplates = JSON.parse(localStorage.getItem('customTemplates') || '[]');
      const newTemplate = {
        ...templateData,
        id: `custom-${Date.now()}`,
        created: new Date(),
        updated: new Date(),
      };
      savedTemplates.push(newTemplate);
      localStorage.setItem('customTemplates', JSON.stringify(savedTemplates));

      onSave?.(newTemplate);
      
      // Reset form and close dialog
      setTemplateName('');
      setTemplateDescription('');
      setTemplateCategory('personal-projects');
      setTemplateTags([]);
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving template:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save as Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Save as Template</DialogTitle>
          <DialogDescription>
            Create a reusable template from your current README design
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                placeholder="My Awesome Template"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-description">Description</Label>
              <Textarea
                id="template-description"
                placeholder="Describe what this template is good for..."
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-category">Category</Label>
              <Select value={templateCategory} onValueChange={(value) => setTemplateCategory(value as TemplateCategory)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {templateCategories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {templateTags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Template Stats */}
          {templateStats && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <h4 className="font-medium mb-2">Template Statistics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Elements:</span>
                  <span className="ml-2 font-medium">{templateStats.totalElements}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Complexity:</span>
                  <span className="ml-2 font-medium capitalize">{templateStats.complexity}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Element Types:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {Object.entries(templateStats.elementTypes).map(([type, count]) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}: {count}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!templateName.trim() || elements.length === 0 || saving}
            >
              {saving ? 'Saving...' : 'Save Template'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
