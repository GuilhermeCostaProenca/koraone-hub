import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavbarProvider } from "@/contexts/NavbarContext";
import { Navbar } from "@/components/ui/navbar";
import { AuthProvider, useAuth } from "@/auth";
import Dashboard from "./pages/Dashboard";
import NewIdea from "./pages/NewIdea";
import Ideas from "./pages/Ideas";
import MapView from "./pages/MapView";
import Trail from "./pages/Trail";
import Insights from "./pages/Insights";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Assistant from "./pages/Assistant";
import Login from "./pages/Login";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <NavbarProvider>
              <Navbar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/idea/new" element={<ProtectedRoute><NewIdea /></ProtectedRoute>} />
                <Route path="/ideas" element={<ProtectedRoute><Ideas /></ProtectedRoute>} />
                <Route path="/ideas/new" element={<ProtectedRoute><NewIdea /></ProtectedRoute>} />
                <Route path="/map" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
                <Route path="/trail" element={<ProtectedRoute><Trail /></ProtectedRoute>} />
                <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
                <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
                <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
                <Route path="/assistant" element={<ProtectedRoute><Assistant /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </NavbarProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
