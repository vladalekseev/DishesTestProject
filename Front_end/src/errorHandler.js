import appStore from './stores/AppStore/AppStore';

const errorHandler = (response) => {
    if (response.status && response.status !== 200)
        return appStore.createNotification('error', response.message);

    return response;
};

export default errorHandler;
