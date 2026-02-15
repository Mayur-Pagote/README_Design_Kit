import type { RepoDocumentationResult } from '../types/github';
import { parseGitHubUrl } from './githubService';

/**
 * GitHubReadmeGeneratorService (Refactored)
 * AI generation logic has been removed as part of the pivot.
 */
class GitHubReadmeGeneratorService {
  isConfigured(): boolean {
    // Always return false as AI features are discontinued
    return false;
  }

  async generateRepoDocs(repoUrl: string): Promise<RepoDocumentationResult> {
    const parsedUrl = parseGitHubUrl(repoUrl);
    if (!parsedUrl) {
      throw new Error("Invalid GitHub repository URL format.");
    }

    // AI logic removed. Return an error or a basic template.
    throw new Error('AI README generation has been discontinued in favor of manual design tools.');
  }
}

export const githubReadmeGenerator = new GitHubReadmeGeneratorService();