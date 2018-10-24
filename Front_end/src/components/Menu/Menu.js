import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './Menu.scss';
import MenuItem from './MenuItem/MenuItem';

@inject('menuStore')
@observer
class Menu extends Component {

    render() {
        const { menuStore } = this.props;

        return (
            <ul className="menu col-xl-8 order-xl-1">
                <h2 className="menu__title">Menu</h2>
                {
                    menuStore.dishes.map((dish) => {
                            return <MenuItem
                                key={dish._id}
                                id={dish._id}
                                name={dish.name}
                                description={dish.description}
                                img={dish.img}
                                isEditable={dish.isEditable}
                                isPublished={dish.isPublished}
                            />;
                    })
                }
            </ul>
        )
    }
}

export default Menu;
