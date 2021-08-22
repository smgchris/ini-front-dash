import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { fetchDashUsers } from '../../../actions/userActions';


import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

import AddUserForm from '../AddUser/AddUserForm'

class UpdateItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users:this.props.users
        }
    }
    
    componentDidMount() {
        const { fetchDashUsers} = this.props
       
        fetchDashUsers()
    
    
    }

    componentDidUpdate(prevProps){
        
        if (this.props.users !== prevProps.users) {
            this.setState({
              users: this.props.users,
              
            })
          }
    }

    render() {
        if(typeof this.state.users !== 'undefined' && this.state.users.length === 0)
        return <div></div>

        const user=this.state.users.find(user=>""+user.id===""+this.props.match.params.id)
        return (
            <Fragment>
            
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Row>
                        <Col lg="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>UPDATE USER</CardTitle>
                                    <AddUserForm item_id={this.props.match.params.id} user={user}/>
                                </CardBody>
                            </Card>
                            
                        </Col>

                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    users: state.users.dashUsers || [],
  })

export default connect(mapStateToProps, {fetchDashUsers})(UpdateItem);
