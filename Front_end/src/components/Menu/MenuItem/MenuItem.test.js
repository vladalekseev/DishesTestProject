import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MenuItem from './MenuItem';
import userStore from '../../../stores/UserStore/UserStore';
import appStore from '../../../stores/AppStore/AppStore';
import menuStore from '../../../stores/MenuStore/MenuStore';
configure({ adapter: new Adapter() });

describe('MenuItem component', () => {
    const component = shallow(
        <MenuItem.wrappedComponent
            userStore={userStore}
            appStore={appStore}
            menuStore={menuStore}
            name='name'
            description='description'
            isEditable={false}
        />
    );

    it('should render MenuItem for user', () => {
        expect(component.dive().dive().dive().find('.menu-item').exists()).toBe(true);
        expect(component.dive().dive().dive().find('.button--add').exists()).toBe(true);
        expect(component.dive().dive().dive().find('.menu-item__name').contains('name')).toBe(true);
        expect(component.dive().dive().dive().find('.menu-item__description').contains('description')).toBe(true);
        expect(component.dive().dive().dive().find('.menu-item__btn-set').exists()).toBe(false);
    });

    it('should render MenuItem for admin', () => {
        userStore.userType = 'admin';
        expect(component.dive().dive().dive().find('.menu-item__btn-set').exists()).toBe(true);
        expect(component.dive().dive().dive().find('.button--delete').exists()).toBe(true);
        expect(component.dive().dive().dive().find('.button--edit').exists()).toBe(true);
        expect(component.dive().dive().dive().find('.button--add').exists()).toBe(false);
        expect(component.dive().dive().dive().find('.menu-item__file-wrapper').exists()).toBe(false);
    });

    it('should render editable MenuItem', () => {
        userStore.userType = 'admin';
        component.setProps({ isEditable: true });

        expect(component.dive().dive().dive().find('.menu-item__btn-set').exists()).toBe(true);
        expect(component.dive().dive().dive().find('.button--add').exists()).toBe(true);
        expect(component.dive().dive().dive().find('.menu-item__file-wrapper').exists()).toBe(true);
        expect(component.dive().dive().dive().find('.button--edit').exists()).toBe(false);
    });
});
