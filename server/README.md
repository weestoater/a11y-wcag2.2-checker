# Proxy Server for CORS-Free Scanning

This backend proxy server allows the WCAG 2.2 AA Checker to scan ANY URL without CORS restrictions.

## How It Works

1. **Frontend** sends URL to proxy server at `http://localhost:3001/api/scan`
2. **Proxy server** uses Puppeteer (headless Chrome) to:
   - Navigate to the URL
   - Wait for page to fully load
   - Run Axe-core accessibility scan
   - Return results to frontend
3. **Frontend** displays results

## Features

- ✅ Scan any URL (local or remote)
- ✅ No CORS restrictions
- ✅ Full JavaScript execution (Puppeteer)
- ✅ Waits for dynamic content
- ✅ Same Axe-core engine as Deque Axe DevTools
- ✅ Automatic fallback to direct scan if proxy unavailable

## API Endpoints

### Health Check

```
GET /api/health
```

Returns server status

### Scan URL

```
POST /api/scan
Content-Type: application/json

{
  "url": "https://example.com"
}
```

**Success Response:**

```json
{
  "url": "https://example.com",
  "timestamp": "2025-11-21T...",
  "violations": [...],
  "passes": [...],
  "incomplete": [...],
  "inapplicable": [...],
  "testEngine": { "name": "axe-core", "version": "4.8.3" }
}
```

**Error Response:**

```json
{
  "error": "Error message",
  "details": "Detailed error info",
  "url": "https://example.com"
}
```

## Running the Server

### Development (with frontend)

```bash
npm run dev
```

This starts both the proxy server (port 3001) and frontend (port 3000)

### Server only

```bash
npm run server
```

### Client only

```bash
npm run client
```

## Configuration

- **Port**: 3001 (proxy server)
- **Timeout**: 30 seconds per scan
- **Viewport**: 1024x768
- **Wait Strategy**: networkidle2 + 1.5s delay

## Error Handling

The server provides specific error messages for:

- Timeout errors (408)
- Network errors (502)
- Navigation failures (404)
- Invalid URLs (400)
- General errors (500)

## Security Note

This proxy server is designed for **local development only**. Do not expose it to the internet without proper security measures:

- Add rate limiting
- Implement authentication
- Validate/sanitize URLs
- Add request logging
- Set up proper CORS policies

## Dependencies

- **express**: Web server framework
- **cors**: Enable CORS
- **puppeteer**: Headless Chrome automation
- **axe-puppeteer**: Axe integration for Puppeteer
- **concurrently**: Run multiple commands

## Troubleshooting

**Server won't start:**

- Check if port 3001 is available
- Ensure all dependencies are installed

**Scans timeout:**

- Increase timeout in `server/index.js`
- Check internet connection
- Verify URL is accessible

**Puppeteer errors:**

- Ensure Chrome/Chromium is installed
- On Linux, install required dependencies
