import React from "react";
import { checkTrxStatus } from "../../../../actions/pytActions";
import { connect } from "react-redux";

class UserRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.trx.status,
    };
  }

  async componentDidMount() {
   if (this.props.trx.status === "pending" || this.props.trx.status === "initiated") {
      const result = await this.props.checkTrxStatus({
        ref: this.props.trx.trxId,
      });

      const stat = await result.OBJECT;
      this.setState({ status: stat });
    }
  }
  render() {
    const { trx, index } = this.props;
    const { status } = this.state;
    let unix_timestamp = trx.trxTime;
    var date = new Date(unix_timestamp);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var formattedTime =
      day +
      "/" +
      month +
      "/" +
      year +
      " at " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{formattedTime}</td>
        <td>{trx.recipient}</td>
        <td>{trx.amount}</td>
        <td>{trx.trxCost}</td>
        <td>{trx.initiator.firstName}</td>
        <td>{trx.reason}</td>
        <td>{status === "failed" ? trx.callbackMsg : ""}</td>
        <td>
          {status === "initiated" ? (
            <div className="badge badge-secondary">Initiated</div>
          ) : (
            ""
          )}
          {status === "pending" ? (
            <div className="badge badge-info">Pending</div>
          ) : (
            ""
          )}
          {status === "success" ? (
            <div className="badge badge-success">Success</div>
          ) : (
            ""
          )}
          {status === "failed" ? (
            <div className="badge badge-danger">Failed</div>
          ) : (
            ""
          )}
        </td>
      </tr>
    );
  }
}

export default connect(null, { checkTrxStatus })(UserRow);
