import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './LoginForm.scss';
import SocialNetworks from '../SocialNetworks/SocialNetworks';

@inject('userStore')
@inject('appStore')
@observer
class LoginForm extends Component{
    render() {
        const { userStore, appStore } = this.props;

        return(
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    userStore.logIn();
                }}
                className="login-form" style={{display: appStore.isLoginFormOpened ? 'block' : ''}}
            >
                <header className="login-form__header">Log in</header>
                <SocialNetworks />
                <input type="text" className="login-form__login" placeholder="login" required={true}
                   onBlur={(e) => {
                       userStore.setValue('login', e.target.value)
                   }}/>
                <input type="password" className="login-form__password" placeholder="password" required={true}
                   onBlur={(e) => {
                       userStore.setValue('password', e.target.value)
                   }}/>
                <button type="submit" className="login-form__submit">submit</button>
            </form>
        )
    }
}

export default LoginForm;
