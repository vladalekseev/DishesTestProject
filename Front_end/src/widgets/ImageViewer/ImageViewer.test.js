import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ImageViewer from './ImageViewer';
import appStore from '../../stores/AppStore/AppStore';
configure({ adapter: new Adapter() });

describe('ImageViewer component', () => {

    it('should render ImageViewer as expected', () => {
        appStore.imageName = 'name';

        const component = shallow(<ImageViewer.wrappedComponent appStore={appStore} />);
        expect(component.find('.image-viewer').exists()).toBe(true);
        expect(component.find('.image-viewer__title').contains('name')).toBe(true);
    });
});
