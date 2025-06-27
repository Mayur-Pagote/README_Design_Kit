import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Sparkles, Settings, ArrowRight } from 'lucide-react';

interface AIFeatureIntroProps {
  onOpenSettings: () => void;
  isVisible: boolean;
}

export function AIFeatureIntro({ onOpenSettings, isVisible }: AIFeatureIntroProps) {
  if (!isVisible) return null;

  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50/50">
      <Sparkles className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <strong className="text-blue-900">AI Enhancement Available!</strong>
          <p className="text-blue-800 text-sm mt-1">
            Configure your Gemini API key to enable AI-powered text enhancement and generation in text fields.
          </p>
        </div>
        <Button
          onClick={onOpenSettings}
          size="sm"
          className="ml-4 bg-blue-600 hover:bg-blue-700"
        >
          <Settings className="h-4 w-4 mr-1" />
          Setup AI
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
