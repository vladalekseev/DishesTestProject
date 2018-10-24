import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Menu from './Menu';
import MenuItem from './MenuItem/MenuItem';
import menuStore from '../../stores/MenuStore/MenuStore';
configure({ adapter: new Adapter() });

describe('Menu component', () => {

    beforeEach(() => {
        menuStore.dishes = [
            {
                _id: 'id'
            },
            {
                _id: 'id2'
            }
        ];
    });

    it('should render Menu items', () => {
        const component = shallow(<Menu.wrappedComponent menuStore={menuStore} />);

        expect(component.find('.menu').exists()).toBe(true);
        expect(component.find(MenuItem).length).toBe(2);
    });
});
