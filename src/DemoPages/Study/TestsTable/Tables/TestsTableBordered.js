import React from 'react';
import { Table, Button, Row, Input } from 'reactstrap';
import TestRow from '../Rows/TestRow';
import TestRowHeader from '../Rows/TestRowHeader'

import { connect } from 'react-redux';
import { fetchTests } from '../../../../actions/studyActions';
import { PropTypes } from 'prop-types'
import { Fragment } from 'react';

class TestsTableBordered extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchTerm: ''



    };

    this.onChange = this.onChange.bind(this);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, currentPage: 0 });

  }

  async componentDidMount() {

  
       await this.props.fetchTests()


  }
  async componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
  }


  render() {
    const { searchTerm } = this.state
    const{tests}=this.props
    let testItems = tests.map((test, index) => (
      <TestRow key={test.testId} test={test} index={index} />
    ))

    // if (searchTerm !== '') {
    //   testItems = tests.map((test, index) => {
    //     if (test.testname.includes(searchTerm) || (test.firstName !== null && test.firstName.toLowerCase().includes(searchTerm.toLowerCase()))) {
    //       return <TestRow key={test.test_id} test={test} index={index} />
    //     }
    //   })
    // }

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
        </Row>{testItems.length===0 ? <div className='content-loading col-md-12'>Loading...</div> :
          <Table className="mb-0" bordered>
            <TestRowHeader />


            <tbody>
              {testItems}
            </tbody>


          </Table>}
       
      </Fragment>

    );
  }
}

PropTypes.propTypes = {
}

const mapStateToProps = state => ({
  tests:state.study.tests || [],
  loggedIn: state.aut
})




export default connect(mapStateToProps, {fetchTests})(TestsTableBordered);