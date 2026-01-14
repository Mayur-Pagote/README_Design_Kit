import { useNavigate } from 'react-router-dom';
import { TemplateLibrary } from '@/components/TemplateLibrary';
import type { Template } from '@/types/templates';

export default function TemplateLibraryPage() {
  const navigate = useNavigate();

  const handleSelectTemplate = (template: Template, username: string, repo: string) => {
    const markdown = template.markdown || '';
    const finalMarkdown = markdown.replace(/{username}/g, username).replace(/{repo}/g, repo);
    // Navigate to the markdown editor
    navigate('/markdown-editor', { state: { markdown: finalMarkdown } });
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
