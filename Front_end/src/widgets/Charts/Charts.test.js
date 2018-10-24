import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Charts from './index';
import { BarChart, PieChart, LineChart } from 'react-d3-components';
configure({ adapter: new Adapter() });

describe('Charts component', () => {
    const component = shallow(<Charts />);

    it('should render Charts as expected', () => {
        expect(component.find('.chart').exists()).toBe(true);
        expect(component.find(BarChart).exists()).toBe(true);
        expect(component.find(PieChart).exists()).toBe(true);
        expect(component.find(LineChart).exists()).toBe(true);
    });
});
