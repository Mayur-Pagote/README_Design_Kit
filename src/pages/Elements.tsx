import { useState } from 'react';
import UserInput from '@/components/UserInput';
import Sidebar from '@/components/Sidebar';
import PreviewGrid from '@/components/PreviewGrid';

export default function Elements(){
  const [username, setUsername] = useState('Mayur-Pagote');
  const [repo, setRepo] = useState('README_Design_Kit');
  const [selectedCategory, setSelectedCategory] = useState('graphs');

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
  };
  const handleRepoChange = (newRepo: string) => { 
    setRepo(newRepo);
  };
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              README Elements
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover a comprehensive collection of beautiful README components. 
              Browse, customize, and copy the perfect elements for your documentation.
            </p>
          </div>
        </div>
      </div>

      <UserInput 
        onUsernameChange={handleUsernameChange}
        defaultUsername="Mayur-Pagote"
        onRepoChange={handleRepoChange}  
        defaultRepo="README_Design_Kit" 
      />
      <div className="flex">
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
