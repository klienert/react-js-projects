const package_groups = [
    {
        id: 1,
        package_id: 26,
        type: 'family', // course | series | family | track
        name: 'Cybersecurity Training Group (Spanish or English)',
        description: 'Choose one of the Cybersecurity offerings',
        completion_rule_type: 'choose_one', // all_required, single, choose_n, choose_one
        completion_required_count: 1,
        issues_completion_certificate: false,
        certificate_template_id: null,
        sort_order: 1
    },
    {
        id: 2,
        package_id: 16,
        type: 'series', // course | series | family | track
        name: 'Framework for Understanding Poverty Training Group',
        description: 'Complete parts 1, 2, & 3 in order',
        completion_rule_type: 'all_required', // all_required, single, choose_n, choose_one
        completion_required_count: 3, // this could be null or the total num of courses
        enforce_sequence: true,
        issues_completion_certificate: true,
        certificate_template_id: '22',
        sort_order: 1
    },
        {
        id: 3,
        package_id: 13,
        type: 'track', // course | series | family | track
        name: 'Gifted & Talented Group',
        description: 'Complete at least 6 courses',
        completion_rule_type: 'choose_n', // all_required, single, choose_n, choose_one
        completion_required_count: 6, // this could be null or the total num of courses
        enforce_sequence: false, // no order
        issues_completion_certificate: true,
        certificate_template_id: '24',
        sort_order: 1
    }
];

export default package_groups;