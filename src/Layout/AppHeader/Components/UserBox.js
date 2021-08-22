import React, {Fragment} from 'react';
 import {log_out} from '../../../actions/auth'
import { connect } from 'react-redux';

import {
    DropdownToggle, DropdownMenu,
    Nav, Button, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown
} from 'reactstrap';

import {
    toast,
    Bounce
} from 'react-toastify';



import {
    faCalendarAlt,
    faAngleDown

} from '@fortawesome/free-solid-svg-icons';


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { MapState } from 'react-map-gl';

// import avatar1 from '../../../assets/utils/images/avatars/1.jpg';


class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };

    }

    notify2 = () => this.toastId = toast(Date(), {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });

logout(){
    localStorage.removeItem("tkn");
     log_out
     window.location.replace('#/login-page/login')
// https://reactrouter.com/web/api/Redirect

}
    


    render() {

        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            {/* <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/>
                                    </DropdownToggle>
                                    
                                </UncontrolledButtonDropdown>
                            </div> */}
                            {/* <div className="widget-content-left  ml-3 header-user-info">
                                <div className="widget-heading">
                                    {this.props.auth.username}
                                </div>
                                <div className="widget-subheading">
                                   {this.props.auth.message}
                                </div>
                            </div> */}

                            <div className="widget-content-right header-user-info ml-3">
                                {/* <Button className="btn-shadow p-1" size="sm" onClick={this.notify2} color="info"
                                        id="Tooltip-1">
                                    <FontAwesomeIcon className="mr-2 ml-2" icon={faCalendarAlt}/>
                                </Button>
                                <UncontrolledTooltip placement="bottom" target={'Tooltip-1'}>
                                    Click to see the date.
                                </UncontrolledTooltip> */}
                                <Button    color="info" onClick={this.logout}
                                        id="Tooltip-1"> Log out
                                    {/* <FontAwesomeIcon className="mr-2 ml-2" icon={faCalendarAlt}/> */}
                                </Button>
                                <UncontrolledTooltip placement="bottom" target={'Tooltip-1'}>
                                    Click to log out.
                                </UncontrolledTooltip>
                            </div> 
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
       auth: state.auth.user
})

export default connect(mapStateToProps)(UserBox);

// export default UserBox;
