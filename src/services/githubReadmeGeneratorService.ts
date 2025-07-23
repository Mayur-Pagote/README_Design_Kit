import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Source, RepoDocumentationResult } from '../types/github';
import { getRepoTree, getFileContent, parseGitHubUrl, getRepoInfo } from './githubService';

class GitHubReadmeGeneratorService {
  private genAI: GoogleGenerativeAI | null = null;
  private apiKey: string | null = null;

  constructor() {
    // Initialize with stored API key if available
    const storedKey = localStorage.getItem('gemini-api-key');
    if (storedKey) {
      this.setApiKey(storedKey);
    }
  }

  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    this.genAI = new GoogleGenerativeAI(apiKey);
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

  async generateRepoDocs(repoUrl: string, githubToken?: string): Promise<RepoDocumentationResult> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured. Please set your API key first.');
    }

    const parsedUrl = parseGitHubUrl(repoUrl);
    if (!parsedUrl) {
      throw new Error("Invalid GitHub repository URL format. Expected: https://github.com/user/repo");
    }

    const { owner, repo } = parsedUrl;
    const MAX_FILES_TO_PROCESS = 15;

    try {
      // 1. Get repository information
      const repoInfo = await getRepoInfo(owner, repo, githubToken);
      
      // 2. Fetch repository file tree
      const allFiles = await getRepoTree(owner, repo, githubToken);
      const filePaths = allFiles.map(file => file.path);
      
      // 3. Select most important files to read
      const highPriorityFiles = [
        'README.md', 'readme.md', 'README.rst', 'README.txt',
        'package.json', 'composer.json', 'requirements.txt', 'gemfile', 'pom.xml',
        'cargo.toml', 'dockerfile', 'main.py', 'index.js', 'app.js', 'main.ts',
        'index.ts', 'app.ts', 'main.go', 'main.rs', 'main.java', 'setup.py',
        'pyproject.toml', 'go.mod', 'Cargo.toml', 'pom.xml', 'build.gradle'
      ];

      const filesToProcess = allFiles
        .filter(file => highPriorityFiles.includes(file.path.toLowerCase()))
        .concat(allFiles.filter(file => !highPriorityFiles.includes(file.path.toLowerCase())))
        .slice(0, MAX_FILES_TO_PROCESS);

      // 4. Fetch content of selected files
      const fileContents = await Promise.all(
          filesToProcess.map(async (file) => {
              try {
                  const content = await getFileContent(owner, repo, file.path, githubToken);
                  return { path: file.path, content };
              } catch (e) {
                  console.warn(`Could not fetch content for ${file.path}:`, e);
                  return { path: file.path, content: 'Error: Could not retrieve content.' };
              }
          })
      );

      const contextContent = fileContents.map(fc => `---
File: ${fc.path}
\`\`\`
${fc.content}
\`\`\`
`).join('\n');

      // 5. Generate comprehensive README using Gemini
      const model = this.genAI!.getGenerativeModel({ 
        model: 'gemini-2.0-flash-lite'
      });

      const prompt = `
You are an expert technical writer. Your task is to generate a comprehensive, high-quality README.md file for a GitHub repository.

**Repository Information:**
- URL: ${repoUrl}
- Name: ${repoInfo.name}
- Description: ${repoInfo.description || 'No description provided'}
- Primary Language: ${repoInfo.language || 'Not detected'}
- Topics: ${repoInfo.topics?.join(', ') || 'None'}
- Homepage: ${repoInfo.homepage || 'None'}

**File Structure:**
${filePaths.slice(0, 50).map(path => `- ${path}`).join('\n')}
${filePaths.length > 50 ? `\n... and ${filePaths.length - 50} more files` : ''}

**File Contents:**
${contextContent}

**Your Task:**
Based on the provided information, generate a complete README.md in Markdown format. The README must be well-structured and include the following sections if the information is available:

1. **Project Title**: Use the repository name with proper formatting
2. **Description**: A detailed explanation of the project's purpose and what it does
3. **Key Features**: A bulleted list of the most important features
4. **Technologies Used**: A list of primary languages, frameworks, and significant libraries discovered in the files
5. **Getting Started**: A step-by-step guide for installation and setup, including prerequisites and commands
6. **Usage**: Code examples and instructions on how to use the project
7. **Project Structure**: Overview of the main directories and files
8. **Contributing**: Guidelines for contributing to the project
9. **License**: Information about the project license if available

**CRITICAL INSTRUCTIONS:**
- The entire output MUST be in Markdown format
- Do NOT include any conversational text, apologies, or explanations
- Do not generate a template with placeholders - use the actual information from the repository
- If you cannot find information for a section, omit the section entirely
- Make the README professional, comprehensive, and well-formatted
- Include relevant badges, code examples, and proper markdown formatting
- Use the search tool for supplementary information about the technologies used
- If you cannot find enough information to create a meaningful README, output only: ERROR_NO_INFO_FOUND

Generate the README now:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const documentation = this.cleanMarkdownResponse(response.text());
      
      if (documentation.trim() === 'ERROR_NO_INFO_FOUND') {
        throw new Error("Could not find sufficient information in the repository's files to generate documentation. The repo might be empty or lack recognizable code/metadata.");
      }

      // Extract sources from grounding metadata
      const candidates = result.response.candidates;
      const groundingMetadata = candidates?.[0]?.groundingMetadata;
      const rawGroundingChunks = groundingMetadata?.groundingChunks ?? [];
      
      const sources: Source[] = rawGroundingChunks
        .map((chunk: any) => chunk.web)
        .filter((web: any): web is { uri: string; title?: string | null } => !!web?.uri)
        .map((web: any) => ({
          uri: web.uri,
          title: web.title ?? undefined,
        }));

      return { documentation, sources };

    } catch (error) {
      console.error("Error generating repository documentation:", error);
      if (error instanceof Error) {
          throw error;
      }
      throw new Error("An unexpected error occurred while generating documentation.");
    }
  }
}

export const githubReadmeGenerator = new GitHubReadmeGeneratorService();
