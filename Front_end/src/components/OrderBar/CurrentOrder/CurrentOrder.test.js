import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CurrentOrder from './CurrentOrder';
import orderStore from '../../../stores/OrderStore/OrderStore';
configure({ adapter: new Adapter() });

describe('CurrentOrder component', () => {
    const component = shallow(
        <CurrentOrder.wrappedComponent
            orderStore={orderStore}
            description='description'
            name='name'
            quantity={5}
        />);

    it('should render current order as expected', () => {
        expect(component.find('.order-item').exists()).toBe(true);
        expect(component.find('.order-item__name').contains('name')).toBe(true);
        expect(component.find('.order-item__description').contains('description')).toBe(true);
        expect(component.find('.order-item_quantity').contains(5)).toBe(true);
    });
});
