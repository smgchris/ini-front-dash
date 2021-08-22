import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";

import SendMoneyForm from "./SendMoneyForm";
import Balance from "../Balance";

class SendMoney extends React.Component {
  render() {
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
          <Balance></Balance>

          <Row>
            <Col lg="12">
              <CardTitle>SEND MONEY</CardTitle>
              <Card className="main-card mb-3">
                <CardBody>
                  <SendMoneyForm />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

export default SendMoney;
