import { useState, useEffect } from 'react';
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

interface GithubUsernameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsername: string;
  currentRepo: string;
  onSave: (username: string, repo: string) => void;
}

export function GithubUsernameDialog({
  isOpen,
  onClose,
  currentUsername,
  currentRepo,
  onSave,
}: GithubUsernameDialogProps) {
  const [username, setUsername] = useState(currentUsername);
  const [repo, setRepo] = useState(currentRepo);

  // Update local state when external prop changes
  useEffect(() => {
    setUsername(currentUsername);
  }, [currentUsername]);

  useEffect(() => {
    setRepo(currentRepo);
  }, [currentRepo]);

  const handleSave = () => {
    onSave(username, repo);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>GitHub Context Settings</DialogTitle>
          <DialogDescription>
            Enter your GitHub details to use in API integrations and elements.
            These will be applied to all GitHub-related elements using placeholders.
          </DialogDescription> 
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="github-username">GitHub Username</Label>
            <Input
              id="github-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your-username"
              autoFocus
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="github-repo">GitHub Repository</Label>
            <Input
              id="github-repo"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder="your-repo"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
