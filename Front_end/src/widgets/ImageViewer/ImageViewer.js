import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './ImageViewer.scss';

@inject('appStore')
@observer
class ImageViewer extends Component {
    render() {
        const { appStore } = this.props;

        return(
            <div className="image-viewer">
                <div className="image-viewer__wrapper">
                    <div className="image-viewer__title">{appStore.imageName}</div>
                    <img className="image-viewer__img" src={`img/${appStore.imageSrc}`} alt="some"/>
                    <i className="fa fa-times image-viewer__close" onClick={() => { appStore.closeImageViewer() }}/>
                </div>
            </div>
        )
    }
}

export default ImageViewer;
