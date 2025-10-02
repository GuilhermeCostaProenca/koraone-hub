import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App.tsx';
import "./index.css";

// ETAPA 1: MSW não bloqueante - renderiza imediatamente
if (process.env.NODE_ENV === 'development') {
  import('./mocks/browser')
    .then(({ worker }) => {
      worker.start({
        onUnhandledRequest: 'bypass',
      }).catch((error) => {
        console.warn('⚠️ MSW failed to start:', error);
      });
    })
    .catch((error) => {
      console.warn('⚠️ MSW import failed:', error);
    });
}

// Renderiza imediatamente sem esperar o MSW
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
