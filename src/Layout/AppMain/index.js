import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy, Fragment } from 'react';

import { connect } from 'react-redux'

import { ToastContainer } from 'react-toastify';
// import Departments from '../../DemoPages/Departments';
// import Roles from '../../DemoPages/Roles';
// import Suppliers from '../../DemoPages/Suppliers';

// const Dashboards = lazy(() => import('../../DemoPages/Dashboards'));

// const Widgets = lazy(() => import('../../DemoPages/Widgets'));
// const Elements = lazy(() => import('../../DemoPages/Elements'));
// const Components = lazy(() => import('../../DemoPages/Components'));
// const Charts = lazy(() => import('../../DemoPages/Charts'));
// const Forms = lazy(() => import('../../DemoPages/Forms'));
// const Tables = lazy(() => import('../../DemoPages/Tables'));


const PaymentsDash = lazy(() => import('../../DemoPages/Payments'));
// const SettingsDash = lazy(() => import('../../DemoPages/SettingsDash'));
const UserDash = lazy(() => import('../../DemoPages/Users'));
const CustomerDash = lazy(() => import('../../DemoPages/Customers'));
const StudyDash = lazy(() => import('../../DemoPages/Study'));

const DefaultPage = lazy(() => import('../../DemoPages/Login'));

const AppMain = () => {

    return (
        <Fragment>


            {/* Ikizamini*/}
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Please wait as we load Ikizamini
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/users" component={UserDash} />
            </Suspense>
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Please wait as we load Ikizamini
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/customers" component={CustomerDash} />
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Please wait as we load Ikizamini
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/payments" component={PaymentsDash} />
            </Suspense>
           
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Please wait as we load Ikizamini
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/login-page" component={DefaultPage} />
            </Suspense>
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Please wait as we load Ikizamini
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/study" component={StudyDash} />
            </Suspense>



            <ToastContainer />
        </Fragment>
    )
};
{/* {this.props.roles.role_id === 1 && (
                */}

const mapStateToProps = state => ({
    auth: state.auth.user
})
export default connect(mapStateToProps)(AppMain);