import React, { useState, useMemo, useEffect } from "react";
import './table.css';

const ExpandableTable = ({cols, data, getPlanName }) => {

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
        <div className="w-full">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2">
                                {cols.map(col => {
                                    <th key={col.key} className="px-4 text-left text-sm font-medium text-gray-700">
                                        {col.label}
                                    </th>
                                })}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg divide-y divide-gray-200">
                        {data.map(row => {
                            const isExpanded = expandedRows.has(row.id);
                            return (
                                <React.Fragment key={row.id}>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-3 align-top">
                                            <button
                                                onClick={() => toggleRow(row.id)}
                                                className="p-1 rounded hover:bg-gray-100"
                                                title={isExpanded ? "Collapse" : "Expand"}
                                            >
                                                ?
                                            </button>
                                        </td>
                                        {cols.map(col => {
                                            <td key={col.key} className="px-4 py-3 align-top text-sm text-gray-800">
                                                {/* {col.value && console.log(col.value(row))} */}
                                                {col.value ? col.value(row) : (row[col.key] ?? "--")}
                                            </td>
                                        })}
                                    </tr>

                                    <tr id={`detail-${row.id}`} className="bg-gray-50">
                                        <td colSpan={cols.length + 1} className={`px-4 py-2 transition-all ${isExpanded ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
                                        <div className={`${isExpanded ? "block" : "hidden"} py-2`}>
                                            <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-sm font-semibold mb-2">Plan</div>
                                                <div className="text-sm">{getPlanName(row.planId)}</div>
                                            </div>

                                            <div>
                                                <div className="text-sm font-semibold mb-2">Overall status</div>
                                                <div className="text-sm">{statusDisplay(row.status)}</div>
                                            </div>
                                            </div>

                                            <div className="mt-3">
                                            <div className="text-sm font-semibold mb-2">Courses</div>
                                            <ul className="space-y-2">
                                                {row.enrolledCourses.map((c, idx) => (
                                                <li key={idx} className="p-2 rounded border border-gray-200">
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-sm font-medium">{c.title}</div>
                                                        <div className="text-xs text-gray-600">
                                                            {c.state === "completed" ? `${c.scorePercent}% • ${c.dateCompleted}` :
                                                            c.state === "in-progress" ? `${c.progressPercent}%` :
                                                            "Not started"}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="mt-2">
                                                        <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
                                                            <div
                                                            className="h-2"
                                                            style={{
                                                                width: `${c.state === "completed" ? 100 : (c.progressPercent ?? 0)}%`,
                                                                background: "linear-gradient(90deg, #10b981, #34d399)"
                                                            }}
                                                            />
                                                        </div>
                                                    </div>
                                                </li>
                                                ))}
                                            </ul>
                                            </div>
                                        </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )


}

export default ExpandableTable;