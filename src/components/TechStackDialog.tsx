import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TechStackSelector } from './TechStackSelector';
import type { ElementType } from '@/types/elements';

interface TechStackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddElement: (element: ElementType) => void;
}

export function TechStackDialog({ isOpen, onClose, onAddElement }: TechStackDialogProps) {
  const handleTechStackGenerate = (techStack: {
    technologies: string[];
    style: string;
    layout: string;
    theme: string;
  }) => {
    if (techStack.technologies.length > 0) {
      const newElement: ElementType = {
        id: `tech-stack-${Date.now()}`,
        type: 'tech-stack',
        technologies: techStack.technologies,
        layout: techStack.layout as 'grid' | 'list' | 'badges' | 'inline' | 'grouped',
        badgeStyle: techStack.style,
        theme: techStack.theme,
        hiddenFor: [],
      };
      
      onAddElement(newElement);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* FIX: Applied z-[200] so content renders above the blurred backdrop (z-150).
          Added outline-none to prevent focus outlines on the container.
      */}
      <DialogContent className="max-w-2xl mt-16 z-[200] outline-none">
        <DialogHeader>
          <DialogTitle>Advanced Tech Stack Generator</DialogTitle>
          <DialogDescription>
            Create a custom tech stack element by selecting technologies,
            badge styles, layout, and color themes.
          </DialogDescription>
        </DialogHeader>

        {/* Internal scroll div allows the long selector list to be usable 
            without cutting off dropdown menus.
        */}
        <div className="py-4 max-h-[70vh] overflow-y-auto px-1 custom-scrollbar">
          <TechStackSelector onTechStackGenerate={handleTechStackGenerate} />
        </div>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
