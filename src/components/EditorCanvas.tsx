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

interface EditorCanvasProps {
  elements: ElementType[];
  onElementsChange: (elements: ElementType[]) => void;
  onEditElement: (element: ElementType) => void;
}

export function EditorCanvas({ elements, onElementsChange, onEditElement }: EditorCanvasProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })  );
  const handleDragStart = (event: DragStartEvent) => {
    console.log('Drag started:', event.active.id);
    setActiveId(event.active.id as string);
  };    const handleDragEnd = (event: DragEndEvent) => {
    console.log('Drag ended:', event.active.id, 'over:', event.over?.id);
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      const oldIndex = elements.findIndex(element => element.id === active.id);
      const newIndex = elements.findIndex(element => element.id === over.id);

      console.log('Moving from index', oldIndex, 'to', newIndex);

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
    <div className="flex-1 p-6 overflow-y-auto bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">README Editor</h2>
          <p className="text-sm text-muted-foreground">
            Drag and drop elements to reorder them. Click the edit button to customize each element.
          </p>
        </div>        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={elements.map(el => el.id)}
            strategy={verticalListSortingStrategy}
          >            <div className="space-y-4">
              {elements.length === 0 ? (
                <Card className="p-12 border-2 border-dashed border-border bg-background/50">
                  <div className="text-center text-muted-foreground">
                    <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Start Building Your README</h3>
                    <p className="text-sm max-w-md mx-auto mb-4">
                      Add elements from the sidebar to create your README. 
                      You can drag and drop to reorder them.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      💡 Try clicking "Load Demo" to see example content!
                    </p>
                  </div>
                </Card>              ) : (
                elements.map(element => (
                  <SimpleDraggableElement
                    key={element.id}
                    element={element}
                    onEdit={onEditElement}
                    onDelete={handleDeleteElement}
                  />
                ))
              )}</div>
          </SortableContext>
            <DragOverlay>
            {activeId ? (
              <div className="opacity-75 rotate-1 scale-105">
                <SimpleDraggableElement
                  element={elements.find(el => el.id === activeId)!}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
