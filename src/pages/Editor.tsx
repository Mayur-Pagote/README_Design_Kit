import { useState, useMemo, useEffect } from 'react';
import { TemplateUtils } from '@/utils/templateUtils';
import { Sidebar } from '@/components/Editor/Sidebar'; 
import { ReadmePreview } from '@/components/ReadmePreview'; 
import type { ElementType } from '@/types/elements';
import type { Template } from '@/types/templates';

export const EditorPage = () => {
  const [variables, setVariables] = useState({ NAME: '', GITHUB_USER: '' });
  // 1. Fixes initialElements error: Elements state starts empty
  
  const [elements, setElements] = useState<ElementType[]>([]); 
// 2. Fixes setElements warning: Load selected template from library on mount
  
  useEffect(() => {
    const savedTemplate = sessionStorage.getItem('selectedTemplate');
    if (savedTemplate) {
      const template: Template = JSON.parse(savedTemplate);
      
      setElements(template.elements || []); 
    }
  }, []);

  // 3. Process placeholders like {{NAME}} in real-time as user types
  
  const dynamicElements = useMemo(() => {
    return TemplateUtils.renderDynamicElements(elements, variables);
  }, [elements, variables]);

  const handleVariableChange = (key: string, value: string) => {
    setVariables(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      {/* Sidebar handles input changes */}
      <Sidebar variables={variables} onVariableChange={handleVariableChange} />
      
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-xl font-bold">README Preview</h1>
          {/* 4. Use ReadmePreview to render the processed elements */}
          <ReadmePreview elements={dynamicElements} preset='default' onPresetChange={()=>{}}/>
        </div>
      </main>
    </div>
  );
};