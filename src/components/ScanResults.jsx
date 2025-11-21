import React, { useState } from "react";
import ViolationCard from "./ViolationCard";

const ScanResults = ({ results }) => {
  const [filterImpact, setFilterImpact] = useState("all");
  const [sortBy, setSortBy] = useState("priority");

  // Priority mapping for sorting
  const impactPriority = {
    critical: 1,
    serious: 2,
    moderate: 3,
    minor: 4,
  };

  // Sort violations by priority
  const getSortedViolations = () => {
    let violations = [...results.violations];

    // Filter by impact
    if (filterImpact !== "all") {
      violations = violations.filter((v) => v.impact === filterImpact);
    }

    // Sort
    if (sortBy === "priority") {
      violations.sort((a, b) => {
        const priorityDiff =
          impactPriority[a.impact] - impactPriority[b.impact];
        if (priorityDiff !== 0) return priorityDiff;
        return b.nodes.length - a.nodes.length; // Secondary sort by number of instances
      });
    } else if (sortBy === "instances") {
      violations.sort((a, b) => b.nodes.length - a.nodes.length);
    }

    return violations;
  };

  const sortedViolations = getSortedViolations();
  const totalIssues = results.violations.reduce(
    (sum, v) => sum + v.nodes.length,
    0
  );

  const getImpactCounts = () => {
    const counts = { critical: 0, serious: 0, moderate: 0, minor: 0 };
    results.violations.forEach((v) => {
      counts[v.impact] = (counts[v.impact] || 0) + v.nodes.length;
    });
    return counts;
  };

  const impactCounts = getImpactCounts();

  const getImpactColor = (impact) => {
    const colors = {
      critical: "danger",
      serious: "warning",
      moderate: "info",
      minor: "secondary",
    };
    return colors[impact] || "secondary";
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="scan-results">
      {/* Summary Card */}
      <div className="card stats-card shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <h3 className="mb-2">Scan Results</h3>
              <p className="mb-1 opacity-75">
                <strong>URL:</strong> {results.url}
              </p>
              <p className="mb-1 opacity-75">
                <small>Scanned: {formatDate(results.timestamp)}</small>
              </p>
              {results.testEngine && (
                <p className="mb-0 opacity-75">
                  <small>
                    Engine: {results.testEngine.name} v
                    {results.testEngine.version}
                  </small>
                </p>
              )}
            </div>
            <div className="col-md-6 text-md-end">
              <div className="display-4 fw-bold">{totalIssues}</div>
              <div className="fs-5">Total Issues Found</div>
              <div className="mt-2">
                <span className="badge bg-light text-dark me-2">
                  {results.violations.length} violation{" "}
                  {results.violations.length === 1 ? "type" : "types"}
                </span>
                {results.passes && (
                  <span className="badge bg-success">
                    {results.passes.length} passed
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-lg-3">
          <div className="card border-danger shadow-sm">
            <div className="card-body text-center">
              <div className="display-6 text-danger fw-bold">
                {impactCounts.critical}
              </div>
              <div className="text-muted">Critical</div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card border-warning shadow-sm">
            <div className="card-body text-center">
              <div className="display-6 text-warning fw-bold">
                {impactCounts.serious}
              </div>
              <div className="text-muted">Serious</div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card border-info shadow-sm">
            <div className="card-body text-center">
              <div className="display-6 text-info fw-bold">
                {impactCounts.moderate}
              </div>
              <div className="text-muted">Moderate</div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card border-secondary shadow-sm">
            <div className="card-body text-center">
              <div className="display-6 text-secondary fw-bold">
                {impactCounts.minor}
              </div>
              <div className="text-muted">Minor</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-6">
              <label
                htmlFor="filter-impact"
                className="form-label fw-semibold mb-2"
              >
                Filter by Impact:
              </label>
              <select
                id="filter-impact"
                className="form-select"
                value={filterImpact}
                onChange={(e) => setFilterImpact(e.target.value)}
              >
                <option value="all">All Issues ({totalIssues})</option>
                <option value="critical">
                  Critical ({impactCounts.critical})
                </option>
                <option value="serious">
                  Serious ({impactCounts.serious})
                </option>
                <option value="moderate">
                  Moderate ({impactCounts.moderate})
                </option>
                <option value="minor">Minor ({impactCounts.minor})</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="sort-by" className="form-label fw-semibold mb-2">
                Sort by:
              </label>
              <select
                id="sort-by"
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="priority">Priority (Impact Level)</option>
                <option value="instances">Number of Instances</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Guide */}
      <div className="alert alert-info mb-4" role="alert">
        <h5 className="alert-heading">
          <i className="bi bi-info-circle me-2"></i>
          Remediation Priority Guide
        </h5>
        <p className="mb-2">
          Issues are prioritized based on their impact level and WCAG 2.2
          guidelines:
        </p>
        <ol className="mb-0">
          <li>
            <strong className="text-danger">Critical:</strong> Blocks access for
            users with disabilities - fix immediately
          </li>
          <li>
            <strong className="text-warning">Serious:</strong> Severely impacts
            accessibility - fix as soon as possible
          </li>
          <li>
            <strong className="text-info">Moderate:</strong> Creates significant
            barriers - address in near term
          </li>
          <li>
            <strong className="text-secondary">Minor:</strong> Small
            improvements to accessibility - fix when possible
          </li>
        </ol>
      </div>

      {/* Violations List */}
      {sortedViolations.length === 0 ? (
        <div className="alert alert-success" role="alert">
          <h5 className="alert-heading">
            <i className="bi bi-check-circle me-2"></i>
            No issues found with current filters!
          </h5>
          <p className="mb-0">
            {filterImpact === "all"
              ? "Congratulations! This page appears to meet WCAG 2.2 Level AA standards."
              : `No ${filterImpact} issues found. Try adjusting the filters.`}
          </p>
        </div>
      ) : (
        <div className="violations-list">
          <h4 className="mb-3">
            Issues to Fix ({sortedViolations.length}{" "}
            {sortedViolations.length === 1 ? "type" : "types"})
          </h4>
          {sortedViolations.map((violation, index) => (
            <ViolationCard
              key={violation.id}
              violation={violation}
              index={index}
              impactColor={getImpactColor(violation.impact)}
            />
          ))}
        </div>
      )}

      {/* Download Report Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-outline-primary btn-lg"
          onClick={() => {
            const dataStr = JSON.stringify(results, null, 2);
            const dataBlob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `accessibility-report-${new Date().getTime()}.json`;
            link.click();
            URL.revokeObjectURL(url);
          }}
        >
          <i className="bi bi-download me-2"></i>
          Download Full Report (JSON)
        </button>
      </div>
    </div>
  );
};

export default ScanResults;
