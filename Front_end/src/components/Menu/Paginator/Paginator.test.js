import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Paginator from './Paginator';
import menuStore from '../../../stores/MenuStore/MenuStore';
configure({ adapter: new Adapter() });

describe('Paginator component', () => {
    beforeEach(() => {
        menuStore.pages = [{}, {}];
        menuStore.currentPage = 1;
    });

    it('should render paginator as expected', () => {
        const component = shallow(<Paginator.wrappedComponent menuStore={menuStore} />);

        expect(component.find('.paginator').exists()).toBe(true);
        expect(component.find('.paginator__item').length).toBe(3);

        expect(component.find('.paginator__item--active').length).toBe(1);
    });
});
