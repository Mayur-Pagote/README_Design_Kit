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
  Menu,
  Plus,
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
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
import { demoElements } from '@/data/demo';
import { TemplateUtils } from '@/utils/templateUtils';
import { analyzeReadmeQuality, type ReadmeQualityResult } from '@/utils/readmeQualityAnalyzer';
import type { ElementType, GitContributionElement } from '@/types/elements';
import type { Template } from '@/types/templates';
import type { ReadmeExportPreset } from '@/config/readmeExportPresets';
import { toast } from 'sonner';

export default function DragDropEditor() {
  const [elements, setElements] = useState<ElementType[]>([]);
  const [editingElement, setEditingElement] = useState<ElementType | null>(null);
  const [showPalette, setShowPalette] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showAISettings, setShowAISettings] = useState(false);
  const [loadedTemplateName, setLoadedTemplateName] = useState<string | null>(null);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [githubUsername, setGithubUsername] = useState<string>('your-username');
  const [showGithubUsernameInput, setShowGithubUsernameInput] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exportPreset, setExportPreset] = useState<ReadmeExportPreset>('default');
  const [paletteSheetOpen, setPaletteSheetOpen] = useState(false);
  const [previewSheetOpen, setPreviewSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isTablet, setIsTablet] = useState(false);
  const [qualityResult, setQualityResult] = useState<ReadmeQualityResult | null>(null);
  const [showQualityDialog, setShowQualityDialog] = useState(false);

  const isMobile = useIsMobile();
  const location = useLocation();

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
  }, [location]);

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
    console.log('Checking README quality', elements);
    const result = analyzeReadmeQuality(elements);
    console.log('Quality Result:', result);
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
    if (!element || !element.type || !element.id) {
      console.warn('Invalid element: missing type or id', element);
      return null;
    }

    const validTypes = [
      'text', 'title', 'description', 'header', 'banner', 'git-contribution',
      'tech-stack', 'image', 'code-block', 'table', 'badge', 'divider', 'installation'
    ];

    if (!validTypes.includes(element.type)) {
      console.warn('Invalid element type:', element.type);
      return null;
    }

    try {
      switch (element.type) {
        case 'text':
          if (!element.content) return null;
          return {
            ...element,
            style: element.style || {
              fontSize: 'md' as const,
              fontWeight: 'normal' as const,
              textAlign: 'left' as const,
              color: 'inherit'
            }
          } as ElementType;
        case 'header':
          if (!element.content) return null;
          return {
            ...element,
            level: element.level || 2
          } as ElementType;
        case 'tech-stack':
          return {
            ...element,
            technologies: element.technologies || ['JavaScript'],
            layout: element.layout || 'badges'
          } as ElementType;
        case 'code-block':
          if (!element.content) return null;
          return {
            ...element,
            language: element.language || 'bash'
          } as ElementType;
        case 'banner':
          if (!element.content) return null;
          return {
            ...element,
            variant: element.variant || 'default',
            color: element.color || 'blue'
          } as ElementType;
        case 'git-contribution':
          return {
            ...element,
            username: element.username || 'your-username',
            repository: element.repository || 'your-repo'
          } as ElementType;
        case 'image':
          return {
            ...element,
            src: element.src || 'https://via.placeholder.com/300x200',
            alt: element.alt || 'Image description'
          } as ElementType;
        case 'table':
          return {
            ...element,
            headers: element.headers || ['Column 1', 'Column 2'],
            rows: element.rows || [['Row 1 Col 1', 'Row 1 Col 2']]
          } as ElementType;
        case 'divider':
          return {
            ...element,
            dividerStyle: element.dividerStyle || 'line'
          } as ElementType;
        default:
          return element as ElementType;
      }
    } catch (error) {
      console.warn('Error validating element:', error);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Editor Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container mx-auto px-6 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          {/* Left side */}
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

          {/* Right side - Mobile Dropdown */}
          <div className="md:hidden w-full px-4 py-2 flex justify-end">
            <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={loadDemo}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Load Demo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.open('/templates', '_blank')}>
                  <Library className="h-4 w-4 mr-2" />
                  Browse Templates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowGithubUsernameInput(true)}>
                  <Github className="h-4 w-4 mr-2" />
                  Set GitHub
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowAISettings(true)}>
                  <Settings className="h-4 w-4 mr-2" />
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
                  className="text-destructive"
                >
                  Clear All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => isMobile ? setPaletteSheetOpen(true) : setShowPalette(!showPalette)}>
                  <PanelLeft className="h-4 w-4 mr-2" />
                  {isMobile ? 'Add Elements' : (showPalette ? 'Hide' : 'Show') + ' Elements'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => isMobile ? setPreviewSheetOpen(true) : setShowPreview(!showPreview)}>
                  <PanelRight className="h-4 w-4 mr-2" />
                  {isMobile ? 'View Preview' : (showPreview ? 'Hide' : 'Show') + ' Preview'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowComparisonModal(true)}>
                  <Info className="h-4 w-4 mr-2" />
                  Compare Views
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right side - Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
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

      {/* Editor Layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile (<768px): Sheets for Palette and Preview */}
        {isMobile && (
          <>
            <Sheet open={paletteSheetOpen} onOpenChange={setPaletteSheetOpen}>
              <SheetContent side="left" className="w-[85vw] sm:w-[320px] p-0 z-50">
                <div className="overflow-y-auto h-[calc(100vh-80px)] pt-8">
                  <ElementPalette onAddElement={(element) => {
                    handleAddElement(element);
                    setPaletteSheetOpen(false);
                  }} />
                </div>
              </SheetContent>
            </Sheet>

            <Sheet open={previewSheetOpen} onOpenChange={setPreviewSheetOpen}>
              <SheetContent side="right" className="w-[90vw] sm:w-[600px] p-0 z-50">
                <div className="overflow-y-auto h-[calc(100vh-80px)] pt-8">
                  <ReadmePreview
                    elements={elements}
                    preset={exportPreset}
                    onPresetChange={setExportPreset}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex-1 overflow-auto">
              <EditorCanvas
                elements={elements}
                onElementsChange={handleElementsChange}
                onEditElement={handleEditElement}
                onReorderElement={handleReorderElement}
              />
            </div>

            <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-3">
              <Sheet open={paletteSheetOpen} onOpenChange={setPaletteSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    size="lg"
                    className="h-14 w-14 rounded-full shadow-lg"
                    aria-label="Add element"
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              <Button
                size="lg"
                variant="outline"
                className="h-14 w-14 rounded-full shadow-lg"
                onClick={() => setPreviewSheetOpen(true)}
                aria-label="View preview"
              >
                <Eye className="h-6 w-6" />
              </Button>
            </div>
          </>
        )}

        {/* Tablet (768px-1277px): Tab View with Sidebar */}
        {!isMobile && isTablet && (
          <div className="flex-1 flex flex-row overflow-hidden">
            {showPalette && (
              <div className="w-80 min-w-[320px] max-w-[360px] border-r overflow-y-scroll bg-muted/50">
                <ElementPalette onAddElement={handleAddElement} />
              </div>
            )}

            <div className="flex-1 flex flex-col overflow-hidden bg-background">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'editor' | 'preview')} className="flex-1 flex flex-col">
                <div className="border-b bg-muted/30 px-4 py-3">
                  <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2">
                    <TabsTrigger value="editor" className="flex items-center gap-2 data-[state=active]:bg-background">
                      <PanelLeft className="h-4 w-4" />
                      <span className="font-medium">Editor</span>
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="flex items-center gap-2 data-[state=active]:bg-background">
                      <PanelRight className="h-4 w-4" />
                      <span className="font-medium">Preview</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="editor" className="flex-1 overflow-hidden m-0 data-[state=active]:flex">
                  <EditorCanvas
                    elements={elements}
                    onElementsChange={handleElementsChange}
                    onEditElement={handleEditElement}
                    onReorderElement={handleReorderElement}
                  />
                </TabsContent>
                <TabsContent value="preview" className="flex-1 overflow-hidden m-0 data-[state=active]:flex">
                  <ReadmePreview
                    elements={elements}
                    preset={exportPreset}
                    onPresetChange={setExportPreset}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}

        {/* Desktop (>=1278px): Three Column Layout */}
        {!isMobile && !isTablet && (
          <div className="flex-1 flex flex-row overflow-hidden">
            {showPalette && (
              <div className="basis-1/4 min-w-[220px] max-w-[320px] border-r overflow-auto">
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
        )}
      </div>

      {/* All Modals and Dialogs */}
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
        globalGithubUsername={githubUsername}
      />
      
      <PersonaComparisonModal 
        isOpen={showComparisonModal} 
        onClose={() => setShowComparisonModal(false)} 
      />
      
      <GithubUsernameDialog
        isOpen={showGithubUsernameInput}
        onClose={() => setShowGithubUsernameInput(false)}
        currentUsername={githubUsername}
        onSave={(newUsername) => {
          setGithubUsername(newUsername);
          updateAllGithubUsernames(newUsername);
        }}
      />
      
      <AISettingsDialog
        isOpen={showAISettings}
        onClose={() => setShowAISettings(false)}
      />
      
      <ReadmeQualityDialog
        open={showQualityDialog}
        onClose={() => setShowQualityDialog(false)}
        result={qualityResult}
      />
    </div>
  );
}