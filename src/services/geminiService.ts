import { GoogleGenerativeAI } from '@google/generative-ai';

export type CreativityLevel = 'concise' | 'balanced' | 'detailed';
export type WritingStyle = 'professional' | 'casual' | 'technical' | 'creative';

interface AISettings {
  creativity: CreativityLevel;
  style: WritingStyle;
}

class GeminiService {
  private apiKey: string | null = null;
  private genAI: GoogleGenerativeAI | null = null;
  private settings: AISettings = {
    creativity: 'balanced',
    style: 'professional'
  };

  constructor() {
    this.loadApiKeyFromStorage();
    this.loadSettingsFromStorage();
  }

  private loadApiKeyFromStorage() {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      this.setApiKey(storedKey);
    }
  }

  private loadSettingsFromStorage() {
    const storedSettings = localStorage.getItem('gemini_ai_settings');
    if (storedSettings) {
      try {
        this.settings = { ...this.settings, ...JSON.parse(storedSettings) };
      } catch (error) {
        console.warn('Error loading AI settings:', error);
      }
    }
  }

  private saveSettingsToStorage() {
    localStorage.setItem('gemini_ai_settings', JSON.stringify(this.settings));
  }

  setSettings(settings: Partial<AISettings>) {
    this.settings = { ...this.settings, ...settings };
    this.saveSettingsToStorage();
  }

  getSettings(): AISettings {
    return { ...this.settings };
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    this.genAI = new GoogleGenerativeAI(apiKey);
    localStorage.setItem('gemini_api_key', apiKey);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  clearApiKey() {
    this.apiKey = null;
    this.genAI = null;
    localStorage.removeItem('gemini_api_key');
  }

  isConfigured(): boolean {
    return this.apiKey !== null && this.genAI !== null;
  }

  async enhanceText(originalText: string, context: string = ''): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured');
    }

    try {
      const model = this.genAI!.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const contextPrompt = context ? `Context: ${context}\n\n` : '';
      
      // Build creativity and style instructions
      const creativityInstructions = this.getCreativityInstructions();
      const styleInstructions = this.getStyleInstructions();
      
      const prompt = `${contextPrompt}Please enhance and improve the following text to make it more professional, engaging, and well-written while maintaining its original meaning and intent. Make it suitable for a professional README or portfolio description.

Focus on:
- Fixing grammar, spelling, and punctuation errors
- Improving sentence structure and flow
- Making it more descriptive and engaging
- Using professional vocabulary and terminology
- Expanding abbreviations and clarifying technical terms
- Maintaining the original personality and intent

${creativityInstructions}
${styleInstructions}

Important: Provide ONLY the enhanced text as your response. Do not include explanations, options, or additional commentary. Just return the improved version of the text.

Original text: "${originalText}"

Enhanced text:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const enhancedText = response.text().trim();

      // Clean up the response to remove any unwanted formatting or explanations
      return this.cleanupAIResponse(enhancedText);
    } catch (error) {
      console.error('Error enhancing text with Gemini:', error);
      throw new Error('Failed to enhance text. Please check your API key and try again.');
    }
  }

  async generateDescription(type: string, topic: string = '', inputText: string = ''): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured');
    }

    try {
      const model = this.genAI!.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const creativityInstructions = this.getCreativityInstructions();
      const styleInstructions = this.getStyleInstructions();
      
      let basePrompt = '';
      
      // If there's input text, use it as basis for generation
      if (inputText.trim()) {
        switch (type) {
          case 'project':
            basePrompt = `Based on this input: "${inputText}", generate a professional project description. Expand on the technologies, features, and value mentioned. Make it engaging and highlight the project's strengths.`;
            break;
          case 'about':
            basePrompt = `Based on this input: "${inputText}", generate a professional "About Me" section for a developer's README. Expand on the skills, experience, and passion mentioned. Make it personal yet professional.`;
            break;
          case 'bio':
            basePrompt = `Based on this input: "${inputText}", generate a professional bio for a software developer. Expand on the expertise and experience mentioned. Make it suitable for a LinkedIn or portfolio description.`;
            break;
          case 'summary':
            basePrompt = `Based on this input: "${inputText}", generate a professional summary. Expand and improve on the information provided while keeping it clear and engaging.`;
            break;
          default:
            basePrompt = `Based on this input: "${inputText}", generate improved professional content for ${type}. Expand on the information provided and make it more engaging and well-written.`;
        }
      } else {
        // Fallback to generic generation if no input provided
        switch (type) {
          case 'project':
            basePrompt = `Generate a professional project description for a ${topic || 'software project'}. Make it engaging and highlight key features, technologies used, and value proposition.`;
            break;
          case 'about':
            basePrompt = `Generate a professional "About Me" section for a developer's README. Make it personal yet professional, highlighting skills, passion, and experience. Keep it engaging and authentic.`;
            break;
          case 'bio':
            basePrompt = `Generate a professional bio for a ${topic || 'software developer'}. Make it suitable for a LinkedIn or portfolio description. Focus on expertise, experience, and professional value.`;
            break;
          case 'summary':
            basePrompt = `Generate a professional summary about ${topic || 'a project or profile'}. Make it clear, concise, and engaging.`;
            break;
          default:
            basePrompt = `Generate professional content for: ${type}${topic ? ` related to ${topic}` : ''}. Make it engaging and well-written.`;
        }
      }

      const prompt = `${basePrompt}

${creativityInstructions}
${styleInstructions}

Important: Provide ONLY the generated text as your response. Do not include explanations, options, or additional commentary. Just return the content itself.

Generated content:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generatedText = response.text().trim();

      return this.cleanupAIResponse(generatedText);
    } catch (error) {
      console.error('Error generating description with Gemini:', error);
      throw new Error('Failed to generate description. Please check your API key and try again.');
    }
  }

  private getCreativityInstructions(): string {
    switch (this.settings.creativity) {
      case 'concise':
        return 'Length: Keep it concise and to the point (1-2 sentences). Focus on the most essential information.';
      case 'detailed':
        return 'Length: Provide a comprehensive and detailed response (3-4 sentences). Include relevant context and specifics.';
      case 'balanced':
      default:
        return 'Length: Provide a balanced response (2-3 sentences). Include key details without being too verbose.';
    }
  }

  private getStyleInstructions(): string {
    switch (this.settings.style) {
      case 'casual':
        return 'Tone: Use a friendly, approachable tone. Make it sound conversational and relatable.';
      case 'technical':
        return 'Tone: Use precise, technical language. Focus on accuracy and technical details.';
      case 'creative':
        return 'Tone: Use engaging, creative language. Make it memorable and unique while remaining professional.';
      case 'professional':
      default:
        return 'Tone: Use a professional, polished tone. Make it suitable for business contexts and portfolios.';
    }
  }

  private cleanupAIResponse(response: string): string {
    // Remove common AI response patterns
    let cleaned = response.trim();
    
    // Remove quotes that might wrap the response
    cleaned = cleaned.replace(/^["']|["']$/g, '');
    
    // Remove "Enhanced text:" prefix if present
    cleaned = cleaned.replace(/^Enhanced text:\s*/i, '');
    
    // Remove "Here's the enhanced version:" or similar prefixes
    cleaned = cleaned.replace(/^(Here's the enhanced version:|Here's an enhanced version:|Enhanced version:)\s*/i, '');
    
    // Remove any remaining leading/trailing whitespace
    cleaned = cleaned.trim();
    
    // If the response contains multiple options, extract the first one
    if (cleaned.includes('**Option 1') || cleaned.includes('Option 1:')) {
      const optionMatch = cleaned.match(/(?:^|\n)(?:\*\*)?Option 1[^\n]*:?\s*(?:\*\*)?(.+?)(?=\n\n|\*\*Option 2|$)/s);
      if (optionMatch) {
        cleaned = optionMatch[1].trim();
      }
    }
    
    // Remove any remaining markdown formatting for options
    cleaned = cleaned.replace(/\*\*Option \d+[^:]*:\*\*/g, '');
    cleaned = cleaned.replace(/^>\s*/gm, ''); // Remove quote markers
    
    return cleaned.trim();
  }
}

export const geminiService = new GeminiService();
