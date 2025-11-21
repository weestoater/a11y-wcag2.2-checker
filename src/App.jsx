import { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert, Card, Badge, Spinner, ProgressBar } from 'react-bootstrap'
import axe from 'axe-core'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  // Priority mapping for issues
  const getPriority = (impact) => {
    const priorityMap = {
      critical: 1,
      serious: 2,
      moderate: 3,
      minor: 4
    }
    return priorityMap[impact] || 5
  }

  // Get badge variant based on impact
  const getBadgeVariant = (impact) => {
    const variantMap = {
      critical: 'danger',
      serious: 'warning',
      moderate: 'info',
      minor: 'secondary'
    }
    return variantMap[impact] || 'light'
  }

  // WCAG 2.2 level mapping and resources
  const wcagResources = {
    'aria-required-attr': {
      url: 'https://www.w3.org/WAI/WCAG22/Understanding/name-role-value',
      wcag: '4.1.2 Name, Role, Value'
    },
    'color-contrast': {
      url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum',
      wcag: '1.4.3 Contrast (Minimum)'
    },
    'image-alt': {
      url: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content',
      wcag: '1.1.1 Non-text Content'
    },
    'label': {
      url: 'https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions',
      wcag: '3.3.2 Labels or Instructions'
    },
    'link-name': {
      url: 'https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context',
      wcag: '2.4.4 Link Purpose (In Context)'
    },
    'button-name': {
      url: 'https://www.w3.org/WAI/WCAG22/Understanding/name-role-value',
      wcag: '4.1.2 Name, Role, Value'
    }
  }

  const getWCAGInfo = (ruleId) => {
    return wcagResources[ruleId] || {
      url: 'https://www.w3.org/WAI/WCAG22/quickref/',
      wcag: 'WCAG 2.2 Quick Reference'
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResults(null)

    // Validate URL
    try {
      new URL(url)
    } catch {
      setError('Please enter a valid URL')
      return
    }

    setLoading(true)

    try {
      // Check if scanning current page
      const currentPageUrl = window.location.href
      const isCurrentPage = url === currentPageUrl || url === currentPageUrl.replace(/\/$/, '')
      
      let axeResults
      
      if (isCurrentPage) {
        // Scan current page directly
        axeResults = await axe.run(document, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'wcag22aa']
          }
        })
      } else {
        // For external URLs, we need to use an iframe approach
        // Note: This will only work for URLs that allow iframe embedding
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = url
        document.body.appendChild(iframe)

        // Wait for iframe to load
        await new Promise((resolve, reject) => {
          iframe.onload = resolve
          iframe.onerror = () => reject(new Error('Failed to load URL'))
          setTimeout(() => reject(new Error('Timeout loading URL')), 10000)
        })

        // Run axe on the iframe content
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
        axeResults = await axe.run(iframeDoc, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'wcag22aa']
          }
        })

        // Remove iframe
        document.body.removeChild(iframe)
      }

      // Process results
      const violations = axeResults.violations.map(violation => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        help: violation.help,
        helpUrl: violation.helpUrl,
        nodes: violation.nodes.length,
        priority: getPriority(violation.impact),
        wcagInfo: getWCAGInfo(violation.id)
      }))

      // Sort by priority
      violations.sort((a, b) => a.priority - b.priority)

      setResults({
        violations,
        passes: axeResults.passes.length,
        incomplete: axeResults.incomplete.length,
        inapplicable: axeResults.inapplicable.length,
        url: url,
        timestamp: new Date().toISOString()
      })

    } catch (err) {
      setError(`Unable to scan URL: ${err.message}. Note: Due to browser security restrictions, some URLs cannot be scanned directly. Try scanning this page itself or a URL from the same domain, or use the browser extension version.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center mb-3">
            <i className="bi bi-universal-access-circle"></i> WCAG 2.2 AA Accessibility Checker
          </h1>
          <p className="text-center text-muted">
            Check your website for accessibility compliance and get prioritized guidance on improvements
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Website URL</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <Form.Text className="text-muted">
                    Enter the full URL of the website you want to check for WCAG 2.2 AA compliance. 
                    Try scanning this page: <code>{window.location.href}</code>
                  </Form.Text>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="w-100"
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Scanning...
                    </>
                  ) : (
                    'Check Accessibility'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col md={{ span: 8, offset: 2 }}>
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      {results && (
        <>
          <Row className="mb-4">
            <Col md={{ span: 8, offset: 2 }}>
              <Card className="bg-light">
                <Card.Body>
                  <h5>Scan Summary</h5>
                  <p className="mb-2"><strong>URL:</strong> {results.url}</p>
                  <p className="mb-2"><strong>Scanned:</strong> {new Date(results.timestamp).toLocaleString()}</p>
                  <Row className="mt-3">
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <h4 className="text-danger">{results.violations.length}</h4>
                        <small>Violations</small>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <h4 className="text-success">{results.passes}</h4>
                        <small>Passed</small>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <h4 className="text-warning">{results.incomplete}</h4>
                        <small>Incomplete</small>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <h4 className="text-muted">{results.inapplicable}</h4>
                        <small>Not Applicable</small>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {results.violations.length > 0 && (
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <h3 className="mb-3">Issues to Address (Priority Order)</h3>
                <p className="text-muted mb-4">
                  Fix these issues in order of priority to achieve WCAG 2.2 AA compliance
                </p>

                {results.violations.map((violation, index) => (
                  <Card key={violation.id} className="mb-3">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <div>
                        <Badge bg="secondary" className="me-2">
                          Priority {violation.priority}
                        </Badge>
                        <Badge bg={getBadgeVariant(violation.impact)}>
                          {violation.impact}
                        </Badge>
                        <span className="ms-2 fw-bold">
                          {index + 1}. {violation.help}
                        </span>
                      </div>
                      <Badge bg="info">{violation.nodes} instance{violation.nodes !== 1 ? 's' : ''}</Badge>
                    </Card.Header>
                    <Card.Body>
                      <p className="mb-2">{violation.description}</p>
                      
                      <div className="mt-3">
                        <strong>WCAG 2.2 Reference:</strong>{' '}
                        <a
                          href={violation.wcagInfo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="me-3"
                        >
                          {violation.wcagInfo.wcag} <i className="bi bi-box-arrow-up-right"></i>
                        </a>
                      </div>

                      <div className="mt-2">
                        <strong>Detailed Help:</strong>{' '}
                        <a
                          href={violation.helpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Learn how to fix this issue <i className="bi bi-box-arrow-up-right"></i>
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          )}

          {results.violations.length === 0 && (
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <Alert variant="success">
                  <Alert.Heading>Great Job! 🎉</Alert.Heading>
                  <p>
                    No WCAG 2.2 AA violations were detected on this page. Your website appears to meet the accessibility standards!
                  </p>
                </Alert>
              </Col>
            </Row>
          )}
        </>
      )}

      <Row className="mt-5">
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="bg-light">
            <Card.Body>
              <h5>About WCAG 2.2 AA</h5>
              <p className="mb-2">
                The Web Content Accessibility Guidelines (WCAG) 2.2 are an international standard for web accessibility.
                Level AA is the commonly recommended conformance level for most websites.
              </p>
              <div className="mt-3">
                <a
                  href="https://www.w3.org/WAI/WCAG22/quickref/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm me-2"
                >
                  WCAG 2.2 Quick Reference
                </a>
                <a
                  href="https://www.w3.org/WAI/WCAG22/Understanding/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >
                  Understanding WCAG 2.2
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default App
