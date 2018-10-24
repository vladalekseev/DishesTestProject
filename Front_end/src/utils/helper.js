const postJSON = (url, data) => {
    return fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        method: 'POST',
        body: JSON.stringify(data)
    });
};

export default postJSON;
