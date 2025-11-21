import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UrlScanner from "./components/UrlScanner";
import "./App.css";

function App() {
  useEffect(() => {
    // Load Slate Bootswatch theme
    const themeLink = document.getElementById("theme-link");
    if (!themeLink) {
      const link = document.createElement("link");
      link.id = "theme-link";
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/bootswatch@5.3.2/dist/slate/bootstrap.min.css";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="App min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
            <i className="bi bi-check-circle me-2"></i>
            WCAG 2.2 AA Checker
          </a>
        </div>
      </nav>

      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-3">Accessibility Checker</h1>
              <p className="lead text-muted">
                Scan any URL for WCAG 2.2 Level AA compliance and get
                prioritized remediation guidance
              </p>
            </div>

            <UrlScanner />
          </div>
        </div>
      </main>

      <footer className="mt-auto py-4 bg-dark text-white-50">
        <div className="container text-center">
          <p className="mb-0">
            Powered by{" "}
            <a
              href="https://www.deque.com/axe/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              Axe-core
            </a>{" "}
            &bull; Built for WCAG 2.2 Level AA compliance
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
