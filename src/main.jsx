import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/auth-context.jsx";
import { MoviesProvider } from "./context/movies-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MoviesProvider>
        <App />
      </MoviesProvider>
    </AuthProvider>
  </React.StrictMode>
);
