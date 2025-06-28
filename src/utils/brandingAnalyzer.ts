import type { BrandingSuggestion, BrandingTone, BrandingAnalysis } from '@/types/branding';
import type { ElementType } from '@/types/elements';
import { geminiService } from '@/services/geminiService';

const TONE_DESCRIPTIONS: Record<BrandingTone, string> = {
  casual: 'Friendly and approachable, uses conversational language, relatable examples',
  technical: 'Precise and detailed, focuses on technical accuracy and implementation details',
  professional: 'Polished and confident, business-focused, formal language',
  'open-source': 'Welcoming and inclusive, community-focused, collaborative language',
};

function getReadableContent(el: ElementType): string {
  if ('content' in el && typeof el.content === 'string') return el.content;
  if ('headers' in el && 'rows' in el) return [...el.headers, ...el.rows.flat()].join(' ');
  if ('technologies' in el) return el.technologies.join(' ');
  if ('alt' in el) return el.alt ?? '';
  if ('username' in el && 'repository' in el) return `${el.username} ${el.repository}`;
  return '';
}

function buildReadmeContent(elements: ElementType[]): string {
  const content = elements
    .map(el => {
      const text = getReadableContent(el);
      if (!text) return '';
      return `[${el.type.toUpperCase()}]: ${text}`;
    })
    .filter(Boolean)
    .join('\n\n');
  
  return content || 'No content available for analysis';
}

async function analyzeWithAI(readmeContent: string, targetTone: BrandingTone): Promise<{
  suggestions: BrandingSuggestion[];
  overallScore: number;
  toneConsistency: number;
  detectedTone: BrandingTone;
}> {
  if (!geminiService.isConfigured()) {
    // Fallback to basic analysis if AI is not configured
    return {
      suggestions: [{
        section: 'AI Analysis',
        suggestion: 'Configure Gemini API key to enable AI-powered README analysis',
        reason: 'AI analysis provides deeper insights into your README quality and suggestions',
        severity: 'medium' as const,
        type: 'structure' as const,
      }],
      overallScore: 50,
      toneConsistency: 50,
      detectedTone: 'professional' as BrandingTone,
    };
  }

  try {
    const analysisPrompt = `You are a README analysis expert. Analyze the following README content and provide detailed feedback with specific implementable fixes.

TARGET TONE: ${targetTone} (${TONE_DESCRIPTIONS[targetTone]})

README CONTENT:
${readmeContent}

Please analyze and return a JSON object with the following structure:
{
  "overallScore": <number 0-100>,
  "toneConsistency": <number 0-100>,
  "detectedTone": "<casual|technical|professional|open-source>",
  "suggestions": [
    {
      "section": "<section name>",
      "suggestion": "<specific actionable suggestion>",
      "reason": "<why this improvement is needed>",
      "severity": "<low|medium|high>",
      "type": "<structure|wording|tone|clarity>",
      "confidence": <number 0-1>,
      "excerpt": "<relevant text snippet if applicable>",
      "elementId": "<element id if applicable>",
      "fix": "<specific replacement text if applicable>",
      "fixType": "<grammar|enhancement|rewrite|addition>"
    }
  ]
}

Analysis Guidelines:
1. Overall Score: Rate completeness, clarity, professionalism (0-100)
2. Tone Consistency: How well content matches target tone (0-100)
3. Detected Tone: What tone the content currently has
4. Suggestions: 3-8 specific, actionable improvements focusing on:
   - Missing essential sections (installation, usage, etc.)
   - Clarity and readability issues
   - Tone alignment with target
   - Grammar and spelling
   - Structure and organization
   - Technical accuracy

For suggestions with fixable content:
- Include "elementId" if you can identify which element needs fixing
- Include "fix" with the exact replacement text
- Include "fixType" to categorize the type of fix

Provide specific, actionable feedback with implementable fixes where possible.`;

    const model = geminiService['genAI']!.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    const text = response.text().trim();

    // Clean up the response and extract JSON
    let jsonStr = text;
    if (jsonStr.includes('```json')) {
      jsonStr = jsonStr.split('```json')[1].split('```')[0];
    } else if (jsonStr.includes('```')) {
      jsonStr = jsonStr.split('```')[1].split('```')[0];
    }

    const analysisResult = JSON.parse(jsonStr);
    
    // Validate and sanitize the response
    return {
      suggestions: (analysisResult.suggestions || []).slice(0, 8).map((s: any, index: number) => ({
        id: `ai-suggestion-${index}`,
        section: s.section || 'General',
        suggestion: s.suggestion || 'No suggestion provided',
        reason: s.reason || 'No reason provided',
        severity: ['low', 'medium', 'high'].includes(s.severity) ? s.severity : 'medium',
        type: ['structure', 'wording', 'tone', 'clarity'].includes(s.type) ? s.type : 'clarity',
        confidence: typeof s.confidence === 'number' ? Math.max(0, Math.min(1, s.confidence)) : 0.7,
        excerpt: s.excerpt ? s.excerpt.substring(0, 100) : undefined,
        elementId: s.elementId || undefined,
        fix: s.fix || undefined,
        fixType: s.fixType || undefined,
      })),
      overallScore: Math.max(0, Math.min(100, analysisResult.overallScore || 50)),
      toneConsistency: Math.max(0, Math.min(100, analysisResult.toneConsistency || 50)),
      detectedTone: ['casual', 'technical', 'professional', 'open-source'].includes(analysisResult.detectedTone) 
        ? analysisResult.detectedTone 
        : 'professional',
    };

  } catch (error) {
    console.error('Error in AI analysis:', error);
    
    // Fallback analysis
    return {
      suggestions: [{
        section: 'AI Analysis',
        suggestion: 'Unable to analyze README with AI at the moment',
        reason: 'There was an error processing your README. Please try again later.',
        severity: 'low' as const,
        type: 'structure' as const,
        confidence: 0.5,
      }],
      overallScore: 60,
      toneConsistency: 60,
      detectedTone: targetTone,
    };
  }
}

