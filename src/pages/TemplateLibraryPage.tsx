import { useNavigate } from 'react-router-dom';
import { TemplateLibrary } from '@/components/TemplateLibrary';
import type { Template } from '@/types/templates';

export default function TemplateLibraryPage() {
  const navigate = useNavigate();

  const handleSelectTemplate = (template: Template) => {
    // Store the selected template in sessionStorage so it can be loaded in the editor
    sessionStorage.setItem('selectedTemplate', JSON.stringify(template));
    
    // Navigate to the drag-drop editor
    navigate('/drag-drop?template=true');
  };

  const handleStartFromScratch = () => {
    // Clear any stored template
    sessionStorage.removeItem('selectedTemplate');
    
    // Navigate to the drag-drop editor
    navigate('/drag-drop');
  };

  return (
    <TemplateLibrary
      onSelectTemplate={handleSelectTemplate}
      onStartFromScratch={handleStartFromScratch}
    />
  );
}
