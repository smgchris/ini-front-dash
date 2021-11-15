import React from "react";
import { Table, Button, Row, Input } from "reactstrap";
import ReceivedRow from "../Rows/ReceivedRow";
import ReceivedRowHeader from "../Rows/ReceivedRowHeader";

import { connect } from "react-redux";
import { fetchReceivedTrxs } from "../../../../actions/pytActions";
import { PropTypes } from "prop-types";
import { Fragment } from "react";

class RecievedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchTerm: "",
      filterStatus: "",
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, currentPage: 0 });
  }

  async componentDidMount() {
    await this.props.fetchReceivedTrxs();
  }

  render() {
    const { searchTerm, filterStatus } = this.state;
    const { receivedItems } = this.props;
    const sortedItems = [...receivedItems];
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
      if (trx.type === 1)
        return <ReceivedRow key={trx.id} trx={trx} index={index} />;
    });

    if (searchTerm !== "") {
      trxItems = sortedItems.map((trx, index) => {
        if (
          trx.type === 1 &&
          (trx.payee.includes(searchTerm) || trx.amount == searchTerm)
        ) {
          return <ReceivedRow key={trx.id} trx={trx} index={index} />;
        }
      });
    }

    var total=0

    if (filterStatus !== "") {
      trxItems = sortedItems.map((trx, index) => {
        if (
          trx.type === 1 &&
          (trx.status.includes(filterStatus) || trx.status == filterStatus)
        ) {
          total+= trx.amount
          return <ReceivedRow key={trx.id} trx={trx} index={index} />;
        }
      });

      

    }

    return (
      <Fragment>
        <Row>
          <div class="col-sm-12 col-md-6 mb-3">
            <div id="example_filter" class="dataTables_filter">
              <label>Search:</label>
              <Input
                type="search"
                name="searchTerm"
                onChange={this.onChange}
                class="form-control form-control-sm"
                placeholder="name or phone"
                aria-controls="example"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-3 mb-3">
            <label>Filter Status</label>
            <Input
              type="select"
              name="filterStatus"
              onChange={this.onChange}
              class="form-control form-control-sm"
              value={this.state.value}
            >
              <option value="pending">Pending</option>
              <option value="success">Succeeded</option>
              <option value="failed">Failed</option>
            </Input>
          </div>
          <div class="col-sm-12 col-md-3 mb-3">
            <label>Total: {total}</label> 
          </div>

        </Row>
        {trxItems.length === 0 ? (
          <div className="content-loading col-md-12">Loading...</div>
        ) : (
          <Table className="mb-0" bordered>
            <ReceivedRowHeader />

            <tbody>{trxItems}</tbody>
          </Table>
        )}
      </Fragment>
    );
  }
}

PropTypes.propTypes = {};

const mapStateToProps = (state) => ({
  receivedItems: state.pyts.receivedItems || [],
  loggedIn: state.aut,
});

export default connect(mapStateToProps, { fetchReceivedTrxs })(RecievedTable);
