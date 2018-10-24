import postJSON  from './helper';

export const fetchUser = (url, login, password) => {
    const userData = { login, password };
    return postJSON(`/api/${url}`, userData);
};

export const socialAuth = (network, token) => {
    return postJSON(`/api/oauth/${network}`, token);
};
