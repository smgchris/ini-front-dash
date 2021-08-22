import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// Tables

import ItemsTable from './ItemsTable';


// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import SendMoney from './SendMoney';

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
                            
                                <Route path={`${this.props.match.url}/send-money`} component={SendMoney} />
                                <Route path={`${this.props.match.url}/history`} component={ItemsTable} />
                          
                        </div>
                        <AppFooter />
                    </div>
                </div>
            </Fragment>
        )
    }

}

export default Users;