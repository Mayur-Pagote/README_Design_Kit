import type { BrandingSuggestion, BrandingTone, BrandingAnalysis } from '@/types/branding';
import type { ElementType } from '@/types/elements';

const TONE_GUIDELINES: Record<BrandingTone, {
  keywords: string[];
  avoid: string[];
  style: string;
}> = {
  casual: {
    keywords: ['easy', 'simple', 'friendly', 'awesome', 'cool'],
    avoid: ['utilize', 'facilitate', 'implement', 'leverage'],
    style: 'conversational and approachable',
  },
  technical: {
    keywords: ['implement', 'configure', 'optimize', 'architecture', 'framework'],
    avoid: ['easy', 'simple', 'just', 'obviously'],
    style: 'precise and detailed',
  },
  professional: {
    keywords: ['streamlined', 'comprehensive', 'robust', 'enterprise-grade'],
    avoid: ['awesome', 'cool', 'amazing', 'super'],
    style: 'polished and confident',
  },
  'open-source': {
    keywords: ['contribute', 'community', 'collaborative', 'maintainable'],
    avoid: ['proprietary', 'exclusive', 'limited'],
    style: 'welcoming and inclusive',
  },
};

function getReadableContent(el: ElementType): string {
  if ('content' in el && typeof el.content === 'string') return el.content;
  if ('headers' in el && 'rows' in el) return [...el.headers, ...el.rows.flat()].join(' ');
  if ('technologies' in el) return el.technologies.join(' ');
  if ('alt' in el) return el.alt ?? '';
  if ('username' in el && 'repository' in el) return `${el.username} ${el.repository}`;
  return '';
}

function analyzeContent(elements: ElementType[], tone: BrandingTone): BrandingSuggestion[] {
  const suggestions: BrandingSuggestion[] = [];
  const guidelines = TONE_GUIDELINES[tone];

  const weakWords = ['very', 'really', 'quite', 'pretty', 'somewhat'];
  const passiveIndicators = ['was created', 'is built', 'can be used', 'will be'];
  const vagueWords = ['things', 'stuff', 'nice', 'good', 'bad'];

  for (const el of elements) {
    const content = getReadableContent(el);
    const contentLower = content?.toLowerCase();

    if (!el.id || !contentLower) continue;

    for (const word of weakWords) {
      if (contentLower.includes(word)) {
        suggestions.push({
          elementId: el.id,
          section: 'Content',
          suggestion: `Remove the weak modifier "${word}" to make your writing stronger.`,
          reason: `"${word}" can make your language sound uncertain.`,
          severity: 'medium',
          type: 'wording',
          fixType: 'rephrase',
          confidence: 0.7,
          excerpt: content,
        });
      }
    }

    for (const phrase of passiveIndicators) {
      if (contentLower.includes(phrase)) {
        suggestions.push({
          elementId: el.id,
          section: 'Content',
          suggestion: `Consider using active voice instead of "${phrase}".`,
          reason: 'Active voice improves engagement and clarity.',
          severity: 'low',
          type: 'clarity',
          fixType: 'rephrase',
          confidence: 0.6,
          excerpt: content,
        });
      }
    }

    for (const word of guidelines.avoid) {
      if (guidelines.keywords.includes(word)) continue; // don't flag if also accepted
      if (contentLower.includes(word)) {
        const replacement = guidelines.keywords[Math.floor(Math.random() * guidelines.keywords.length)];
        suggestions.push({
          elementId: el.id,
          section: 'Tone',
          suggestion: `Replace "${word}" with "${replacement}" to better match a ${tone} tone.`,
          reason: `"${word}" feels misaligned with a ${tone} voice, which aims to be ${guidelines.style}.`,
          severity: 'medium',
          type: 'tone',
          fixType: 'rephrase',
          confidence: 0.75,
          excerpt: content,
        });
      }
    }

    for (const word of vagueWords) {
      if (contentLower.includes(word)) {
        suggestions.push({
          elementId: el.id,
          section: 'Clarity',
          suggestion: `Avoid vague words like "${word}"—be more specific.`,
          reason: 'Clear, specific language makes your message more credible.',
          severity: 'high',
          type: 'clarity',
          fixType: 'rephrase',
          confidence: 0.85,
          excerpt: content,
        });
      }
    }
  }

  return suggestions;
}

function analyzeStructure(elements: ElementType[]): BrandingSuggestion[] {
  const suggestions: BrandingSuggestion[] = [];

  const hasTitle = elements.some((el) => el.type === 'title');
  const hasDescription = elements.some((el) => el.type === 'description');
  const hasInstallation = elements.some((el) => el.type === 'installation');

  if (!hasTitle) {
    suggestions.push({
      section: 'Structure',
      suggestion: 'Add a compelling title.',
      reason: 'Titles help branding and searchability.',
      severity: 'high',
      type: 'structure',
      fixType: 'rewrite',
      confidence: 0.9,
    });
  }

  if (!hasDescription) {
    suggestions.push({
      section: 'Structure',
      suggestion: 'Include a brief project description.',
      reason: 'Helps users quickly understand the purpose.',
      severity: 'high',
      type: 'structure',
      fixType: 'rewrite',
      confidence: 0.9,
    });
  }

  if (!hasInstallation) {
    suggestions.push({
      section: 'Structure',
      suggestion: 'Add installation steps.',
      reason: 'Clear setup reduces user friction.',
      severity: 'medium',
      type: 'structure',
      fixType: 'rewrite',
      confidence: 0.8,
    });
  }

  return suggestions;
}

function detectTone(elements: ElementType[]): BrandingTone {
  const all = elements.map(getReadableContent).join(' ').toLowerCase();
  if (all.includes('lol') || all.includes('awesome') || all.includes('yo')) return 'casual';
  if (all.includes('framework') || all.includes('optimize')) return 'technical';
  if (all.includes('community') || all.includes('pull request')) return 'open-source';
  return 'professional';
}

export function analyzeBranding(elements: ElementType[], tone: BrandingTone): BrandingAnalysis {
  const structureSuggestions = analyzeStructure(elements);
  const contentSuggestions = analyzeContent(elements, tone);
  const allSuggestions = [...structureSuggestions, ...contentSuggestions];

  const high = allSuggestions.filter((s) => s.severity === 'high').length;
  const medium = allSuggestions.filter((s) => s.severity === 'medium').length;
  const toneIssues = allSuggestions.filter((s) => s.type === 'tone').length;

  return {
    suggestions: allSuggestions.slice(0, 8),
    overallScore: Math.max(0, 100 - (high * 20 + medium * 10)),
    toneConsistency: Math.max(0, 100 - toneIssues * 15),
    selectedTone: tone,
    detectedTone: detectTone(elements),
  };
}
