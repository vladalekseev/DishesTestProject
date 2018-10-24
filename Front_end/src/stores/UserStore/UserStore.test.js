import userStore from './UserStore';
import orderStore from '../OrderStore/OrderStore';

describe('UserStore', () => {

    beforeEach(() => {
        userStore.logOut();
    });

    it('should validate password', () => {
        userStore.password = '12345';
        expect(userStore.signUpValidation()).toBe(false);

        userStore.password = '123456';
        userStore.confirmPassword = '123123';
        expect(userStore.signUpValidation()).toBe(false);

        userStore.confirmPassword = '123456';
        expect(userStore.signUpValidation()).toBe(true);
    });

    it('should authorize user', done => {
        userStore.login = 'admin';
        userStore.password = 'password';

        expect(userStore.login).not.toBe('');
        expect(userStore.password).not.toBe('');

        fetch.mockResponse(JSON.stringify({ login: userStore.login, password: userStore.password }));

        userStore.logIn()
            .then(() => {

                expect(userStore.userType).not.toBeNull();

                if(userStore.userType === 'admin')
                    expect(userStore.isAdmin).toBe(true)

            })
            .then(done)
            .catch(done.fail);
    });

    it('should sign up via social network', done => {
        expect(userStore.userType).toBeNull();

        fetch.mockResponse(JSON.stringify({ login: 'email' }));

        userStore.loginWithSocialNetwork()
            .then(() => {
                expect(userStore.userType).toBe('email');
            })
            .then(done)
            .catch(done.fail);
    });

    it('should log out', () => {
        userStore.logOut();

        expect(userStore.userType).toBeNull();
        expect(orderStore.currentOrders.length).toBe(0);
    });
});
