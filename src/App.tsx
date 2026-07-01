import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import Layout from "./components/Layout";
import ScrollRestoration from "./components/ScrollRestoration";
import ScrollToTopButton from "./components/_components/ScrollToTopButton";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { HistoryProvider } from "./contexts/HistoryContext";
import Cursortrail from "./Cursortrail";

// ========== LAZY LOAD ALL PAGES ==========
const Home = lazy(() => import("./pages/Home"));
const Elements = lazy(() => import("./pages/Elements"));
const ThemePacks = lazy(() => import("./pages/ThemePacks"));
const TemplateLibraryPage = lazy(() => import("./pages/TemplateLibraryPage"));
const DragDropEditor = lazy(() => import("./pages/DragDropEditor"));
const AboutUs = lazy(() => import("./components/_components/about"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const ReadmeGenerator = lazy(() => import("./components/generator/Readme-generator"));
const ReadmeEditor = lazy(() => import("./components/readme-editor/ReadmeEditor"));
const MarkdownEditor = lazy(() => import("./pages/MarkdownEditor"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Placeholder components for missing routes
const ProjectsSection = lazy(() => 
  Promise.resolve({
    default: () => <div className="p-20 text-center text-muted-foreground">Projects Section Coming Soon</div>
  })
);
const SubmitSection = lazy(() => 
  Promise.resolve({
    default: () => <div className="p-20 text-center text-muted-foreground">Submit Section Coming Soon</div>
  })
);
const AIEditorIntro = lazy(() => 
  Promise.resolve({
    default: () => <div className="p-20 text-center text-muted-foreground">AI Editor Intro Coming Soon</div>
  })
);

// ========== LOADING FALLBACK COMPONENT ==========
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
      <p className="mt-4 text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

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

  // ========== PRELOAD FREQUENTLY VISITED PAGES ==========
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Preload Home page after initial load
      const timer = setTimeout(() => {
        import("./pages/Home");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="system" storageKey="readme-design-kit-theme">
          <HistoryProvider>
            {!isMobile && <Cursortrail />}
            <BrowserRouter>
              <ScrollRestoration />
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Layout><Home /></Layout>} />
                  <Route path="/elements" element={<Layout><Elements /></Layout>} />
                  <Route path="/theme-packs" element={<Layout><ThemePacks /></Layout>} />
                  <Route path="/templates" element={<Layout><TemplateLibraryPage /></Layout>} />
                  <Route path="/projects" element={<Layout><ProjectsSection /></Layout>} />
                  <Route path="/submit" element={<Layout><SubmitSection /></Layout>} />
                  <Route path="/drag-drop" element={<Layout><DragDropEditor /></Layout>} />
                  <Route path="/about" element={<Layout><AboutUs /></Layout>} />
                  <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
                  <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
                  <Route path="/readme-generator" element={<Layout><ReadmeGenerator /></Layout>} />
                  <Route path="/readme-editor" element={<ReadmeEditor />} />
                  <Route path="/markdown-editor" element={<Layout><MarkdownEditor /></Layout>} />
                  <Route path="/ai-editor-intro" element={<Layout><AIEditorIntro /></Layout>} />
                  <Route path="*" element={<Layout><NotFound /></Layout>} />
                </Routes>
              </Suspense>
              <ScrollToTopButton />
            </BrowserRouter>
            <Toaster richColors />
          </HistoryProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}