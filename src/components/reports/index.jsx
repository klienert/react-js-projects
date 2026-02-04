import React from "react";
import ExpandableTable from "./table/expandableTable";
import users from './sample_data/users';
import plans from './sample_data/plans';

const ReportsSample = () => {

    const columns = [
        {key: 'name', label: 'Name'},
        {key: 'email', label: 'Email'},
        {key: 'campus', label: 'Campus'},
        {key: 'primaryRole', label: 'Primary Role'},
        {key: 'secondaryRoles', 
            label: 'Secondary Roles', 
            value: (r) => (r.secondaryRoles && r.secondaryRoles.length ? r.secondaryRoles.join(", ") : "--"),
        },
        {key: 'plan', 
            label: 'Plan Name',
            value: (p) => getPlanNames(p.planId),
        },
        {key: 'status', 
            label: 'Status',
            value: (r) => {
                if (r.status.state === "completed") return `Completed — ${r.status.dateCompleted} (${r.status.scorePercent}%)`;
                if (r.status.state === "in-progress") return `In progress — ${r.status.progressPercent}%`;
                return "Not started";
            }
        },
    ];

    const getPlanNames = (planIds) => {
        const found = plans.filter(p => 
            planIds.some(i => i === p.id)        
        );        
        const names = found.map((n) => n.name);
        return names.join(', ');
    }

    return (
        <ExpandableTable 
            cols={columns}
            data={users}
            getPlanNames={getPlanNames}
        />        
    );
}

export default ReportsSample;