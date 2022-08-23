// ##############################
// // // Tasks for TasksCard - see Home view
// #############################

var bugs = [
    'Sign contract for "What are conference organizers afraid of?"',
    "Lines From Great Russian Literature? Or E-mails From My Boss?",
    "Create 4 Invisible User Experiences you Never Knew About",
];
var website = [
    "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
    'Sign contract for "What are conference organizers afraid of?"',
];
var server = [
    "Lines From Great Russian Literature? Or E-mails From My Boss?",
    "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
    'Sign contract for "What are conference organizers afraid of?"',
];

const init_profile = {
    user: {
        name: "",
        program_iit: "",
        role: "",
        current_organisation: "",
        phone: "",
        current_address: "",
        email: "",
        profile_pic: "",
    },
    about: {
        curricular_interests: "",
        co_curricular_interests: "",
        clubs: "",
        responsibilities: "",
        future_plan: "",
    },
    views: {
        facilities_liked: "",
        improvements: "",
    },
};

module.exports = {
    bugs,
    website,
    server,
    init_profile,
};
