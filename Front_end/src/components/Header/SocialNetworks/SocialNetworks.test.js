import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import SocialNetworks from './SocialNetworks';
import SocialBtn from './SocialBtn';
import userStore from '../../../stores/UserStore/UserStore';

describe('SocialNetworks component', () => {
    it('should render social buttons', () => {
        const component = shallow(<SocialNetworks.wrappedComponent userStore={userStore} />);
        expect(component.find(SocialBtn).length).toBe(3);
    })
});
