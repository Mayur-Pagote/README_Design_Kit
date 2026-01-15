import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SimpleDraggableElement } from './SimpleDraggableElement';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import type { ElementType } from '@/types/elements';
import { useIsMobile } from '@/hooks/use-mobile';

interface EditorCanvasProps {
  elements: ElementType[];
  onElementsChange: (elements: ElementType[]) => void;
  onEditElement: (element: ElementType) => void;
  viewMode?: 'developer' | 'recruiter' | 'client';
  onReorderElement?: (elementId: string, direction: 'up' | 'down') => void;
}
export function EditorCanvas({ elements, onElementsChange, onEditElement, viewMode, onReorderElement }: EditorCanvasProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id && over) {
      const oldIndex = elements.findIndex(element => element.id === active.id);
      const newIndex = elements.findIndex(element => element.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        onElementsChange(arrayMove(elements, oldIndex, newIndex));
      }
    }
    setActiveId(null);
  };

  const handleDeleteElement = (id: string) => {
    onElementsChange(elements.filter(element => element.id !== id));
  };

  return (
    <div className="flex-1 p-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">README Editor</h2>
          <p className="text-sm text-muted-foreground">
            {isMobile 
              ? 'Use the arrow buttons to reorder elements. Tap buttons to edit or delete.'
              : 'Drag and drop elements to reorder them. Click the edit button to customize each element.'}
          </p>
        </div>
        <DndContext
          sensors={isMobile ? [] : sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={elements.map(el => el.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {elements.length === 0 ? (
                <Card className="p-12 border-2 border-dashed border-border bg-background/50">
                  <div className="text-center text-muted-foreground flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4">
                      <Plus className="h-12 w-12 opacity-50" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Start Building Your README</h3>
                    <p className="text-sm max-w-md mx-auto mb-4">
                      Add elements from the sidebar to create your README.
                      {isMobile ? ' Use the arrow buttons to reorder them.' : ' You can drag and drop to reorder them.'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      💡 Try clicking "Load Demo" to see example content!
                    </p>
                  </div>
                </Card>
              ) : (
                elements.map((element, index) => (
                  <SimpleDraggableElement
                    key={element.id}
                    element={element}
                    onEdit={onEditElement}
                    onDelete={handleDeleteElement}
                    viewMode={viewMode}
                    isMobile={isMobile}
                    onMoveUp={onReorderElement ? () => onReorderElement(element.id, 'up') : undefined}
                    onMoveDown={onReorderElement ? () => onReorderElement(element.id, 'down') : undefined}
                    canMoveUp={index > 0}
                    canMoveDown={index < elements.length - 1}
                  />
                ))
              )}
            </div>
          </SortableContext>
          {!isMobile && (
            <DragOverlay className="flex items-center justify-center">
              {activeId ? (
                <div className="opacity-75 rotate-1 scale-105 mx-auto">
                  <SimpleDraggableElement
                    element={elements.find(el => el.id === activeId)!}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    viewMode={viewMode}
                    isMobile={false}
                  />
                </div>
              ) : null}
            </DragOverlay>
          )}
        </DndContext>
      </div>
    </div>
  );
}
