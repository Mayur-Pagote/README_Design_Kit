import { useLocation } from 'react-router-dom';
import MarkdownPreview from '../components/MarkdownPreview';
import MarkdownCode from '../components/MarkdownCode';
import {ResizablePanelGroup, ResizablePanel, ResizableHandle} from '@/components/ui/resizable';

const MarkdownEditor = () => {
  const location = useLocation();
  const markdown = location.state?.markdown || '# No template selected';

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel>
        <div className="h-full p-4 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Markdown Preview</h2>
          <MarkdownPreview markdown={markdown} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div className="h-full p-4 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Markdown Code</h2>
          <MarkdownCode markdown={markdown} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MarkdownEditor;
