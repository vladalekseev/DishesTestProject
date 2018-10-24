import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { NotificationContainer } from 'react-notifications';

import Menu from '../Menu/Menu';
import OrderBar from '../OrderBar/OrderBar';
import NewItem from '../Menu/NewItem/NewItem';
import Pagination from '../Menu/Paginator/Paginator';
import Loader from '../../widgets/Loader/Loader';
import ImageViewer from '../../widgets/ImageViewer/ImageViewer';

@inject('appStore')
@inject('userStore')
@inject('menuStore')
@observer
class Main extends Component {

    componentDidMount() {
        const { menuStore } = this.props;
        menuStore.fetchDishes(this.props.match.params.number);
    }

    componentWillReceiveProps(nextProps) {
        const { menuStore } = this.props;

        if(this.props.match.params.number !== nextProps.match.params.number)
            menuStore.fetchDishes(nextProps.match.params.number);
    }

    render() {
        const { appStore, userStore, menuStore } = this.props;

        return(
            <div>
                {
                    appStore.isImageViewerOpened && <ImageViewer />
                }
                <NotificationContainer />
                <Loader />
                <div className="container-fluid">
                    <div className="content row">
                        {
                            userStore.userType === 'admin' ?
                                <NewItem isOrderOpened={appStore.isOrderOpened}/> :
                                <OrderBar isOrderOpened={appStore.isOrderOpened} />
                        }
                        <Menu userType={userStore.userType}/>
                    </div>
                </div>
                {
                    menuStore.isLoaded && <Pagination />
                }
            </div>
        )
    }
}

export default Main;
