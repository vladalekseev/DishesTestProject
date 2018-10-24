import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import SocialBtn from './SocialBtn';

@inject('userStore')
@observer
class SocialNetworks extends Component{

    render() {
        const { userStore } = this.props;

        return(
            <div className="login-form__social">
                <SocialBtn
                    provider='facebook'
                    appId='130852187598344'
                    onLoginSuccess={(user) => { userStore.loginWithSocialNetwork('facebook', { access_token: user._token.accessToken })  }}
                    onLoginFailure={(err) => { console.error(err) }}
                    extraClasses='fa-facebook-square login-form__social-btn--facebook'
                />
                <SocialBtn
                    provider='instagram'
                    appId='73ddde0ea4c7491c910ded36d13b7b30'
                    onLoginSuccess={(user) => { userStore.loginWithSocialNetwork('instagram', { access_token: user._token.accessToken })  }}
                    onLoginFailure={(err) => { console.error(err) }}
                    extraClasses='fa-instagram login-form__social-btn--facebook'
                    redirect='http://localhost:3000/'
                    autoCleanUri={true}
                />
                <SocialBtn
                    provider='google'
                    appId='807743130772-bkda1av2sqn79vjc4e4t8oog58beemvu.apps.googleusercontent.com'
                    onLoginSuccess={(user) => { userStore.loginWithSocialNetwork('google', { access_token: user._token.accessToken }) }}
                    onLoginFailure={(err) => { console.error(err) }}
                    extraClasses='fa-google-plus-official login-form__social-btn--google'
                />
            </div>
        )
    }
}

export default SocialNetworks;