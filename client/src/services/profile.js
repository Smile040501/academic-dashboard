import axios from "axios";
import { getHeaders } from "./config";

async function getLoggedInUser() {
    let { data } = await axios.get(`users/get/`, { ...getHeaders() });
    return data;
}

async function updateProfile(profile) {
    let { data } = await axios.post(`users/profile/`, profile, {
        ...getHeaders(),
    });
    return data;
}

async function discardProfile(user, field) {
    let data = await getLoggedInUser();
    return {
        ...user,
        [field]: {
            ...data[field],
        },
    };
}

async function getAllProfiles(pageNum, usersPerPage, search, program, batch) {
    const { data } = await axios.get(
        `users/profile/?page=${pageNum}&page_size=${usersPerPage}&search=${search}&program=${program}&batch=${batch}`
    );
    console.log(data);
    data.results = data.results.map((res) => res.user);
    return data;
}

// async function filterPeople(people, search) {
//     let allPeople = [];
//     for (const ppl of people) {
//         const str = ppl.name + ppl.current_organisation + ppl.email + ppl.phone;
//         allPeople.push(str);
//     }
//     let res = [];
//     let i = 0;
//     for (const ppl of allPeople) {
//         if (ppl.toLowerCase().includes(search.toLowerCase())) {
//             res.push(people[i]);
//         }
//         i++;
//     }
//     return res;
// }

export { updateProfile, getLoggedInUser, discardProfile, getAllProfiles };
