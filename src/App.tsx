import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrackerPage from "./pages/TrackerPage";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import PetitionPage from "./pages/PetitionPage";
import SignaturesPage from "./pages/SignaturesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/petition" element={<PetitionPage />} />
          <Route path="/signatures" element={<SignaturesPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
