import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TV from "./pages/TV";
import Library from "./pages/Library";
import Community from "./pages/Community";
import Characters from "./pages/Characters";
import Sets from "./pages/Sets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tv" element={<TV />} />
          <Route path="/library" element={<Library />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/general" element={<Community />} />
          <Route path="/community/announcements" element={<Community />} />
          <Route path="/community/rules" element={<Community />} />
          <Route path="/community/create" element={<Community />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/sets" element={<Sets />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
