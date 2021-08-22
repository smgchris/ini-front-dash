import React, { Fragment } from 'react';

import { Row, Col, Form, FormGroup, Label, Input, Button, CustomInput } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { createRequest } from '../../../../actions/kitchenActions';
import { PropTypes } from 'prop-types'

class AddItemForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            buffet_type: '',
            quantity: '',
            date_made: '',
            description: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        //var user = JSON.parse(localStorage.getItem('user'));
        
        const product = {
            // name: this.state.name,
            name: this.props.auth.username,
            buffet_type: this.state.buffet_type,
            quantity: this.state.quantity,
            date_made: new Date().toLocaleString().replace(',', ''),
            description: this.state.description
        }
        console.log(product);

        this.props.createRequest(product);
        window.location.assign(`#/kitchen/buffet`)
    }
    componentDidMount() {
        this.props.createRequest()
    }
    render() {
       // var user = JSON.parse(localStorage.getItem('user'));
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
                                        <Input type="text" name="name" value={this.props.auth.username}  disabled/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="name">Product</Label>
                                        <CustomInput type="select" id="exampleCustomSelect"
                                            name="buffet_type" onChange={this.onChange}>
                                            <option value="">Select</option>
                                            <option>Chicken</option>
                                            <option>Beef</option>
                                            <option>Fish</option>
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
                                        <Input type="text" name="description" onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg='6'>
                                    <FormGroup>
                                        <Button>Submit</Button>
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
    createRequest: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    products: state.products.items,
    categories: state.prodCategories.items,
    auth: state.auth.user
})

export default connect(mapStateToProps, { createRequest })(AddItemForm);