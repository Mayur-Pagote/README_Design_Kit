import { useNavigate } from "react-router-dom";
import { TemplateLibrary } from "@/components/TemplateLibrary/TemplateLibrary";
import type { Template } from "@/types/templates";

export default function TemplateLibraryPage() {
  const navigate = useNavigate();

  const handleSelectTemplate = (
    template: Template,
    username: string,
    repo: string,
  ) => {
    // Navigate to the markdown editor, passing the full template and context
    navigate("/markdown-editor", { state: { template, username, repo } });
  };

  const handleStartFromScratch = () => {
    // Clear any stored template
    sessionStorage.removeItem("selectedTemplate");

    // Navigate to the drag-drop editor
    navigate("/drag-drop");
  };

  return (
    <TemplateLibrary
      onSelectTemplate={handleSelectTemplate}
      onStartFromScratch={handleStartFromScratch}
    />
  );
}
