import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OrderBar from './OrderBar';
import CurrentOrder from './CurrentOrder/CurrentOrder';
import orderStore from '../../stores/OrderStore/OrderStore';
configure({ adapter: new Adapter() });

describe('OrderBar component', () => {

    it('should render OrderBar with orders', () => {
        orderStore.currentOrders = [
            {
                description: 'description',
                id: 'id',
                img: 'img',
                name: 'name',
                quantity: 2
            }
        ];
        const component = shallow(<OrderBar.wrappedComponent orderStore={orderStore} />);

        expect(component.find(CurrentOrder).length).toBe(1);
        expect(component.find('.button--order').exists()).toBe(true);
        expect(component.find('.order__empty').exists()).toBe(false);
    });

    it('should render OrderBar without orders', () => {
        orderStore.currentOrders = [];
        const component = shallow(<OrderBar.wrappedComponent orderStore={orderStore} />);

        expect(component.find(CurrentOrder).length).toBe(0);
        expect(component.find('.button--order').exists()).toBe(false);
        expect(component.find('.order__empty').exists()).toBe(true);
    })
});
