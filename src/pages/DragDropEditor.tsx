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
  User,
  Search,
  Package,
  Info,
  Library,
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
import type { ElementType } from '@/types/elements';
import type { Template } from '@/types/templates';
import ScrollToTop from '@/components/ScrollToTop';

type ViewMode = 'developer' | 'recruiter' | 'client';

export default function DragDropEditor() {
  const [elements, setElements] = useState<ElementType[]>([]);
  const [editingElement, setEditingElement] = useState<ElementType | null>(null);
  const [showPalette, setShowPalette] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('developer');
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [loadedTemplateName, setLoadedTemplateName] = useState<string | null>(null);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
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
    setElements(prev => [...prev, element]);
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
    setElements([...demoElements]);
  };

  const clearAll = () => {
    setElements([]);
  };

  const getPersonaIcon = (mode: ViewMode) => {
    switch (mode) {
      case 'developer':
        return <User className="h-4 w-4" />;
      case 'recruiter':
        return <Search className="h-4 w-4" />;
      case 'client':
        return <Package className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getPersonaLabel = (mode: ViewMode) => {
    switch (mode) {
      case 'developer':
        return '👨‍💻 Developer';
      case 'recruiter':
        return '🔍 Recruiter';
      case 'client':
        return '📦 Client';
      default:
        return '👨‍💻 Developer';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Editor Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
              </Button>              <span className="text-muted-foreground">•</span>
              <h1 className="text-xl font-semibold">Drag & Drop README Editor</h1>
              {loadedTemplateName && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    From template: <span className="font-medium">{loadedTemplateName}</span>
                  </span>
                </>
              )}
              <Badge variant="default">Beta</Badge>
            </div>            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('/templates', '_blank')}
                className="flex items-center gap-2"
              >
                <Library className="h-4 w-4" />
                Browse Templates
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={loadDemo}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Load Demo
              </Button>              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                disabled={elements.length === 0}
              >
                Clear All
              </Button>
              <SaveTemplateDialog 
                elements={elements}
                onSave={(template) => console.log('Template saved:', template)}
              />
              <span className="text-muted-foreground mx-2">•</span>

              {/* Persona Preview Mode Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 min-w-[140px] justify-between"
                  >
                    <span className="flex items-center gap-2">
                      {getPersonaIcon(viewMode)}
                      <span className="hidden sm:inline">
                        {getPersonaLabel(viewMode).split(' ')[1]}
                      </span>
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => setViewMode('developer')}
                    className={viewMode === 'developer' ? 'bg-accent' : ''}
                  >
                    <User className="h-4 w-4 mr-2" />
                    👨‍💻 Developer
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setViewMode('recruiter')}
                    className={viewMode === 'recruiter' ? 'bg-accent' : ''}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    🔍 Recruiter
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setViewMode('client')}
                    className={viewMode === 'client' ? 'bg-accent' : ''}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    📦 Client
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Persona Comparison Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowComparisonModal(true)}
                className="flex items-center gap-2"
                title="View persona visibility comparison"
              >
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Compare</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPalette(!showPalette)}
                className="flex items-center gap-2"
              >
                <PanelLeft className="h-4 w-4" />
                <span className="inline-block w-[6.5rem] text-left">
                  {showPalette ? 'Hide' : 'Show'} Elements
                </span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2"
              >
                <PanelRight className="h-4 w-4" />
                <span className="inline-block w-[6.5rem] text-left">
                  {showPreview ? 'Hide' : 'Show'} Preview
                </span>
              </Button>
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
          viewMode={viewMode}
        />

        {showPreview && (
          <div className="border-l border-border w-1/2">
            <ReadmePreview elements={elements} viewMode={viewMode} />
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
      />

      {/* Persona Comparison Modal */}
      <PersonaComparisonModal
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
      />
    </div>
  );
}
