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
  Menu
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

export default function DragDropEditor() {
  const [elements, setElements] = useState<ElementType[]>([]);
  const [editingElement, setEditingElement] = useState<ElementType | null>(null);
  const [showPalette, setShowPalette] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [viewMode, setViewMode] = useState<'developer' | 'recruiter' | 'client'>('developer');
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [loadedTemplateName, setLoadedTemplateName] = useState<string | null>(null);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileElements, setShowMobileElements] = useState(false);

  const location = useLocation();

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
          if (!validation.isValid) return;
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

  const getPersonaIcon = (mode: typeof viewMode) =>
    mode === 'developer' ? <User className="h-4 w-4" /> :
    mode === 'recruiter' ? <Search className="h-4 w-4" /> :
    <Package className="h-4 w-4" />;

  const getPersonaLabel = (mode: typeof viewMode) =>
    mode === 'developer' ? '👨‍💻 Developer' :
    mode === 'recruiter' ? '🔍 Recruiter' :
    '📦 Client';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b border-border bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
              </Button>
              <h1 className="text-base sm:text-xl font-semibold">Drag & Drop README Editor</h1>
              {loadedTemplateName && (
                <span className="hidden sm:inline text-sm text-muted-foreground">
                  • From template: <span className="font-medium">{loadedTemplateName}</span>
                </span>
              )}
              <Badge variant="default" className="hidden sm:inline">Beta</Badge>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <Button size="icon" variant="outline" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden sm:flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => window.open('/templates', '_blank')}>
                <Library className="h-4 w-4" />Browse Templates
              </Button>
              <Button variant="outline" size="sm" onClick={() => setElements([...demoElements])}>
                <Sparkles className="h-4 w-4" />Load Demo
              </Button>
              <Button variant="outline" size="sm" onClick={() => setElements([])} disabled={!elements.length}>
                Clear All
              </Button>
              <SaveTemplateDialog elements={elements} onSave={(t) => console.log('Saved', t)} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="min-w-[140px] justify-between">
                    <span className="flex items-center gap-2">
                      {getPersonaIcon(viewMode)}
                      <span>{getPersonaLabel(viewMode).split(' ')[1]}</span>
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {["developer", "recruiter", "client"].map((mode) => (
                    <DropdownMenuItem key={mode} onClick={() => setViewMode(mode as any)}>
                      {getPersonaIcon(mode as any)} {getPersonaLabel(mode as any)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" onClick={() => setShowComparisonModal(true)}>
                <Info className="h-4 w-4" /><span className="hidden sm:inline">Compare</span>
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowPalette(!showPalette)}>
                <PanelLeft className="h-4 w-4" />{showPalette ? 'Hide' : 'Show'} Elements
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
                <PanelRight className="h-4 w-4" />{showPreview ? 'Hide' : 'Show'} Preview
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="mt-4 flex flex-col gap-2 sm:hidden">
              <Button onClick={() => window.open('/templates', '_blank')}>Browse Templates</Button>
              <Button onClick={() => setElements([...demoElements])}>Load Demo</Button>
              <Button onClick={() => setElements([])} disabled={!elements.length}>Clear All</Button>
              <SaveTemplateDialog elements={elements} onSave={(t) => console.log('Saved', t)} />
              <Button onClick={() => setShowComparisonModal(true)}>Compare Personas</Button>
              <Button onClick={() => setShowPreview(!showPreview)}>{showPreview ? 'Hide' : 'Show'} Preview</Button>
              
              {/* Toggle Elements Section */}
              <Button
                onClick={() => setShowMobileElements(!showMobileElements)}
                variant="outline"
                className="flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <PanelLeft className="h-4 w-4" /> Elements
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showMobileElements ? 'rotate-180' : ''}`}
                />
              </Button>

              {showMobileElements && (
                <div className="border rounded-md p-2 bg-muted">
                  <ElementPalette onAddElement={(el) => setElements((prev) => [...prev, el])} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
        {showPalette && (
          <div className="hidden sm:block">
            <ElementPalette onAddElement={(el) => setElements((prev) => [...prev, el])} />
          </div>
        )}
        <EditorCanvas
          elements={elements}
          onElementsChange={setElements}
          onEditElement={setEditingElement}
          viewMode={viewMode}
        />
        {showPreview && (
          <div className="border-t sm:border-l w-full sm:w-1/2">
            <ReadmePreview elements={elements} viewMode={viewMode} />
          </div>
        )}
      </div>

      <AssistantLauncher
        elements={elements}
        isEditorActive={elements.length > 0}
        onApplySuggestion={(id, content) =>
          setElements((prev) => prev.map(el => el.id === id ? { ...el, content } : el))
        }
        backToTopVisible={backToTopVisible}
      />
      <ScrollToTop isVisible={backToTopVisible} />
      <ElementEditor
        element={editingElement}
        isOpen={!!editingElement}
        onClose={() => setEditingElement(null)}
        onSave={(edited) =>
          setElements((prev) => prev.map(el => el.id === edited.id ? edited : el))
        }
      />
      <PersonaComparisonModal
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
      />
    </div>
  );
}
