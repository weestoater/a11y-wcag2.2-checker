# Project Structure

```
a11y-wcag2.2-checker/
├── public/
│   └── sample-page.html          # Demo page with intentional a11y issues
├── src/
│   ├── components/
│   │   ├── ScanResults.jsx       # Displays scan results with filters
│   │   ├── ThemeSelector.jsx     # Bootswatch theme dropdown
│   │   ├── UrlScanner.jsx        # URL input and scanning logic
│   │   └── ViolationCard.jsx     # Individual violation display
│   ├── App.css                    # Global styles and responsive design
│   ├── App.jsx                    # Main application component
│   └── main.jsx                   # React entry point
├── .gitignore                     # Git ignore rules
├── index.html                     # HTML template
├── LICENSE                        # MIT License
├── package.json                   # Dependencies and scripts
├── README.md                      # Full documentation
├── USAGE.md                       # Quick start guide
└── vite.config.js                 # Vite configuration

```

## Component Overview

### App.jsx

- Main application container
- Manages theme state
- Loads Bootswatch themes dynamically
- Provides layout structure (navbar, main, footer)

### ThemeSelector.jsx

- Dropdown with 25+ Bootswatch themes
- Updates theme in real-time
- Accessible form control

### UrlScanner.jsx

- URL input form with validation
- Axios for HTTP requests (when needed)
- Axe-core integration for scanning
- Error handling for CORS issues
- Sample data generator for demo purposes

### ScanResults.jsx

- Summary statistics dashboard
- Impact level breakdown
- Filter by impact (Critical, Serious, Moderate, Minor)
- Sort options (Priority, Instances)
- Download report functionality
- Remediation priority guide

### ViolationCard.jsx

- Individual violation display
- Priority indicator (color-coded)
- WCAG tags and compliance info
- Step-by-step remediation guidance
- Helpful resource links
- Expandable affected elements list
- HTML snippets and selectors

## Key Features Implemented

✅ **Responsive Design**

- Mobile-first approach with Bootstrap 5
- Breakpoints for all screen sizes
- Touch-friendly interactive elements

✅ **Accessible UI**

- Semantic HTML throughout
- ARIA labels where needed
- Keyboard navigation support
- High contrast indicators

✅ **Theme Customization**

- 25+ Bootswatch themes
- Real-time theme switching
- Persistent across scans

✅ **WCAG 2.2 Scanning**

- Axe-core integration
- Level AA compliance checks
- WCAG 2.2 specific rules

✅ **Prioritized Results**

- Impact-based sorting
- Visual priority indicators
- Instance count tracking

✅ **Remediation Support**

- Clear explanations
- Step-by-step guides
- Authoritative resource links
- Code examples

✅ **Export Functionality**

- JSON report download
- Complete scan data
- Timestamp and metadata

## Technologies & Libraries

| Technology      | Version | Purpose                 |
| --------------- | ------- | ----------------------- |
| React           | 18.2.0  | UI framework            |
| Vite            | 5.0.8   | Build tool & dev server |
| Bootstrap       | 5.3.2   | CSS framework           |
| Bootswatch      | 5.3.2   | Bootstrap themes        |
| Axe-core        | 4.8.3   | Accessibility testing   |
| Axios           | 1.6.2   | HTTP client             |
| Bootstrap Icons | 1.11.1  | Icon library            |

## Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Future Enhancements

Potential improvements for the future:

1. **Backend Proxy**: Server-side URL fetching to bypass CORS
2. **Historical Scans**: Save and compare multiple scans
3. **Batch Scanning**: Multiple URL scanning
4. **PDF Reports**: Professional report generation
5. **CI/CD Integration**: Automated testing in pipelines
6. **Custom Rules**: User-defined accessibility rules
7. **Dark Mode**: Native dark theme option
8. **Authentication**: User accounts and saved scans
9. **Real-time Monitoring**: Scheduled recurring scans
10. **API Access**: RESTful API for programmatic access

## Development Notes

- Uses ES6+ JavaScript features
- Follows React Hooks patterns
- Component-based architecture
- Responsive mobile-first CSS
- WCAG 2.2 compliant UI

## Testing the App

1. Start the dev server: `npm run dev`
2. Open http://localhost:3000
3. Try scanning http://localhost:3000/sample-page.html
4. Experiment with different themes
5. Filter and sort results
6. Expand violation cards for details
7. Click resource links to learn more
