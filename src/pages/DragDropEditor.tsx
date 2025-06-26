import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  PanelLeft,
  PanelRight,
  Sparkles,
  ChevronDown,
  Info,
  Library,
  Github,
  Eye,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ElementPalette } from '@/components/ElementPalette';
import { EditorCanvas } from '@/components/EditorCanvas';
import { ReadmePreview } from '@/components/ReadmePreview';
import { ElementEditor } from '@/components/ElementEditor';
import { SaveTemplateDialog } from '@/components/SaveTemplateDialog';
import { AssistantLauncher } from '@/components/AssistantLauncher';
import { PersonaComparisonModal } from '@/components/PersonaComparisonModal';
import { demoElements } from '@/data/demo';
import { TemplateUtils } from '@/utils/templateUtils';
import type { ElementType, GitContributionElement } from '@/types/elements';
import type { Template } from '@/types/templates';
import ScrollToTop from '@/components/ScrollToTop';
import { GithubUsernameDialog } from '@/components/GithubUsernameDialog';

export default function DragDropEditor() {
  const [elements, setElements] = useState<ElementType[]>([]);
  const [editingElement, setEditingElement] = useState<ElementType | null>(null);
  const [showPalette, setShowPalette] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [loadedTemplateName, setLoadedTemplateName] = useState<string | null>(null);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [githubUsername, setGithubUsername] = useState<string>('your-username');
  const [showGithubUsernameInput, setShowGithubUsernameInput] = useState(false);
  const location = useLocation();

  // Scroll listener for BackToTop visibility
  useEffect(() => {
    const toggleVisibility = () => {
      setBackToTopVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Load template if one was selected
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const shouldLoadTemplate = urlParams.get('template') === 'true';
    
    if (shouldLoadTemplate) {
      const storedTemplate = sessionStorage.getItem('selectedTemplate');
      if (storedTemplate) {
        try {
          const template: Template = JSON.parse(storedTemplate);
          
          // Validate template before loading
          const validation = TemplateUtils.validateTemplate(template);
          if (!validation.isValid) {
            console.error('Invalid template:', validation.errors);
            return;
          }
          
          // Clone elements with new IDs and load them
          const clonedElements = TemplateUtils.cloneTemplateElements(template);
          setElements(clonedElements);
          setLoadedTemplateName(template.name);
          
          // Clear the stored template after loading
          sessionStorage.removeItem('selectedTemplate');
        } catch (error) {
          console.error('Error loading template:', error);
        }
      }
    }
  }, [location]);

  const handleAddElement = (element: ElementType) => {
    // If this is a GitHub contribution element, use the global username
    if (element.type === 'git-contribution') {
      const gitElement = element as GitContributionElement;
      setElements(prev => [...prev, {
        ...gitElement,
        username: githubUsername
      }]);
    } 
    // If this is an image element with GitHub API URL
    else if (element.type === 'image' && element.src && typeof element.src === 'string' && 
        (element.src.includes('github') || element.src.includes('{username}'))) {
      setElements(prev => [...prev, {
        ...element,
        src: element.src.replace('{username}', githubUsername).replace(/username=([^&]+)/, `username=${githubUsername}`)
      }]);
    } 
    else {
      setElements(prev => [...prev, element]);
    }
  };

  const handleEditElement = (element: ElementType) => {
    setEditingElement(element);
  };

  const handleSaveElement = (editedElement: ElementType) => {
    setElements(prev =>
      prev.map(el => el.id === editedElement.id ? editedElement : el)
    );
    setEditingElement(null);
  };

  const handleElementsChange = (newElements: ElementType[]) => {
    setElements(newElements);
  };

  const handleBrandingSuggestion = (id: string, newContent: string) => {
    setElements(prev =>
      prev.map(el => el.id === id ? { ...el, content: newContent } : el)
    );
  };

  const loadDemo = () => {
    // When loading demo, replace 'your-username' with the current global username
    const demoWithUsername = demoElements.map(element => {
      // Update Git Contribution elements
      if (element.type === 'git-contribution' && element.username === 'your-username') {
        return {
          ...element,
          username: githubUsername
        };
      }
      
      // Update GitHub API image elements
      if (element.type === 'image' && element.src && typeof element.src === 'string' && 
          (element.src.includes('github') || element.src.includes('{username}'))) {
        return {
          ...element,
          src: element.src.replace('{username}', githubUsername).replace(/username=([^&]+)/, `username=${githubUsername}`)
        };
      }
      
      return element;
    });
    
    setElements([...demoWithUsername]);
  };

  const clearAll = () => {
    setElements([]);
  };
  
  const updateAllGithubUsernames = (newUsername: string) => {
    setElements(prev => 
      prev.map(el => {
        // Update Git Contribution elements
        if (el.type === 'git-contribution') {
          return { ...el, username: newUsername };
        }
        
        // Update GitHub API image elements
        if (el.type === 'image' && el.src && typeof el.src === 'string' && 
            (el.src.includes('github') || el.src.includes('{username}'))) {
          return {
            ...el,
            src: el.src.replace('{username}', newUsername).replace(/username=([^&]+)/, `username=${newUsername}`)
          };
        }
        
        return el;
      })
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Simplified Editor Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
              </Button>
              <div className="h-4 w-px bg-border" />
              <h1 className="text-lg font-semibold">README Editor</h1>
              <Badge variant="secondary" className="text-xs">Beta</Badge>
              {loadedTemplateName && (
                <>
                  <div className="h-4 w-px bg-border" />
                  <span className="text-sm text-muted-foreground">
                    Template: <span className="font-medium">{loadedTemplateName}</span>
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Actions Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Actions
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={loadDemo} className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Load Demo
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => window.open('/templates', '_blank')}
                    className="flex items-center gap-2"
                  >
                    <Library className="h-4 w-4" />
                    Browse Templates
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setShowGithubUsernameInput(true)}
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    Set GitHub: {githubUsername}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={clearAll}
                    disabled={elements.length === 0}
                    className="flex items-center gap-2 text-destructive focus:text-destructive"
                  >
                    Clear All
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <SaveTemplateDialog 
                elements={elements}
                onSave={(template) => console.log('Template saved:', template)}
              />

              {/* View Options Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    View
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem 
                    onClick={() => setShowPalette(!showPalette)}
                    className="flex items-center gap-2"
                  >
                    <PanelLeft className="h-4 w-4" />
                    {showPalette ? 'Hide' : 'Show'} Elements
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-2"
                  >
                    <PanelRight className="h-4 w-4" />
                    {showPreview ? 'Hide' : 'Show'} Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setShowComparisonModal(true)}
                    className="flex items-center gap-2"
                  >
                    <Info className="h-4 w-4" />
                    Compare Views
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="flex-1 flex overflow-hidden">
        {showPalette && (
          <ElementPalette onAddElement={handleAddElement} />
        )}

        <EditorCanvas
          elements={elements}
          onElementsChange={handleElementsChange}
          onEditElement={handleEditElement}
        />

        {showPreview && (
          <div className="border-l border-border w-1/2">
            <ReadmePreview elements={elements} />
          </div>
        )}
      </div>

      {/* Floating AI Assistant */}
      <AssistantLauncher
        elements={elements}
        isEditorActive={elements.length > 0}
        onApplySuggestion={handleBrandingSuggestion}
        backToTopVisible={backToTopVisible}
      />
      <ScrollToTop isVisible={backToTopVisible} />

      {/* Element Editor */}
      <ElementEditor
        element={editingElement}
        isOpen={editingElement !== null}
        onClose={() => setEditingElement(null)}
        onSave={handleSaveElement}
        globalGithubUsername={githubUsername}
      />

      {/* Persona Comparison Modal */}
      <PersonaComparisonModal
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
      />

      {/* GitHub Username Dialog */}
      <GithubUsernameDialog
        isOpen={showGithubUsernameInput}
        onClose={() => setShowGithubUsernameInput(false)}
        currentUsername={githubUsername}
        onSave={(newUsername) => {
          setGithubUsername(newUsername);
          
          // Update any existing GitHub elements with the new username
          updateAllGithubUsernames(newUsername);
        }}
      />
    </div>
  );
}
