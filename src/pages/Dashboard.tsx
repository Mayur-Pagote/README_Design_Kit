
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import UserInput from '@/components/UserInput';
import Sidebar from '@/components/Sidebar';
import PreviewGrid from '@/components/PreviewGrid';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ThemeToggler from '../theme/toggler';

export default function Dashboard(){
  const [username, setUsername] = useState('Mayur-Pagote');
  const [repo, setRepo] = useState("README_Design_Kit");
  const [selectedCategory, setSelectedCategory] = useState('graphs');
  const navigate = useNavigate();

  function handleUsernameChange(newUsername: string) {
    setUsername(newUsername);
  }
  function handleRepoChange(newRepo: string) {
  setRepo(newRepo);
}

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBackToHome}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
        <ThemeToggler />
      </div>
      <Header />
      <UserInput 
        onUsernameChange={handleUsernameChange}
        onRepoChange={handleRepoChange}
        defaultUsername="Mayur-Pagote"
        defaultRepo="README_Design_Kit"
      />
      <div className="flex flex-1">
        <Sidebar 
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <PreviewGrid 
          selectedCategory={selectedCategory}
          username={username}
          repo={repo}
        />
      </div>
    </div>
  );
};
