import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Wand2, Loader2, Settings } from 'lucide-react';
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
      <div className="relative group">
        <Textarea
          {...props}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pr-20" // Increased padding for the icon tray
        />
        
        <div className="absolute right-2 top-2 flex gap-1 bg-background/80 backdrop-blur-sm p-0.5 rounded-md border border-transparent group-hover:border-slate-700 transition-all">
          {showGenerateOption && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleGenerateText}
              disabled={isGenerating || isEnhancing}
              className="h-7 w-7 p-0 hover:bg-emerald-500/20 hover:text-emerald-500 transition-colors"
              title={value ? "Expand existing text" : "Auto-generate content"}
            >
              {isGenerating ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Wand2 className="h-3.5 w-3.5" /> // Generation now uses Wand2
              )}
            </Button>
          )}
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleEnhanceText}
            disabled={isEnhancing || isGenerating || !value}
            className="h-7 w-7 p-0 hover:bg-blue-500/20 hover:text-blue-500 transition-colors"
            title="Refine and Polish"
          >
            {isEnhancing ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" /> // Enhancement keeps Sparkles
            )}
          </Button>
        </div>
      </div>
      
      {geminiService.isConfigured() && (
        <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 px-1">
          <Wand2 className="h-3 w-3 text-emerald-500" />
          <span>AI Toolkit Active</span>
          {(() => {
            const settings = geminiService.getSettings();
            return ` (${settings.creativity}, ${settings.style})`;
          })()}
          {showGenerateOption && (
            <span className="opacity-70">
              • <span className="text-emerald-500">Wand</span>: generate • <span className="text-blue-500">Sparkle</span>: enhance
            </span>
          )}
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
