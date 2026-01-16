import type { ElementType } from '@/types/elements';

export interface ReadmeQualityResult {
  score: number;
  strengths: string[];
  missing: string[];
  suggestions: string[];
}

export function analyzeReadmeQuality(
  elements: ElementType[]
): ReadmeQualityResult {
  let score = 0;
  const strengths: string[] = [];
  const missing: string[] = [];
  const suggestions: string[] = [];

  const types: ElementType['type'][] = elements.map(e => e.type);

  const has = (t: ElementType['type']) => types.includes(t);

  if (has('title') || has('header')) {
    score += 15;
    strengths.push('Project title is present');
  } else {
    missing.push('Project title');
    suggestions.push('Add a clear project title using a Header element');
  }

  if (has('description') || has('text')) {
    score += 15;
    strengths.push('Project description is present');
  } else {
    missing.push('Description');
    suggestions.push(
      'Add a short description explaining what the project does'
    );
  }

  if (has('installation')) {
    score += 15;
    strengths.push('Installation instructions provided');
  } else {
    missing.push('Installation');
    suggestions.push('Add installation steps to help users get started');
  }

  if (has('code-block')) {
    score += 15;
    strengths.push('Usage examples included');
  } else {
    suggestions.push('Include code examples to improve usability');
  }

  if (has('tech-stack')) {
    score += 10;
    strengths.push('Tech stack documented');
  } else {
    suggestions.push('Document the technologies used in the project');
  }

  if (has('badge')) {
    score += 5;
    strengths.push('Badges improve visual clarity');
  }

  if (elements.length >= 5) {
    score += 10;
    strengths.push('README has a good structural depth');
  } else {
    suggestions.push('Consider adding more structured sections');
  }

  return {
    score: Math.min(score, 100),
    strengths,
    missing,
    suggestions,
  };
}
