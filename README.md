# WCAG 2.2 AA Accessibility Checker

A responsive React application that scans **any website** for WCAG 2.2 Level AA compliance issues and provides prioritized, step-by-step remediation guidance with helpful resources.

## ✨ New: No More CORS Restrictions!

This tool now includes a **backend proxy server** that allows you to scan ANY URL - local or remote - without CORS limitations. Scan Google, GitHub, Wikipedia, or any website on the internet!

## Features

- 🚀 **Scan ANY URL**: Backend proxy bypasses CORS restrictions completely
- 🔍 **Automated Accessibility Scanning**: Uses Axe-core library to detect WCAG 2.2 AA violations
- 📊 **Prioritized Results**: Issues categorized by impact level (Critical, Serious, Moderate, Minor)
- 📚 **Remediation Guidance**: Step-by-step instructions and links to helpful resources for each issue
- 🎨 **Accessible Design**: Bootstrap 5 with Bootswatch Slate theme - fully accessible dark theme
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 📥 **Export Reports**: Download complete scan results as JSON
- 🔄 **Dual Mode**: Auto-switches between proxy and direct scanning

## Technologies Used

- **React 18**: Modern UI framework
- **Vite**: Fast build tool and dev server
- **Bootstrap 5**: Responsive CSS framework
- **Bootswatch Slate**: Accessible dark theme
- **Axe-core**: Industry-leading accessibility testing engine
- **Express**: Backend proxy server
- **Puppeteer**: Headless Chrome for scanning
- **Axe-puppeteer**: Axe integration for Puppeteer

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/weestoater/a11y-wcag2.2-checker.git
cd a11y-wcag2.2-checker
```

2. Install dependencies:

```bash
npm install
```

3. Start the application (frontend + proxy server):

```bash
npm run dev
```

This starts:

- **Frontend**: http://localhost:3000
- **Proxy Server**: http://localhost:3001

4. Open your browser and navigate to `http://localhost:3000`

### Alternative Commands

```bash
# Frontend only (same-origin URLs only)
npm run client

# Proxy server only
npm run server

# Production build
npm run build
```

The optimized files will be in the `dist` folder.

To preview the production build:

```bash
npm run preview
```

## Usage

### Scanning URLs

The app supports two scanning modes:

**Proxy Mode (Recommended - Any URL)**

- Automatically enabled when proxy server is running
- Scan ANY website: Google, GitHub, Wikipedia, etc.
- No CORS restrictions
- Look for green "Proxy Server Active" banner

**Direct Mode (Same-Origin Only)**

- Used when proxy is unavailable
- Scan local URLs: `http://localhost:3000/sample-page.html`
- Faster for local development
- Look for yellow "Proxy Unavailable" banner

### Step by Step

1. **Enter a URL**: Type any URL you want to scan

   - With proxy: `https://www.example.com` ✅
   - Without proxy: `http://localhost:3000/sample-page.html` ✅

2. **Click Scan**: The app will analyze the page for WCAG 2.2 Level AA compliance issues

3. **Review Results**:

   - View summary statistics showing total issues by impact level
   - Filter issues by impact level (Critical, Serious, Moderate, Minor)
   - Sort by priority or number of instances

4. **Fix Issues**:

   - Issues are displayed in priority order
   - Each violation includes:
     - Clear description of the problem
     - Step-by-step remediation guidance
     - Links to authoritative resources (WebAIM, W3C, Deque University)
     - Affected HTML elements and specific failure details

5. **Export Report**: Download the complete scan results as a JSON file for documentation

## WCAG Priority Levels

Issues are categorized by impact:

- **Critical** 🔴: Blocks access for users with disabilities - fix immediately
- **Serious** 🟠: Severely impacts accessibility - fix as soon as possible
- **Moderate** 🔵: Creates significant barriers - address in near term
- **Minor** ⚪: Small improvements to accessibility - fix when possible

## Common Issues Detected

The app detects various accessibility violations including:

- Color contrast issues
- Missing alternative text for images
- Form inputs without labels
- Incorrect heading hierarchy
- Links and buttons without accessible names
- Missing language declarations
- And many more WCAG 2.2 criteria

## CORS Limitations

Due to browser security restrictions (CORS), the scanner may not be able to directly access all websites. For demonstration purposes, sample results are shown when CORS blocks access.

For production use, you would need to:

- Implement a backend proxy server to fetch and scan URLs
- Use browser extensions that bypass CORS
- Scan pages within the same domain
- Use the Axe browser extension for direct page scanning

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Axe-core Documentation](https://github.com/dequelabs/axe-core)
- [WebAIM Resources](https://webaim.org/resources/)
- [Deque University](https://dequeuniversity.com/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Powered by [Axe-core](https://www.deque.com/axe/) by Deque Systems
- Slate theme from [Bootswatch](https://bootswatch.com/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
  Check for what needs to be done to comply with WCAG 2.2 AA
