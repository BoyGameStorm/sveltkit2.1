import { fakerRU as faker } from '@faker-js/faker';

function studList(n) {
    let students = []
    for(let i = 0; i < n; i++){
        const gender = Math.random() > 0.5 ? 'male' : 'female';
        students.push({
            firstname: faker.person.firstName(gender),
            lastname: faker.person.lastName(gender),
            age: Math.floor((Math.random() * (25 - 20) + 20)),
            gender: gender
        })
    }
    return students
}

export function getGroups() {
    let groups = [];
    for (let i = 1; i <= 7; i++) {
        const groupNumber = i < 10 ? `${i}` : i;
        const groupName = `ИД-10${groupNumber}`
        const studentCount = 15 + Math.floor(Math.random() * 11);
        groups.push({
            gname: groupName,
            slist: studList(studentCount)
        });
    }
    
    return groups;
}