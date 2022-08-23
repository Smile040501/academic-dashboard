/*!

 =========================================================
 * Material Home React - v1.9.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2020 Creative Tim (https://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

 * Coded by Creative Tim

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import {
    Collections,
    Contacts,
    Event,
    Group,
    Home,
    SupervisorAccount,
    LibraryBooks,
    VpnKey,
    EmojiPeople,
    MenuBookRounded,
    LocalLibraryRounded,
} from "@material-ui/icons";
import InfoIcon from "@material-ui/icons/Info";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Person from "@material-ui/icons/Person";

import AddEventsIcon from "components/Icons/AddEventsIcon";
import EditEventsIcon from "components/Icons/EditEventsIcon";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import AddEditEvents from "views/Admin/AddEditEvents/AddEditEvents";
import Courses from "views/Courses/Courses";
import EligibleCourses from "views/Courses/EligibleCourses";
import PendingCourses from "views/Courses/PendingCourses";
import DetailedCourse from "views/Courses/DetailedCourse";
import AddCourses from "views/Admin/AddCourses";
import UpdateCourses from "views/Admin/UpdateCourses";
import AddStudents from "views/Admin/AddStudents";
import UpdateStudents from "views/Admin/UpdateStudents";
import AddEditCurriculums from "views/Admin/AddEditCurriculums";
import EditEvents from "views/Admin/EditEvents";
import EditGallery from "views/Admin/EditGallery";
import DashboardPage from "views/Home/Home.js";
import Newsletter from "views/Newsletter/Newsletter";
import People from "views/People/People";
import UserProfile from "views/UserProfile/UserProfile";
import StudentProfile from "views/UserProfile/StudentProfile";
import AboutUs from "./views/AboutUs/AboutUs";
import ContactUs from "./views/ContactUs/ContactUs";
import DetailedEvent from "./views/Events/DetailedEvent";
import Events from "./views/Events/Events";
import Gallery from "./views/Gallery/Gallery";
import Login from "./views/Login/Login";

const dashboardRoutes = [
    {
        path: "/courses",
        name: "All Courses",
        icon: MenuBookRounded,
        component: Courses,
        protected: true,
        expandable: false,
        withParams: true,
        hidden: false,
        isBoth: true,
        routeWithParams: [
            {
                path: "/:id",
                component: DetailedCourse,
                protected: true,
            },
        ],
    },
    {
        path: "/eligibleCourses",
        name: "Eligible Courses",
        icon: MenuBookRounded,
        component: EligibleCourses,
        protected: true,
        expandable: false,
        withParams: false,
        hidden: false,
        isAdmin: false,
    },
    {
        path: "/pendingCourses",
        name: "Pending Courses",
        icon: MenuBookRounded,
        component: PendingCourses,
        protected: true,
        expandable: false,
        withParams: false,
        hidden: false,
        isAdmin: false,
    },
    {
        path: "/login",
        name: "Login",
        icon: VpnKey,
        component: Login,
        protected: false,
        expandable: false,
        withParams: false,
        hidden: true,
        isAdmin: false,
    },
    // {
    //     path: "/events",
    //     name: "Events",
    //     icon: Event,
    //     component: Events,
    //     protected: true,
    //     expandable: false,
    //     withParams: true,
    //     hidden: false,
    //     routeWithParams: [
    //         {
    //             path: "/:id",
    //             component: DetailedEvent,
    //             protected: true,
    //         },
    //     ],
    // },
    // {
    //     path: "/gallery",
    //     name: "Gallery",
    //     icon: Collections,
    //     component: Gallery,
    //     protected: true,
    //     expandable: false,
    //     withParams: false,
    //     hidden: false,
    // },
    // {
    //     path: "/about",
    //     name: "About",
    //     icon: InfoIcon,
    //     component: AboutUs,
    //     protected: true,
    //     expandable: false,
    //     withParams: false,
    //     hidden: false,
    // },
    // {
    //     path: "/Newsletter",
    //     name: "Newsletters",
    //     icon: ListAltIcon,
    //     component: Newsletter,
    //     protected: true,
    //     expandable: false,
    //     withParams: false,
    //     hidden: false,
    // },
    // {
    //     path: "/people",
    //     name: "People",
    //     icon: Group,
    //     component: People,
    //     protected: true,
    //     expandable: false,
    //     withParams: false,
    //     hidden: false,
    // },
    // {
    //     path: "/contact",
    //     name: "Contact Us",
    //     icon: Contacts,
    //     component: ContactUs,
    //     protected: true,
    //     expandable: false,
    //     withParams: false,
    //     hidden: false,
    // },
    {
        path: "/user",
        name: "My Profile",
        icon: Person,
        component: StudentProfile,
        protected: true,
        expandable: false,
        withParams: false,
        hidden: false,
        isAdmin: false,
    },
    {
        path: "/admin",
        name: "Admin",
        protected: true,
        icon: SupervisorAccount,
        expandable: true,
        withParams: false,
        isAdmin: true,
        expandableRoutes: [
            {
                path: "/add-courses",
                icon: MenuBookRounded,
                name: "Add Courses",
                component: AddCourses,
                protected: true,
                expandable: true,
                withParams: false,
                hidden: false,
                isAdmin: true,
            },
            {
                path: "/update-courses",
                icon: MenuBookRounded,
                name: "Update Courses",
                component: UpdateCourses,
                protected: true,
                expandable: true,
                withParams: false,
                hidden: false,
                isAdmin: true,
            },
            {
                path: "/add-students",
                icon: EmojiPeople,
                name: "Add Students",
                component: AddStudents,
                protected: true,
                expandable: true,
                withParams: false,
                hidden: false,
                isAdmin: true,
            },
            {
                path: "/update-students",
                icon: EmojiPeople,
                name: "Update Students",
                component: UpdateStudents,
                protected: true,
                expandable: true,
                withParams: false,
                hidden: false,
                isAdmin: true,
            },
            {
                path: "/add-curriculum",
                icon: LibraryBooks,
                name: "Add Curriculum",
                component: AddStudents,
                protected: true,
                expandable: true,
                withParams: false,
                hidden: false,
                isAdmin: true,
            },
            {
                path: "/update-curriculum",
                icon: LibraryBooks,
                name: "Update Curriculum",
                component: UpdateStudents,
                protected: true,
                expandable: true,
                withParams: false,
                hidden: false,
                isAdmin: true,
            },
            {
                path: "/add-semester",
                icon: LocalLibraryRounded,
                name: "Add Semester",
                component: AddStudents,
                protected: true,
                expandable: true,
                withParams: false,
                hidden: false,
                isAdmin: true,
            },
            {
                path: "/update-semester",
                icon: LocalLibraryRounded,
                name: "Update Semester",
                component: UpdateStudents,
                protected: true,
                expandable: true,
                withParams: false,
                hidden: false,
                isAdmin: true,
            },
            // {
            //     path: "/add-events",
            //     icon: AddEventsIcon,
            //     name: "Add Events",
            //     component: AddEditEvents,
            //     protected: true,
            //     expandable: true,
            //     withParams: false,
            //     hidden: false,
            // },
            //         {
            //             path: "/edit-events",
            //             icon: EditEventsIcon,
            //             name: "Edit Events",
            //             component: EditEvents,
            //             protected: true,
            //             expandable: true,
            //             withParams: false,
            //             hidden: false,
            //         },
            //         {
            //             path: "/edit-gallery",
            //             icon: AddToPhotosIcon,
            //             name: "Edit Gallery",
            //             component: EditGallery,
            //             protected: true,
            //             expandable: true,
            //             withParams: false,
            //             hidden: false,
            //         },
            //     ],
            //     routeWithParams: [
            //         {
            //             path: "/edit-events/:id",
            //             icon: EditEventsIcon,
            //             name: "Edit Event",
            //             component: AddEditEvents,
            //             protected: true,
            //             expandable: true,
            //             withParams: false,
            //             hidden: true,
            //         },
        ],
    },
];

export default dashboardRoutes;
