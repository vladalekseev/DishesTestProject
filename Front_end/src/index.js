import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

import userStore from './stores/UserStore/UserStore';
import orderStore from './stores/OrderStore/OrderStore';
import appStore from './stores/AppStore/AppStore';
import menuStore from './stores/MenuStore/MenuStore';

const stores = { userStore, orderStore, appStore, menuStore };

const Root = () => (
    <Provider { ...stores }>
        <App />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
