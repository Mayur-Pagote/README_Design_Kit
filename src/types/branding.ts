export type BrandingTone = 'casual' | 'technical' | 'professional' | 'open-source';

export type BrandingFixType = 'rephrase' | 'rewrite' | 'remove';

export interface BrandingSuggestion {
  id?: string;
  elementId?: string; // 🆕 Link suggestion to specific editor element
  section: string;
  suggestion: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
  fix?: string;
  type: 'structure' | 'wording' | 'tone' | 'clarity';
  fixType?: BrandingFixType; // 🆕 Type of fix (for filtering or UI hints)
  confidence?: number;        // 🆕 Score (0 to 1) indicating how certain the suggestion is
  excerpt?: string;           // 🆕 Snippet from content that triggered the suggestion
  suggestionRange?: {
    start: number;
    end: number;
  };
}

export interface BrandingAnalysis {
  suggestions: BrandingSuggestion[];
  overallScore: number;
  toneConsistency: number;
  selectedTone: BrandingTone;
  detectedTone?: BrandingTone; // 🆕 Inferred tone from content
}