function performBasicAnalysis(elements: ElementType[]): BrandingSuggestion[] {
  const suggestions: BrandingSuggestion[] = [];

  // Check for essential sections
  const hasTitle = elements.some((el) => el.type === 'title' || el.type === 'header');
  const hasDescription = elements.some((el) => el.type === 'description' || el.type === 'text');
  const hasInstallation = elements.some((el) => el.type === 'installation');
  const hasTechStack = elements.some((el) => el.type === 'tech-stack');

  if (!hasTitle) {
    suggestions.push({
      section: 'Structure',
      suggestion: 'Add a compelling title or header',
      reason: 'Titles help with branding and make your project discoverable',
      severity: 'high',
      type: 'structure',
      confidence: 0.9,
    });
  }

  if (!hasDescription) {
    suggestions.push({
      section: 'Structure',
      suggestion: 'Include a project description',
      reason: 'Helps users quickly understand what your project does',
      severity: 'high',
      type: 'structure',
      confidence: 0.9,
    });
  }

  if (!hasInstallation) {
    suggestions.push({
      section: 'Structure',
      suggestion: 'Add installation or setup instructions',
      reason: 'Clear setup instructions reduce friction for new users',
      severity: 'medium',
      type: 'structure',
      confidence: 0.8,
    });
  }

  if (!hasTechStack) {
    suggestions.push({
      section: 'Structure',
      suggestion: 'Consider adding a tech stack section',
      reason: 'Showcasing technologies helps developers understand your project',
      severity: 'low',
      type: 'structure',
      confidence: 0.7,
    });
  }

  return suggestions;
}

export async function analyzeBranding(elements: ElementType[], tone: BrandingTone): Promise<BrandingAnalysis> {
  const readmeContent = buildReadmeContent(elements);
  
  try {
    // Perform AI analysis
    const aiAnalysis = await analyzeWithAI(readmeContent, tone);
    
    // Combine with basic structural analysis
    const basicSuggestions = performBasicAnalysis(elements);
    
    // Merge suggestions, prioritizing AI suggestions
    const allSuggestions = [
      ...aiAnalysis.suggestions,
      ...basicSuggestions.filter(basic => 
        !aiAnalysis.suggestions.some(ai => ai.section === basic.section)
      )
    ].slice(0, 8);

    return {
      suggestions: allSuggestions,
      overallScore: aiAnalysis.overallScore,
      toneConsistency: aiAnalysis.toneConsistency,
      selectedTone: tone,
      detectedTone: aiAnalysis.detectedTone,
    };

  } catch (error) {
    console.error('Error in branding analysis:', error);
    
    // Fallback to basic analysis only
    const basicSuggestions = performBasicAnalysis(elements);
    
    return {
      suggestions: basicSuggestions,
      overallScore: Math.max(0, 100 - basicSuggestions.filter(s => s.severity === 'high').length * 20),
      toneConsistency: 70,
      selectedTone: tone,
      detectedTone: 'professional',
    };
  }
}
