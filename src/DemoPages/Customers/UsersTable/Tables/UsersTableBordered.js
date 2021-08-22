import React from 'react';
import { Table, Button, Row, Input } from 'reactstrap';
import UserRow from '../Rows/UserRow';
import UserRowHeader from '../Rows/UserRowHeader'

import { connect } from 'react-redux';
import { fetchUsers, fetchAllUsers } from '../../../../actions/userActions';
import { PropTypes } from 'prop-types'
import { Fragment } from 'react';

class UsersTableBordered extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageSize: 100,
      currentPage: 0,
      totalEntries: this.props.totalSize,
      pageStart: 0,
      loading: true,
      fetchedUsers: [],
      currentUsers: [],
      fetchedSet: new Set(),
      searchTerm: ''



    };

    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onUpdate = this.onUpdate.bind(this);
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, currentPage: 0 });

  }
  nextPage(e) {
    e.preventDefault()
    let page = this.state.currentPage + 1
    this.currentPageChange(page)
  }
  prevPage(e) {
    e.preventDefault()
    let page = this.state.currentPage - 1
    this.currentPageChange(page)
  }

  currentPageChange(page) {

    const paging = {
      'page': page,
      'size': this.state.pageSize
    }
    if (!this.props.fetchedSet.has(page)) {
      this.setState({ currentPage: page, loading: true })
      this.props.fetchUsers(paging)
    }
    else {
      this.setState({ currentPage: page, loading: false })
    }
  }

  async componentDidMount() {

    if (!this.props.fetchedSet.has(this.state.currentPage)||this.props.itemAdding==="added"){
      await this.props.fetchUsers()
    }

  }
  async componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

    if (this.props.users !== prevProps.users) {
      this.setState({
        loading: false,
        totalEntries: this.props.totalSize
      })
    }
    if(this.props.totalSize!==prevProps.totalSize){
      for (let i = 0; i < Math.ceil(this.props.totalSize / this.state.pageSize); i++) {
        if (!this.props.fetchedSet.has(i))
          await this.props.fetchUsers({ 'page': i, 'size': this.state.pageSize })
      }
    }
  }


  render() {
    const { searchTerm, currentPage, pageSize } = this.state
    const{fetchedUsers,fetchedSet}=this.props
    let fetchedArr = [...fetchedSet]
    let userItems = fetchedUsers.slice(fetchedArr.indexOf(currentPage) * pageSize, pageSize * (1 + fetchedArr.indexOf(currentPage))).map((user, index) => (
      <UserRow key={user.user_id} user={user} index={index + (currentPage * pageSize)} />
    ))

    if (searchTerm !== '') {
      userItems = fetchedUsers.map((user, index) => {
        if (user.username.includes(searchTerm) || (user.firstName !== null && user.firstName.toLowerCase().includes(searchTerm.toLowerCase()))) {
          return <UserRow key={user.user_id} user={user} index={index} />
        }
      })
      // if(userItems.length==0){

      // }
    }



    const pages = () => {
      let content = [];
      let size = 0
      let start = 0
      if (Math.ceil(this.state.totalEntries / this.state.pageSize) > 10) {
        if (this.state.currentPage > 10) {
          start = this.state.currentPage - 4
          //  this.setState({ pageStart: start });
          if (this.state.currentPage + 5 < Math.ceil(this.state.totalEntries / this.state.pageSize)) {
            size = this.state.currentPage + 5
          }
          else
            size = Math.ceil(this.state.totalEntries / this.state.pageSize)
        }
        else {
          size = 10
        }
      }
      else {
        size = Math.ceil(this.state.totalEntries / this.state.pageSize)
      }

      if (this.state.currentPage === 0) {
        content.push(<li class="paginate_button page-item previous disabled" id="example_previous"><a href="#" aria-controls="example" data-dt-idx="0" tabindex="0" class="page-link" onClick={this.prevPage}>Previous</a></li>)
      }
      else {
        content.push(<li class="paginate_button page-item previous" id="example_previous"><a href="#" aria-controls="example" data-dt-idx="0" tabindex="0" class="page-link" onClick={this.prevPage}>Previous</a></li>)
      }

      for (let i = start; i < size; i++) {

        if (this.state.currentPage === i) {
          content.push(<li class="paginate_button page-item active"><a href="#" aria-controls="example" data-dt-idx={i + 1} tabindex="0" class="page-link" onClick={(e) => { e.preventDefault(); this.currentPageChange(i) }}>{i + 1}</a></li>);
        } else
          content.push(<li class="paginate_button page-item"><a href="#" aria-controls="example" data-dt-idx={i + 1} tabindex="0" class="page-link" onClick={(e) => { e.preventDefault(); this.currentPageChange(i) }}>{i + 1}</a></li>);
      }

      if (this.state.currentPage >= Math.ceil(this.state.totalEntries / this.state.pageSize) - 1) {
        content.push(<li class="paginate_button page-item next disabled" id="example_next"><a href="#" aria-controls="example" data-dt-idx="4" tabindex="0" class="page-link" onClick={this.nextPage}>Next</a></li>)
      }
      else {
        content.push(<li class="paginate_button page-item next" id="example_next"><a href="#" aria-controls="example" data-dt-idx="4" tabindex="0" class="page-link" onClick={this.nextPage}>Next</a></li>)
      }

      return content;
    };
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
        {searchTerm ? '' : <Row className="mt-3">
          <div class="col-sm-12 col-md-5">
            <div class="dataTables_info" id="example_info" role="status" aria-live="polite">Showing {(this.state.currentPage * this.state.pageSize) + 1} to {this.state.pageSize * (this.state.currentPage + 1) >= this.state.totalEntries ? this.state.totalEntries : this.state.pageSize * (this.state.currentPage + 1)} of {this.state.totalEntries} entries</div>
          </div>
          <div class="col-sm-12 col-md-7">
            <div class="dataTables_paginate paging_simple_numbers" id="example_paginate">
              <ul class="pagination">
                {
                  pages()
                }

              </ul>
            </div>
          </div>
        </Row>}
      </Fragment>

    );
  }
}

PropTypes.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  newUser: PropTypes.object,
}

const mapStateToProps = state => ({
  users: state.users.items || [],
  totalSize: state.users.totalSize,
  fetchedUsers:state.users.fetchedUsers,
  fetchedSet:state.users.fetchedSet,
  itemAdding:state.users.addingItem,
  newUser: state.users.item,
  loggedIn: state.aut
})




export default connect(mapStateToProps, { fetchUsers })(UsersTableBordered);