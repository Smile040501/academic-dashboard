export const loginQuery = (email, tokenId) => ({
    query: `{
        login(email: "${email}", tokenId: "${tokenId}") {
            token
            tokenExpiration
        }
    }`,
});
