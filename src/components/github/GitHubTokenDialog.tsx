import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Key, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getAuthenticatedUser } from '@/services/githubService';

interface GitHubTokenDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onTokenSaved?: () => void;
}

export const GitHubTokenDialog: React.FC<GitHubTokenDialogProps> = ({
    open,
    onOpenChange,
    onTokenSaved
}) => {
    const [token, setToken] = useState('');
    const [showToken, setShowToken] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    // Fetch token securely from sessionStorage on dialog open
    useEffect(() => {
        if (open) {
            const storedToken = sessionStorage.getItem('github-token'); // More secure than localStorage
            if (storedToken) setToken(storedToken);
        }
    }, [open]);

    const handleSave = async () => {
        const trimmedToken = token.trim();

        if (!trimmedToken) {
            toast.error('Please enter a GitHub Personal Access Token');
            return;
        }

        // Validate token length (GitHub tokens are typically 40+ characters)
        if (trimmedToken.length < 40) {
            toast.error('Invalid token format. GitHub tokens should be at least 40 characters.');
            return;
        }

        // Validate token pattern format
        const validTokenPattern = /^(ghp_|github_pat_|gho_|ghu_|ghs_|ghr_)[a-zA-Z0-9]{36,}$/;
        if (!validTokenPattern.test(trimmedToken)) {
            toast.error('Invalid GitHub token format. Token should start with ghp_, github_pat_, etc.');
            return;
        }

        setIsValidating(true);
        try {
            // Call service to validate token
            await getAuthenticatedUser(trimmedToken);

            // Securely store the token in sessionStorage (cleared when the browser is closed)
            sessionStorage.setItem('github-token', trimmedToken);
            toast.success('GitHub token verified and saved!');

            // Trigger onOpenChange and onTokenSaved callbacks after saving
            onOpenChange(false);
            onTokenSaved?.();
        } catch (error) {
            console.error('Token validation failed:', error);
            toast.error('Invalid token. Please check permissions and try again.');
        } finally {
            setIsValidating(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Key className="h-5 w-5" />
                        GitHub Authentication
                    </DialogTitle>
                    <DialogDescription>
                        Enter your GitHub Personal Access Token (classic) with <code>repo</code> scope to enable saving directly to your repositories.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="token">Personal Access Token</Label>
                        <div className="relative">
                            <Input
                                id="token"
                                type={showToken ? 'text' : 'password'}
                                placeholder="ghp_..."
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                className="pr-10"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowToken(!showToken)}
                            >
                                {showToken ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Don't have a token? <a href="https://github.com/settings/tokens/new?scopes=repo&description=Readme%20Design%20Kit" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Generate one here</a>.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave} disabled={isValidating || !token.trim()}>
                        {isValidating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save & Connect
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};