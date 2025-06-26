import { useState } from 'react';
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
      // Create a tech stack element with the selected options
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Advanced Tech Stack Generator</DialogTitle>
          <DialogDescription>
            Create a custom tech stack element by selecting technologies,
            badge styles, layout, and color themes.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <TechStackSelector onTechStackGenerate={handleTechStackGenerate} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
