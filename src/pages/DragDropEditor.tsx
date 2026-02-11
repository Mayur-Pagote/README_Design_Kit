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
  Settings,
  Undo,
  Redo,
  History, 
  Save,    
  Trash2,  
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { ElementPalette } from '@/components/ElementPalette';
import { EditorCanvas } from '@/components/EditorCanvas';
import { ReadmePreview } from '@/components/ReadmePreview';
import { ElementEditor } from '@/components/ElementEditor';
import { SaveTemplateDialog } from '@/components/SaveTemplateDialog';
import { AssistantLauncher } from '@/components/AssistantLauncher';
import { PersonaComparisonModal } from '@/components/PersonaComparisonModal';
import { AISettingsDialog } from '@/components/AISettingsDialog';
import { GithubUsernameDialog } from '@/components/GithubUsernameDialog';
import { ReadmeQualityDialog } from '@/components/ReadmeQualityDialog';
import ScrollToTop from '@/components/ScrollToTop';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePersistentHistory } from '@/hooks/usePersistentHistory'; 
import { demoElements } from '@/data/demo';
import { TemplateUtils } from '@/utils/templateUtils';
import { analyzeReadmeQuality, type ReadmeQualityResult } from '@/utils/readmeQualityAnalyzer';
import type { ElementType, GitContributionElement } from '@/types/elements';
import type { Template } from '@/types/templates';
import type { ReadmeExportPreset } from '@/config/readmeExportPresets';
import { toast } from 'sonner';

