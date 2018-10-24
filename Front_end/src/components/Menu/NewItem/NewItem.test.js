import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NewItem from './NewItem';
import menuStore from '../../../stores/MenuStore/MenuStore';
import appStore from '../../../stores/AppStore/AppStore';
configure({ adapter: new Adapter() });

describe('NewItem component', () => {
    const component = shallow(<NewItem.wrappedComponent menuStore={menuStore} appStore={appStore} />);

    it('should render NewItem as expected', () => {
        expect(component.dive().find('.new-item').exists()).toBe(true);
        expect(component.dive().find('.new-item__preview-img').exists()).toBe(false);
    });

    it('should render image preview', () => {
        menuStore.image = {};
        expect(component.dive().find('.new-item__preview-img').exists()).toBe(true);
    });
});
