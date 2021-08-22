import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { fetchUser } from '../../../actions/userActions';

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
            user: {}
        };

    }

    componentDidMount() {
        this.props.fetchUser("" + this.props.match.params.id)
        
    }

    

    render() {
        // const user=this.props.user.find(user=>""+user.userId===""+this.props.match.params.id)
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
                                    <AddUserForm item_id={this.props.match.params.id} />
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
    user: state.users.item
})

export default connect(mapStateToProps, { fetchUser })(UpdateItem);
