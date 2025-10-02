import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewIdea from "./pages/NewIdea";
import Ideas from "./pages/Ideas";
import MapView from "./pages/MapView";
import Trail from "./pages/Trail";
import Insights from "./pages/Insights";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Assistant from "./pages/Assistant";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/idea/new" element={<NewIdea />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/trail" element={<Trail />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
