import appStore from './AppStore';

describe('AppStore', () => {
   it('should open or close order bar', () => {
       appStore.toggleOrder();
       expect(appStore.isOrderOpened).toBe(true);

       appStore.toggleOrder();
       expect(appStore.isOrderOpened).toBe(false);
   });

    it('should open or close login form', () => {
        appStore.toggleLoginForm();
        expect(appStore.isLoginFormOpened).toBe(true);

        appStore.toggleLoginForm();
        expect(appStore.isLoginFormOpened).toBe(false);
    });

    it('should open or close sign up form and close login form', () => {
        appStore.toggleSignUpForm();
        expect(appStore.isSignUpFormOpened).toBe(true);
        expect(appStore.isLoginFormOpened).toBe(false);

        appStore.toggleSignUpForm();
        expect(appStore.isSignUpFormOpened).toBe(false);
        expect(appStore.isLoginFormOpened).toBe(false);
    });

    it('should close login and sign up forms', () => {
        appStore.closeUserForm();

        expect(appStore.isSignUpFormOpened).toBe(false);
        expect(appStore.isLoginFormOpened).toBe(false);
    });

    it('should open image viewer', () => {
        appStore.showImageViewer('src', 'name');

        expect(appStore.isImageViewerOpened).toBe(true);
        expect(appStore.imageSrc).toBe('src');
        expect(appStore.imageName).toBe('name');
    });

    it('should close image viewer', () => {
        appStore.closeImageViewer();
        expect(appStore.isImageViewerOpened).toBe(false);
    });
});
