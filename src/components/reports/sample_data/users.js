const users = [
    {
        id: "u1",
        name: "Gandalf The Grey",
        email: "gandalf@lotr.com",
        campus: "Edoras",
        primaryRole: "Administrator",
        secondaryRoles: [],
        planId: "plan-1",
        // overall status (plan-level)
        status: { state: "completed", dateCompleted: "2026-01-15", scorePercent: 92, progressPercent: null },
        enrolledCourses: [
            { title: "Bloodborne Pathogens", state: "completed", dateCompleted: "2026-01-10", scorePercent: 95, progressPercent: null },
            { title: "Cybersecurity", state: "completed", dateCompleted: "2026-01-12", scorePercent: 90, progressPercent: null }
        ],
    },
    {
        id: "u2",
        name: "Bilbo Baggins",
        email: "bbaggins@lotr.com",
        campus: "Hobbiton",
        primaryRole: "Teacher",
        secondaryRoles: ["9-12 Teacher"],
        planId: "plan-1",
        status: { state: "in-progress", dateCompleted: null, scorePercent: null, progressPercent: 45 },
        enrolledCourses: [
            { title: "Bloodborne Pathogens", state: "in-progress", dateCompleted: null, scorePercent: null, progressPercent: 60 },
            { title: "Cybersecurity", state: "in-progress", dateCompleted: null, scorePercent: null, progressPercent: 20 }
        ],
    },
    {
        id: "u3",
        name: "Gimli The Dwarf",
        email: "gimli@lotr.com",
        campus: "Gondor",
        primaryRole: "Teacher",
        secondaryRoles: ["9-12 Teacher", "Coach"],
        planId: "plan-3",
        status: { state: "completed", dateCompleted: "2026-01-28", scorePercent: 87, progressPercent: null },
        enrolledCourses: [
            { title: "Bloodborne Pathogens", state: "in-progress", dateCompleted: null, scorePercent: null, progressPercent: 50 },
            { title: "Cybersecurity", state: "in-progress", dateCompleted: null, scorePercent: null, progressPercent: 56 },
            { title: "Suicide Awareness and Prevention", state: "in-progress", dateCompleted: null, scorePercent: null, progressPercent: 12 },
            { title: "Drug and Alcohol Prevention for staff", state: "not-started", dateCompleted: null, scorePercent: null, progressPercent: 0 },
            { title: "Steroids in Schools", state: "completed", dateCompleted: "2026-01-25", scorePercent: 85, progressPercent: null },
            { title: "Concussion Awareness", state: "completed", dateCompleted: "2026-01-28", scorePercent: 89, progressPercent: null },
        ],
    },
    {
        id: "u4",
        name: "Merry Brandybuck",
        email: "mbrandybuck@lotr.com",
        campus: "Hobbiton",
        primaryRole: "Teacher",
        secondaryRoles: ["9-12 Teacher"],
        planId: "plan-2",
        status: { state: "in-progress", dateCompleted: null, scorePercent: null, progressPercent: 12 },
        enrolledCourses: [
            { title: "Bloodborne Pathogens", state: "in-progress", dateCompleted: null, scorePercent: null, progressPercent: 30 },
            { title: "Cybersecurity", state: "in-progress", dateCompleted: null, scorePercent: null, progressPercent: 75 },
            { title: "Suicide Awareness and Prevention", state: "in-progress", dateCompleted: null, scorePercent: null, progressPercent: 12 },
            { title: "Drug and Alcohol Prevention for staff", state: "not-started", dateCompleted: null, scorePercent: null, progressPercent: 0 },
        ],
    },
    {
        id: "u5",
        name: "Frodo Baggins",
        email: "fbaggins@lotr.com",
        campus: "Hobbiton",
        primaryRole: "Teacher",
        secondaryRoles: ["9-12 Teacher"],
        planId: "plan-2",
        status: { state: "completed", dateCompleted: "2026-01-20", scorePercent: 86, progressPercent: null },
        enrolledCourses: [
            { title: "Bloodborne Pathogens", state: "in-progress", dateCompleted: '2026-01-19', scorePercent: 75, progressPercent: null },
            { title: "Cybersecurity", state: "in-progress", dateCompleted: '2026-01-20', scorePercent: 100, progressPercent: null },
            { title: "Suicide Awareness and Prevention", state: "completed", dateCompleted: "2026-01-18", scorePercent: 85, progressPercent: null },
            { title: "Drug and Alcohol Prevention for staff", state: "completed", dateCompleted: "2026-01-20", scorePercent: 87, progressPercent: null },
        ],
    },
]

export default users;