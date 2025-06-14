import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  PanelLeft,
  PanelRight,
  Sparkles,
} from 'lucide-react';
import { ElementPalette } from '@/components/ElementPalette';
import { EditorCanvas } from '@/components/EditorCanvas';
import { ReadmePreview } from '@/components/ReadmePreview';
import { ElementEditor } from '@/components/ElementEditor';
import { demoElements } from '@/data/demo';
import type { ElementType } from '@/types/elements';

export default function DragDropEditor() {
  const [elements, setElements] = useState<ElementType[]>([]);
  const [editingElement, setEditingElement] = useState<ElementType | null>(null);
  const [showPalette, setShowPalette] = useState(true);
  const [showPreview, setShowPreview] = useState(true);

  const handleAddElement = (element: ElementType) => {
    setElements(prev => [...prev, element]);
  };

  const handleEditElement = (element: ElementType) => {
    setEditingElement(element);
  };

  const handleSaveElement = (editedElement: ElementType) => {
    setElements(prev => 
      prev.map(el => el.id === editedElement.id ? editedElement : el)
    );
    setEditingElement(null);
  };
  const handleElementsChange = (newElements: ElementType[]) => {
    setElements(newElements);
  };

  const loadDemo = () => {
    setElements([...demoElements]);
  };

  const clearAll = () => {
    setElements([]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Editor Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
              </Button>
              <span className="text-muted-foreground">•</span>
              <h1 className="text-xl font-semibold">Drag & Drop README Editor</h1>
              <Badge variant="default">Beta</Badge>
            </div>            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={loadDemo}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Load Demo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                disabled={elements.length === 0}
              >
                Clear All
              </Button>
              <span className="text-muted-foreground mx-2">•</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPalette(!showPalette)}
                className="flex items-center gap-2"
              >
                <PanelLeft className="h-4 w-4" />
                {showPalette ? 'Hide' : 'Show'} Elements
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2"
              >
                <PanelRight className="h-4 w-4" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Elements Palette */}
        {showPalette && (
          <ElementPalette onAddElement={handleAddElement} />
        )}

        {/* Main Editor Canvas */}
        <EditorCanvas
          elements={elements}
          onElementsChange={handleElementsChange}
          onEditElement={handleEditElement}
        />

        {/* README Preview */}
        {showPreview && (
          <div className="w-1/2 border-l border-border">
            <ReadmePreview elements={elements} />
          </div>
        )}
      </div>

      {/* Element Editor Dialog */}
      <ElementEditor
        element={editingElement}
        isOpen={editingElement !== null}
        onClose={() => setEditingElement(null)}
        onSave={handleSaveElement}
      />
    </div>
  );
}
