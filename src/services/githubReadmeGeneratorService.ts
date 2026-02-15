import type { RepoDocumentationResult } from '../types/github';
import { parseGitHubUrl } from './githubService';

/**
 * GitHubReadmeGeneratorService (Refactored)
 * AI generation logic has been removed as part of the pivot.
 * Dummy methods and optional parameters added to maintain compatibility with UI components.
 */
class GitHubReadmeGeneratorService {
  // Added dummy setApiKey to satisfy calls from GitHubRepoAnalyzer.tsx
  setApiKey(_apiKey: string): void {
    // Method exists only for build compatibility
  }

  isConfigured(): boolean {
    // Return false as AI features are officially discontinued
    return false;
  }

  // Added optional _githubToken parameter to match the 2-argument call in the UI
  async generateRepoDocs(repoUrl: string, _githubToken?: string): Promise<RepoDocumentationResult> {
    const parsedUrl = parseGitHubUrl(repoUrl);
    if (!parsedUrl) {
      throw new Error("Invalid GitHub repository URL format.");
    }

    // AI generation is disabled
    throw new Error('AI README generation has been discontinued in favor of manual design tools.');
  }
}

export const githubReadmeGenerator = new GitHubReadmeGeneratorService();
