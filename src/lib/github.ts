interface GitHubContributor {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    contributions: number;
    type: 'User' | 'Bot';
}

export async function fetchContributors(repo: string): Promise<GitHubContributor[]> {
    try {
        // For public repositories, we don't need an access token
        const response = await fetch(`https://api.github.com/repos/${repo}/contributors?per_page=100`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Filter out bots and return only users
        return data.filter((user: GitHubContributor) => user.type === 'User');
    } catch (error) {
        console.error('Error fetching GitHub contributors:', error);
        return [];
    }
}
