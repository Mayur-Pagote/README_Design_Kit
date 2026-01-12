
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Elements from "./pages/Elements";
// import Hero from "./pages/Hero";
import ProjectsSection from "./components/ProjectsSection";
import SubmitSection from "./components/SubmitSection";
import DragDropEditor from "./pages/DragDropEditor";
import TemplateLibraryPage from "./pages/TemplateLibraryPage";
import ComingSoon from "./pages/ComingSoon";
import FeatureRequestsPage from "./pages/FeatureRequestsPage"; 
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AboutUs from "./components/_components/about";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import ReadmeGenerator from "./components/generator/Readme-generator";
import ReadmeEditor from "./components/readme-editor/ReadmeEditor";
import AIEditorIntro from "./pages/AIEditorIntro";
import Cursortrail from "./Cursortrail";




const queryClient = new QueryClient();

// A new component to conditionally render ScrollToTop
const ConditionalScrollToTop = () => {
  const location = useLocation();
  // Don't render on the drag-drop editor page
  if (location.pathname === '/drag-drop') {
    return null;
  }
  return <ScrollToTop />;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="system" storageKey="readme-design-kit-theme">
          <Cursortrail />
          <BrowserRouter>
            <ConditionalScrollToTop />
            <Routes>
              {/* Routes with Layout (navbar + footer) */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/elements" element={<Layout><Elements /></Layout>} />
              <Route path="/templates" element={<Layout><TemplateLibraryPage /></Layout>} />
              {/* <Route path="/showcase" element={<Layout><Hero /></Layout>} /> */}
              <Route path="/projects" element={<Layout><ProjectsSection /></Layout>} />
              <Route path="/submit" element={<Layout><SubmitSection /></Layout>} />
              <Route path="/drag-drop" element={<Layout><DragDropEditor /></Layout>} />
              <Route path="/coming-soon" element={<Layout><ComingSoon /></Layout>} />
              <Route path="/feature-requests" element={<Layout><FeatureRequestsPage /></Layout>} /> {/* ✅ Added Route */}
              <Route path="/about" element={<Layout><AboutUs /></Layout>} />
              <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
              <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
              <Route path="/readme-generator" element={<Layout><ReadmeGenerator /></Layout>} />
              <Route path="/readme-editor" element={<ReadmeEditor />} />
              <Route path="/ai-editor-intro" element={<Layout><AIEditorIntro /></Layout>} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
          <Toaster richColors />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
