import React, { Fragment } from 'react';

import {
  Card, CardBody, Row, Col,
  CardTitle, Form, FormGroup, Label, Input, FormFeedback, FormText, Button
} from 'reactstrap';
import ReactCSSTransitionGroup, { propTypes } from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { createUser, updateUser, addingItem,notAddingItem } from '../../../actions/userActions';
import { fetchRoles } from '../../../actions/roleActions';
import { PropTypes } from 'prop-types'

class AddUserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user ? this.props.user.username : '',
      firstname: this.props.user ? this.props.user.firstName : '',
      lastname: this.props.user ? this.props.user.lastName : '',
      role: this.props.user ? this.props.user.role.id : '',
      phone: this.props.user ? this.props.user.phone : '',
      email: this.props.user ? this.props.user.email : '',
      password: '',
      status:this.props.user?this.props.user.status:'',
     
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
      // username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      role: this.state.role,
      phone: this.state.phone,
      email: this.state.email,
      password: this.state.password,
      // creator: this.state.creator,
    }


    this.props.createUser(user);
    this.props.addingItem()



  }

  onUpdate(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      role: this.state.role,
      phone: this.state.phone,
      email: this.state.email,
      password: this.state.password,
      status:this.state.status,
      creator: this.state.creator,
    
    }

    this.props.updateUser(user);
    this.props.addingItem()


    // this.props.createUser(user);

    //window.location.assign(`#/users/manage-users`);

  }

  componentDidMount() {
    this.props.fetchRoles()
    this.props.notAddingItem()

  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if(this.props.user!==prevProps.user){

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
                      <Label for="firstname">First Name</Label>
                      <Input type="text" name="firstname" onChange={this.onChange} required />
                    </FormGroup>

                    <FormGroup>
                      <Label for="lastname">Last Name</Label>
                      <Input type="text" name="lastname" onChange={this.onChange} required />
                    </FormGroup>

                    <FormGroup>
                      <Label for="phone">Phone (Username)</Label>
                      <Input type="number" name="phone" onChange={this.onChange} />
                    </FormGroup>

                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input type="email" name="email" onChange={this.onChange} />
                    </FormGroup>

                    <FormGroup>
                      <Label for="role">Role</Label>
                      <Input type="select" bsSize="sm" name="role" onChange={this.onChange} value={this.state.value} required>
                        <option>{'Select'}</option>
                        {

                          this.props.roles.map((role) => {

                            return <option value={role.id}>{role.name}</option>

                          })
                        }
                      </Input>

                    </FormGroup>

                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input type="password" name="password" onChange={this.onChange} required />

                    </FormGroup>




                  </Col>
                </Row>
                <Row>
                  <Col lg='6'>
                    <FormGroup>
                      {this.props.itemAdding !== "adding" && this.props.itemAdding!=="added"? <Button>Submit</Button> : <div></div>}
                      {this.props.itemAdding === "adding" ? <Button variant="primary" disabled> Submitting...</Button> : <div></div>}
                      {this.props.itemAdding === "added" ? <Button variant="primary" disabled> Submitted</Button> : <div></div>}
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
                    <Label for="username">Username (Phone)</Label>
                    <Input type="text" name="username" onChange={this.onChange} value={this.state.username} disabled/>
                  </FormGroup>

                  <FormGroup>
                      <Label for="firstname">First Name</Label>
                      <Input type="text" name="firstname" onChange={this.onChange}  value={this.state.firstname} />
                    </FormGroup>

                    <FormGroup>
                      <Label for="lastname">Last Name</Label>
                      <Input type="text" name="lastname" onChange={this.onChange}  value={this.state.lastname}/>
                    </FormGroup>

                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input type="email" name="email" onChange={this.onChange} value={this.state.email}/>
                    </FormGroup>

                    <FormGroup>

                    <Label for="role">Role</Label>
                    <Input type="select" bsSize="sm" name="role" onChange={this.onChange} value={this.state.value} >

                      <option value={this.props.user.role.id}>{this.props.user.role.name}</option>
                      {
                        this.props.roles.map((role) => {
                          if (role.id !== this.props.user.role.id) {
                            return <option value={role.id}>{role.name}</option>
                          }
                        })
                      }
                    </Input>

                  </FormGroup>

                  <FormGroup>

                    <Label for="status">Change Status <small>Once deactivated, the user cannot access anything</small></Label>
                    <Input type="select" bsSize="sm" name="status" onChange={this.onChange} value={this.state.value} >

                      <option value={this.props.user.status}>{this.props.user.status===0?'Active':'Deactivate'}</option>
                      {
                        
                          this.props.user.status===1?<option value={0}>Active</option>:<option value={1}>Deactivate</option>
                         
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
                    {this.props.itemAdding === "added" ? <Button className="btn-success" disabled> Updated</Button> : <div></div>}
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
  status: state.users.status,
  departments: state.depts.items,
  roles: state.roles.items,
  itemAdding: state.users.addingItem
})

export default connect(mapStateToProps, { createUser, updateUser, addingItem,notAddingItem, fetchRoles })(AddUserForm);