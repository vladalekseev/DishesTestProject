import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginForm from './LoginForm';
import SocialNetworks from '../SocialNetworks/SocialNetworks';
import userStore from '../../../stores/UserStore/UserStore';
import appStore from '../../../stores/AppStore/AppStore';
configure({ adapter: new Adapter() });

describe('LoginForm component', () => {
    const component = shallow(<LoginForm.wrappedComponent userStore={userStore} appStore={appStore} />);

    it('should render login form as expected', () => {
        expect(component.dive().find('.login-form').exists()).toBe(true);
        expect(component.dive().find(SocialNetworks).exists()).toBe(true);
    });
});
