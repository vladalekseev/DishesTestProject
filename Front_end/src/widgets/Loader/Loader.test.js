import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Loader from './Loader';
configure({ adapter: new Adapter() });

describe('Loader component', () => {
    const component = shallow(<Loader />);

    it('should render Loader as expected', () => {
        expect(component.find('.loader').exists()).toBe(true);
    });
});
