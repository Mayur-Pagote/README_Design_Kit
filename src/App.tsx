import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import ScrollRestoration from "./components/ScrollRestoration";
import Elements from "./pages/Elements";

import DragDropEditor from "./pages/DragDropEditor";
import TemplateLibraryPage from "./pages/TemplateLibraryPage";
import ComingSoon from "./pages/ComingSoon";

import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AboutUs from "./components/_components/about";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import ReadmeEditor from "./components/readme-editor/ReadmeEditor";
import MarkdownEditor from "./pages/MarkdownEditor";
import Cursortrail from "./Cursortrail";
import { HistoryProvider } from "./contexts/HistoryContext";

const queryClient = new QueryClient();

// Placeholder components for missing routes to prevent app crash
const ProjectsSection = () => <div className="p-20 text-center text-muted-foreground">Projects Section Coming Soon</div>;
const SubmitSection = () => <div className="p-20 text-center text-muted-foreground">Submit Section Coming Soon</div>;
const ReadmeGenerator = () => <div className="p-20 text-center text-muted-foreground">README Generator Coming Soon</div>;
const AIEditorIntro = () => <div className="p-20 text-center text-muted-foreground">AI Editor Intro Coming Soon</div>;


export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="system" storageKey="readme-design-kit-theme">
          <HistoryProvider>
            {!isMobile && <Cursortrail />}
            <BrowserRouter>
              <ScrollRestoration />
              <Routes>

                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/elements" element={<Layout><Elements /></Layout>} />
                <Route path="/templates" element={<Layout><TemplateLibraryPage /></Layout>} />
                <Route path="/projects" element={<Layout><ProjectsSection /></Layout>} />
                <Route path="/submit" element={<Layout><SubmitSection /></Layout>} />
                <Route path="/drag-drop" element={<Layout><DragDropEditor /></Layout>} />
                <Route path="/coming-soon" element={<Layout><ComingSoon /></Layout>} />

                <Route path="/about" element={<Layout><AboutUs /></Layout>} />
                <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
                <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
                <Route path="/readme-generator" element={<Layout><ReadmeGenerator /></Layout>} />
                <Route path="/readme-editor" element={<ReadmeEditor />} />
                <Route path="/markdown-editor" element={<Layout><MarkdownEditor /></Layout>} />
                <Route path="/ai-editor-intro" element={<Layout><AIEditorIntro /></Layout>} />
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </BrowserRouter>
            <Toaster richColors />
          </HistoryProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};