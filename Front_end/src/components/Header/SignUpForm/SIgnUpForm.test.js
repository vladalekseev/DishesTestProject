import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignUpForm from './SignUpForm';
import SocialNetworks from '../SocialNetworks/SocialNetworks';
import userStore from '../../../stores/UserStore/UserStore';
import appStore from '../../../stores/AppStore/AppStore';
configure({ adapter: new Adapter() });

describe('SignUpForm component', () => {
    const component = shallow(<SignUpForm.wrappedComponent userStore={userStore} appStore={appStore} />);

    it('should render sign up form as expected', () => {
        expect(component.dive().find('.signup').exists()).toBe(true);
        expect(component.dive().find(SocialNetworks).exists()).toBe(true);
    });

    it('should show sign up form', () => {
        expect(component.dive().find('.signup').hasClass('d-none')).toBe(true);

        appStore.isSignUpFormOpened = true;
        expect(component.dive().find('.signup').hasClass('d-none')).toBe(false);
    });
});
