# Quick Start Guide

## Running the Application

The WCAG 2.2 AA Accessibility Checker is now running at:
**http://localhost:3000**

## How to Use

### 1. Choose a Theme (Optional)

- Use the dropdown in the top-right corner to select from 25+ Bootswatch themes
- Themes include: Flatly (default), Darkly, Cyborg, Superhero, and many more
- Your choice updates the entire app's appearance instantly

### 2. Enter a URL to Scan

- In the main input field, enter the complete URL of the website you want to test
- Must include `http://` or `https://`
- Examples:
  - `https://www.example.com`
  - `http://localhost:8080/mypage`

### 3. Click "Scan URL"

- The scanner will analyze the page for WCAG 2.2 Level AA compliance
- This may take a few seconds depending on page complexity

### 4. Review the Results

#### Summary Statistics

- See total issues found
- Breakdown by impact level:
  - **Critical** (red): Must fix immediately
  - **Serious** (orange): High priority
  - **Moderate** (blue): Medium priority
  - **Minor** (gray): Low priority

#### Filter and Sort

- **Filter by Impact**: Show only specific severity levels
- **Sort by**: Priority (recommended) or Number of Instances

#### Violation Details

Each violation card shows:

- **Issue Title and Description**: Clear explanation of the problem
- **Impact Level**: How severely it affects users
- **WCAG Tags**: Which WCAG criteria are violated
- **How to Fix**: Step-by-step remediation guidance
- **Helpful Resources**: Links to WebAIM, W3C, and Deque University
- **Affected Elements**: Expandable list showing exact HTML elements with issues

### 5. Fix the Issues

Work through the violations in priority order:

1. Start with **Critical** issues (they completely block access)
2. Move to **Serious** issues
3. Address **Moderate** issues
4. Finally tackle **Minor** issues

For each issue:

- Read the remediation guidance
- Check the helpful resource links
- Examine the affected HTML elements
- Apply the recommended fixes to your code
- Re-scan to verify fixes

### 6. Export Report (Optional)

- Click "Download Full Report (JSON)" button
- Save the complete scan results for documentation or sharing
- JSON format for easy integration with other tools

## Common CORS Issues

**Note**: Due to browser security (CORS), some external websites cannot be scanned directly from the browser.

If you see a CORS error:

- Sample demonstration results will be shown
- These represent common real-world accessibility issues
- Use them to understand the app's functionality

**Solutions for Production Use**:

1. Scan pages on your local development server
2. Implement a backend proxy to bypass CORS
3. Use the Axe DevTools browser extension for direct scanning
4. Deploy your site and scan the deployed version

## Tips for Best Results

1. **Start Local**: Test pages on your local server first
2. **Fix Critical First**: Always prioritize critical and serious issues
3. **Use Resources**: Click through to WebAIM and W3C guides for detailed help
4. **Test Iteratively**: Scan, fix, re-scan, repeat
5. **Check Multiple Pages**: Different page types may have different issues
6. **Combine with Manual Testing**: Automated tools catch ~30-50% of issues
7. **Consider User Testing**: Include people with disabilities in your testing

## Understanding WCAG 2.2 Level AA

**Level A**: Minimum level of conformance
**Level AA**: Standard level for most websites (what this tool checks)
**Level AAA**: Enhanced level (stricter requirements)

Level AA includes all Level A requirements plus additional criteria for:

- Color contrast (4.5:1 for normal text)
- Multiple ways to find pages
- Consistent navigation
- Focus visibility
- And more...

## Need Help?

- Check the README.md for detailed documentation
- Visit [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- Explore [WebAIM Resources](https://webaim.org/resources/)
- Review [Axe Rules Documentation](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)

## Keyboard Shortcuts

- `Tab`: Navigate through interactive elements
- `Enter`: Activate buttons and links
- `Escape`: Close modals and dropdowns
- Browser zoom: `Ctrl +` / `Ctrl -` to test text scaling

Happy testing! 🎉
