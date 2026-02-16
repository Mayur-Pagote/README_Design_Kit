import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import ScrollRestoration from "./components/ScrollRestoration";
import Elements from "./pages/Elements";

import ProjectsSection from "./components/ProjectsSection";
import SubmitSection from "./components/SubmitSection";
import DragDropEditor from "./pages/DragDropEditor";
import TemplateLibraryPage from "./pages/TemplateLibraryPage";
import ComingSoon from "./pages/ComingSoon";

import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AboutUs from "./components/_components/about";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import ReadmeGenerator from "./components/generator/Readme-generator";
import ReadmeEditor from "./components/readme-editor/ReadmeEditor";
import MarkdownEditor from "./pages/MarkdownEditor";
import AIEditorIntro from "./pages/AIEditorIntro";
import Cursortrail from "./Cursortrail";

const queryClient = new QueryClient();


const ConditionalScrollToTop = () => {
  const location = useLocation();

  if (location.pathname === '/drag-drop') {
    return null;
  }
  return <ScrollToTop />;
};

import { HistoryProvider } from "./contexts/HistoryContext";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="system" storageKey="readme-design-kit-theme">
          <HistoryProvider>
            <Cursortrail />
            <BrowserRouter>
              <ScrollRestoration />
              <ConditionalScrollToTop />
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
          </HistoryProvider>
          <Toaster richColors />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};