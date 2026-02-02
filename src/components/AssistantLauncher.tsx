import { useState,  useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { ReadmeAnalysis } from "@/components/ReadmeAnalysis";
import type { ElementType } from "@/types/elements";
import type { SuggestionAction } from "@/types/branding";

interface AssistantLauncherProps {
  elements: ElementType[];
  isEditorActive: boolean;
  onApplySuggestion: (elementId: string, newContent: string) => void;
  onApplyAction?: (action: SuggestionAction) => void;
  onAddElement?: (element: ElementType) => void;
  onRemoveElement?: (elementId: string) => void;
  onReorderElement?: (elementId: string, direction: 'up' | 'down') => void;
  backToTopVisible?: boolean;
}

export function AssistantLauncher({
  elements,
  isEditorActive,
  onApplySuggestion,
  onApplyAction,
  onAddElement,
  onRemoveElement,
  onReorderElement,
  backToTopVisible = false,
}: AssistantLauncherProps) {
  const [open, setOpen] = useState(false);

const panelRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {
  if (!open) return;

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    
    if (panelRef.current?.contains(target)) return;
    if (target.closest('.radix-portal')) return;
    if (target.closest('[role="listbox"]')) return;

    setOpen(false);
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [open]);


  return (
    <>
      {/* Floating button */}
      <button
        className={`fixed ${backToTopVisible ? 'bottom-24' : 'bottom-6'} right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90 cursor-pointer`}
        onClick={() => setOpen((prev) => !prev)}
        title="Open README Analysis - Powered by Gemini"
        aria-label="Open README Analysis - Powered by Gemini"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {/* Assistant panel */}
      {open && (
        <div 
        ref={panelRef}
        className={`fixed bottom-24 right-6 z-50 w-[28rem] max-h-[80vh] overflow-y-auto rounded-xl border bg-background text-foreground shadow-2xl ring-1 ring-border transition-all duration-300
          ${open ? 'animate-in fade-in slide-in-from-bottom-4' : 'animate-out fade-out slide-out-to-bottom-4'}`}>
          <ReadmeAnalysis
            elements={elements}
            isEditorActive={isEditorActive}
            onApplySuggestion={onApplySuggestion}
            onApplyAction={onApplyAction}
            onAddElement={onAddElement}
            onRemoveElement={onRemoveElement}
            onReorderElement={onReorderElement}
          />
        </div>
      )}
    </>
  );
}
