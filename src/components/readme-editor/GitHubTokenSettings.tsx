import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, Eye, EyeOff, Key, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface GitHubTokenSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTokenSaved?: (token: string) => void;
}

export const GitHubTokenSettings: React.FC<GitHubTokenSettingsProps> = ({
  open,
  onOpenChange,
  onTokenSaved
}) => {
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (open) {
      const savedToken = localStorage.getItem('github-token');
      if (savedToken) {
        setToken(savedToken);
        setIsValid(true);
      } else {
        setToken('');
        setIsValid(null);
      }
    }
  }, [open]);

  const validateToken = async (tokenToValidate: string) => {
    if (!tokenToValidate.trim()) {
      setIsValid(null);
      return;
    }

    setIsValidating(true);
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${tokenToValidate}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.ok) {
        setIsValid(true);
        toast.success('GitHub token validated successfully!');
      } else {
        setIsValid(false);
        toast.error('Invalid GitHub token. Please check and try again.');
      }
    } catch (error) {
      setIsValid(false);
      toast.error('Failed to validate token. Please check your connection.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSave = () => {
    if (token.trim()) {
      localStorage.setItem('github-token', token.trim());
      onTokenSaved?.(token.trim());
      toast.success('GitHub token saved successfully!');
    } else {
      localStorage.removeItem('github-token');
      toast.success('GitHub token removed');
    }
    onOpenChange(false);
  };

  const handleClear = () => {
    setToken('');
    setIsValid(null);
    localStorage.removeItem('github-token');
    toast.success('GitHub token cleared');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>GitHub Personal Access Token</span>
          </DialogTitle>
          <DialogDescription>
            Configure your GitHub Personal Access Token to analyze private repositories and avoid rate limits.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Token Input */}
          <div className="space-y-2">
            <Label htmlFor="github-token">Personal Access Token</Label>
            <div className="relative">
              <Input
                id="github-token"
                type={showToken ? 'text' : 'password'}
                value={token}
                onChange={(e) => {
                  setToken(e.target.value);
                  setIsValid(null);
                }}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                {isValid === true && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {isValid === false && (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setShowToken(!showToken)}
                >
                  {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {token && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => validateToken(token)}
                disabled={isValidating}
                className="mt-2"
              >
                {isValidating ? 'Validating...' : 'Validate Token'}
              </Button>
            )}
          </div>

          {/* Information Cards */}
          <div className="grid gap-3 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Required Permissions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-1">
                  <li>• <code>repo</code> - Access to repositories</li>
                  <li>• <code>read:user</code> - Read user profile</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Benefits</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-1">
                  <li>• Access private repositories</li>
                  <li>• Higher API rate limits</li>
                  <li>• Better repository analysis</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <Alert>
            <ExternalLink className="h-4 w-4" />
            <AlertDescription>
              <strong>How to get a Personal Access Token:</strong>
              <ol className="mt-1 space-y-1 text-sm">
                <li>1. Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)</a></li>
                <li>2. Click "Generate new token (classic)"</li>
                <li>3. Give it a descriptive name (e.g., "README Generator")</li>
                <li>4. Select the <code>repo</code> and <code>read:user</code> scopes</li>
                <li>5. Click "Generate token" and copy the token</li>
              </ol>
            </AlertDescription>
          </Alert>

          {/* Security Notice */}
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Security Note:</strong> Your token is stored locally in your browser and never sent to our servers. 
              It's only used to make direct API calls to GitHub from your browser.
            </AlertDescription>
          </Alert>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" onClick={handleClear} disabled={!token}>
              Clear Token
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Token
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
