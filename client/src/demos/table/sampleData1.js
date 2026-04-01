export const DEMO_COLS = [
    { key: 'name', header: 'Group Name', width: '200px' },
    { key: 'region', header: 'Region' },
    { key: 'district', header: 'District' },
    { key: 'numMembers', header: 'Number of Members', align: 'center' },
    { key: 'action', header: 'Action', render: (val) => <a href={`#`}>{val}</a> }
];

export const DEMO_DATA = [
    {id: 1, name: 'Group for Teachers', region: 'Demo', district: 'LOTR ISD', numMembers: 120, action: 'edit'},
    {id: 2, name: 'Group for Coaches', region: 'Demo', district: 'LOTR ISD', numMembers: 18, action: 'edit'},
    {id: 3, name: 'Group for Admin', region: '6', district: 'ESC Region 6', numMembers: 4, action: 'edit'},
    {id: 4, name: 'Group for Bus Drivers', region: 'Demo', district: 'LOTR ISD', numMembers: 11, action: 'edit'},
];