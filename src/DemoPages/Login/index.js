import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';


// Layout

// import AppHeader from '../../Layout/AppHeader';
// import AppSidebar from '../../Layout/AppSidebar/';
// import AppFooter from '../../Layout/AppFooter/';
import Login from './login/';
import Logo from './login/logo.png'


const DefaultPage = ({ match }) => (
    <Fragment>

        <div className="login_main">
            <div className="login-container">
                <div className="logo">
                    {/* <img src={Logo} alt="La Corniche" /> */}
                    <b>IKIZAMINI Dashboard</b>
                </div>
                <div className="">

                    <Route path={`${match.url}/login`} component={Login} />

                </div>
                {/* <AppFooter/> */}
            </div>
        </div>
    </Fragment>
);

export default DefaultPage;