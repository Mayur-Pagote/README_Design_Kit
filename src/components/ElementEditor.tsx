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
import type { ElementType } from '@/types/elements';

interface ElementEditorProps {
  element: ElementType | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (element: ElementType) => void;
  globalGithubUsername?: string;
}

export function ElementEditor({ element, isOpen, onClose, onSave, globalGithubUsername = 'your-username' }: ElementEditorProps) {
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
  };

  const updateElement = (updates: Partial<ElementType>) => {
    setEditedElement(prev => prev ? { ...prev, ...updates } as ElementType : null);
  };

  const updateStyle = (styleUpdates: Record<string, string | number>) => {
    setEditedElement(prev => prev ? {
      ...prev,
      style: { ...prev.style, ...styleUpdates }
    } as ElementType : null);
  };

  const shouldShowAITextarea = (elementType: string) => {
    const excludedTypes = ['git-contribution', 'divider', 'image'];
    return !excludedTypes.includes(elementType);
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
          {editedElement.type !== 'divider' && editedElement.type !== 'git-contribution' && editedElement.type !== 'image' && (
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
            <div className="space-y-4">
              {/* Info about global username if different */}
              {editedElement.username !== globalGithubUsername && (
                <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm">
                  <p>There is a global GitHub username set to <strong>{globalGithubUsername}</strong>. You can use it for this element or set a custom username below.</p>
                  <Button
                    variant="outline" 
                    size="sm"
                    className="mt-2" 
                    onClick={() => updateElement({ username: globalGithubUsername })}
                  >
                    Use Global Username
                  </Button>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">GitHub Username</Label>
                  <Input
                    id="username"
                    value={editedElement.username || ''}
                    onChange={(e) => updateElement({ username: e.target.value })}
                    placeholder={globalGithubUsername}
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
            </div>
          )}

          {/* Tech Stack fields */}
          {editedElement.type === 'tech-stack' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <AITextarea
                  id="technologies"
                  value={editedElement.technologies?.join(', ') || ''}
                  onValueChange={(value) => updateElement({ 
                    technologies: value.split(',').map(tech => tech.trim()).filter(Boolean)
                  })}
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
                    <SelectContent>
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
                    <SelectContent>
                      <SelectItem value="none">Default (No Style)</SelectItem>
                      <SelectItem value="flat">Flat Badges</SelectItem>
                      <SelectItem value="flat-square">Flat Square</SelectItem>
                      <SelectItem value="for-the-badge">For The Badge</SelectItem>
                      <SelectItem value="plastic">Plastic</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
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
                    <SelectContent>
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
              
              {editedElement.badgeStyle && (
                <div className="p-3 bg-muted/30 rounded-md">
                  <p className="text-sm text-muted-foreground mb-2">Badge Style Preview:</p>
                  <div className="flex gap-2">
                    {(() => {
                      const themeColor = editedElement.theme === 'light' ? 'f8f8f8' :
                                        editedElement.theme === 'blue' ? '0366D6' :
                                        editedElement.theme === 'purple' ? '6F42C1' :
                                        editedElement.theme === 'green' ? '2EA44F' :
                                        editedElement.theme === 'orange' ? 'F97316' : '05122A';
                      
                      const style = editedElement.badgeStyle;
                      
                      if (style === 'devicon') {
                        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="h-8" />;
                      } else if (style === 'simple-icons') {
                        return <img src="https://img.shields.io/badge/React-05122A?style=flat&logo=react" alt="React" />;
                      } else if (style === 'skill-icons') {
                        return <img src="https://skillicons.dev/icons?i=react" alt="React" />;
                      } else if (style === 'flat-icons') {
                        return <img src="https://cdn-icons-png.flaticon.com/128/1183/1183672.png" alt="React" className="h-8" />;
                      } else if (style === 'material-icons') {
                        return <img src="https://fonts.gstatic.com/s/i/materialicons/web/v12/24px.svg" alt="React" className="h-8" />;
                      } else if (style === 'github-icons') {
                        return <img src="https://github.com/github/explore/raw/main/topics/react/react.png" alt="React" className="h-8" />;
                      } else if (style === 'icons8') {
                        return <img src="https://img.icons8.com/color/48/000000/react.png" alt="React" className="h-8" />;
                      } else if (style === 'svg-badges') {
                        return <img src={`data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="30"><rect width="120" height="30" rx="15" fill="#${themeColor}"/><text x="60" y="20" font-family="Arial" font-size="14" fill="white" text-anchor="middle">React</text></svg>`)}`} alt="React" className="h-8" />;
                      } else if (style === 'animated-badges') {
                        return <img src={`https://readme-typing-svg.herokuapp.com?font=Fira+Code&duration=1000&pause=500&color=${themeColor}&center=true&vCenter=true&width=100&height=30&lines=React`} alt="React" />;
                      } else if (style === 'devto-badges') {
                        return <img src="https://img.shields.io/badge/React-0A0A0A?style=for-the-badge&logo=react&logoColor=white" alt="React" />;
                      } else if (style === 'edge-icons') {
                        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="h-8" />;
                      } else if (style === 'for-the-badge-colored') {
                        return <img src={`https://img.shields.io/badge/React-${themeColor}?style=for-the-badge&logoColor=white`} alt="React" />;
                      } else if (style === 'flat-colored') {
                        return <img src={`https://img.shields.io/badge/React-${themeColor}?style=flat&logoColor=white`} alt="React" />;
                      } else if (style === 'badge-card') {
                        return <img src={`https://img.shields.io/static/v1?label=&message=React&color=${themeColor}&style=for-the-badge`} alt="React" />;
                      } else if (style === 'badge-glow') {
                        return <img src={`https://img.shields.io/badge/React-${themeColor}?style=for-the-badge&logoColor=white&labelColor=${themeColor}`} alt="React" />;
                      } else if (style === 'devicon-with-text') {
                        return (
                          <div className="text-center">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="h-8 mx-auto" />
                            <div className="text-xs mt-1">React</div>
                          </div>
                        );
                      } else {
                        return <img src={`https://img.shields.io/badge/-React-${themeColor}?style=${style}`} alt="React" />;
                      }
                    })()}
                  </div>
                </div>
              )}
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