import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Settings, 
  MessageSquare, 
  Code2, 
  Eye, 
  Download,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AIEditorGuideProps {
  onGetStarted?: () => void;
}

export const AIEditorGuide: React.FC<AIEditorGuideProps> = ({ onGetStarted }) => {
  const steps = [
    {
      icon: Settings,
      title: "Configure AI",
      description: "Set up your Gemini API key in settings",
      color: "bg-blue-500"
    },
    {
      icon: MessageSquare,
      title: "Chat with AI",
      description: "Describe your project and let AI generate content",
      color: "bg-green-500"
    },
    {
      icon: Code2,
      title: "Edit & Refine",
      description: "Fine-tune the generated markdown in the editor",
      color: "bg-purple-500"
    },
    {
      icon: Eye,
      title: "Live Preview",
      description: "See real-time changes in the preview panel",
      color: "bg-orange-500"
    },
    {
      icon: Download,
      title: "Export",
      description: "Download your polished README.md file",
      color: "bg-red-500"
    }
  ];

  const features = [
    "🤖 AI-powered content generation",
    "📱 Split-panel interface",
    "⚡ Real-time preview",
    "🎨 Monaco code editor",
    "🌓 Dark/light themes",
    "📱 Mobile responsive"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Bot className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">AI README Editor</h1>
          <Badge variant="secondary" className="ml-2">
            <Sparkles className="h-3 w-3 mr-1" />
            New
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Create professional README files with AI assistance, inspired by Bolt.new
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Quick Start Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-start gap-3"
                >
                  <div className={`p-2 rounded-full ${step.color} text-white flex-shrink-0`}>
                    <step.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center gap-2 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center"
      >
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Ready to Create?</h3>
              <p className="text-muted-foreground">
                Start building your professional README with AI assistance
              </p>
            </div>
            <Button onClick={onGetStarted} size="lg" className="gap-2">
              <Bot className="h-5 w-5" />
              Open AI Editor
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AIEditorGuide;
