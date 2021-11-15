import React from 'react';
import { Table, Button } from 'reactstrap';
import { publishTest } from '../../../../actions/studyActions';
import { connect } from 'react-redux';


class TestRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
      publishStatus: "",
    };

    this.onTestPublish = this.onTestPublish.bind(this);
  }
  onDelete(id) {
    this.props.deleteUser(id)
  }

  onUpdate(id) {
    window.location.assign("#/study/update-test/" + id)
  }

  async onTestPublish(e,id) {
    e.preventDefault();
    this.setState({
      publishStatus: "publishing",
    });
    const result = await this.props.publishTest(id);

    if ((await result.DESCRIPTION) === "published") {
      this.setState({
        publishStatus: "published",
      });
    } else {
      this.setState({
        publishStatus: "failed",
      });
    }
  }
  render() {
    const { test, index } = this.props;
    let unix_timestamp = test.createdDate
    var date = new Date(unix_timestamp);
    var day=date.getDate()
    var month=date.getMonth()+1
    var year=date.getFullYear()
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime =day+'/'+month+'/'+year;

    return (

      <tr>
        <th scope="row">{index + 1}</th>
        <td>{test.testName}</td>
        <td>{test.testDesc}</td>
        <td>{test.locale}</td>
        <td>{formattedTime}</td>
        <td><Button outline className="mb-2 mr-2 btn-transition" color="primary" onClick={() => this.onUpdate(test.testId)}>Edit</Button>
          <Button outline className="mb-2 mr-2 btn-transition" color="primary" onClick={(e) => this.onTestPublish(e,test.testId)}>{test.status===0?"Unpublish":"Publish"}</Button>
        </td>
      </tr>

    );
  }
}



export default connect(null, { publishTest })(TestRow);


