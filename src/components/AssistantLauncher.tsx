import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { BrandingAssistant } from "@/components/BrandingAssistant";
import type { ElementType } from "@/types/elements";

interface AssistantLauncherProps {
  elements: ElementType[];
  isEditorActive: boolean;
  onApplySuggestion: (elementId: string, newContent: string) => void;
}

export function AssistantLauncher({
  elements,
  isEditorActive,
  onApplySuggestion,
}: AssistantLauncherProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90"
        onClick={() => setOpen(true)}
        title="Open Branding Assistant"
        aria-label="Open Branding Assistant"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {/* Assistant panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[28rem] max-h-[80vh] overflow-y-auto rounded-xl border bg-background text-foreground shadow-2xl ring-1 ring-border animate-in fade-in slide-in-from-bottom-4">
          <BrandingAssistant
            elements={elements}
            isEditorActive={isEditorActive}
            onApplySuggestion={onApplySuggestion}
          />
          <div className="flex justify-end border-t px-4 py-2">
            <button
              className="text-sm text-muted-foreground hover:underline flex items-center"
              onClick={() => setOpen(false)}
              title="Close Branding Assistant"
              aria-label="Close Branding Assistant"
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
