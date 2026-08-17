import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  // Dynamically import the app so we can catch import-time errors (e.g., missing deps)
  import('./App')
    .then(({ App }) => {
      try {
        root.render(<App />);
      } catch (err) {
        console.error('Render error:', err);
        root.render(
          <div style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
            <h1 style={{ color: 'red' }}>App render failed — check console</h1>
            <pre>{String(err)}</pre>
          </div>
        );
      }
    })
    .catch((err) => {
      console.error('Failed to load app module:', err);
      root.render(
        <div style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
          <h1 style={{ color: 'red' }}>App failed to load</h1>
          <pre>{String(err)}</pre>
          <p>Please check the terminal for build errors.</p>
        </div>
      );
    });
}