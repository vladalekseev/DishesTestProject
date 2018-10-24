import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import OrderList from './OrderList';
import ActiveOrders from './ActiveOrder/ActiveOrder';
import orderStore from '../../../stores/OrderStore/OrderStore';

describe('OrderList component', () => {
    beforeEach(() => {
        orderStore.activeOrders = [
            {
            _id: 'id',
            isActive: true,
            dishes: [{}],
            user: 'user',
            creationDate: 'date'
        }, {
            _id: 'id2',
            isActive: true,
            dishes: [{}],
            user: 'user',
            creationDate: 'date'
        }];
    });
    it('should render active orders', () => {
        const component = shallow(<OrderList.wrappedComponent orderStore={orderStore} />);

        expect(component.find('.order-list').exists()).toBe(true);
        expect(component.find('.order-list__hint').hasClass('d-none')).toBe(true);
        expect(component.find(ActiveOrders).length).toBe(2);
    })
});
