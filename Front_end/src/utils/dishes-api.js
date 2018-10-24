import postJSON  from './helper';

export const getDishes = (page, isAdmin) => {
    return fetch(`/api/dishes?page=${page}&isAdmin=${isAdmin}`)
};

export const getPopularDishes = () => {
    return fetch('/api/dishes/popular');
};

export const createDish = (data) => {
    return postJSON('/api/dishes', data);
};

export const updateDish = (data, id) => {
    return fetch(`/api/dishes/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        method: 'PUT',
        body: JSON.stringify(data)
    });
};

export const removeDish = (id) => {
    return fetch(`/api/dishes/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        method: 'DELETE'
    });
};

export const uploadImage = (formData) => {
    return fetch('/api/upload', {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        method: 'POST',
        body: formData
    })
};
