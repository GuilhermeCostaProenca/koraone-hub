import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from './components/ErrorBoundary';

async function enableMocking() {
  if (typeof window === 'undefined') {
    return;
  }
  
  console.log('🔧 [MAIN] Starting MSW...');
  const { worker } = await import('./mocks/browser');
  
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

console.log('🚀 [MAIN] Starting application...');

enableMocking().then(() => {
  console.log('✅ [MAIN] MSW started, rendering React...');
  const root = document.getElementById("root");
  console.log('📦 [MAIN] Root element:', root);
  
  createRoot(root!).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  
  console.log('🎨 [MAIN] React rendered!');
});
