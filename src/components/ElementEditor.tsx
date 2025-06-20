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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ElementType } from '@/types/elements';

interface ElementEditorProps {
  element: ElementType | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (element: ElementType) => void;
}

export function ElementEditor({ element, isOpen, onClose, onSave }: ElementEditorProps) {
  const [editedElement, setEditedElement] = useState<ElementType | null>(null);

  useEffect(() => {
    setEditedElement(element);
  }, [element]);

  if (!editedElement) return null;

  const handleSave = () => {
    if (editedElement) {
      onSave(editedElement);
      onClose();
    }
  };  const updateElement = (updates: Partial<ElementType>) => {
    setEditedElement(prev => prev ? { ...prev, ...updates } as ElementType : null);
  };

  const updateStyle = (styleUpdates: Record<string, string | number>) => {
    setEditedElement(prev => prev ? {
      ...prev,
      style: { ...prev.style, ...styleUpdates }
    } as ElementType : null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {editedElement.type} Element</DialogTitle>
          <DialogDescription>
            Customize the properties of your element
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Common Fields */}
          {editedElement.type !== 'divider' && (
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={editedElement.content || ''}
                onChange={(e) => updateElement({ content: e.target.value })}
                placeholder="Enter content..."
              />
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
                <SelectContent>
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

          {/* Text-specific fields */}
          {editedElement.type === 'text' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select
                  value={editedElement.style?.fontSize}
                  onValueChange={(value) => updateStyle({ fontSize: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="md">Medium</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                    <SelectItem value="xl">Extra Large</SelectItem>
                    <SelectItem value="2xl">2X Large</SelectItem>
                    <SelectItem value="3xl">3X Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fontWeight">Font Weight</Label>
                <Select
                  value={editedElement.style?.fontWeight}
                  onValueChange={(value) => updateStyle({ fontWeight: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Font weight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="semibold">Semi Bold</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Banner-specific fields */}
          {editedElement.type === 'banner' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="variant">Banner Style</Label>
                <Select
                  value={editedElement.variant}
                  onValueChange={(value) => updateElement({ variant: value as 'default' | 'gradient' | 'colored' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Banner style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="gradient">Gradient</SelectItem>
                    <SelectItem value="colored">Colored</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={editedElement.color || ''}
                  onChange={(e) => updateElement({ color: e.target.value })}
                  placeholder="blue, red, green..."
                />
              </div>
            </div>
          )}

          {/* Git Contribution fields */}
          {editedElement.type === 'git-contribution' && (
            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="repository">Repository Name</Label>
                <Input
                  id="repository"
                  value={editedElement.repository || ''}
                  onChange={(e) => updateElement({ repository: e.target.value })}
                  placeholder="your-repo"
                />
              </div>
            </div>
          )}

          {/* Tech Stack fields */}
          {editedElement.type === 'tech-stack' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Textarea
                  id="technologies"
                  value={editedElement.technologies?.join(', ') || ''}
                  onChange={(e) => updateElement({ 
                    technologies: e.target.value.split(',').map(tech => tech.trim()).filter(Boolean)
                  })}
                  placeholder="React, TypeScript, Node.js, Tailwind CSS"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="layout">Layout</Label>
                <Select
                  value={editedElement.layout}
                  onValueChange={(value) => updateElement({ layout: value as 'grid' | 'list' | 'badges' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Layout style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="badges">Badges</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                    <SelectItem value="grid">Grid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Image fields */}
          {editedElement.type === 'image' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="src">Image URL</Label>
                <Input
                  id="src"
                  value={editedElement.src || ''}
                  onChange={(e) => updateElement({ src: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text</Label>
                <Input
                  id="alt"
                  value={editedElement.alt || ''}
                  onChange={(e) => updateElement({ alt: e.target.value })}
                  placeholder="Description of the image"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    value={editedElement.width || ''}
                    onChange={(e) => updateElement({ width: e.target.value })}
                    placeholder="400px or 100%"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    value={editedElement.height || ''}
                    onChange={(e) => updateElement({ height: e.target.value })}
                    placeholder="200px or auto"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Code Block fields */}
          {editedElement.type === 'code-block' && (
            <div className="space-y-2">
              <Label htmlFor="language">Programming Language</Label>
              <Select
                value={editedElement.language}
                onValueChange={(value) => updateElement({ language: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="bash">Bash</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Badge fields */}
          {editedElement.type === 'badge' && (
            <div className="space-y-2">
              <Label htmlFor="variant">Badge Style</Label>
              <Select
                value={editedElement.variant}
                onValueChange={(value) => updateElement({ variant: value as 'default' | 'success' | 'warning' | 'error' | 'info' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Badge style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Divider fields */}
          {editedElement.type === 'divider' && (
            <div className="space-y-2">
              <Label htmlFor="dividerStyle">Divider Style</Label>
              <Select
                value={editedElement.dividerStyle}
                onValueChange={(value) => updateElement({ dividerStyle: value as 'line' | 'dots' | 'stars' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Divider style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line</SelectItem>
                  <SelectItem value="dots">Dots</SelectItem>
                  <SelectItem value="stars">Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter>
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
