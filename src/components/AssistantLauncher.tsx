import { useState } from "react";
import { Sparkles, X } from "lucide-react";
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

  return (
    <>
      {/* Floating button */}
      <button
        className={`fixed ${backToTopVisible ? 'bottom-24' : 'bottom-6'} right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90`}
        onClick={() => setOpen(true)}
        title="Open README Analysis - Powered by Gemini"
        aria-label="Open README Analysis - Powered by Gemini"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {/* Assistant panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[28rem] max-h-[80vh] overflow-y-auto rounded-xl border bg-background text-foreground shadow-2xl ring-1 ring-border animate-in fade-in slide-in-from-bottom-4">
          <ReadmeAnalysis
            elements={elements}
            isEditorActive={isEditorActive}
            onApplySuggestion={onApplySuggestion}
            onApplyAction={onApplyAction}
            onAddElement={onAddElement}
            onRemoveElement={onRemoveElement}
            onReorderElement={onReorderElement}
          />
          <div className="flex justify-end border-t px-4 py-2">
            <button
              className="text-sm text-muted-foreground hover:underline flex items-center"
              onClick={() => setOpen(false)}
              title="Close README Analysis"
              aria-label="Close README Analysis"
            >
              <X className="inline-block h-4 w-4 mr-1" />
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
