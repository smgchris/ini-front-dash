import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// Tables

import TestsTable from './TestsTable';


// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import AddTest from './AddTest';
import UpdateItem from './UpdateTest'

class Study extends React.Component {

    render() { 
        return (
            <Fragment>
                <AppHeader />
                <div className="app-main">
                    <AppSidebar />
                    <div className="app-main__outer">
                        <div className="app-main__inner">

                            {/* Study */}
                            
                                <Route path={`${this.props.match.url}/add-test`} component={AddTest} />
                                <Route path={`${this.props.match.url}/tests`} component={TestsTable} />
                                <Route path={`${this.props.match.url}/update-test/:id`} component={UpdateItem} />
                          
                        </div>
                        <AppFooter />
                    </div>
                </div>
            </Fragment>
        )
    }

}

export default Study;