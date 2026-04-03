import { getGroups } from '$lib/data/groups.js';

export function load() {
    const allGroups = getGroups();
    return {
        groupsList: allGroups.map(g => ({
            name: g.gname,
            count: g.slist.length,
            link: `/groups/${g.gname}`
        })),
        stats: {
            totalGroups: allGroups.length,
            totalStudents: allGroups.reduce((sum, g) => sum + g.slist.length, 0)
        }
    };
}