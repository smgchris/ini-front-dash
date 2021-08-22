import React, { Component } from "react";
import { Fragment } from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { refreshBalance } from "../../actions/pytActions";

export class Balance extends Component {
  constructor(props) {
    super(props);
    this.refreshBal = this.refreshBal.bind(this);
  }

  refreshBal() {
    this.props.refreshBalance();
  }

  componentDidMount() {
    this.props.refreshBalance();
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col lg="6" className="balance-summary">
            <div className="balance-available">
              Available Balance: {this.props.currency} {this.props.availableBal}
            </div>
            <div className="balance-actual">
              Actual Balance: {this.props.currency} {this.props.actualBal}
            </div>
            <Button className="btn-success" onClick={this.refreshBal}>
              <FontAwesomeIcon className="mr-2 ml-1" icon={faSync} />
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  actualBal: state.pyts.actualBal,
  availableBal: state.pyts.availableBal,
  currency:state.pyts.currency
});

export default connect(mapStateToProps, { refreshBalance })(Balance);
