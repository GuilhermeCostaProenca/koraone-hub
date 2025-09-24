import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from './components/ErrorBoundary';

// Enable MSW in development (non-blocking)
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  try {
    const { worker } = await import('./mocks/browser');
    await worker.start({ 
      onUnhandledRequest: 'bypass',
      quiet: true 
    });
    console.log('🔧 MSW enabled');
  } catch (error) {
    console.warn('⚠️ MSW failed to start:', error);
  }
}

// Start app immediately, MSW loads in parallel
createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// Initialize MSW in background
enableMocking();
