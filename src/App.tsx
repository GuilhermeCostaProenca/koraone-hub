import { Component, ErrorInfo, ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavbarProvider } from "@/contexts/NavbarContext";
import { Navbar } from "@/components/ui/navbar";
import { AuthProvider, useAuth } from "@/lib/auth";
import Dashboard from "./pages/Dashboard";
import NewIdea from "./pages/NewIdea";
import Ideas from "./pages/Ideas";
import MapView from "./pages/MapView";
import Trail from "./pages/Trail";
import Insights from "./pages/Insights";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Assistant from "./pages/Assistant";
import Auth from "./pages/Auth";

// ETAPA 4: ErrorBoundary de emergência para capturar erros silenciosos
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🔥 [ERROR BOUNDARY] Caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          backgroundColor: '#dc2626',
          color: 'white',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{ maxWidth: '600px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
              🔥 ERRO DETECTADO
            </h1>
            <p style={{ fontSize: '18px', marginBottom: '20px' }}>
              Um erro JavaScript foi capturado:
            </p>
            <pre style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'left',
              overflow: 'auto',
              fontSize: '14px'
            }}>
              {this.state.error?.message}
              {'\n\n'}
              {this.state.error?.stack}
            </pre>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                backgroundColor: 'white',
                color: '#dc2626',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/auth" replace />;
};

const queryClient = new QueryClient();

const App = () => {
  console.log('🚀 [APP] App component rendering...');
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <NavbarProvider>
                <Navbar />
              <Routes>
                <Route path="/auth" element={<Auth />} />
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
    </ErrorBoundary>
  );
};

export default App;
