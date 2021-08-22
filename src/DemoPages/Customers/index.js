import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// Tables

import UsersTable from './UsersTable';


// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import AddUser from './AddUser';
import UpdateItem from './UpdateItem'

class Users extends React.Component {

    render() { 
        return (
            <Fragment>
                <AppHeader />
                <div className="app-main">
                    <AppSidebar />
                    <div className="app-main__outer">
                        <div className="app-main__inner">

                            {/* Users */}
                            
                                <Route path={`${this.props.match.url}/add-new-customer`} component={AddUser} />
                                <Route path={`${this.props.match.url}/manage-customers`} component={UsersTable} />
                                <Route path={`${this.props.match.url}/update-customer/:id`} component={UpdateItem} />
                          
                        </div>
                        <AppFooter />
                    </div>
                </div>
            </Fragment>
        )
    }

}

export default Users;