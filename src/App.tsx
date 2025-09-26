import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/auth";
import { NavbarProvider } from "@/contexts/NavbarContext";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewIdea from "./pages/NewIdea";
import Ideas from "./pages/Ideas";
import MapView from "./pages/MapView";
import Trail from "./pages/Trail";
import Insights from "./pages/Insights";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Assistant from "./pages/Assistant";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <NavbarProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/idea/new"
                  element={
                    <ProtectedRoute>
                      <NewIdea />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ideas"
                  element={
                    <ProtectedRoute>
                      <Ideas />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/map"
                  element={
                    <ProtectedRoute>
                      <MapView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/trail"
                  element={
                    <ProtectedRoute>
                      <Trail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/insights"
                  element={
                    <ProtectedRoute>
                      <Insights />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <ProtectedRoute>
                      <Projects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects/:id"
                  element={
                    <ProtectedRoute>
                      <ProjectDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/assistant"
                  element={
                    <ProtectedRoute>
                      <Assistant />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </NavbarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
