import React, { useState, useEffect } from "react";
import axe from "axe-core";
import ScanResults from "./ScanResults";

const UrlScanner = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [useProxy, setUseProxy] = useState(true);
  const [proxyAvailable, setProxyAvailable] = useState(false);

  // Check if proxy server is available
  useEffect(() => {
    const checkProxy = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/health");
        if (response.ok) {
          setProxyAvailable(true);
          console.log("Proxy server is available");
        }
      } catch (error) {
        setProxyAvailable(false);
        console.log("Proxy server is not available, using direct scan mode");
      }
    };

    checkProxy();
    // Check every 30 seconds
    const interval = setInterval(checkProxy, 30000);
    return () => clearInterval(interval);
  }, []);

  const validateUrl = (inputUrl) => {
    try {
      const urlObj = new URL(inputUrl);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  const scanUrl = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!validateUrl(url)) {
      setError(
        "Please enter a valid URL (must start with http:// or https://)"
      );
      return;
    }

    setError("");
    setIsScanning(true);
    setResults(null);

    try {
      let scanResults;

      // Use proxy server if available and enabled
      if (proxyAvailable && useProxy) {
        scanResults = await scanViaProxy(url);
      } else {
        scanResults = await performDirectScan(url);
      }

      setResults(scanResults);
      setError("");
    } catch (err) {
      console.error("Scan error:", err);
      setError(err.message);
      setResults(null);
    } finally {
      setIsScanning(false);
    }
  };

  const scanViaProxy = async (targetUrl) => {
    try {
      const response = await fetch("http://localhost:3001/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: targetUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      if (err.message.includes("fetch")) {
        throw new Error(
          'Cannot connect to proxy server. Make sure the server is running with "npm run dev".'
        );
      }
      throw err;
    }
  };

  const performDirectScan = async (targetUrl) => {
    return new Promise((resolve, reject) => {
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.left = "-9999px";
      iframe.style.width = "1024px";
      iframe.style.height = "768px";
      iframe.src = targetUrl;

      const timeout = setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
        reject(new Error("Scan timeout - page took too long to load"));
      }, 15000);

      iframe.onload = async () => {
        try {
          // Try to access the iframe content
          const iframeDocument =
            iframe.contentDocument || iframe.contentWindow?.document;

          if (!iframeDocument) {
            throw new Error(
              "Cannot access page content due to CORS restrictions. Enable proxy mode to scan this URL."
            );
          }

          // Wait a bit for any dynamic content to load
          await new Promise((r) => setTimeout(r, 1000));

          // Configure axe to match the Deque Axe DevTools plugin
          const axeResults = await axe.run(iframeDocument, {
            // Run all WCAG 2 Level A and AA rules, including WCAG 2.2
            runOnly: {
              type: "tag",
              values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
            },
            // Match Deque plugin settings
            resultTypes: ["violations", "incomplete", "inapplicable", "passes"],
            // Enable all rules like the Axe plugin does
            rules: {},
          });

          clearTimeout(timeout);
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }

          resolve({
            url: targetUrl,
            timestamp: new Date().toISOString(),
            violations: axeResults.violations,
            passes: axeResults.passes,
            incomplete: axeResults.incomplete,
            inapplicable: axeResults.inapplicable,
            testEngine: {
              name: axeResults.testEngine.name,
              version: axeResults.testEngine.version,
            },
            testRunner: {
              name: axeResults.testRunner.name,
            },
            testEnvironment: {
              userAgent: axeResults.testEnvironment.userAgent,
              windowWidth: axeResults.testEnvironment.windowWidth,
              windowHeight: axeResults.testEnvironment.windowHeight,
            },
          });
        } catch (err) {
          clearTimeout(timeout);
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
          reject(err);
        }
      };

      iframe.onerror = () => {
        clearTimeout(timeout);
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
        reject(
          new Error("Failed to load URL - page may not exist or is unreachable")
        );
      };

      document.body.appendChild(iframe);
    });
  };

  return (
    <div className="url-scanner">
      {/* Proxy Status Banner */}
      {proxyAvailable ? (
        <div className="alert alert-success mb-4" role="alert">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="alert-heading mb-1">
                <i className="bi bi-check-circle-fill me-2"></i>
                Proxy Server Active
              </h6>
              <p className="mb-0 small">
                You can now scan ANY URL without CORS restrictions! The backend
                proxy server is running.
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="proxyToggle"
                checked={useProxy}
                onChange={(e) => setUseProxy(e.target.checked)}
                disabled={isScanning}
              />
              <label className="form-check-label" htmlFor="proxyToggle">
                Use Proxy
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning mb-4" role="alert">
          <h6 className="alert-heading">
            <i className="bi bi-exclamation-triangle me-2"></i>
            Proxy Server Not Available
          </h6>
          <p className="mb-2">
            The backend proxy server is not running. You can only scan
            same-origin URLs.
          </p>
          <p className="mb-0 small">
            <strong>To enable scanning of ANY URL:</strong> Make sure you
            started the app with <code>npm run dev</code> which runs both the
            client and proxy server.
          </p>
        </div>
      )}

      <div className="card shadow-sm mb-4">
        <div className="card-body p-4">
          <form onSubmit={scanUrl}>
            <div className="row g-3 align-items-end">
              <div className="col-md-9">
                <label htmlFor="url-input" className="form-label fw-semibold">
                  Enter URL to Scan
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="url-input"
                  placeholder={
                    proxyAvailable
                      ? "https://www.example.com or http://localhost:3000/sample-page.html"
                      : "http://localhost:3000/sample-page.html"
                  }
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isScanning}
                  aria-describedby="url-help"
                />
                <div id="url-help" className="form-text">
                  {proxyAvailable && useProxy
                    ? "Proxy mode: Scan any URL on the internet"
                    : "Direct mode: Scan same-origin URLs only"}
                </div>
              </div>
              <div className="col-md-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={isScanning}
                >
                  {isScanning ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-search me-2"></i>
                      Scan URL
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="alert alert-danger mt-3 mb-0" role="alert">
              <h6 className="alert-heading">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Scan Failed
              </h6>
              <p className="mb-2">{error}</p>
              {!proxyAvailable && (
                <>
                  <hr />
                  <p className="mb-0 small">
                    <strong>Tip:</strong> Start the proxy server with{" "}
                    <code>npm run dev</code> to scan any URL without
                    restrictions.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {isScanning && (
        <div className="text-center py-5">
          <div
            className="spinner-border spinner-border-lg text-primary mb-3"
            role="status"
          >
            <span className="visually-hidden">Scanning...</span>
          </div>
          <p className="text-muted">Analyzing accessibility issues...</p>
        </div>
      )}

      {results && <ScanResults results={results} />}
    </div>
  );
};

export default UrlScanner;
