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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Changed from AITextarea to standard Textarea
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
  // Local state for the technologies string to allow typing spaces and commas
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

  // Logic to determine if a content input should be shown
  const shouldShowContentInput = (elementType: string) => {
    const excludedTypes = ['git-contribution', 'divider', 'image'];
    return !excludedTypes.includes(elementType);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl z-[200] outline-none">
        <DialogHeader>
          <DialogTitle>Edit {editedElement.type} Element</DialogTitle>
          <DialogDescription>
            Customize the properties of your element
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1 py-2 custom-scrollbar">
          {/* Common Fields */}
          {shouldShowContentInput(editedElement.type) && (
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

          {/* Tech Stack fields */}
          {editedElement.type === 'tech-stack' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Textarea
                  id="technologies"
                  value={techString}
                  onChange={(e) => {
                    const val = e.target.value;
                    setTechString(val);
                    updateElement({ 
                      technologies: val.split(',').map(tech => tech.trim()).filter(Boolean)
                    });
                  }}
                  placeholder="React, TypeScript, Node.js, Tailwind CSS"
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