import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Github, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface GitHubLoadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLoad: (username: string, repo: string) => Promise<void>;
}

export function GitHubLoadDialog({
  isOpen,
  onClose,
  onLoad,
}: GitHubLoadDialogProps) {
  const [username, setUsername] = useState('');
  const [repo, setRepo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = async () => {
    if (!username.trim() || !repo.trim()) {
      setError('Please enter both username and repository name');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await onLoad(username, repo);
      // Only close if successful (parent handles closing or we close here)
      onClose();
      // Reset form
      setUsername('');
      setRepo('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load repository');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Load from GitHub
          </DialogTitle>
          <DialogDescription>
            Import an existing README.md from any public GitHub repository.
            <br />
            <span className="text-yellow-600 font-medium text-xs">Warning: This will overwrite your current editor content.</span>
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="gh-username">Username / Organization</Label>
            <Input
              id="gh-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g.  facebook"
              autoFocus
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gh-repo">Repository Name</Label>
            <Input
              id="gh-repo"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder="e.g. jakebejoy"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleLoad} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Import README'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}