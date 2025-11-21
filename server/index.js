import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";
import { AxePuppeteer } from "axe-puppeteer";

const app = express();
const PORT = 3001;

// Enable CORS for the frontend
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Proxy server is running" });
});

// Scan endpoint
app.post("/api/scan", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // Validate URL
  try {
    new URL(url);
  } catch (error) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  let browser = null;

  try {
    console.log(`Starting scan for: ${url}`);

    // Launch browser
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-web-security",
      ],
    });

    const page = await browser.newPage();

    // Set viewport size
    await page.setViewport({ width: 1024, height: 768 });

    // Set timeout
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait a bit for any dynamic content
    await page.waitForTimeout(1500);

    console.log(`Page loaded, running Axe scan...`);

    // Run Axe scan with WCAG 2.2 AA tags
    const results = await new AxePuppeteer(page)
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    console.log(
      `Scan complete. Found ${results.violations.length} violation types`
    );

    // Close browser
    await browser.close();
    browser = null;

    // Return results
    res.json({
      url,
      timestamp: new Date().toISOString(),
      violations: results.violations,
      passes: results.passes,
      incomplete: results.incomplete,
      inapplicable: results.inapplicable,
      testEngine: results.testEngine,
      testRunner: results.testRunner,
      testEnvironment: results.testEnvironment,
    });
  } catch (error) {
    console.error("Scan error:", error);

    // Clean up browser if it's still running
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error("Error closing browser:", closeError);
      }
    }

    // Determine error type and provide helpful message
    let errorMessage = "Failed to scan URL";
    let statusCode = 500;

    if (error.name === "TimeoutError") {
      errorMessage = "Page took too long to load (timeout after 30 seconds)";
      statusCode = 408;
    } else if (error.message.includes("net::ERR")) {
      errorMessage = `Cannot reach URL: ${error.message}`;
      statusCode = 502;
    } else if (error.message.includes("Navigation failed")) {
      errorMessage = "Navigation failed - URL may not exist or is unreachable";
      statusCode = 404;
    }

    res.status(statusCode).json({
      error: errorMessage,
      details: error.message,
      url,
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Accessibility Scanner Proxy Server`);
  console.log(`📡 Running on http://localhost:${PORT}`);
  console.log(`✨ Ready to scan URLs without CORS restrictions\n`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("\nSIGINT signal received: closing HTTP server");
  process.exit(0);
});
