import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ReadmeContext {
  projectName?: string;
  projectType?: string;
  technologies?: string[];
  features?: string[];
  description?: string;
  currentReadme?: string;
}

export class ReadmeAIService {
  private genAI: GoogleGenerativeAI | null = null;
  private apiKey: string | null = null;

  constructor() {
    this.loadApiKeyFromStorage();
  }

  private loadApiKeyFromStorage() {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      this.setApiKey(storedKey);
    }
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

  private cleanMarkdownResponse(text: string): string {
    // Remove markdown code block wrapping (```markdown and ```)
    let cleaned = text.trim();
    
    // Remove markdown code block markers
    cleaned = cleaned.replace(/^```markdown\s*/i, '');
    cleaned = cleaned.replace(/^```\s*/, '');
    cleaned = cleaned.replace(/\s*```$/, '');
    
    // Remove any remaining markdown wrapper patterns
    cleaned = cleaned.replace(/^markdown\s*/i, '');
    
    return cleaned.trim();
  }

  async generateReadmeContent(userMessage: string, context: ReadmeContext = {}): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured. Please set your API key first.');
    }

    try {
      const model = this.genAI!.getGenerativeModel({ 
        model: 'gemini-2.0-flash',
        generationConfig: {
          temperature: 0.8,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 8192,
        }
      });

      // Build context information
      let contextInfo = '';
      if (context.projectName) contextInfo += `Project Name: ${context.projectName}\n`;
      if (context.projectType) contextInfo += `Project Type: ${context.projectType}\n`;
      if (context.technologies?.length) contextInfo += `Technologies: ${context.technologies.join(', ')}\n`;
      if (context.features?.length) contextInfo += `Features: ${context.features.join(', ')}\n`;
      if (context.description) contextInfo += `Description: ${context.description}\n`;

      const prompt = `You are an expert README generator that creates professional, comprehensive, and engaging README files for software projects.

${contextInfo ? `Context:\n${contextInfo}\n` : ''}

User Request: ${userMessage}

Create a complete, professional README.md file that includes:
- Clear project title and description
- Features and benefits
- Installation instructions
- Usage examples with code snippets
- Contributing guidelines
- License information
- Professional formatting with badges, emojis, and proper markdown

Make it engaging, informative, and follow modern README best practices. Use proper markdown formatting and include relevant sections based on the project type.

Generate ONLY the markdown content without any explanations or meta-commentary.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      if (!text) {
        throw new Error('No content generated');
      }

      // Clean the response from markdown code block wrapping
      const cleanedText = this.cleanMarkdownResponse(text);
      return cleanedText;
    } catch (error) {
      console.error('Error generating README content:', error);
      throw new Error(`Failed to generate README content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async improveExistingReadme(existingReadme: string, userSuggestions: string = ''): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured. Please set your API key first.');
    }

    try {
      const model = this.genAI!.getGenerativeModel({ 
        model: 'gemini-2.0-flash',
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 8192,
        }
      });

      const prompt = `You are an expert README editor. Analyze and improve this existing README file to make it more professional, comprehensive, and engaging.

Current README:
\`\`\`markdown
${existingReadme}
\`\`\`

${userSuggestions ? `User suggestions: ${userSuggestions}\n` : ''}

Please improve this README by:
1. Enhancing clarity and readability
2. Adding missing sections (if needed)
3. Improving formatting and structure
4. Making descriptions more engaging
5. Adding proper badges and visual elements
6. Ensuring professional tone
7. Following modern README best practices

Keep the existing project information but enhance the presentation and completeness.

Return ONLY the improved markdown content without any explanations.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      if (!text) {
        throw new Error('No improved content generated');
      }

      // Clean the response from markdown code block wrapping
      const cleanedText = this.cleanMarkdownResponse(text);
      return cleanedText;
    } catch (error) {
      console.error('Error improving README:', error);
      throw new Error(`Failed to improve README: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async answerReadmeQuestion(question: string, readmeContent: string = ''): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured. Please set your API key first.');
    }

    try {
      const model = this.genAI!.getGenerativeModel({ 
        model: 'gemini-2.0-flash',
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 4096,
        }
      });

      const prompt = `You are a helpful README assistant. Answer the user's question about README files, providing practical advice and examples when relevant.

${readmeContent ? `Current README context:\n\`\`\`markdown\n${readmeContent.substring(0, 1000)}...\n\`\`\`\n` : ''}

User Question: ${question}

Provide a helpful, informative response that:
1. Directly answers the question
2. Provides practical examples if relevant
3. Suggests best practices
4. Is clear and actionable

If the question is about generating or improving content, provide specific markdown examples.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      if (!text) {
        throw new Error('No response generated');
      }

      return text.trim();
    } catch (error) {
      console.error('Error answering README question:', error);
      throw new Error(`Failed to answer question: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async enhanceWithWebSearch(userQuery: string, userProfile?: any): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured. Please set your API key first.');
    }

    try {
      const model = this.genAI!.getGenerativeModel({ 
        model: 'gemini-2.0-flash',
        generationConfig: {
          temperature: 0.8,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 8192,
        }
      });

      let profileContext = '';
      if (userProfile) {
        if (userProfile.github) {
          profileContext += `GitHub Profile:\n`;
          if (userProfile.github.bio) profileContext += `- Bio: ${userProfile.github.bio}\n`;
          if (userProfile.github.location) profileContext += `- Location: ${userProfile.github.location}\n`;
          if (userProfile.github.company) profileContext += `- Company: ${userProfile.github.company}\n`;
          if (userProfile.github.repositories) {
            profileContext += `- Recent Repositories: ${userProfile.github.repositories.slice(0, 3).map((r: any) => r.name).join(', ')}\n`;
          }
        }
        
        if (userProfile.linkedin) {
          profileContext += `LinkedIn Profile:\n`;
          if (userProfile.linkedin.headline) profileContext += `- Headline: ${userProfile.linkedin.headline}\n`;
          if (userProfile.linkedin.skills) profileContext += `- Skills: ${userProfile.linkedin.skills.slice(0, 5).join(', ')}\n`;
        }
      }

      const prompt = `You are an AI README generator with access to user profile information. Create a personalized and professional README based on the user's request and profile data.

${profileContext ? `User Profile Information:\n${profileContext}\n` : ''}

User Request: ${userQuery}

Create a comprehensive README that:
1. Incorporates relevant information from the user's profile
2. Reflects their actual skills and experience
3. Uses appropriate technologies from their background
4. Maintains a professional tone that matches their career level
5. Includes realistic project details based on their expertise
6. Uses proper markdown formatting with badges and emojis

Generate ONLY the markdown content for the README file.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      if (!text) {
        throw new Error('No enhanced content generated');
      }

      // Clean the response from markdown code block wrapping
      const cleanedText = this.cleanMarkdownResponse(text);
      return cleanedText;
    } catch (error) {
      console.error('Error enhancing with web search:', error);
      throw new Error(`Failed to enhance with web search: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const readmeAI = new ReadmeAIService();
