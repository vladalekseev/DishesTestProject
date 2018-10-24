import React, { Component } from 'react';
import SocialLogin from 'react-social-login';

class SocialBtn extends Component {
    constructor({ triggerLogin }) {
        super();
        this.triggerLogin = triggerLogin;
    }

    render() {
        return (
            <button
                type="button"
                className={`fa login-form__social-btn ${this.props.extraClasses}`}
                onClick={() => { this.triggerLogin() }}
            />
        )
    }
}

export default SocialLogin(SocialBtn)
