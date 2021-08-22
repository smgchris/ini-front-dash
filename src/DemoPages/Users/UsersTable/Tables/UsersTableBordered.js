import React from 'react';
import { Table, Button, Row, Input } from 'reactstrap';
import UserRow from '../Rows/UserDashRow';
import UserRowHeader from '../Rows/UserDashRowHeader'

import { connect } from 'react-redux';
import { fetchDashUsers } from '../../../../actions/userActions';
import { PropTypes } from 'prop-types'
import { Fragment } from 'react';

class UsersTableBordered extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchTerm: ''



    };

    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onUpdate = this.onUpdate.bind(this);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, currentPage: 0 });

  }

  async componentDidMount() {

  
      await this.props.fetchDashUsers()


  }
  async componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
  }


  render() {
    const { searchTerm } = this.state
    const{dashUsers}=this.props
    let userItems = dashUsers.map((user, index) => (
      <UserRow key={user.user_id} user={user} index={index} />
    ))

    if (searchTerm !== '') {
      userItems = dashUsers.map((user, index) => {
        if (user.username.includes(searchTerm) || (user.firstName !== null && user.firstName.toLowerCase().includes(searchTerm.toLowerCase()))) {
          return <UserRow key={user.user_id} user={user} index={index} />
        }
      })
    }

    return (
      <Fragment>
        <Row>
          {/* <div class="col-sm-12 col-md-6 mb-3">
            <div class="dataTables_length" id="example_length">
              <label>Entries Shown</label>
              <Input type='select' name="pageSize" onChange={this.onChange} value={this.state.value} aria-controls="example" class="custom-select custom-select-sm form-control form-control-sm">
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </Input>
            </div>
          </div> */}
          <div class="col-sm-12 col-md-6 mb-3">
            <div id="example_filter" class="dataTables_filter">
              <label>Search:</label><Input type="search" name="searchTerm" onChange={this.onChange} class="form-control form-control-sm" placeholder="name or phone" aria-controls="example" />
            </div>
          </div>
        </Row>{userItems.length===0 ? <div className='content-loading col-md-12'>Loading...</div> :
          <Table className="mb-0" bordered>
            <UserRowHeader />


            <tbody>
              {userItems}
            </tbody>


          </Table>}
       
      </Fragment>

    );
  }
}

PropTypes.propTypes = {
}

const mapStateToProps = state => ({
  dashUsers:state.users.dashUsers || [],
  loggedIn: state.aut
})




export default connect(mapStateToProps, { fetchDashUsers })(UsersTableBordered);