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

VALID ELEMENT TYPES AND REQUIRED PROPERTIES:
- text: requires content, style: { fontSize: 'sm'|'md'|'lg'|'xl'|'2xl'|'3xl', fontWeight: 'normal'|'bold'|'semibold', textAlign: 'left'|'center'|'right', color: string }
- title: requires content
- description: requires content  
- header: requires content, level: 1|2|3|4|5|6
- banner: requires content, variant: 'default'|'gradient'|'colored', color: string
- git-contribution: requires username, repository
- tech-stack: requires technologies: string[], layout: 'grid'|'list'|'badges'|'inline'|'grouped'
- image: requires src, alt
- code-block: requires content, language
- table: requires headers: string[], rows: string[][]
- badge: requires content
- divider: requires dividerStyle: 'line'|'dots'|'stars'
- installation: requires content

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
      "fixType": "<grammar|enhancement|rewrite|addition>",
      "action": {
        "type": "<edit|add|remove|reorder|enhance>",
        "elementId": "<target element id if applicable>",
        "newContent": "<new content for edit/enhance actions>",
        "elementToAdd": {
          "id": "<unique-id>",
          "type": "<valid-element-type>",
          "content": "<element-content>",
          "<additional-required-properties>": "<based-on-element-type>"
        },
        "direction": "<up|down for reorder actions>"
      }
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

For suggestions with actionable improvements:
- Include "elementId" if you can identify which element needs fixing
- Include "fix" with the exact replacement text
- Include "fixType" to categorize the type of fix
- Include "action" object with specific action details:
  * "edit": Modify existing content (include elementId and newContent)
  * "add": Add new element (include elementToAdd object)
  * "remove": Remove existing element (include elementId)
  * "reorder": Move element up/down (include elementId and direction)
  * "enhance": AI-enhance existing content (include elementId and newContent)

Provide specific, actionable feedback with implementable fixes where possible.`;

    const model = geminiService['genAI']!.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    const text = response.text().trim();

    
    let jsonStr = text;
    if (jsonStr.includes('```json')) {
      jsonStr = jsonStr.split('```json')[1].split('```')[0];
    } else if (jsonStr.includes('```')) {
      jsonStr = jsonStr.split('```')[1].split('```')[0];
    }

    const analysisResult = JSON.parse(jsonStr);
    
    
    const validateElement = (elementToAdd: any): any => {
      if (!elementToAdd || !elementToAdd.type) return null;
      
      const validTypes = [
        'text', 'title', 'description', 'header', 'banner', 'git-contribution',
        'tech-stack', 'image', 'code-block', 'table', 'badge', 'divider', 'installation'
      ];
      
      if (!validTypes.includes(elementToAdd.type)) return null;
      
      
      switch (elementToAdd.type) {
        case 'text':
          return {
            ...elementToAdd,
            style: elementToAdd.style || {
              fontSize: 'md',
              fontWeight: 'normal',
              textAlign: 'left',
              color: 'inherit'
            }
          };
        case 'header':
          return {
            ...elementToAdd,
            level: elementToAdd.level || 2
          };
        case 'banner':
          return {
            ...elementToAdd,
            variant: elementToAdd.variant || 'default',
            color: elementToAdd.color || 'blue'
          };
        case 'tech-stack':
          return {
            ...elementToAdd,
            technologies: elementToAdd.technologies || ['JavaScript'],
            layout: elementToAdd.layout || 'badges'
          };
        case 'code-block':
          return {
            ...elementToAdd,
            language: elementToAdd.language || 'bash'
          };
        case 'divider':
          return {
            ...elementToAdd,
            dividerStyle: elementToAdd.dividerStyle || 'line'
          };
        case 'git-contribution':
          return {
            ...elementToAdd,
            username: elementToAdd.username || 'your-username',
            repository: elementToAdd.repository || 'your-repo'
          };
        case 'image':
          return {
            ...elementToAdd,
            src: elementToAdd.src || 'https://via.placeholder.com/300x200',
            alt: elementToAdd.alt || 'Image description'
          };
        case 'table':
          return {
            ...elementToAdd,
            headers: elementToAdd.headers || ['Column 1', 'Column 2'],
            rows: elementToAdd.rows || [['Row 1 Col 1', 'Row 1 Col 2']]
          };
        default:
          return elementToAdd;
      }
    };
    
    
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
        action: s.action ? {
          type: s.action.type,
          elementId: s.action.elementId,
          newContent: s.action.newContent,
          elementToAdd: s.action.elementToAdd ? validateElement(s.action.elementToAdd) : undefined,
          direction: s.action.direction
        } : undefined,
      })).filter((s: any) => !s.action || s.action.type !== 'add' || s.action.elementToAdd), // Filter out invalid add actions
      overallScore: Math.max(0, Math.min(100, analysisResult.overallScore || 50)),
      toneConsistency: Math.max(0, Math.min(100, analysisResult.toneConsistency || 50)),
      detectedTone: ['casual', 'technical', 'professional', 'open-source'].includes(analysisResult.detectedTone) 
        ? analysisResult.detectedTone 
        : 'professional',
    };

  } catch (error) {
    console.error('Error in AI analysis:', error);
    
    
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
      action: {
        type: 'add',
        elementToAdd: {
          id: 'header-' + Date.now(),
          type: 'header',
          content: 'Your Project Title',
          level: 1
        }
      }
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
      action: {
        type: 'add',
        elementToAdd: {
          id: 'description-' + Date.now(),
          type: 'text',
          content: 'A brief description of what your project does and why it\'s useful.',
          style: {
            fontSize: 'md',
            fontWeight: 'normal',
            textAlign: 'left',
            color: 'inherit'
          }
        }
      }
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
      action: {
        type: 'add',
        elementToAdd: {
          id: 'installation-' + Date.now(),
          type: 'code-block',
          language: 'bash',
          content: '# Install with npm\nnpm install your-package\n\n# Or with yarn\nyarn add your-package'
        }
      }
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
      action: {
        type: 'add',
        elementToAdd: {
          id: 'tech-stack-' + Date.now(),
          type: 'tech-stack',
          technologies: ['JavaScript', 'Node.js', 'React'],
          layout: 'badges'
        }
      }
    });
  }

  
  elements.forEach((element) => {
    
    if (element.type === 'text' && element.content && element.content.length < 10) {
      suggestions.push({
        section: 'Content Quality',
        suggestion: 'Expand this text section with more details',
        reason: 'Short descriptions may not provide enough context for users',
        severity: 'medium',
        type: 'wording',
        confidence: 0.7,
        elementId: element.id,
        action: {
          type: 'enhance',
          elementId: element.id,
          newContent: element.content + ' [Add more details about this section]'
        }
      });
    }

    
    if (element.type === 'text' && element.content && element.content.length > 500) {
      suggestions.push({
        section: 'Content Structure',
        suggestion: 'Consider breaking this long text into smaller sections',
        reason: 'Long paragraphs can be difficult to read and scan',
        severity: 'low',
        type: 'structure',
        confidence: 0.6,
        elementId: element.id
      });
    }
  });

  return suggestions;
}

export async function analyzeBranding(elements: ElementType[], tone: BrandingTone): Promise<BrandingAnalysis> {
  const readmeContent = buildReadmeContent(elements);
  
  try {
    
    const aiAnalysis = await analyzeWithAI(readmeContent, tone);
    
    
    const basicSuggestions = performBasicAnalysis(elements);
    
    
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
