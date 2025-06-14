
import { useState } from 'react';
import Header from '@/components/Header';
import UserInput from '@/components/UserInput';
import Sidebar from '@/components/Sidebar';
import PreviewGrid from '@/components/PreviewGrid';

export default function Index(){
  const [username, setUsername] = useState('Mayur-Pagote');
  const [selectedCategory, setSelectedCategory] = useState('graphs');

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <UserInput 
        onUsernameChange={handleUsernameChange}
        defaultUsername="Mayur-Pagote"
      />
      <div className="flex flex-1">
        <Sidebar 
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <PreviewGrid 
          selectedCategory={selectedCategory}
          username={username}
        />
      </div>
    </div>
  );
};
