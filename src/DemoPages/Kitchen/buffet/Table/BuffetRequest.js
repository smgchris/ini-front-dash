import React, { Fragment } from 'react';

import { Row, Col, Form, FormGroup, Label, Input, Button, CustomInput, FormFeedback } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { buffetRequest } from '../../../../actions/kitchenActions';
import { PropTypes } from 'prop-types'

class AddItemForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            buffet_type: '',
            quantity: '',
            date_made: '',
            description: '',
            submitButton: false,
            loading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

        if (this.state.name === "" || this.state.buffet_type === "" || this.state.quantity === "" || this.state.description === "") {
            this.setState({ submitButton: false })
        }
        else {
            this.setState({ submitButton: true })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        //var user = JSON.parse(localStorage.getItem('user'));

        const product = {
            // "menu_id":"1", "waiter_id":"1","status":"1", "qty":"20","batch_id":"2"
            waiter_id: this.props.auth.id,
            // buffet_type: this.state.buffet_type,
            menu_id: this.state.buffet_type,
            qty: this.state.quantity,
            date_made: new Date().toLocaleString().replace(',', ''),
            description: this.state.description,

            //status
            status: "1"
        }
        console.log(product);

        this.props.buffetRequest(product);
        window.location.assign(`#/kitchen/buffet`)
    }
    componentDidMount() {
        this.props.buffetRequest()
    }
    render() {
        //var user = JSON.parse(localStorage.getItem('user'));
        return (

            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>

                        <Form onSubmit={this.onSubmit}>
                            <Row>
                                <Col lg='6'>
                                    <FormGroup>
                                        <Label for="name">Name</Label>
                                        <Input type="text" name="name" value={this.props.auth.username} disabled />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="name">Product</Label>

                                        {/* remember to change the values */}
                                        <CustomInput type="select" id="exampleCustomSelect"
                                            name="buffet_type" value={this.state.value} onChange={this.onChange}>
                                            <option value="">Select</option>
                                            <option value="3">Chicken</option>
                                            <option value="4">Beef</option>
                                            <option value="5">Fish</option>
                                            {/* <option>Pork</option>
                                            <option>Mutton</option> */}
                                        </CustomInput>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="name">Quantity</Label>
                                        <Input type="text" name="quantity" onChange={this.onChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="name">date</Label>
                                        <Input type="text" name="date_made" value={new Date().toLocaleString().replace(',', '')} disabled />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="name">Description</Label>
                                        <Input type="text" name="description" onChange={this.onChange} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg='6'>
                                    <FormGroup>
                                        <FormGroup>
                                            {this.props.itemAdding !== "adding" ? <Button>Submit</Button> : <div></div>}
                                            {this.props.itemAdding === "adding" ? <Button variant="primary" disabled> Submitting...</Button> : <div></div>}
                                            {this.props.itemAdding === "not-added" ? <FormFeedback tooltip>User not created, Something is wrong!</FormFeedback> : <div></div>}

                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>

        );
    }
}

AddItemForm.propTypes = {
    buffetRequest: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    products: state.products.items,
    categories: state.prodCategories.items,
    auth: state.auth.user,
    itemAdding: state.users.addingItem
})

export default connect(mapStateToProps, { buffetRequest })(AddItemForm);