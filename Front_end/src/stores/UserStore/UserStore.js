import { observable, computed, action } from 'mobx';
import orderStore from '../OrderStore/OrderStore';
import appStore from '../AppStore/AppStore';
import menuStore from '../MenuStore/MenuStore';
import errorHandler from '../../errorHandler';
import { fetchUser, socialAuth } from '../../utils/auth-api';

class UserStore {

    @observable userType;
    @observable login;
    @observable password;
    @observable confirmPassword;

    constructor() {
        this.checkUser();

        this.login = '';
        this.password = '';
        this.confirmPassword = '';
    }

    @computed
    get isAdmin() {
        return this.userType === 'admin';
    }

    @action
    checkUser() {
        const user = localStorage.getItem('user');
        this.userType = user ? user : null;
    }

    @action
    registerUser(e) {
        e.preventDefault();

        const isValid = this.signUpValidation();
        if(isValid)
            fetchUser('signup', this.login, this.password)
                .then(res => res.json())
                .then(errorHandler)
                .then(res => {
                    if(res) {
                        appStore.createNotification('success', `You are successfully registered!`);

                        this.login = '';
                        this.password = '';
                        this.confirmPassword = '';
                        appStore.closeUserForm();
                    }
                })
                .catch(err => err);
    }

    @action
    logIn() {
        return fetchUser('login', this.login, this.password)
            .then(res => res.json())
            .then(errorHandler)
            .then(userData => {
                if(userData) {
                    this.userType = userData.login;
                    menuStore.fetchDishes();
                    localStorage.setItem('token', userData.token);
                    localStorage.setItem('user', userData.login);
                    appStore.closeUserForm();
                }
            })
            .catch(err => err);
    }

    @action
    loginWithSocialNetwork(network, token) {
        return socialAuth(network, token)
            .then(res => res.json())
            .then(errorHandler)
            .then(userData => {
                if(userData) {
                    this.userType = userData.login;
                    localStorage.setItem('token', userData.token);
                    localStorage.setItem('user', userData.login);
                    appStore.closeUserForm();
                }
            })
            .catch(err => err);
    }

    @action
    logOut() {
        this.userType = null;
        localStorage.clear();
        orderStore.resetOrder();
        window.location.href = '/';
    }

    signUpValidation() {
        if(this.password.length < 6) {
            appStore.createNotification('error', 'Password must be at least 6 characters');
            return false;
        }
        if(this.password !== this.confirmPassword) {
            appStore.createNotification('error', 'Passwords do not match!');
            return false;
        }
        return true;
    }

    @action
    setValue(type, value) {
        this[type] = value;
    }
}

const userStore = new UserStore();
export default userStore;
