import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";  // ← add this

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>        {/* ← add this */}
      <App />
    </ThemeProvider>       {/* ← add this */}
  </React.StrictMode>
);