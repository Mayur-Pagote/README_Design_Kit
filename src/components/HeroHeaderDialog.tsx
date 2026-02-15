import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import HeroHeaderMaker from './HeroHeaderMaker';

interface HeroHeaderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddElement: (element: any) => void;
}

export function HeroHeaderDialog({ isOpen, onClose, onAddElement }: HeroHeaderDialogProps) {
  const handleAddHeader = (url: string, alt: string) => {
    onAddElement({
      id: `hero-${Date.now()}`,
      type: 'image',
      src: url,
      alt: alt,
      width: '100%',
      height: 'auto',
      hiddenFor: [],
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Hero Header Studio
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Design a professional, dynamic SVG banner for your project's brand identity.
          </DialogDescription>
        </DialogHeader>
        <HeroHeaderMaker onAddHeader={handleAddHeader} />
      </DialogContent>
    </Dialog>
  );
}
