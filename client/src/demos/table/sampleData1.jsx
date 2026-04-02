export const DEMO_COLS = [
  { key: "name", header: "Group Name", width: "200px", sortable: true, filterable: true },
  { key: "region", header: "Region", sortable: true, filterable: true, filterType: "select" },
  { key: "district", header: "District", sortable: true, filterable: true, filterType: "select" },
  { key: "numMembers", header: "Members", align: "center", sortable: true, filterable: true, filterType: "number" },
  { key: 'createdAt', header: 'Created', align: 'center', sortable: true, filterable: false },
  { key: "action", header: "Action", render: (val) => <a href="#">{val}</a> },
];

export const DEMO_DATA = [
    {id: 1, name: 'Group for Teachers', region: 'Demo', district: 'LOTR ISD', numMembers: 120, createdAt: '2026-01-01', action: 'edit' },    
    {id: 2, name: 'Group for Coaches', region: 'Demo', district: 'LOTR ISD', numMembers: 18, createdAt: '2025-12-31', action: 'edit'},
    {id: 3, name: 'Group for Admin', region: '6', district: 'ESC Region 6', numMembers: 4, createdAt: '2026-03-31', action: 'edit'},
    {id: 4, name: 'Group for Graphic Designers', region: '6', district: 'ESC Region 6', numMembers: 3, createdAt: '2026-02-27', action: 'edit'}
];
