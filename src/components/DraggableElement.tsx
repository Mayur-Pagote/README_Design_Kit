import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ElementRenderer } from './ElementRenderer';
import type { ElementType } from '@/types/elements';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, Edit, Trash2 } from 'lucide-react';

interface DraggableElementProps {
  element: ElementType;
  onEdit: (element: ElementType) => void;
  onDelete: (id: string) => void;
}

export function DraggableElement({ element, onEdit, onDelete }: DraggableElementProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 50 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <Card className={`p-4 border-2 transition-colors ${
        isDragging 
          ? 'border-primary bg-primary/5 shadow-lg' 
          : 'border-transparent hover:border-primary/20'
      }`}>        {/* Drag Handle and Controls */}
        <div className="absolute -left-3 top-2 opacity-40 group-hover:opacity-100 transition-opacity flex flex-col gap-1 z-10">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-background border shadow-sm cursor-grab active:cursor-grabbing hover:opacity-100"
            {...attributes}
            {...listeners}
            title="Drag to reorder"
          >
            <GripVertical className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="absolute -right-3 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 z-10">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-background border shadow-sm"
            onClick={() => onEdit(element)}
            title="Edit element"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-background border shadow-sm text-destructive hover:text-destructive"
            onClick={() => onDelete(element.id)}
            title="Delete element"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>

        {/* Element Content */}
        <div className="min-h-[40px] pl-2 pr-2">
          <ElementRenderer element={element} />
        </div>
      </Card>
    </div>
  );
}
