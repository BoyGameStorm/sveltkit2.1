import { getGroups } from '$lib/data/groups.js';

export function load({ params }) {
    const allGroups = getGroups();
    const groupName = params.grpname;
    const currentGroup = allGroups.find(g => g.gname === groupName);
    
    if (!currentGroup) {
        return {
            status: 404,
            error: 'Группа не найдена'
        };
    }
    
    const studentNames = currentGroup.slist.map(s => 
        `${s.lastname} ${s.firstname}`
    );
    const formatted = `${currentGroup.gname} -> ${studentNames.join(', ')}`;
    
    return {
        group: currentGroup,
        allGroups: allGroups,
        formatted: formatted
    };
}