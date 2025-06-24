import { useState, useEffect } from 'react';
import UserInput from '@/components/UserInput';
import Sidebar from '@/components/Sidebar';
import PreviewGrid from '@/components/PreviewGrid';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Elements() {
  const [username, setUsername] = useState('Mayur-Pagote');
  const [repo, setRepo] = useState('README_Design_Kit');
  const [selectedCategory, setSelectedCategory] = useState('graphs');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
  };
  const handleRepoChange = (newRepo: string) => { 
    setRepo(newRepo);
  };
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);

    // Close sidebar on mobile with animation
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
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

      {/* Mobile Menu Toggle */}
      <div className="md:hidden px-4 py-2">
        <Button variant="outline" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex relative">
        {/* Sidebar */}
        <div
          className={`
            transition-all duration-300 ease-in-out
            transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            absolute md:relative z-20 bg-background border-r border-border w-64 
            md:translate-x-0 md:block
          `}
        >
          <Sidebar 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-0 md:ml-0 p-4">
          <PreviewGrid 
            selectedCategory={selectedCategory}
            username={username}
            repo={repo}
          />
        </div>

      </div>
    </div>
  );
}
