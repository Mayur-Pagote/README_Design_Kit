import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CustomBadgeMaker from './CustomBadgeMaker';
import type { ElementType } from '@/types/elements';

interface CustomBadgeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddElement: (element: ElementType) => void;
}

export function CustomBadgeDialog({ isOpen, onClose, onAddElement }: CustomBadgeDialogProps) {
  const handleAddBadge = (url: string, label: string) => {
    const newElement: ElementType = {
      id: `custom-badge-${Date.now()}`,
      type: 'image',
      src: url,
      alt: label,
      width: 'auto',
      height: 'auto',
      hiddenFor: [],
    };

    onAddElement(newElement);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl z-[200] outline-none">
        <DialogHeader>
          <DialogTitle>Custom Badge Maker</DialogTitle>
          <DialogDescription>
            Generate a custom Shields.io badge for your README with live preview.
          </DialogDescription>
        </DialogHeader>

        <CustomBadgeMaker onAddBadge={handleAddBadge} />
      </DialogContent>
    </Dialog>
  );
}
