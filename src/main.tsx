import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from './components/ErrorBoundary';

// Enable MSW in development (blocking - wait for it to start)
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
    console.log('🔧 MSW enabled and ready');
  } catch (error) {
    console.warn('⚠️ MSW failed to start:', error);
  }
}

// Initialize MSW first, then start app
async function startApp() {
  await enableMocking();
  
  createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

startApp();
