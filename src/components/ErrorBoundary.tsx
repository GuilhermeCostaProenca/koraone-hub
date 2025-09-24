import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md glass-effect">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              
              <div>
                <h1 className="text-2xl font-bold mb-2">Oops! Algo deu errado</h1>
                <p className="text-muted-foreground text-sm">
                  Ocorreu um erro inesperado. Clique em recarregar para tentar novamente.
                </p>
              </div>
              
              <Button 
                onClick={this.handleReload}
                className="w-full bg-gradient-primary"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Recarregar
              </Button>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                  <summary className="cursor-pointer">Detalhes do erro</summary>
                  <pre className="mt-2 whitespace-pre-wrap">
                    {this.state.error.message}
                    {'\n'}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}