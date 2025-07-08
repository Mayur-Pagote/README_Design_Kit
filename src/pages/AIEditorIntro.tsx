import { useNavigate } from 'react-router-dom';
import { AIEditorGuide } from '@/components/AIEditorGuide';

export default function AIEditorIntro() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/readme-editor');
  };

  return (
    <div className="min-h-screen bg-background">
      <AIEditorGuide onGetStarted={handleGetStarted} />
    </div>
  );
}
