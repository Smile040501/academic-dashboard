const loginSelector = (state) => state.auth.loggedIn;
const userSelector = (state) => state.auth.user;
const tokenSelector = (state) => state.auth.token;
const emailSelector = (state) => state.auth.email;
const isAdminSelector = (state) => state.auth.isAdmin;
const loadingSelector = (state) => state.loading;
const snackbarSelector = (state) => state.snackbar;
const headingSelector = (state) => state.heading;

export {
    loginSelector,
    userSelector,
    tokenSelector,
    emailSelector,
    isAdminSelector,
    loadingSelector,
    snackbarSelector,
    headingSelector,
};
