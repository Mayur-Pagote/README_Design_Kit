import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Github, 
  Loader2, 
  FileText, 
  Code2, 
  ExternalLink, 
  Settings,
  CheckCircle,
  AlertCircle,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { githubReadmeGenerator } from '@/services/githubReadmeGeneratorService';
import { GitHubTokenSettings } from './GitHubTokenSettings';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { RepoDocumentationResult } from '@/types/github';

interface GitHubRepoAnalyzerProps {
  onGeneratedContent: (content: string) => void;
}

export const GitHubRepoAnalyzer: React.FC<GitHubRepoAnalyzerProps> = ({
  onGeneratedContent
}) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showTokenSettings, setShowTokenSettings] = useState(false);
  const [hasGitHubToken, setHasGitHubToken] = useState(false);
  const [hasGeminiAPI, setHasGeminiAPI] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<RepoDocumentationResult | null>(null);

  React.useEffect(() => {
    const updateApiKeys = () => {
      const token = localStorage.getItem('github-token');
      setHasGitHubToken(!!token);

      // Check and configure Gemini API - use the same key as readmeAIService
      const geminiKey = localStorage.getItem('gemini_api_key');
      if (geminiKey) {
        githubReadmeGenerator.setApiKey(geminiKey);
        setHasGeminiAPI(true);
      } else {
        setHasGeminiAPI(false);
      }
    };

    // Initial check
    updateApiKeys();

    // Listen for localStorage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'gemini_api_key' || e.key === 'github-token') {
        updateApiKeys();
      }
    };

    // Listen for custom events from the same window (when API key is updated in settings)
    const handleApiKeyUpdate = () => {
      updateApiKeys();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('gemini-api-key-updated', handleApiKeyUpdate);

    // Also check periodically in case we miss an event
    const interval = setInterval(updateApiKeys, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('gemini-api-key-updated', handleApiKeyUpdate);
      clearInterval(interval);
    };
  }, []);

  const validateGitHubUrl = (url: string): boolean => {
    const pattern = /^https:\/\/github\.com\/[a-zA-Z0-9-._]+\/[a-zA-Z0-9-._]+\/?$/;
    return pattern.test(url);
  };

  const forceRefreshApiStatus = () => {
    const token = localStorage.getItem('github-token');
    setHasGitHubToken(!!token);

    const geminiKey = localStorage.getItem('gemini_api_key');
    if (geminiKey) {
      githubReadmeGenerator.setApiKey(geminiKey);
      setHasGeminiAPI(true);
      toast.success('API status refreshed');
    } else {
      setHasGeminiAPI(false);
      toast.error('Gemini API key not found. Please configure it in settings.');
    }
  };

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) {
      toast.error('Please enter a GitHub repository URL');
      return;
    }

    if (!validateGitHubUrl(repoUrl)) {
      toast.error('Please enter a valid GitHub repository URL (https://github.com/user/repo)');
      return;
    }

    // Check if Gemini API is configured
    const geminiKey = localStorage.getItem('gemini_api_key');
    if (!geminiKey) {
      toast.error('Please configure your Gemini API key first in the settings');
      return;
    }

    // Ensure the service is configured with the latest API key
    githubReadmeGenerator.setApiKey(geminiKey);

    if (!githubReadmeGenerator.isConfigured()) {
      toast.error('Gemini API configuration failed. Please check your API key.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const githubToken = localStorage.getItem('github-token') || undefined;

      toast.info('Analyzing repository structure and files...');

      const result = await githubReadmeGenerator.generateRepoDocs(repoUrl, githubToken);

      setAnalysisResult(result);
      toast.success('Repository analysis complete!');

    } catch (error) {
      console.error('Repository analysis error:', error);

      if (error instanceof Error) {
        if (error.message.includes('rate limit')) {
          toast.error('GitHub API rate limit exceeded. Please add a Personal Access Token.');
        } else if (error.message.includes('not found')) {
          toast.error('Repository not found. It may be private or the URL is incorrect.');
        } else if (error.message.includes('Authentication failed')) {
          toast.error('GitHub token authentication failed. Please check your token.');
        } else if (error.message.includes('API key not configured')) {
          toast.error('Gemini API key not configured. Please check your settings.');
        } else {
          toast.error(`Analysis failed: ${error.message}`);
        }
      } else {
        toast.error('An unexpected error occurred during analysis');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUseGenerated = () => {
    if (analysisResult?.documentation) {
      onGeneratedContent(analysisResult.documentation);
      toast.success('Generated README applied to editor!');
      setAnalysisResult(null);
      setRepoUrl('');
    }
  };

  const extractRepoInfo = (url: string) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match) {
      return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
    }
    return null;
  };

  const repoInfo = repoUrl ? extractRepoInfo(repoUrl) : null;

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-base">
          <Github className="h-4 w-4" />
          <span>GitHub Repository Analyzer</span>
          <Badge variant="secondary" className="ml-auto text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered
          </Badge>
        </CardTitle>
      </CardHeader>

      <ScrollArea className="flex-1 min-h-0 px-6">
        <CardContent className="space-y-3 pb-4">
          {/* Repository URL Input */}
          <div className="space-y-2">
            <Label htmlFor="repo-url" className="text-sm">GitHub Repository URL</Label>
            <Input
              id="repo-url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/user/repository"
              disabled={isAnalyzing}
              className="text-sm"
            />
            {repoInfo && (
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Github className="h-3 w-3" />
                <span>{repoInfo.owner}/{repoInfo.repo}</span>
              </div>
            )}
          </div>

          {/* GitHub Token Status */}
          <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
            <div className="flex items-center space-x-2">
              <div className={`h-2 w-2 rounded-full ${hasGitHubToken ? 'bg-green-500' : 'bg-orange-500'}`} />
              <span className="text-xs font-medium">
                GitHub Token: {hasGitHubToken ? 'Configured' : 'Not configured'}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTokenSettings(true)}
              className="h-7 text-xs"
            >
              <Settings className="h-3 w-3 mr-1" />
              {hasGitHubToken ? 'Manage' : 'Setup'}
            </Button>
          </div>

          {/* Gemini API Status */}
          <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
            <div className="flex items-center space-x-2">
              <div className={`h-2 w-2 rounded-full ${hasGeminiAPI ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-xs font-medium">
                Gemini API: {hasGeminiAPI ? 'Configured' : 'Not configured'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={forceRefreshApiStatus}
              className="h-6 w-6 p-0"
              title="Refresh API status"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
            {!hasGeminiAPI && (
                <span className="text-xs text-muted-foreground">
                  Configure in settings
                </span>
              )}
            </div>
          </div>

          {/* Info Alert */}
          {!hasGeminiAPI && (
            <Alert className="py-2">
              <AlertCircle className="h-3 w-3" />
              <AlertDescription className="text-xs">
                <strong>Required:</strong> Gemini API key must be configured in settings to analyze repositories.
              </AlertDescription>
            </Alert>
          )}
          
          {!hasGitHubToken && hasGeminiAPI && (
            <Alert className="py-2">
              <AlertCircle className="h-3 w-3" />
              <AlertDescription className="text-xs">
                <strong>Optional:</strong> Add a GitHub Personal Access Token to analyze private repositories 
                and avoid rate limits. Public repositories can be analyzed without a token.
              </AlertDescription>
            </Alert>
          )}

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !repoUrl.trim() || !hasGeminiAPI}
            className="w-full h-9"
            size="sm"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Repository...
              </>
            ) : !hasGeminiAPI ? (
              <>
                <Code2 className="h-4 w-4 mr-2" />
                Configure Gemini API First
              </>
            ) : (
              <>
                <Code2 className="h-4 w-4 mr-2" />
                Analyze & Generate README
              </>
            )}
          </Button>

          {/* Analysis Result */}
          {analysisResult && (
            <div className="space-y-3">
              <Separator />

              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Analysis Complete</span>
                </h4>
                {analysisResult.sources.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {analysisResult.sources.length} source{analysisResult.sources.length !== 1 ? 's' : ''}
                  </Badge>
                )}
              </div>

              {/* Preview of generated content */}
              <div className="p-2 bg-muted/30 rounded-md max-h-48 overflow-y-auto">
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                  {analysisResult.documentation}
                </pre>
              </div>

              {/* Sources */}
              {analysisResult.sources.length > 0 && (
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">AI Research Sources:</Label>
                  <div className="space-y-1">
                    {analysisResult.sources.slice(0, 2).map((source, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        <a 
                          href={source.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline truncate"
                        >
                          {source.title || source.uri}
                        </a>
                      </div>
                    ))}
                    {analysisResult.sources.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{analysisResult.sources.length - 2} more sources
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </ScrollArea>

      {/* Use Generated Content Button */}
      {analysisResult && (
        <div className="p-4 border-t bg-background">
          <Button onClick={handleUseGenerated} className="w-full h-9" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Use Generated README
          </Button>
        </div>
      )}

      {/* GitHub Token Settings Modal */}
      <GitHubTokenSettings
        open={showTokenSettings}
        onOpenChange={setShowTokenSettings}
        onTokenSaved={() => setHasGitHubToken(true)}
      />
    </Card>
  );
};
