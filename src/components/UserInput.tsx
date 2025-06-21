
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserInputProps {
  onUsernameChange: (username: string) => void;
  onRepoChange: (repo: string) => void;
  defaultUsername: string;
  defaultRepo: string;
}

const UserInput = ({ onUsernameChange,onRepoChange, defaultUsername, defaultRepo }: UserInputProps) => {
  const [username, setUsername] = useState(defaultUsername);
  const [repo, setRepo] = useState(defaultRepo);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    onUsernameChange(newUsername || defaultUsername);
  };

  const handleRepoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRepo = e.target.value;
    setRepo(newRepo);
    onRepoChange(newRepo || defaultRepo);
  };

 return (
  <div className="bg-card p-6 border-b border-border">
    <div className="container mx-auto">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-end sm:space-x-4 gap-4">
        <div className="w=full sm:w-1/2">
          <Label htmlFor="github-username" className="text-sm font-medium text-muted-foreground">
            Enter Your GitHub Profile Name:
          </Label>
          <Input
            id="github-username"
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={handleInputChange}
            className="mt-2 bg-background border-border focus:border-primary transition-colors"
          />
        </div>

        <div className='w=full sm:w-1/2'>
          <Label htmlFor="repo-name" className="text-sm font-medium text-muted-foreground">
            Enter Your GitHub Repository Name:
          </Label>
          <Input
            id="repo-name"
            type="text"
            placeholder="Enter GitHub repository name"
            value={repo}
            onChange={handleRepoChange}
            className="mt-2 bg-background border-border focus:border-primary transition-colors px-4 py-2 text-base"
          />
        </div>
      </div>
    </div>
  </div>
);
}

export default UserInput;
