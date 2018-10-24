import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from './Dashboard';
import Charts from '../../widgets/Charts/index';
import ActiveOrdersContainer from './ActiveOrdersContainer/OrderList';
import userStore from '../../stores/UserStore/UserStore';
configure({ adapter: new Adapter() });

describe('Dashboard component', () => {

   it('should render dashboard page for admin', () => {
       userStore.userType = 'admin';
       const component = shallow(<Dashboard.wrappedComponent userStore={userStore} />);

       expect(component.find('.dashboard').exists()).toBe(true);
       expect(component.find(Charts).exists()).toBe(true);
       expect(component.find(ActiveOrdersContainer).exists()).toBe(true);
   });

    it('shouldn\'t render dashboard page for user', () => {
        userStore.userType = 'user';
        const component = shallow(<Dashboard.wrappedComponent userStore={userStore} />);

        expect(component.find('.dashboard').exists()).toBe(false);
    })
});
