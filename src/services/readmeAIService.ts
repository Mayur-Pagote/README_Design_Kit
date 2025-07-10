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

  async generateReadmeContent(userMessage: string, context: ReadmeContext = {}): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured. Please set your API key first.');
    }

    try {
      const model = this.genAI!.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const contextInfo = this.buildContextString(context);
      
      const systemPrompt = `You are an expert README.md generator and technical writer. Your task is to help users create professional, comprehensive, and engaging README files.

${contextInfo}

Guidelines:
- Always respond with valid Markdown
- Include emojis for better visual appeal
- Use proper markdown syntax (headers, lists, code blocks, etc.)
- Make content professional but engaging
- Include relevant badges when appropriate
- Structure content logically
- When updating existing content, preserve good sections and improve others
- For new content, create comprehensive sections as needed
- Always include code examples when relevant
- Use proper markdown table syntax for tech stacks
- Include proper installation and usage instructions
- Add contributing guidelines when appropriate

Current user request: "${userMessage}"

Please generate the README content as requested. Return only the markdown content without additional explanations.`;

      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      const content = response.text().trim();

      return this.cleanupMarkdownResponse(content);
    } catch (error) {
      console.error('Error generating README content:', error);
      throw new Error('Failed to generate README content. Please try again.');
    }
  }

  async improveExistingReadme(currentReadme: string, userRequest: string): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured. Please set your API key first.');
    }

    try {
      const model = this.genAI!.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = `You are an expert at improving README files. Here's the current README content:

\`\`\`markdown
${currentReadme}
\`\`\`

User request: "${userRequest}"

Please improve the README based on the user's request. Maintain the existing structure where it makes sense, but enhance, add, or modify content as requested. Return only the improved markdown content.

Focus on:
- Better organization and structure
- More engaging and professional language
- Proper markdown formatting
- Adding missing sections if needed
- Improving existing content clarity
- Adding relevant emojis and visual elements
- Ensuring code examples are clear and correct

Return only the improved markdown content:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const content = response.text().trim();

      return this.cleanupMarkdownResponse(content);
    } catch (error) {
      console.error('Error improving README:', error);
      throw new Error('Failed to improve README. Please try again.');
    }
  }

  async answerReadmeQuestion(question: string, currentReadme: string = ''): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured. Please set your API key first.');
    }

    try {
      const model = this.genAI!.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const readmeContext = currentReadme ? `\n\nCurrent README content:\n\`\`\`markdown\n${currentReadme}\n\`\`\`` : '';

      const prompt = `You are a helpful assistant specializing in README files and documentation. Answer the user's question about README creation, best practices, or improvement.${readmeContext}

User question: "${question}"

Provide a helpful, informative response. If the question involves generating or modifying README content, include the markdown in your response. Be specific and actionable in your advice.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const content = response.text().trim();

      return content;
    } catch (error) {
      console.error('Error answering README question:', error);
      throw new Error('Failed to answer question. Please try again.');
    }
  }

  private buildContextString(context: ReadmeContext): string {
    const parts = [];
    
    if (context.projectName) {
      parts.push(`Project Name: ${context.projectName}`);
    }
    
    if (context.projectType) {
      parts.push(`Project Type: ${context.projectType}`);
    }
    
    if (context.technologies?.length) {
      parts.push(`Technologies: ${context.technologies.join(', ')}`);
    }
    
    if (context.features?.length) {
      parts.push(`Features: ${context.features.join(', ')}`);
    }
    
    if (context.description) {
      parts.push(`Description: ${context.description}`);
    }
    
    if (context.currentReadme) {
      parts.push(`Current README:\n\`\`\`markdown\n${context.currentReadme}\n\`\`\``);
    }

    return parts.length > 0 ? `Context:\n${parts.join('\n')}\n\n` : '';
  }

  private cleanupMarkdownResponse(response: string): string {
    // Remove any markdown code block wrappers if present
    let cleaned = response.replace(/^```markdown\n?/, '').replace(/\n?```$/, '');
    
    // Remove any explanation text that might have been added
    cleaned = cleaned.replace(/^Here's.*?:\s*/i, '');
    cleaned = cleaned.replace(/^I'll.*?:\s*/i, '');
    cleaned = cleaned.replace(/^This.*?:\s*/i, '');
    
    // Ensure proper spacing between sections
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
    
    // Trim any extra whitespace
    cleaned = cleaned.trim();
    
    return cleaned;
  }

  // Template methods for common README patterns
  async generateProjectTemplate(projectName: string, projectType: string, technologies: string[]): Promise<string> {
    const context: ReadmeContext = {
      projectName,
      projectType,
      technologies
    };

    const request = `Create a comprehensive README template for a ${projectType} project called "${projectName}" using ${technologies.join(', ')}. Include all standard sections like description, features, installation, usage, contributing, and license.`;

    return this.generateReadmeContent(request, context);
  }

  async addSection(currentReadme: string, sectionType: string, details: string = ''): Promise<string> {
    const request = `Add a ${sectionType} section to the README. ${details ? `Details: ${details}` : ''}`;
    return this.improveExistingReadme(currentReadme, request);
  }

  async improveSectionClarities(currentReadme: string, sectionName: string): Promise<string> {
    const request = `Improve the "${sectionName}" section to make it clearer, more detailed, and more professional.`;
    return this.improveExistingReadme(currentReadme, request);
  }
}

// Singleton instance
export const readmeAI = new ReadmeAIService();
