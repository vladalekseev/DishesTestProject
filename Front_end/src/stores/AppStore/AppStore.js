import { observable, action } from 'mobx';
import { NotificationManager } from 'react-notifications';

class AppStore {

    @observable isOrderOpened;
    @observable isLoginFormOpened;
    @observable isSignUpFormOpened;
    @observable isImageViewerOpened;
    @observable imageSrc;
    @observable imageName;

    constructor() {
        this.isOrderOpened = false;
        this.isLoginFormOpened = false;
        this.isSignUpFormOpened = false;
        this.isImageViewerOpened = false;
    }

    @action
    toggleOrder() {
        this.isOrderOpened = !this.isOrderOpened
    }

    @action
    toggleLoginForm() {
        this.isLoginFormOpened = !this.isLoginFormOpened;
    }

    @action
    toggleSignUpForm() {
        this.isSignUpFormOpened = !this.isSignUpFormOpened;
        this.isLoginFormOpened = false;
    }

    @action
    closeUserForm() {
        this.isSignUpFormOpened = false;
        this.isLoginFormOpened = false;
    }

    @action
    showImageViewer(src, name) {
        this.isImageViewerOpened = true;
        this.imageSrc = src;
        this.imageName = name;
    }

    @action
    closeImageViewer() {
        this.isImageViewerOpened = false;
    }

    createNotification(type, message) {
        switch (type) {
            case 'info':
                NotificationManager.info(message, null, 2000);
                break;
            case 'success':
                NotificationManager.success(message, null, 2000);
                break;
            case 'warning':
                NotificationManager.warning(message, null, 2000);
                break;
            default:
                NotificationManager.error(message, null, 6000);
                break;
        }
    };
}

const appStore = new AppStore();

export default appStore;
