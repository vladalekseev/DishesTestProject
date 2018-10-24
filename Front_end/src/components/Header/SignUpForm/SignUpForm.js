import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import cn from 'classnames';
import './SignUpForm.scss';
import SocialNetworks from '../SocialNetworks/SocialNetworks';

@inject('userStore')
@inject('appStore')
@observer
class SignUpForm extends Component{
    render() {
        const { appStore, userStore } = this.props;

        return(
            <div className={cn('signup', { 'd-none': !appStore.isSignUpFormOpened })}>
                <form className="signup__form" onSubmit={(e) => { userStore.registerUser(e); }}>
                    <h4 className="signup__header">Sign Up</h4>
                    <p className="signup__description">Please sign up with existing account</p>
                    <SocialNetworks />
                    <div className="signup__create-new">or create a new one</div>
                    <input
                        type="text"
                        className="signup__input"
                        placeholder="Login"
                        value={userStore.login}
                        onChange={(e) => {userStore.setValue('login', e.target.value)}}
                        required={true}
                    />
                    <select className="signup__select">
                        <option value="kharkiv">Kharkiv</option>
                        <option value="kyiv">Kyiv</option>
                        <option value="odessa">Odessa</option>
                    </select>
                    <input
                        type="password"
                        className="signup__input"
                        placeholder="Password"
                        value={userStore.password}
                        onChange={(e) => {userStore.setValue('password', e.target.value)}}
                        required={true}
                    />
                    <input
                        type="password"
                        className="signup__input"
                        placeholder="Confirm Password"
                        value={userStore.confirmPassword}
                        onChange={(e) => {userStore.setValue('confirmPassword', e.target.value)}}
                        required={true}
                    />
                    <button type="submit" className="signup__btn">Sign up</button>
                    <i className="fa fa-times signup__exit" onClick={() => { appStore.toggleSignUpForm() }} />
                </form>
            </div>
        )
    }
}

export default SignUpForm;
