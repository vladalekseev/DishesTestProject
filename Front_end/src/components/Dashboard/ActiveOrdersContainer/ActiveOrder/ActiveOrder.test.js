import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import ActiveOrder from './ActiveOrder';
import orderStore from '../../../../stores/OrderStore/OrderStore';

describe('ActiveOrder component', () => {
    it('should show active order', () => {
        const component = shallow(<ActiveOrder.wrappedComponent
            orderStore={orderStore}
            user='user'
            dishes={ [{}] }
        />);

        expect(component.find('.active-order').exists()).toBe(true);
        expect(component.find('.active-order__user').contains('user')).toBe(true);
        expect(component.find('.active-order__row').length).toBe(2);
    })
});
