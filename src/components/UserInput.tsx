
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserInputProps {
  onUsernameChange: (username: string) => void;
  defaultUsername: string;
}

const UserInput = ({ onUsernameChange, defaultUsername }: UserInputProps) => {
  const [username, setUsername] = useState(defaultUsername);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    onUsernameChange(newUsername || defaultUsername);
  };

  return (
    <div className="bg-card p-6 border-b border-border">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto">
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
      </div>
    </div>
  );
};

export default UserInput;
