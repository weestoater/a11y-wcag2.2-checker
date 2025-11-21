import React, { useState } from "react";

const ViolationCard = ({ violation, index, impactColor }) => {
  const [expanded, setExpanded] = useState(false);

  const getPriorityClass = (impact) => {
    const classes = {
      critical: "priority-critical",
      serious: "priority-serious",
      moderate: "priority-moderate",
      minor: "priority-minor",
    };
    return classes[impact] || "priority-minor";
  };

  const getWCAGInfo = (tags) => {
    const wcagTags = tags.filter((tag) => tag.startsWith("wcag"));
    return wcagTags.map((tag) => {
      const formatted = tag
        .replace("wcag", "WCAG ")
        .replace("2a", "2.0 Level A")
        .replace("2aa", "2.0 Level AA")
        .replace("21a", "2.1 Level A")
        .replace("21aa", "2.1 Level AA")
        .replace("22aa", "2.2 Level AA");
      return formatted;
    });
  };

  const getRemediationResources = (violationId) => {
    const resources = {
      "color-contrast": [
        {
          title: "WebAIM Color Contrast Checker",
          url: "https://webaim.org/resources/contrastchecker/",
        },
        { title: "Contrast Ratio Tool", url: "https://contrast-ratio.com/" },
        {
          title: "WCAG 2.2 Understanding SC 1.4.3",
          url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum",
        },
      ],
      "image-alt": [
        {
          title: "WebAIM Alternative Text Guide",
          url: "https://webaim.org/techniques/alttext/",
        },
        {
          title: "W3C Images Tutorial",
          url: "https://www.w3.org/WAI/tutorials/images/",
        },
        {
          title: "WCAG 2.2 Understanding SC 1.1.1",
          url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content",
        },
      ],
      label: [
        {
          title: "WebAIM Creating Accessible Forms",
          url: "https://webaim.org/techniques/forms/",
        },
        {
          title: "W3C Form Labels Tutorial",
          url: "https://www.w3.org/WAI/tutorials/forms/labels/",
        },
        {
          title: "WCAG 2.2 Understanding SC 4.1.2",
          url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
        },
      ],
      "heading-order": [
        {
          title: "WebAIM Headings Guide",
          url: "https://webaim.org/techniques/semanticstructure/",
        },
        {
          title: "W3C Headings Tutorial",
          url: "https://www.w3.org/WAI/tutorials/page-structure/headings/",
        },
        {
          title: "WCAG 2.2 Understanding SC 1.3.1",
          url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
        },
      ],
      "link-name": [
        {
          title: "WebAIM Links Guide",
          url: "https://webaim.org/techniques/hypertext/",
        },
        {
          title: "W3C Link Purpose Tutorial",
          url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context",
        },
        {
          title: "WCAG 2.2 Understanding SC 2.4.4",
          url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context",
        },
      ],
      "button-name": [
        {
          title: "WebAIM Buttons Guide",
          url: "https://webaim.org/techniques/forms/controls",
        },
        {
          title: "W3C Button Examples",
          url: "https://www.w3.org/WAI/ARIA/apg/patterns/button/",
        },
        {
          title: "WCAG 2.2 Understanding SC 4.1.2",
          url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
        },
      ],
      "html-has-lang": [
        {
          title: "WebAIM Language Guide",
          url: "https://webaim.org/techniques/language/",
        },
        {
          title: "W3C Language Tutorial",
          url: "https://www.w3.org/International/questions/qa-html-language-declarations",
        },
        {
          title: "WCAG 2.2 Understanding SC 3.1.1",
          url: "https://www.w3.org/WAI/WCAG22/Understanding/language-of-page",
        },
      ],
    };

    return (
      resources[violationId] || [
        { title: "Deque University Rule Reference", url: violation.helpUrl },
        {
          title: "WCAG 2.2 Guidelines",
          url: "https://www.w3.org/WAI/WCAG22/quickref/",
        },
        { title: "WebAIM Resources", url: "https://webaim.org/resources/" },
      ]
    );
  };

  const wcagInfo = getWCAGInfo(violation.tags);
  const resources = getRemediationResources(violation.id);

  return (
    <div className="card violation-card shadow-sm mb-3 position-relative">
      <div
        className={`priority-indicator ${getPriorityClass(violation.impact)}`}
      ></div>
      <div className="card-body ps-4">
        <div className="row align-items-start">
          <div className="col-lg-8">
            <div className="d-flex align-items-start gap-3 mb-2">
              <span className="badge bg-dark">#{index + 1}</span>
              <div className="flex-grow-1">
                <h5 className="card-title mb-2">{violation.help}</h5>
                <p className="text-muted mb-2">{violation.description}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 text-lg-end">
            <span className={`badge bg-${impactColor} impact-badge me-2`}>
              {violation.impact.toUpperCase()}
            </span>
            <span className="badge bg-secondary impact-badge">
              {violation.nodes.length}{" "}
              {violation.nodes.length === 1 ? "instance" : "instances"}
            </span>
            {wcagInfo.length > 0 && (
              <div className="mt-2">
                {wcagInfo.map((info, i) => (
                  <span
                    key={i}
                    className="badge bg-info impact-badge me-1 mb-1"
                  >
                    {info}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Remediation Guide */}
        <div className="mt-3 p-3 bg-light rounded">
          <h6 className="fw-bold mb-2">
            <i className="bi bi-tools me-2"></i>
            How to Fix:
          </h6>
          <p className="mb-2">
            {getRemediationGuidance(violation.id, violation.impact)}
          </p>

          <div className="mt-3">
            <h6 className="fw-bold mb-2">
              <i className="bi bi-book me-2"></i>
              Helpful Resources:
            </h6>
            <ul className="list-unstyled mb-0">
              {resources.map((resource, i) => (
                <li key={i} className="mb-1">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="help-link text-primary"
                  >
                    <i className="bi bi-arrow-up-right-square me-1"></i>
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Affected Elements */}
        <div className="mt-3">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            <i className={`bi bi-chevron-${expanded ? "up" : "down"} me-2`}></i>
            {expanded ? "Hide" : "Show"} Affected Elements (
            {violation.nodes.length})
          </button>
        </div>

        {expanded && (
          <div className="mt-3 node-list">
            <div className="accordion" id={`accordion-${violation.id}`}>
              {violation.nodes.map((node, nodeIndex) => (
                <div key={nodeIndex} className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${violation.id}-${nodeIndex}`}
                      aria-expanded="false"
                    >
                      Element {nodeIndex + 1}
                    </button>
                  </h2>
                  <div
                    id={`collapse-${violation.id}-${nodeIndex}`}
                    className="accordion-collapse collapse"
                    data-bs-parent={`#accordion-${violation.id}`}
                  >
                    <div className="accordion-body">
                      <h6 className="fw-bold">HTML:</h6>
                      <div className="code-snippet mb-3">{node.html}</div>

                      <h6 className="fw-bold">Issue:</h6>
                      <p className="text-muted small">{node.failureSummary}</p>

                      {node.target && (
                        <>
                          <h6 className="fw-bold">Selector:</h6>
                          <code className="text-primary">
                            {node.target.join(", ")}
                          </code>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getRemediationGuidance = (violationId, impact) => {
  const guidance = {
    "color-contrast":
      "Ensure text has a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text against its background. Use color contrast checking tools and adjust foreground or background colors accordingly.",
    "image-alt":
      'Add descriptive alt text to all images using the alt attribute. For decorative images, use alt="" or role="presentation". Alt text should convey the purpose and content of the image.',
    label:
      'Associate form inputs with labels using the <label> element with a "for" attribute matching the input\'s id, or wrap the input inside the label. This helps screen reader users understand what information to enter.',
    "heading-order":
      "Use heading levels sequentially (h1, h2, h3) without skipping levels. Start with h1 for the main heading, then h2 for subsections, h3 for sub-subsections, etc.",
    "link-name":
      'Ensure all links have descriptive text that makes sense out of context. Avoid generic phrases like "click here" or "read more". Use aria-label or aria-labelledby if the link contains only an icon.',
    "button-name":
      "Provide accessible text for buttons using visible text content, aria-label, or aria-labelledby attributes. Ensure icon-only buttons have appropriate labels for screen readers.",
    "html-has-lang":
      'Add a lang attribute to the <html> element specifying the primary language of the page (e.g., <html lang="en">). This helps screen readers use the correct pronunciation.',
  };

  return (
    guidance[violationId] ||
    "Review the issue details and consult the provided resources for specific remediation steps. Follow WCAG 2.2 guidelines to ensure accessibility compliance."
  );
};

export default ViolationCard;
