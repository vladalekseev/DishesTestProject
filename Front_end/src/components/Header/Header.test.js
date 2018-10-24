import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';
import Header from './Header';
import LoginForm from './LoginForm/LoginForm';
import SignUpForm from './SignUpForm/SignUpForm';
import userStore from '../../stores/UserStore/UserStore';
import appStore from '../../stores/AppStore/AppStore';
configure({ adapter: new Adapter() });

describe('Header component', () => {
    const component = shallow(<Header.wrappedComponent userStore={userStore} appStore={appStore} />);

    it('should render header for unauthorized users', () => {
        expect(component.dive().find('.header').exists()).toBe(true);
        expect(component.dive().find(LoginForm).exists()).toBe(true);
        expect(component.dive().find(SignUpForm).exists()).toBe(true);
        expect(component.dive().find('.header__name').exists()).toBe(false);
    });

    it('should render header for authorized user', () => {
        userStore.userType = 'user';
        expect(component.dive().find(LoginForm).exists()).toBe(false);
        expect(component.dive().find('.header__name').contains('user')).toBe(true);
        expect(component.dive().find(Link).exists()).toBe(true);
    });

    it('should render header for admin', () => {
        userStore.userType = 'admin';
        expect(component.dive().find(LoginForm).exists()).toBe(false);
        expect(component.dive().find(Link).exists()).toBe(true);
        expect(component.dive().find('.header__name').contains('admin')).toBe(true);
    });
});
