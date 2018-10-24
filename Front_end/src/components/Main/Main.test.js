import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './Main';
import Menu from '../Menu/Menu';
import OrderBar from '../OrderBar/OrderBar';
import NewItem from '../Menu/NewItem/NewItem';
import ImageViewer from '../../widgets/ImageViewer/ImageViewer';
import Paginator from '../Menu/Paginator/Paginator';
import Loader from '../../widgets/Loader/Loader';
import { NotificationContainer } from 'react-notifications';
import userStore from '../../stores/UserStore/UserStore';
import appStore from '../../stores/AppStore/AppStore';
import menuStore from '../../stores/MenuStore/MenuStore';
configure({ adapter: new Adapter() });

describe('Main component', () => {

    beforeEach(() => {
        userStore.userType = 'user';
    });
    const component = shallow(
        <Main.wrappedComponent
            userStore={userStore}
            appStore={appStore}
            menuStore={menuStore}
            match={ { params: { number: 1 } } }
        />);

    it('should render Loader', () => {
        expect(component.dive().dive().find(Loader).exists()).toBe(true);
    });

    it('should render NotificationContainer', () => {
        expect(component.dive().dive().find(NotificationContainer).exists()).toBe(true);
    });

    it('should render Menu', () => {
        expect(component.dive().dive().find(Menu).exists()).toBe(true);
    });

    it('should render NewItem as expected', () => {
        expect(component.dive().dive().find(NewItem).exists()).toBe(false);

        userStore.userType = 'admin';
        expect(component.dive().dive().find(NewItem).exists()).toBe(true);
    });

    it('should render OrderBar as expected', () => {
        expect(component.dive().dive().find(OrderBar).exists()).toBe(true);

        userStore.userType = 'admin';
        expect(component.dive().dive().find(OrderBar).exists()).toBe(false);
    });

    it('should render Paginator as expected', () => {
        expect(component.dive().dive().find(Paginator).exists()).toBe(false);

        menuStore.isLoaded = true;
        expect(component.dive().dive().find(Paginator).exists()).toBe(true);
    });

    it('should render ImageViewer as expected', () => {
        expect(component.dive().dive().find(ImageViewer).exists()).toBe(false);

        appStore.isImageViewerOpened = true;
        expect(component.dive().dive().find(ImageViewer).exists()).toBe(true);
    });
});
