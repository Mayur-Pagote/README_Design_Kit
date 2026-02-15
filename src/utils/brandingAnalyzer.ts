import type { BrandingTone, BrandingAnalysis } from '@/types/branding';
import type { ElementType } from '@/types/elements';

const TONE_DESCRIPTIONS: Record<BrandingTone, string> = {
  casual: 'Friendly and approachable, uses conversational language, relatable examples',
  technical: 'Precise and detailed, focuses on technical accuracy and implementation details',
  professional: 'Polished and confident, business-focused, formal language',
  'open-source': 'Welcoming and inclusive, community-focused, collaborative language',
};

/**
 * analyzeBranding (Refactored)
 * AI-powered analysis has been removed to simplify the core workflow.
 * We've renamed it back to analyzeBranding and added the missing 'selectedTone' property.
 */
export async function analyzeBranding(_elements: ElementType[], targetTone: BrandingTone): Promise<BrandingAnalysis> {
  // Return a static/basic analysis result instead of calling AI
  return {
    overallScore: 70,
    toneConsistency: 60,
    selectedTone: targetTone, // This property is required by the BrandingAnalysis interface
    detectedTone: 'professional' as BrandingTone,
    suggestions: [
      {
        id: 'manual-1',
        section: 'Getting Started',
        suggestion: 'Ensure you have clear installation steps for your users.',
        reason: 'Installation guides are the most visited section of a README.',
        severity: 'medium',
        type: 'structure'
      },
      {
        id: 'manual-2',
        section: 'Tone Check',
        suggestion: `Aim for a ${targetTone} tone as per your project settings.`,
        reason: 'Consistent tone builds brand trust.',
        severity: 'low',
        type: 'tone'
      }
    ]
  };
}

// Utility to get tone description for UI display
export function getToneDescription(tone: BrandingTone): string {
  return TONE_DESCRIPTIONS[tone];
}
