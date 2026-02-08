import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AITextarea } from '@/components/ui/ai-textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { parseTreeAndAddIcons } from '@/utils/treeParser';
import { Wand2 } from 'lucide-react';
import type { ElementType } from '@/types/elements';

interface ElementEditorProps {
  element: ElementType | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (element: ElementType) => void;
}

export function ElementEditor({ element, isOpen, onClose, onSave }: ElementEditorProps) {
  const [editedElement, setEditedElement] = useState<ElementType | null>(null);
  // FIX: Local state for the technologies string to allow typing spaces and commas
  const [techString, setTechString] = useState('');

  useEffect(() => {
    setEditedElement(element);
    // Initialize the tech string when the element is loaded
    if (element?.type === 'tech-stack') {
      setTechString(element.technologies?.join(', ') || '');
    }
  }, [element, isOpen]);

  if (!editedElement) return null;

  const handleSave = () => {
    if (editedElement) {
      onSave(editedElement);
      onClose();
    }
  };

  const updateElement = (updates: Partial<ElementType>) => {
    setEditedElement(prev => prev ? { ...prev, ...updates } as ElementType : null);
  };

  const shouldShowAITextarea = (elementType: string) => {
    const excludedTypes = ['git-contribution', 'divider', 'image'];
    return !excludedTypes.includes(elementType);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* z-[200] ensures it is above the DialogOverlay (z-150) */}
      <DialogContent className="max-w-2xl z-[200] outline-none">
        <DialogHeader>
          <DialogTitle>Edit {editedElement.type} Element</DialogTitle>
          <DialogDescription>
            Customize the properties of your element
          </DialogDescription>
        </DialogHeader>

        {/* Inner scroll container prevents portaled Select menus from being clipped */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1 py-2 custom-scrollbar">
          {/* Common Fields */}
          {editedElement.type !== 'divider' && editedElement.type !== 'git-contribution' && editedElement.type !== 'image' && editedElement.type !== 'code-block' && (
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              {shouldShowAITextarea(editedElement.type) && (
                <AITextarea
                  id="content"
                  value={editedElement.content || ''}
                  onValueChange={(value) => updateElement({ content: value })}
                  placeholder="Enter content..."
                  aiContext={`${editedElement.type} element`}
                  showGenerateOption={['text', 'description', 'title', 'header', 'banner'].includes(editedElement.type)}
                  generationType={
                    editedElement.type === 'description' ? 'about' :
                      editedElement.type === 'title' ? 'summary' :
                        editedElement.type === 'text' ? 'custom' :
                          'project'
                  }
                />
              )}
            </div>
          )}

          {/* Header-specific fields */}
          {editedElement.type === 'header' && (
            <div className="space-y-2">
              <Label htmlFor="level">Header Level</Label>
              <Select
                value={editedElement.level?.toString()}
                onValueChange={(value) => updateElement({ level: parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6 })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select header level" />
                </SelectTrigger>
                <SelectContent className="z-[210]">
                  <SelectItem value="1">H1 - Largest</SelectItem>
                  <SelectItem value="2">H2 - Large</SelectItem>
                  <SelectItem value="3">H3 - Medium</SelectItem>
                  <SelectItem value="4">H4 - Small</SelectItem>
                  <SelectItem value="5">H5 - Smaller</SelectItem>
                  <SelectItem value="6">H6 - Smallest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Git Contribution fields */}
          {editedElement.type === 'git-contribution' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">GitHub Username</Label>
                <Input
                  id="username"
                  value={editedElement.username || ''}
                  onChange={(e) => updateElement({ username: e.target.value })}
                  placeholder="your-username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repository">GitHub Repository</Label>
                <Input
                  id="repository"
                  value={editedElement.repository || ''}
                  onChange={(e) => updateElement({ repository: e.target.value })}
                  placeholder="your-repo"
                />
              </div>
            </div>
          )}

          {/* Image fields */}
          {editedElement.type === 'image' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="src">Image URL / Template</Label>
                <AITextarea
                  id="src"
                  value={editedElement.src || ''}
                  onValueChange={(val) => updateElement({ src: val })}
                  placeholder="https://example.com/image.png or {template}"
                  aiContext="image source URL or GitHub API template"
                />
                <p className="text-xs text-muted-foreground">
                  Use {'{username}'} and {'{repo}'} for dynamic replacement.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alt">Alt Text</Label>
                  <Input
                    id="alt"
                    value={editedElement.alt || ''}
                    onChange={(e) => updateElement({ alt: e.target.value })}
                    placeholder="Image description"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Code Block specific fields */}
          {editedElement.type === 'code-block' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="content">Code Content</Label>
                {/* Special "Smart Enhance Tree" button if it looks like a project tree */}
                {(editedElement.content?.includes('──') || editedElement.content?.includes('|--') || editedElement.content?.includes('├') || editedElement.content?.includes('└')) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateElement({ content: parseTreeAndAddIcons(editedElement.content || '') })}
                    className="text-xs h-8 gap-1.5 border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 transition-colors"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    Smart Enhance Tree ✨
                  </Button>
                )}
              </div>
              <AITextarea
                id="content"
                value={editedElement.content || ''}
                onValueChange={(value) => updateElement({ content: value })}
                placeholder="Enter your code or project tree structure here..."
                aiContext="code block content"
                showGenerateOption={true}
              />
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={editedElement.language || 'bash'}
                  onValueChange={(value) => updateElement({ language: value })}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="z-[210]">
                    <SelectItem value="bash">Bash / Shell (Best for Trees)</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="markdown">Markdown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Tech Stack fields */}
          {editedElement.type === 'tech-stack' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <AITextarea
                  id="technologies"
                  // FIX: Use techString state so spaces and commas are preserved while typing
                  value={techString}
                  onValueChange={(val) => {
                    setTechString(val);
                    updateElement({
                      technologies: val.split(',').map(tech => tech.trim()).filter(Boolean)
                    });
                  }}
                  placeholder="React, TypeScript, Node.js, Tailwind CSS"
                  aiContext="technology stack for a software project"
                  showGenerateOption={true}
                  generationType="custom"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="layout">Layout</Label>
                  <Select
                    value={editedElement.layout}
                    onValueChange={(value) => updateElement({
                      layout: value as 'grid' | 'list' | 'badges' | 'inline' | 'grouped'
                    })}
                  >
                    <SelectTrigger id="layout">
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent className="z-[210]">
                      <SelectItem value="badges">Badges</SelectItem>
                      <SelectItem value="list">List</SelectItem>
                      <SelectItem value="grid">Grid</SelectItem>
                      <SelectItem value="inline">Inline</SelectItem>
                      <SelectItem value="grouped">Grouped by Category</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="badgeStyle">Badge Style</Label>
                  <Select
                    value={editedElement.badgeStyle || ''}
                    onValueChange={(value) => updateElement({ badgeStyle: value })}
                  >
                    <SelectTrigger id="badgeStyle">
                      <SelectValue placeholder="Select style (optional)" />
                    </SelectTrigger>
                    <SelectContent className="z-[210]">
                      <SelectItem value="none">Default (No Style)</SelectItem>
                      <SelectItem value="flat">Flat Badges</SelectItem>
                      <SelectItem value="flat-square">Flat Square</SelectItem>
                      <SelectItem value="for-the-badge">For The Badge</SelectItem>
                      <SelectItem value="devicon">Dev Icons</SelectItem>
                      <SelectItem value="simple-icons">Simple Icons</SelectItem>
                      <SelectItem value="skill-icons">Skill Icons</SelectItem>
                      <SelectItem value="flat-icons">Flat Icons</SelectItem>
                      <SelectItem value="material-icons">Material Icons</SelectItem>
                      <SelectItem value="github-icons">GitHub Icons</SelectItem>
                      <SelectItem value="icons8">Icons8</SelectItem>
                      <SelectItem value="svg-badges">SVG Badges</SelectItem>
                      <SelectItem value="animated-badges">Animated Badges</SelectItem>
                      <SelectItem value="devto-badges">Dev.to Badges</SelectItem>
                      <SelectItem value="edge-icons">Edge Icons</SelectItem>
                      <SelectItem value="for-the-badge-colored">For The Badge (Colored)</SelectItem>
                      <SelectItem value="flat-colored">Flat Colored</SelectItem>
                      <SelectItem value="badge-card">Badge Card</SelectItem>
                      <SelectItem value="badge-glow">Badge Glow</SelectItem>
                      <SelectItem value="devicon-with-text">Dev Icon with Text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {(editedElement.badgeStyle || editedElement.layout === 'grid' || editedElement.layout === 'grouped') && (
                <div className="space-y-2">
                  <Label htmlFor="theme">Color Theme</Label>
                  <Select
                    value={editedElement.theme || 'dark'}
                    onValueChange={(value) => updateElement({ theme: value })}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent className="z-[210]">
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
