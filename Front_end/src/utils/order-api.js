import postJSON  from './helper';

export const createOrder = (data) => {
    return postJSON('/api/orders', data);
};

export const getActiveOrders = () => {
    return fetch('api/orders', {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
    })
};

export const changeOrder = (id) => {
    return fetch(`/api/orders/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        method: 'PUT'
    });
};

export const fetchDays = () => {
    return fetch('api/orders/days', {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
    })
};
