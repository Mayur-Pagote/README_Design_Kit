import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/theme-provider";
import {Toaster} from './components/ui/sonner'
const queryClient = new QueryClient();

export default function App(){
  return(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />


            {/* page not found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </ThemeProvider>
      </TooltipProvider>
      <Toaster richColors />
    </QueryClientProvider>
  )
};

