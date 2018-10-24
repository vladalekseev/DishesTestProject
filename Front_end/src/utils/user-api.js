export const getPopularUsers = () => {
    return fetch('api/users', {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
    })
};
