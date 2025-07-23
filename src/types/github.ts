// GitHub API types
export interface GitHubFile {
  path: string;
  type: 'blob' | 'tree';
  sha: string;
}

// Source reference for AI responses
export interface Source {
  uri: string;
  title?: string;
}

// GitHub repository documentation generation result
export interface RepoDocumentationResult {
  documentation: string;
  sources: Source[];
}
