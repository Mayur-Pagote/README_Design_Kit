import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import SupportStudioMaker from './SupportStudioMaker';

interface SupportStudioDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddElement: (element: any) => void;
}

export function SupportStudioDialog({ isOpen, onClose, onAddElement }: SupportStudioDialogProps) {
  const handleAddElements = (elements: any[]) => {
    elements.forEach(el => onAddElement(el));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent flex items-center gap-2">
            Support Studio
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create a professional, unified branding suite for your community support links.
          </DialogDescription>
        </DialogHeader>
        <SupportStudioMaker onAddElements={handleAddElements} />
      </DialogContent>
    </Dialog>
  );
}
