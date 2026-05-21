import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Error boundary for the entire app
const rootElement = document.getElementById("root");

if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error("Failed to render app:", error);
    rootElement.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef); padding: 20px;">
        <div style="background: white; padding: 40px; border-radius: 16px; text-align: center; max-width: 400px;">
          <h1 style="color: #1f2937; margin-bottom: 16px;">Something went wrong</h1>
          <p style="color: #6b7280; margin-bottom: 24px;">Please refresh the page or try again later.</p>
          <button onclick="location.reload()" style="background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">
            Refresh Page
          </button>
        </div>
      </div>
    `;
  }
}
