import React, { Fragment } from 'react';

import {
  Card, CardBody, Row, Col,
  CardTitle, Form, FormGroup, Label, Input, FormFeedback, FormText, Button
} from 'reactstrap';
import ReactCSSTransitionGroup, { propTypes } from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { createUser, updateCustomer, addingItem, notAddingItem } from '../../../actions/userActions';
import { fetchRoles } from '../../../actions/roleActions';
import { PropTypes } from 'prop-types'

class AddUserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user:this.props.user,
      username: this.props.user !== undefined ? this.props.user.username : '',
      name: this.props.user !== undefined ? this.props.user.firstName : '',
      packs:'',
      password: '',
      creator: '1',
      submitButton: false,
      loading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  mySet1 = new Set()


  onCheckChange(e) {
    if (e.target.checked)
      this.mySet1.add(e.target.value)
    else
      this.mySet1.delete(e.target.value)

    this.setState({ permissions: this.state.permissions.concat(e.target.value) });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true })

    const user = {
      username: this.state.username,
      firstname: this.state.name,
      phone: this.state.phone,
      password: this.state.password,
      status:this.state.status,
      packs:new Date(this.state.packs).getTime,
      active:this.state.active
    }

    this.props.createUser(user);
    this.props.addingItem()



  }

  onUpdate(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      firstname: this.state.name,
      password: this.state.password,
      status:this.state.status,
      packs:this.state.packs===''?'':new Date(this.state.packs).getTime(),
      active:this.state.active,
      modifier: this.state.creator
    }

    this.props.updateCustomer(user);
    this.props.addingItem()

  }

  componentDidMount() {
    this.props.notAddingItem()
  }
  componentDidUpdate(prevProps) {

    if (this.props.user !== prevProps.user) {
        this.setState({
          username: this.props.user.username,
          name: this.props.user.firstName,
          packs:this.props.user.packs,
          password: '',

        })
    }
}
  render() {

    if (!this.props.user) {
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
                    {/* <FormGroup>
                      <Label for="username">Username</Label>
                      <Input type="text" name="username" onChange={this.onChange} required/>
  
                    </FormGroup> */}
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input type="text" name="name" onChange={this.onChange} required />

                    </FormGroup>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input type="email" name="email" onChange={this.onChange} />

                    </FormGroup>
                    {/* <FormGroup>
                      <Label for="address">Address</Label>
                      <Input type="text" name="address" onChange={this.onChange} required/>
  
                    </FormGroup> */}
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input type="password" name="password" onChange={this.onChange} required />

                    </FormGroup>





                    {/* <FormGroup>
                      <Label for="phone">Telephone</Label>
                      <Input type="number" name="phone" onChange={this.onChange} required/>
  
                    </FormGroup>
                    <FormGroup>
                      <Label for="id_number">ID number</Label>
                      <Input type="number" name="id_number" onChange={this.onChange} />
  
                    </FormGroup> */}




                  </Col>
                </Row>
                <Row>
                  <Col lg='6'>
                    <FormGroup>
                      {this.props.itemAdding !== "adding" ? <Button>Submit</Button> : <div></div>}
                      {this.props.itemAdding === "adding" ? <Button variant="primary" disabled> Submitting...</Button> : <div></div>}
                      {this.props.itemAdding === "added" ? <Button className="btn-success" disabled> Submitted</Button> : <div></div>}
                      {this.props.itemAdding === "not-added" ? <FormFeedback tooltip>User not created, Something is wrong!</FormFeedback> : <div></div>}

                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </div>
          </ReactCSSTransitionGroup>
        </Fragment>

      );
    }

    let unix_timestamp = this.state.packs
    var date = new Date(unix_timestamp);
    var day=date.getDate()
    var month=date.getMonth()+1
    var year=date.getFullYear()
    let months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    var formattedTime =months[month-1]+' '+day+', '+year;

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

            <Form onSubmit={this.onUpdate}>
              <Row>
                <Col lg='6'>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" onChange={this.onChange} value={this.state.username} required disabled />

                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" onChange={this.onChange} value={this.state.name} required />

                  </FormGroup>

                  <FormGroup>
                    <Label for="name">End of Subscription ({this.props.user.packs>0?formattedTime:'Never subscribed'})</Label>
                    <Input type="date" name="packs" onChange={this.onChange} value={this.state.firstName} />

                  </FormGroup>

                  <FormGroup>

                    <Label for="status">Change Status <small>Once deactivated, the customer cannot access anything</small></Label>
                    <Input type="select" bsSize="sm" name="status" onChange={this.onChange} value={this.state.value} >

                      <option value={this.props.user.status}>{this.props.user.status === 0 ? 'Active' : 'Deactivate'}</option>
                      {

                        this.props.user.status === 1 ? <option value={0}>Active</option> : <option value={1}>Deactivate</option>

                      }
                    </Input>

                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Password <small>Leave it blank to keep the existing password</small></Label>
                    <Input type="password" name="password" onChange={this.onChange} />

                  </FormGroup>

                </Col>
              </Row>
              <Row>
                <Col lg='6'>
                  <FormGroup>
                    {this.props.itemAdding !== "adding" && this.props.itemAdding!=="added" ? <Button>Update</Button> : <div></div>}
                    {this.props.itemAdding === "adding" ? <Button variant="primary" disabled> Updating..</Button> : <div></div>}
                    {this.props.itemAdding === "added" ? <Button variant="primary" disabled> Updated</Button> : <div></div>}
                    {this.props.itemAdding === "not-added" ? <FormFeedback tooltip>User not updated, Something is wrong!</FormFeedback> : <div></div>}

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

const mapStateToProps = state => ({
  users: state.users.items,
  user:state.users.item,
  status: state.users.status,
  departments: state.depts.items,
  roles: state.roles.items,
  itemAdding: state.users.addingItem
})

export default connect(mapStateToProps, { createUser, updateCustomer, addingItem,notAddingItem, fetchRoles })(AddUserForm);