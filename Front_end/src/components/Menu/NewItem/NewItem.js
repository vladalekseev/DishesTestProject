import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './NewItem.scss';

@inject('menuStore')
@inject('appStore')
@observer
class NewItem extends Component {
    render() {
        const { menuStore, appStore } = this.props;

        return (
            <div className="new-item__wrapper col-xl-4 order-xl-2" style={{display : this.props.isOrderOpened ? 'block' : ''}}>
                <h3 className="new-item__title ">New Item</h3>
                <form  className="new-item" onSubmit={(e) => {
                    e.preventDefault();
                    menuStore.addNewItem()
                }}>
                    <input
                        type="text"
                        className="new-item__name"
                        placeholder="Item name"
                        value={menuStore.name}
                        onChange={(e) => { menuStore.setValue('name', e.target.value) }}
                        required={true}
                    />
                    <textarea
                        className="new-item__description"
                        placeholder="Description"
                        value={menuStore.description}
                        onChange={(e) => { menuStore.setValue('description', e.target.value) }}
                        required={true}
                    />
                    <label className="new-item__file-label">
                        <i className="fa fa-download new-item__upload-icon" />
                        <span className="new-item__file-btn">
                            {
                                menuStore.image
                                    ? <span><i className="fa fa-check new-item__check-icon" /> Image uploaded</span>
                                    : 'Upload image'
                            }
                        </span>
                        <input
                            className="new-item__file"
                            type="file"
                            onChange={(e) => { menuStore.setImage(e.target.files[0], e.target) }}
                        />
                    </label>
                    <button type="submit" className="button button--add">save</button>
                    {
                        menuStore.image &&
                        <img
                            className="new-item__preview-img"
                            src={`img/${menuStore.image}`}
                            alt="dish"
                            onClick={() => { appStore.showImageViewer(menuStore.image, menuStore.name) }}
                        />
                    }
                </form>
            </div>
        );
    }
}

export default NewItem;
