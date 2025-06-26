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
  onSave: (username: string) => void;
}

export function GithubUsernameDialog({
  isOpen,
  onClose,
  currentUsername,
  onSave,
}: GithubUsernameDialogProps) {
  const [username, setUsername] = useState(currentUsername);

  // Update local state when external prop changes
  useEffect(() => {
    setUsername(currentUsername);
  }, [currentUsername]);

  const handleSave = () => {
    onSave(username);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set GitHub Username</DialogTitle>
          <DialogDescription>
            Enter your GitHub username to use in GitHub API integrations and elements.
            This will be applied to all new GitHub elements and can be updated in individual elements.
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
