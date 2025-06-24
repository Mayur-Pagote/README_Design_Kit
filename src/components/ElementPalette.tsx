import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ElementType } from '@/types/elements';

interface ElementPaletteProps {
  onAddElement: (element: ElementType) => void;
}

export function ElementPalette({ onAddElement }: ElementPaletteProps) {
  const elementTypes: {
    type: ElementType['type'];
    label: string;
    icon: React.ReactNode;
  }[] = [
    { type: 'header', label: 'Project Header', icon: '📝' },
    { type: 'text', label: 'Description', icon: '📄' },
    { type: 'badge', label: 'Badge', icon: '🏷️' },
    { type: 'installation', label: 'Installation', icon: '⚙️' },
    { type: 'code-block', label: 'Code Block', icon: '💻' },
    { type: 'table', label: 'Feature Table', icon: '📊' },
    { type: 'tech-stack', label: 'Tech Stack', icon: '🔧' },
    { type: 'git-contribution', label: 'Git Contribution', icon: '🐙' },
    { type: 'divider', label: 'Divider', icon: '➖' },
    { type: 'banner', label: 'Banner', icon: '📢' },
    { type: 'image', label: 'Image', icon: '🖼️' },
  ];

  const handleAddElement = (type: ElementType['type'], label: string) => {
    const baseId = `${type}-${Date.now()}`;
    let newElement: ElementType;

    switch (type) {
      case 'text':
        newElement = {
          id: baseId,
          type,
          content: `Sample ${label.toLowerCase()} content`,
          style: {
            fontSize: 'md',
            fontWeight: 'normal',
            textAlign: 'left',
            color: 'text-foreground',
          },
          hiddenFor: [],
        };
        break;
      case 'header':
        newElement = {
          id: baseId,
          type,
          content: `Sample ${label.toLowerCase()} content`,
          level: 2,
          hiddenFor: [],
        };
        break;
      case 'banner':
        newElement = {
          id: baseId,
          type,
          content: `Sample ${label.toLowerCase()} banner`,
          variant: 'default',
          color: 'blue',
          hiddenFor: [],
        };
        break;
      case 'badge':
        newElement = {
          id: baseId,
          type,
          content: `Sample badge`,
          variant: 'default',
          hiddenFor: [],
        };
        break;
      case 'code-block':
        newElement = {
          id: baseId,
          type,
          content: 'console.log("Hello world");',
          language: 'javascript',
          hiddenFor: [],
        };
        break;
      case 'table':
        newElement = {
          id: baseId,
          type,
          headers: ['Column 1', 'Column 2'],
          rows: [['Row 1 Col 1', 'Row 1 Col 2']],
          hiddenFor: [],
        };
        break;
      case 'tech-stack':
        newElement = {
          id: baseId,
          type,
          technologies: ['React', 'TypeScript'],
          layout: 'badges',
          hiddenFor: [],
        };
        break;
      case 'git-contribution':
        newElement = {
          id: baseId,
          type,
          username: 'your-username',
          repository: 'your-repo',
          hiddenFor: [],
        };
        break;
      case 'divider':
        newElement = {
          id: baseId,
          type,
          dividerStyle: 'line',
          hiddenFor: [],
        };
        break;
      case 'installation':
        newElement = {
          id: baseId,
          type,
          content: 'npm install your-package',
          hiddenFor: [],
        };
        break;
      case 'image':
        newElement = {
          id: baseId,
          type,
          src: 'https://example.com/image.png',
          alt: 'Example image',
          width: '100%',
          height: 'auto',
          hiddenFor: [],
        };
        break;
      default:
        throw new Error(`Unsupported element type: ${type}`);
    }

    onAddElement(newElement);
  };

  return (
    <div className="w-80 border-r border-border bg-muted/50 p-4 overflow-auto">
      <div className="mb-4">
        <h2 className="font-semibold text-lg mb-2">Element Palette</h2>
        <p className="text-sm text-muted-foreground">
          Drag elements to build your README
        </p>
      </div>

      <div className="space-y-2">
        {elementTypes.map(({ type, label, icon }) => (
          <Button
            key={type}
            variant="outline"
            size="sm"
            onClick={() => handleAddElement(type, label)}
            className="w-full justify-start gap-3 h-auto py-3"
          >
            <span className="text-lg">{icon}</span>
            <div className="flex-1 text-left">
              <div className="font-medium">{label}</div>
              <div className="text-xs text-muted-foreground capitalize">{type}</div>
            </div>
            <Plus className="h-4 w-4 opacity-50" />
          </Button>
        ))}
      </div>
    </div>
  );
}
