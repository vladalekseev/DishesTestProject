import React, { Component } from 'react';
import { observer } from 'mobx-react';
import LoadManager from './LoadManager';
import './Loader.scss';

@observer
class Loader extends Component{
    render() {
        const styles = {
            width: LoadManager.progress,
            opacity: LoadManager.isFinished ? '0' : '',
            backgroundColor: LoadManager.isError ? '#8e0000' : ''
        };

        return(
            <div className="loader" style={styles}> </div>
        )
    }
}

export default Loader;