export default function DragDropEditor() {
  const { 
    state: elements, 
    setState: setElements, 
    undo, 
    redo, 
    canUndo, 
    canRedo,
    checkpoints,
    saveCheckpoint,
    restoreCheckpoint,
    deleteCheckpoint
  } = usePersistentHistory<ElementType[]>('readme-editor-v1', []);

  const [editingElement, setEditingElement] = useState<ElementType | null>(null);
  const [showPalette, setShowPalette] = useState(!useIsMobile());
  const [showPreview, setShowPreview] = useState(!useIsMobile());
  const [showPaletteSheet, setShowPaletteSheet] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showAISettings, setShowAISettings] = useState(false);
  const [loadedTemplateName, setLoadedTemplateName] = useState<string | null>(null);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [githubUsername, setGithubUsername] = useState<string>('your-username');
  const [showGithubUsernameInput, setShowGithubUsernameInput] = useState(false);
  
 
  const [newCheckpointName, setNewCheckpointName] = useState('');
  
  const [exportPreset, setExportPreset] = useState<ReadmeExportPreset>('default');
  const [isTablet, setIsTablet] = useState(false);
  const [qualityResult, setQualityResult] = useState<ReadmeQualityResult | null>(null);
  const [showQualityDialog, setShowQualityDialog] = useState(false);

  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1278);
    };
    checkTablet();
    window.addEventListener('resize', checkTablet);
    return () => window.removeEventListener('resize', checkTablet);
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      setBackToTopVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const shouldLoadTemplate = urlParams.get('template') === 'true';

    if (shouldLoadTemplate) {
      const storedTemplate = sessionStorage.getItem('selectedTemplate');
      if (storedTemplate) {
        try {
          const template: Template = JSON.parse(storedTemplate);
          const validation = TemplateUtils.validateTemplate(template);
          if (!validation.isValid) {
            console.error('Invalid template:', validation.errors);
            return;
          }
          const clonedElements = TemplateUtils.cloneTemplateElements(template);
          setElements(clonedElements);
          setLoadedTemplateName(template.name);
          sessionStorage.removeItem('selectedTemplate');
        } catch (error) {
          console.error('Error loading template:', error);
        }
      }
    }
  }, [location, setElements]);

  const handleAddElement = (element: ElementType) => {
    if (element.type === 'git-contribution') {
      const gitElement = element as GitContributionElement;
      setElements(prev => [...prev, { ...gitElement, username: githubUsername }]);
    } else if (
      element.type === 'image' &&
      element.src &&
      typeof element.src === 'string' &&
      (element.src.includes('github') || element.src.includes('{username}'))
    ) {
      setElements(prev => [
        ...prev,
        {
          ...element,
          src: element.src.replace('{username}', githubUsername).replace(/username=([^&]+)/, `username=${githubUsername}`),
        },
      ]);
    } else {
      setElements(prev => [...prev, element]);
    }
  };

  const handleCheckReadmeQuality = () => {
    const result = analyzeReadmeQuality(elements);
    setQualityResult(result);
    setShowQualityDialog(true);
  };

  const handleEditElement = (element: ElementType) => setEditingElement(element);

  const handleSaveElement = (editedElement: ElementType) => {
    setElements(prev => prev.map(el => (el.id === editedElement.id ? editedElement : el)));
    setEditingElement(null);
  };

  const handleElementsChange = (newElements: ElementType[]) => setElements(newElements);

  const handleBrandingSuggestion = (id: string, newContent: string) => {
    setElements(prev => prev.map(el => (el.id === id ? { ...el, content: newContent } : el)));
  };

  const handleRemoveElement = (elementId: string) => {
    setElements(prev => prev.filter(el => el.id !== elementId));
    toast.success('Element removed successfully');
  };

  const handleReorderElement = (elementId: string, direction: 'up' | 'down') => {
    setElements(prev => {
      const currentIndex = prev.findIndex(el => el.id === elementId);
      if (currentIndex === -1) return prev;

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;

      const newElements = [...prev];
      [newElements[currentIndex], newElements[newIndex]] = [newElements[newIndex], newElements[currentIndex]];
      toast.success(`Element moved ${direction}`);
      return newElements;
    });
  };

  const handleEnhancedAction = (action: import('@/types/branding').SuggestionAction) => {
    switch (action.type) {
      case 'edit':
        if (action.elementId && action.newContent) {
          handleBrandingSuggestion(action.elementId, action.newContent);
          toast.success('Content updated successfully');
        }
        break;
      case 'add':
        if (action.elementToAdd) {
          const validatedElement = validateElementForEditor(action.elementToAdd);
          if (validatedElement) {
            handleAddElement(validatedElement);
            toast.success('New element added to README');
          } else {
            toast.error('Invalid element - could not add to README');
            console.error('Failed to validate element:', action.elementToAdd);
          }
        }
        break;
      case 'remove':
        if (action.elementId) {
          handleRemoveElement(action.elementId);
        }
        break;
      case 'reorder':
        if (action.elementId && action.direction) {
          handleReorderElement(action.elementId, action.direction);
        }
        break;
      case 'enhance':
        if (action.elementId && action.newContent) {
          handleBrandingSuggestion(action.elementId, action.newContent);
          toast.success('Content enhanced with AI');
        }
        break;
    }
  };

  const loadDemo = () => {
    const demoWithUsername = demoElements.map(element => {
      if (element.type === 'git-contribution' && element.username === 'your-username') {
        return { ...element, username: githubUsername };
      }
      if (
        element.type === 'image' &&
        element.src &&
        typeof element.src === 'string' &&
        (element.src.includes('github') || element.src.includes('{username}'))
      ) {
        return {
          ...element,
          src: element.src.replace('{username}', githubUsername).replace(/username=([^&]+)/, `username=${githubUsername}`),
        };
      }
      return element;
    });
    setElements([...demoWithUsername]);
  };

  const clearAll = () => setElements([]);

  const updateAllGithubUsernames = (newUsername: string) => {
    setElements(prev =>
      prev.map(el => {
        if (el.type === 'git-contribution') return { ...el, username: newUsername };
        if (
          el.type === 'image' &&
          el.src &&
          typeof el.src === 'string' &&
          (el.src.includes('github') || el.src.includes('{username}'))
        ) {
          return {
            ...el,
            src: el.src.replace('{username}', newUsername).replace(/username=([^&]+)/, `username=${newUsername}`),
          };
        }
        return el;
      })
    );
  };

  const validateElementForEditor = (element: any): ElementType | null => {
    if (!element || !element.type || !element.id) return null;
    return element as ElementType; 
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container mx-auto px-6 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
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

          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1 mr-2 border-r pr-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={undo}
                disabled={!canUndo}
                className="h-8 w-8 p-0"
                title="Undo (Ctrl+Z)"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={redo}
                disabled={!canRedo}
                className="h-8 w-8 p-0"
                title="Redo (Ctrl+Shift+Z)"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>

            {/* NEW: History / Checkpoints Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 mr-2">
                  <History className="h-4 w-4" />
                  History
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="p-2 border-b">
                  <div className="font-semibold mb-2 text-xs text-muted-foreground">Save Checkpoint</div>
                  <div className="flex gap-2">
                    <input 
                      className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                      placeholder="Version Name..."
                      value={newCheckpointName}
                      onChange={(e) => setNewCheckpointName(e.target.value)}
                      onKeyDown={(e) => {
                        if(e.key === 'Enter' && newCheckpointName) {
                          saveCheckpoint(newCheckpointName);
                          setNewCheckpointName('');
                          toast.success("Checkpoint saved");
                        }
                      }}
                    />
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8"
                      onClick={() => {
                        if(newCheckpointName) {
                          saveCheckpoint(newCheckpointName);
                          setNewCheckpointName('');
                          toast.success("Checkpoint saved");
                        }
                      }}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="max-h-60 overflow-y-auto">
                  {checkpoints.length === 0 && (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No saved checkpoints
                    </div>
                  )}
                  {checkpoints.map((cp) => (
                    <div key={cp.id} className="flex items-center justify-between p-2 hover:bg-muted/50 group">
                      <div 
                        className="flex-1 cursor-pointer" 
                        onClick={() => {
                          restoreCheckpoint(cp.id);
                          toast.success(`Restored "${cp.name}"`);
                        }}
                      >
                        <div className="text-sm font-medium">{cp.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(cp.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCheckpoint(cp.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

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
                <DropdownMenuItem onClick={() => window.open('/templates', '_blank')} className="flex items-center gap-2">
                  <Library className="h-4 w-4" />
                  Browse Templates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowGithubUsernameInput(true)} className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  Set GitHub: {githubUsername}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowAISettings(true)} className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  AI Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleCheckReadmeQuality}
                  disabled={elements.length === 0}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Check README Quality
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={clearAll}
                  disabled={elements.length === 0}
                  className="flex items-center gap-2 text-destructive"
                >
                  Clear All
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <SaveTemplateDialog elements={elements} onSave={(template) => console.log('Saved:', template)} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  View
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setShowPalette(!showPalette)} className="flex items-center gap-2">
                  <PanelLeft className="h-4 w-4" />
                  {showPalette ? 'Hide' : 'Show'} Elements
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2">
                  <PanelRight className="h-4 w-4" />
                  {showPreview ? 'Hide' : 'Show'} Preview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowComparisonModal(true)} className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Compare Views
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {isMobile ? (
          <>
            <div className="flex gap-2 px-4 py-2 border-b bg-background/50">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPaletteSheet(true)}
                className="flex-1"
              >
                <Library className="h-4 w-4 mr-2" />
                Add Elements
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
            </div>
            
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-auto">
                <EditorCanvas
                  elements={elements}
                  onElementsChange={handleElementsChange}
                  onEditElement={handleEditElement}
                  onReorderElement={handleReorderElement}
                />
              </div>

              {showPreview && (
                <div className="border-t flex-1 overflow-auto">
                  <ReadmePreview
                    elements={elements}
                    preset={exportPreset}
                    onPresetChange={setExportPreset}
                  />
                </div>
              )}
            </div>

            <Sheet open={showPaletteSheet} onOpenChange={setShowPaletteSheet}>
              <SheetContent side="bottom" className="max-h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Add Elements to README</SheetTitle>
                </SheetHeader>
                <div className="mt-4 overflow-y-auto max-h-[calc(80vh-80px)]">
                  <ElementPalette onAddElement={(element) => {
                    handleAddElement(element);
                    setShowPaletteSheet(false);
                  }} />
                </div>
              </SheetContent>
            </Sheet>
          </>
        ) : !isTablet ? (
          <div className="flex-1 flex flex-row overflow-hidden">
            {showPalette && (
              <div className="basis-1/4 min-w-0 max-w-[320px] border-r overflow-y-auto overflow-x-hidden">
                <ElementPalette onAddElement={handleAddElement} />
              </div>
            )}

            <div className="flex-1 overflow-auto">
              <EditorCanvas
                elements={elements}
                onElementsChange={handleElementsChange}
                onEditElement={handleEditElement}
                onReorderElement={handleReorderElement}
              />
            </div>

            {showPreview && (
              <div className="basis-1/2 max-w-[600px] border-l overflow-auto">
                <ReadmePreview
                  elements={elements}
                  preset={exportPreset}
                  onPresetChange={setExportPreset}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex gap-2 px-4 py-2 border-b bg-background/50">
              <Button
                variant={showPalette ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowPalette(!showPalette)}
                className="flex-1"
              >
                <Library className="h-4 w-4 mr-2" />
                Elements
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(false)}
                className="flex-1"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Editor
              </Button>
              <Button
                variant={showPreview ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {showPalette && (
                <div className="basis-1/3 min-w-0 border-r overflow-y-auto overflow-x-hidden">
                  <ElementPalette onAddElement={handleAddElement} />
                </div>
              )}

              <div className="flex-1 overflow-auto">
                <EditorCanvas
                  elements={elements}
                  onElementsChange={handleElementsChange}
                  onEditElement={handleEditElement}
                  onReorderElement={handleReorderElement}
                />
              </div>

              {showPreview && (
                <div className="basis-1/2 border-l overflow-auto">
                  <ReadmePreview
                    elements={elements}
                    preset={exportPreset}
                    onPresetChange={setExportPreset}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <AssistantLauncher
        elements={elements}
        isEditorActive={elements.length > 0}
        onApplySuggestion={handleBrandingSuggestion}
        onApplyAction={handleEnhancedAction}
        onAddElement={handleAddElement}
        onRemoveElement={handleRemoveElement}
        onReorderElement={handleReorderElement}
        backToTopVisible={backToTopVisible}
      />
      <ScrollToTop isVisible={backToTopVisible} />
      <ElementEditor
        element={editingElement}
        isOpen={editingElement !== null}
        onClose={() => setEditingElement(null)}
        onSave={handleSaveElement}
      />
      <PersonaComparisonModal isOpen={showComparisonModal} onClose={() => setShowComparisonModal(false)} />
      <GithubUsernameDialog
        isOpen={showGithubUsernameInput}
        onClose={() => setShowGithubUsernameInput(false)}
        currentUsername={githubUsername}
        onSave={(newUsername) => {
          setGithubUsername(newUsername);
          updateAllGithubUsernames(newUsername);
        }}
      />
      <AISettingsDialog isOpen={showAISettings} onClose={() => setShowAISettings(false)} />
      <ReadmeQualityDialog open={showQualityDialog} onClose={() => setShowQualityDialog(false)} result={qualityResult} />
    </div>
  );
}
