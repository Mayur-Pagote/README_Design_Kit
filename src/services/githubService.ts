import type { GitHubFile } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

interface GithubTreeItem {
  path: string;
  type: 'blob' | 'tree';
  sha: string;
  size?: number;
  url: string;
}

interface GithubTreeResponse {
  sha: string;
  url: string;
  tree: GithubTreeItem[];
  truncated: boolean;
}

interface GithubRepoResponse {
  default_branch: string;
  name: string;
  description?: string;
  language?: string;
  topics?: string[];
  homepage?: string;
  clone_url: string;
  html_url: string;
}

const SOURCE_CODE_EXTENSIONS = new Set([
    '.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.c', '.cpp', '.h', '.hpp', 
    '.cs', '.go', '.rs', '.swift', '.kt', '.kts', '.rb', '.php', '.m', '.scala', 
    '.html', '.css', '.scss', '.less', '.vue', '.svelte', '.json', '.yaml', '.yml',
    '.toml', '.xml', '.md', '.txt', '.dockerfile', '.gitignore'
]);

const getHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleApiError = (status: number, context: string): Error => {
    if (status === 403) {
        return new Error(`GitHub API rate limit exceeded while ${context}. Please provide a Personal Access Token.`);
    }
    if (status === 404) {
        return new Error(`Repository not found (${context}). It may be private or the URL is incorrect.`);
    }
    if (status === 401) {
        return new Error(`Authentication failed while ${context}. Please check your Personal Access Token.`);
    }
    return new Error(`Failed to ${context}. Status: ${status}`);
};

export const getRepoInfo = async (owner: string, repo: string, token?: string): Promise<GithubRepoResponse> => {
  try {
    const headers = getHeaders(token);
    const repoRes = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, { headers });
    if (!repoRes.ok) {
        throw handleApiError(repoRes.status, 'fetching repository data');
    }
    return await repoRes.json();
  } catch (error) {
    console.error('GitHub API Error in getRepoInfo:', error);
    throw error;
  }
};

export const getRepoTree = async (owner: string, repo: string, token?: string): Promise<GitHubFile[]> => {
  try {
    const headers = getHeaders(token);
    const repoData = await getRepoInfo(owner, repo, token);
    const defaultBranch = repoData.default_branch;

    const treeRes = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`, { headers });
    if (!treeRes.ok) {
        throw handleApiError(treeRes.status, 'fetching repository file tree');
    }

    const treeData: GithubTreeResponse = await treeRes.json();
    
    if (treeData.truncated) {
        console.warn('GitHub API response warning: File tree is truncated. Some files may not have been analyzed.');
    }
    
    const allFiles: GitHubFile[] = treeData.tree
      .filter((file) => file.type === 'blob' && !!file.path)
      .map(({ path, type, sha }) => ({ path, type, sha }));

    const sourceFiles = allFiles.filter(file => SOURCE_CODE_EXTENSIONS.has(file.path.substring(file.path.lastIndexOf('.'))));
    const otherFiles = allFiles.filter(file => !SOURCE_CODE_EXTENSIONS.has(file.path.substring(file.path.lastIndexOf('.'))));
    
    return [...sourceFiles, ...otherFiles];

  } catch (error) {
    console.error('GitHub API Error in getRepoTree:', error);
    if(error instanceof Error) {
        throw error;
    }
    throw new Error('An unknown error occurred while fetching repository files.');
  }
};

export const getFileContent = async (owner: string, repo: string, path: string, token?: string): Promise<string> => {
  try {
    const headers = getHeaders(token);
    const res = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`, { headers });
    
    if (!res.ok) {
        // For large files, content is not returned directly
        if (res.status === 403) return "Error: File content might be too large or API rate limit hit.";
        if (res.status === 404) return "Error: File not found.";
        throw new Error(`Failed to fetch file content for ${path}. Status: ${res.status}`);
    }

    const data: any = await res.json();

    if (Array.isArray(data)) {
      return "Error: Path resolved to a directory.";
    }
    
    if (data.content && data.encoding === 'base64') {
        // Handle potential malformed base64 strings from API
        try {
             return atob(data.content);
        } catch(e) {
            return "Error: Could not decode file content from base64."
        }
    }
    
    if(data.content === "") return ""; // File is empty

    // If content is not available, it might be because the file is too large
    if(data.download_url) {
        return `Error: File is too large to fetch directly. Available for download at: ${data.download_url}`
    }

    return 'Error: Could not retrieve file content for an unknown reason.';
  } catch (error) {
    console.error(`GitHub API Error in getFileContent for ${path}:`, error);
    if(error instanceof Error) {
        return `Error retrieving file content: ${error.message}`;
    }
    return 'An unknown error occurred while fetching file content.';
  }
};

export const parseGitHubUrl = (url: string): { owner: string; repo: string } | null => {
  const GITHUB_URL_EXTRACT_REGEX = /^https:\/\/github\.com\/([a-zA-Z0-9-._]+)\/([a-zA-Z0-9-._]+)(?:\/)?$/;
  const match = url.match(GITHUB_URL_EXTRACT_REGEX);
  if (!match) {
    return null;
  }
  return { owner: match[1], repo: match[2] };
};
