# WCAG 2.2 AA Accessibility Checker

A responsive and appealing React application that helps you check websites for WCAG 2.2 AA compliance. Built with React, Bootstrap, and Bootswatch themes, this tool uses the axe-core library to scan web pages and provides prioritized, step-by-step guidance on accessibility improvements.

## Features

✨ **Responsive Design**: Built with Bootstrap and styled with the Bootswatch Flatly theme for a modern, professional look

🔍 **WCAG 2.2 AA Compliance Checking**: Scans web pages against WCAG 2.2 Level A and AA standards

📊 **Prioritized Results**: Issues are automatically sorted by severity (Critical → Serious → Moderate → Minor)

📚 **Educational Resources**: Each violation includes:
- Detailed description of the issue
- Direct links to WCAG 2.2 documentation
- Comprehensive fix guides from Deque University

📈 **Clear Metrics**: Visual summary showing violations, passed checks, incomplete tests, and non-applicable rules

## Screenshots

### Initial Page
![Initial Page](https://github.com/user-attachments/assets/781d0c02-883a-49ca-ad9f-3e092189ecd2)

### Results with Prioritized Issues
![Results Page](https://github.com/user-attachments/assets/e39103c1-0bd6-46d3-b842-574936153515)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

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

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173/`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Enter a URL**: Type the full URL of the website you want to check in the input field
2. **Click "Check Accessibility"**: The app will scan the page using axe-core
3. **Review Results**: 
   - See a summary of violations, passed checks, and other metrics
   - Issues are listed in priority order (Critical issues first)
   - Each issue includes:
     - Priority badge
     - Severity level (Critical, Serious, Moderate, Minor)
     - Number of instances found
     - Description of the problem
     - Link to WCAG 2.2 documentation
     - Link to detailed fix guide

## How It Works

The application uses the [axe-core](https://github.com/dequelabs/axe-core) accessibility testing engine to analyze web pages. When you submit a URL:

1. The app validates the URL format
2. For the current page, it scans directly using axe-core
3. For external URLs, it attempts to load them in an iframe (subject to CORS restrictions)
4. Results are processed and sorted by priority
5. Each violation is enhanced with WCAG 2.2 reference links and educational resources

### Browser Security Note

Due to browser security restrictions (CORS), scanning external URLs may not work for all websites. For best results:
- Scan the current page (the checker itself)
- Scan pages from the same domain
- For comprehensive external URL scanning, consider using browser extensions or a backend proxy

## Technologies Used

- **React 19**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Bootstrap 5**: Responsive CSS framework
- **Bootswatch**: Beautiful Bootstrap themes (using Flatly theme)
- **react-bootstrap**: React components for Bootstrap
- **axe-core**: Industry-standard accessibility testing engine
- **ESLint**: Code quality and consistency

## Project Structure

```
a11y-wcag2.2-checker/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Custom styles
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

The project uses ESLint with React-specific rules to maintain code quality. Run `npm run lint` to check for issues.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/Understanding/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)

## Acknowledgments

- Built with [axe-core](https://github.com/dequelabs/axe-core) by Deque Systems
- Styled with [Bootstrap](https://getbootstrap.com/) and [Bootswatch](https://bootswatch.com/)
- Powered by [React](https://react.dev/) and [Vite](https://vitejs.dev/)
