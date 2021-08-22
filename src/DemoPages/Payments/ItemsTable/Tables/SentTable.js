import React from 'react';
import { Table, Button, Row, Input } from 'reactstrap';
import SentRow from '../Rows/SentRow';
import SentRowHeader from '../Rows/SentRowHeader'

import { connect } from 'react-redux';
import { fetchSentTrxs } from '../../../../actions/pytActions';
import { PropTypes } from 'prop-types'
import { Fragment } from 'react';

class SentTable extends React.Component {

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


    await this.props.fetchSentTrxs()


  }
  async componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
  }


  render() {
    const { searchTerm } = this.state
    const { sentItems } = this.props

    const sortedItems=[...sentItems]
    sortedItems.sort((a, b) => {
      if (a.trxTime > b.trxTime) {
        return -1;
      }
      if (a.trxTime < b.trxTime) {
        return 1;
      }
      return 0;
    });

    let trxItems = sortedItems.map((trx, index) => {
      if (trx.type === 0)
        return <SentRow key={trx.id} trx={trx} index={index} />
    })

    if (searchTerm !== '') {
      trxItems = sortedItems.map((trx, index) => {
        if (trx.type === 0&&(trx.reason.toLowerCase().includes(searchTerm) || trx.initiator.firstName.toLowerCase().includes(searchTerm) || (trx.recipient !== null && trx.recipient.toLowerCase().includes(searchTerm.toLowerCase())))) {
          return <SentRow key={trx.id} trx={trx} index={index} />
        }
      })
    }

    return (
      <Fragment>
        <Row>
        
          <div class="col-sm-12 col-md-6 mb-3">
            <div id="example_filter" class="dataTables_filter">
              <label>Search:</label><Input type="search" name="searchTerm" onChange={this.onChange} class="form-control form-control-sm" placeholder="sender's name or receiver's phone or reason" aria-controls="example" />
            </div>
          </div>
        </Row>{trxItems.length === 0 ? <div className='content-loading col-md-12'>Loading...</div> :
          <Table className="mb-0" bordered>
            <SentRowHeader />

            <tbody>
              {trxItems}
            </tbody>


          </Table>}

      </Fragment>

    );
  }
}

PropTypes.propTypes = {
}

const mapStateToProps = state => ({
  sentItems: state.pyts.sentItems || [],
  loggedIn: state.aut
})




export default connect(mapStateToProps, { fetchSentTrxs })(SentTable);