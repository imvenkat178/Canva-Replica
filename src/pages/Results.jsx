import React, { useState } from 'react';

function Results({ scanResults }) {
  const [typeFilter, setTypeFilter] = useState('All'); // Filter for OWASP/WCAG
  const [severityFilter, setSeverityFilter] = useState('All'); // Filter for severity

  const filteredResults = scanResults.filter((issue) => {
    // Type filter (OWASP/WCAG)
    const matchesType =
      typeFilter === 'All' ||
      (typeFilter === 'OWASP' && issue.issue.toLowerCase().includes('sql injection')) ||
      (typeFilter === 'WCAG' && issue.issue.toLowerCase().includes('alt attribute'));

    // Severity filter (Minor/Major/Critical)
    const matchesSeverity =
      severityFilter === 'All' ||
      (severityFilter === 'Minor' && issue.severity.toLowerCase() === 'low') ||
      (severityFilter === 'Major' && issue.severity.toLowerCase() === 'medium') ||
      (severityFilter === 'Critical' && issue.severity.toLowerCase() === 'high');

    return matchesType && matchesSeverity;
  });

  return (
    <div className="results-page-container">
      {/* Left Sidebar */}
      <aside className="sidebar right-sidebar">
        <h2>Filter</h2>
        <div className="filter-section">
          {['All', 'OWASP', 'WCAG'].map((f) => (
            <button
              key={f}
              className={`filter-button ${typeFilter === f ? 'active' : ''}`}
              onClick={() => setTypeFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="results-page">
        <h2>Scan Results</h2>
        {/* Horizontal Severity Filter */}
        <div className="severity-filter">
          <h3>Severity</h3>
          {['All', 'Minor', 'Major', 'Critical'].map((s) => (
            <button
              key={s}
              className={`severity-button ${severityFilter === s ? 'active' : ''}`}
              onClick={() => setSeverityFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Results Table */}
        {filteredResults.length > 0 ? (
          <table className="results-table">
            <thead>
              <tr>
                <th>Issue</th>
                <th>Severity</th>
                <th>Suggestion</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((issue, index) => (
                <tr key={index}>
                  <td>{issue.issue}</td>
                  <td className={`severity-${issue.severity.toLowerCase()}`}>
                    {issue.severity}
                  </td>
                  <td>{issue.suggestion}</td>
                  <td>{issue.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No issues found for this filter.</p>
        )}
      </div>
    </div>
  );
}

export default Results;