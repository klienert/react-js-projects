import React, { useState, useMemo, useEffect } from "react";
import './table.css';

const ExpandableTable = ({cols, data, getPlanNames }) => {

    // useEffect(() => {
    //     console.log('cols? ', cols);
    //     console.log('table data? ', data);
    // },[]);

    const [expandedRows, setExpandedRows] = useState(new Set());

    const toggleRow = (id) => {
        setExpandedRows(prev => {
            const copy = new Set(prev);
            if (copy.has(id)) copy.delete(id);
            else copy.add(id);
            return copy;
        })
    };

    const statusDisplay = (status) => {
        if(!status) return '--';
        if (status.state === 'completed') {
            return `Completed - ${status.dateCompleted} (${status.scorePercent}%)`;
        }
        if (status.state === 'in-progress') {
            return `In progress - ${status.progressPercent}%`;
        }
        return 'Not Started';
    }

    return (
        <div className="enrollment-table-wrapper">
            <div className="table-container">
                <table className="enrollment-table">
                    <thead className="table-header">
                        <tr>
                            <th className="header-cell header-cell--expand">&nbsp;</th>
                            {cols.map(col => (
                                <th key={col.key} className="header-cell">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {data.map(row => {
                            const isExpanded = expandedRows.has(row.id);
                            return (
                                <React.Fragment key={row.id}>
                                    <tr className="table-row">
                                        <td className="table-cell table-cell--expand">
                                            <button
                                                onClick={() => toggleRow(row.id)}
                                                className="expand-button"
                                                title={isExpanded ? "Collapse" : "Expand"}
                                                aria-expanded={isExpanded}
                                            >
                                                {isExpanded ? '-' : '+'}
                                            </button>
                                        </td>
                                        {cols.map(col => (
                                            <td key={col.key} className="table-cell">
                                                {col.value ? col.value(row) : (row[col.key] ?? "--")}
                                            </td>
                                        ))}
                                    </tr>

                                    <tr className="detail-row">
                                        <td colSpan={cols.length + 1} className="detail-cell">
                                            <div className={`detail-content ${isExpanded ? 'detail-content--expanded' : ''}`}>
                                                <div className="detail-grid">
                                                    <div className="detail-section">
                                                        <div className="detail-label">Plan</div>
                                                        <div className="detail-value">{getPlanNames(row.planId)}</div>
                                                    </div>

                                                    <div className="detail-section">
                                                        <div className="detail-label">Overall status</div>
                                                        <div className="detail-value">{statusDisplay(row.status)}</div>
                                                    </div>
                                                </div>

                                                <div className="courses-section">
                                                    <div className="detail-label">Courses</div>
                                                    <ul className="courses-list">
                                                        {row.enrolledCourses.map((c, idx) => (
                                                            <li key={idx} className="course-item">
                                                                <div className="course-header">
                                                                    <div className="course-title">{c.title}</div>
                                                                    <div className="course-meta">
                                                                        {c.state === "completed" ? `${c.scorePercent}% • ${c.dateCompleted}` :
                                                                         c.state === "in-progress" ? `${c.progressPercent}%` :
                                                                         "Not started"}
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="progress-bar-container">
                                                                    <div 
                                                                        className="progress-bar"
                                                                        style={{
                                                                            width: `${c.state === "completed" ? 100 : (c.progressPercent ?? 0)}%`
                                                                        }}
                                                                    />
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ExpandableTable;