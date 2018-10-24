import React, { Component } from 'react';
import cn from 'classnames';
import { observer, inject } from 'mobx-react';
import './MenuItem.scss';

@inject('orderStore')
@inject('menuStore')
@inject('appStore')
@inject('userStore')
@observer
class MenuItem extends Component {

    showAdminButtons() {
        const { menuStore } = this.props;
        const { id, isEditable } = this.props;

        return (
            <div className="menu-item__btn-set clearfix">
                {
                    isEditable
                        ? (
                            <div>
                                <button
                                    className="button button--delete menu-item__btn"
                                    onClick={() => { menuStore.editItem('cancel', id) }}>
                                    cancel
                                </button>
                                <button
                                    className="button button--add menu-item__btn"
                                    onClick={() => { menuStore.editItem('save', id, this.newName.value, this.newDescription.value, this.props.img) }}>
                                    save
                                </button>
                            </div>
                        )
                        : (
                            <div>
                                <button
                                    className="button button--delete menu-item__btn"
                                    onClick={() => { menuStore.confirmDeletion(id) }}>
                                    remove
                                </button>
                                <button
                                    className="button button--edit menu-item__btn"
                                    onClick={() => { menuStore.editItem('edit', id) }}>
                                    edit
                                </button>
                            </div>
                        )
                }
            </div>
        )
    }

    render() {
        const { orderStore, menuStore, appStore, userStore } = this.props;
        const { id, isEditable, isPublished } = this.props;

        return (
            <li className="menu-item">
                {
                    userStore.isAdmin && (
                        <div className="menu-item__publish-wrapper">
                            <div className="menu-item__publish-tooltip">
                                {
                                    isPublished ? 'Unpublish dish' : 'Publish dish'
                                }
                            </div>
                            <i
                                className={cn('fa fa-lock menu-item__check-mark', { 'fa-unlock': isPublished })}
                                onClick={() => { menuStore.publishDish(id) }}
                            />
                        </div>
                    )
                }
                <div className="menu-item__img-wrapper">
                    <img
                        src={`/img/${this.props.img}`}
                        className="menu-item__img"
                        alt={this.props.name}
                        onClick={() => { appStore.showImageViewer(this.props.img, this.props.name) }}
                    />
                    {
                        isEditable && (
                            <label className="menu-item__file-wrapper">
                                <input
                                    type="file"
                                    className="menu-item__img-file"
                                    onChange={(e) => { menuStore.changeImage(e.target.files[0], id) }}
                                />
                                <span className="menu-item__change-span">Change Photo</span>
                            </label>
                        )
                    }
                </div>
                <div className="menu-item__about">
                    {
                        isEditable
                            ? (
                                <div className="menu-item__info-container">
                                    <input
                                        className="menu-item__edit-name"
                                        type="text"
                                        defaultValue={this.props.name}
                                        ref={(name) => { this.newName = name }}
                                    />
                                    <textarea
                                        className="menu-item__edit-description"
                                        defaultValue={this.props.description}
                                        ref={(description) => { this.newDescription = description }}
                                    />
                                </div>
                              )
                            : (
                                <div className="menu-item__info-container">
                                    <strong className="menu-item__name">{this.props.name}</strong>
                                    <p className="menu-item__description">{this.props.description}</p>
                                </div>
                              )
                    }
                    {
                        userStore.userType === 'admin'
                            ? this.showAdminButtons()
                            : (
                                <button
                                    className="button button--add menu-item__btn"
                                    onClick={() => { orderStore.addDishToOrder(id, this.props.name, this.props.description, this.props.img) }}>
                                    add
                                </button>
                              )
                    }
                </div>
            </li>
        );
    }
}

export default MenuItem;
