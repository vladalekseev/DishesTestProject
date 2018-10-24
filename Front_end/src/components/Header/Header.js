import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link  } from 'react-router-dom';
import './Header.scss';
import LoginForm from './LoginForm/LoginForm';
import SignUpForm from './SignUpForm/SignUpForm';

@inject('userStore')
@inject('appStore')
@observer
class Header extends Component {

    render() {
        const { appStore, userStore } = this.props;

        return (
            <div className="header">
                <div className="header__wrapper container-fluid">
                    <i className="fa fa-bars header__sandwich" onClick={() => { appStore.toggleOrder() }} />
                    <Link to="/">
                        <h1 className="header__title">DataArt <span className="header__branch">Food</span></h1>
                    </Link>
                    <div className="header__status">
                        <div className="header__auth">
                            {
                                userStore.userType
                                    ? (
                                    <div className="header__auth">
                                        {
                                            userStore.isAdmin && (
                                                <Link to="/dashboard">
                                                    <div className="header__profile">Dashboard</div>
                                                </Link>
                                            )
                                        }
                                        <div className="header__name">
                                            <i className="fa fa-user header__user-icon" />
                                            {userStore.userType}
                                        </div>
                                        <div className="header__log-out" onClick={() => { userStore.logOut() }}>
                                            <i className="fa fa-sign-out header__out-icon" />
                                            <span className="header__out">Log out</span>
                                        </div>
                                    </div>
                                    ) : (
                                    <div className="header__auth">
                                        <LoginForm />
                                        <div className="header__log-in" onClick={() => { appStore.toggleLoginForm() }}>Log in</div>
                                        <div className="header__divider">/</div>
                                        <div className="header__log-in" onClick={() => { appStore.toggleSignUpForm() }}>Sign up</div>
                                    </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
                <SignUpForm />
            </div>
        );
    }
}

export default Header;
