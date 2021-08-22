import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Button,
} from "reactstrap";
import ReactCSSTransitionGroup, {
  propTypes,
} from "react-addons-css-transition-group";
import { connect } from "react-redux";
import {
  sendMoney,
  checkTrxStatus,
  addingItem,
  notAddingItem,
} from "../../../actions/pytActions";
import { PropTypes } from "prop-types";

class SendMoneyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: "",
      reason: "",
      amount: "",
      ref: "",
      status: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.refreshStatus = this.refreshStatus.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({
      status: "initiated",
    });

    const sendDto = {
      recipient: this.state.recipient,
      reason: this.state.reason,
      amount: this.state.amount,
      pytMethod: "momo-mtn-rw",
    };

    const result = await this.props.sendMoney(sendDto);
    this.setState({
      status: await result.DESCRIPTION,
      ref: await result.OBJECT,
    });
  }

  componentDidMount() {
    this.props.notAddingItem();
  }

  async refreshStatus() {
    const result = await this.props.checkTrxStatus({ref:this.state.ref});
    const stat = await result.OBJECT;
    this.setState({ status: stat });
  }

  render() {
    const { status } = this.state;

    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div>
            <Form onSubmit={this.onSubmit}>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <Label for="recipient">Recipient's Phone number</Label>
                    <Input
                      type="number"
                      name="recipient"
                      onChange={this.onChange}
                      placeholder="07..."
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="amount">Amount (RWF)</Label>
                    <Input
                      type="number"
                      name="amount"
                      onChange={this.onChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="reason">Reason for transfer</Label>
                    <Input
                      type="textarea"
                      name="reason"
                      onChange={this.onChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    {status === "" ? <Button>Send</Button> : <div></div>}
                    {status === "initiated" ? (
                      <Button variant="primary" disabled>
                        {" "}
                        Sending..
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    {status === "pending" ? (
                      <Fragment>
                        <Button className="btn-warning" disabled>
                          {" "}
                          Pending
                        </Button>{" "}
                        <Button
                          className="btn-success"
                          onClick={this.refreshStatus}
                        > 
                          <FontAwesomeIcon
                            className="mr-2 ml-1"
                            icon={faSync}
                          />
                        </Button>
                      </Fragment>
                    ) : (
                      <div></div>
                    )}
                    {status === "success" ? (
                      <Button className="btn-success" disabled>
                        {" "}
                        Sent Successfully
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    {status === "failed" ? (
                      <FormFeedback tooltip>Something went wrong</FormFeedback>
                    ) : (
                      <div></div>
                    )}
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

const mapStateToProps = (state) => ({
  itemAdding: state.pyts.addingItem,
  msg: state.pyts.msg,
  txRef: state.pyts.ref,
});

export default connect(mapStateToProps, {
  addingItem,
  checkTrxStatus,
  notAddingItem,
  sendMoney,
})(SendMoneyForm);
