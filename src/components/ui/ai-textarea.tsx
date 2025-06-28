import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2, Settings } from 'lucide-react';
import { geminiService } from '@/services/geminiService';
import { toast } from 'sonner';

interface AITextareaProps extends React.ComponentProps<typeof Textarea> {
  onValueChange?: (value: string) => void;
  aiContext?: string;
  showGenerateOption?: boolean;
  generationType?: 'project' | 'about' | 'bio' | 'summary' | 'custom';
  placeholder?: string;
}

export function AITextarea({ 
  value = '', 
  onValueChange, 
  onChange,
  aiContext = '',
  showGenerateOption = false,
  generationType = 'custom',
  placeholder,
  ...props 
}: AITextareaProps) {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange?.(e);
    onValueChange?.(newValue);
  };

  const handleEnhanceText = async () => {
    if (!geminiService.isConfigured()) {
      toast.error('Gemini API key not configured. Please set it up in settings.');
      return;
    }

    const textToEnhance = typeof value === 'string' ? value.trim() : '';
    if (!textToEnhance) {
      toast.error('Please enter some text to enhance.');
      return;
    }

    setIsEnhancing(true);
    try {
      const enhancedText = await geminiService.enhanceText(textToEnhance, aiContext);
      onValueChange?.(enhancedText);
      
      // Create a synthetic event for onChange compatibility
      const syntheticEvent = {
        target: { value: enhancedText },
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onChange?.(syntheticEvent);

      toast.success('Text enhanced successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to enhance text');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerateText = async () => {
    if (!geminiService.isConfigured()) {
      toast.error('Gemini API key not configured. Please set it up in settings.');
      return;
    }

    setIsGenerating(true);
    try {
      const currentText = typeof value === 'string' ? value.trim() : '';
      const generatedText = await geminiService.generateDescription(generationType, aiContext, currentText);
      onValueChange?.(generatedText);
      
      // Create a synthetic event for onChange compatibility
      const syntheticEvent = {
        target: { value: generatedText },
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onChange?.(syntheticEvent);

      toast.success('Text generated successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate text');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Textarea
          {...props}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pr-12"
        />
        
        <div className="absolute right-2 top-2 flex gap-1">
          {showGenerateOption && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleGenerateText}
              disabled={isGenerating || isEnhancing}
              className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
              title={value ? "Expand and improve existing text" : "Generate new content with AI"}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </Button>
          )}
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleEnhanceText}
            disabled={isEnhancing || isGenerating || !value}
            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
            title="Enhance with AI"
          >
            {isEnhancing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      {geminiService.isConfigured() && (
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          AI enhancements enabled
          {(() => {
            const settings = geminiService.getSettings();
            return ` (${settings.creativity}, ${settings.style})`;
          })()}
          {showGenerateOption && (
            <span>
              • <span className="text-green-600">Green sparkle</span>: expand/generate • <span className="text-blue-600">Blue sparkle</span>: enhance existing
            </span>
          )}
          {!showGenerateOption && ' • Click the sparkle icon to enhance existing text'}
        </p>
      )}
      
      {!geminiService.isConfigured() && (
        <p className="text-xs text-amber-600 flex items-center gap-1">
          <Settings className="h-3 w-3" />
          Configure Gemini API key in settings to enable AI features
        </p>
      )}
    </div>
  );
}
