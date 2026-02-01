import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  Key,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
  ExternalLink,
  Info,
  Github
} from 'lucide-react';
import { toast } from 'sonner';
import { readmeAI } from '@/services/readmeAIService';

interface APIKeySettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const APIKeySettings: React.FC<APIKeySettingsProps> = ({
  open,
  onOpenChange
}) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [showGithubToken, setShowGithubToken] = useState(false);

  useEffect(() => {
    if (open) {
      const currentKey = readmeAI.getApiKey();
      setApiKey(currentKey || '');
      setIsConfigured(readmeAI.isConfigured());

      const storedToken = localStorage.getItem('github-token');
      setGithubToken(storedToken || '');
    }
  }, [open]);

  const handleSave = async () => {
    if (!apiKey.trim() && !githubToken.trim()) {
      toast.error('Please enter either a Gemini API key or a GitHub token');
      return;
    }

    setIsTesting(true);

    try {
      // Set and test the Gemini API key ONLY if provided
      if (apiKey.trim()) {
        readmeAI.setApiKey(apiKey.trim());
        await readmeAI.answerReadmeQuestion('Test connection');
        setIsConfigured(true);
      } else {
        readmeAI.clearApiKey();
        setIsConfigured(false);
      }

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('gemini-api-key-updated'));

      // Save GitHub Token
      if (githubToken.trim()) {
        localStorage.setItem('github-token', githubToken.trim());
      } else {
        localStorage.removeItem('github-token');
      }

      toast.success('Settings saved successfully!');
      onOpenChange(false);
    } catch (error) {
      console.error('API key test failed:', error);
      toast.error('API key verification failed. Please check your key and try again.');
      // Remove the invalid key
      readmeAI.clearApiKey();
      setIsConfigured(false);
    } finally {
      setIsTesting(false);
    }
  };

  const handleRemove = () => {
    readmeAI.clearApiKey();
    setApiKey('');
    setIsConfigured(false);

    // Also clear github token if desired, but maybe keep it? 
    // Usually "Remove Key" refers to the Gemini API key in this context.

    toast.success('API key removed');
  };

  const openGeminiConsole = () => {
    window.open('https://aistudio.google.com/app/apikey', '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Key Settings
          </DialogTitle>
          <DialogDescription>
            Configure your Gemini API key to enable AI-powered README generation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status:</span>
            {isConfigured ? (
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                <Check className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            ) : (
              <Badge variant="destructive">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Not configured
              </Badge>
            )}
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <Label htmlFor="apikey">Gemini API Key</Label>
            <div className="relative">
              <Input
                id="apikey"
                type={showApiKey ? 'text' : 'password'}
                placeholder="Enter your Gemini API key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Get API Key Link */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Don't have an API key?</span>
              <Button
                variant="outline"
                size="sm"
                onClick={openGeminiConsole}
                className="ml-2"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Get API Key
              </Button>
            </AlertDescription>
          </Alert>

          {/* Instructions */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>How to get your API key:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Click "Get API Key" above</li>
              <li>Sign in with your Google account</li>
              <li>Click "Create API Key"</li>
              <li>Copy the generated key</li>
              <li>Paste it in the field above</li>
            </ol>
          </div>

          {/* GitHub Token Input */}
          <div className="space-y-2 border-t pt-4 mt-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="github-token" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub Token
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://github.com/settings/tokens', '_blank')}
                className="h-auto p-0 text-xs text-blue-600 hover:text-blue-700 hover:bg-transparent"
              >
                Get Token <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="relative">
              <Input
                id="github-token"
                type={showGithubToken ? 'text' : 'password'}
                placeholder="ghp_xxxxxxxxxxxx"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowGithubToken(!showGithubToken)}
              >
                {showGithubToken ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              Used for "Export to Gist" and other GitHub integrations.
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          {isConfigured && (
            <Button variant="outline" onClick={handleRemove}>
              Remove Key
            </Button>
          )}
          <Button onClick={handleSave} disabled={isTesting || (!apiKey.trim() && !githubToken.trim())}>
            {isTesting ? 'Testing...' : 'Save & Test'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default APIKeySettings;
