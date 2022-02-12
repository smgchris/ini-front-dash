import React, { Component } from "react";
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
  Button,
} from "reactstrap";
import {
  saveQuestion,
  saveToDbQuestion,
  saveImage,
} from "../../../../actions/studyActions";
import { connect } from "react-redux";

export class Question extends Component {
  constructor(props) {
    super(props);
    const { question } = this.props;
    this.state = {
      id: question ? question.qnId : "",
      question: question ? question.text : "",
      qnImage: question ? question.photo : "",
      choice1:
        question && question.answers && question.answers[0]
          ? question.answers[0]
          : { text: "", photo: "", sequence:1 },
      choice2:
        question && question.answers && question.answers[1]
          ? question.answers[1]
          : { text: "", photo: "", sequence:2 },
      choice3:
        question && question.answers && question.answers[2]
          ? question.answers[2]
          : { text: "", photo: "", sequence:3 },
      choice4:
        question && question.answers && question.answers[3]
          ? question.answers[3]
          : { text: "", photo: "", sequence:4 },

      status: this.props.status ? this.props.status : "saved",
      qnImgStatus: "",
      choice1ImgStatus: "",
      choice2ImgStatus: "",
      choice3ImgStatus: "",
      choice4ImgStatus: "",
      correctChoice: "choice1",
      qnStatus: question?question.status:0,
    };

    this.onChange = this.onChange.bind(this);
    this.onChoiceChange = this.onChoiceChange.bind(this);
    this.onSaveQuestion = this.onSaveQuestion.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onChoiceImageChange = this.onChoiceImageChange.bind(this);
    this.onClearQnImage = this.onClearQnImage.bind(this);
    this.onClearChoiceImage = this.onClearChoiceImage.bind(this);
    this.onCorrectChange = this.onCorrectChange.bind(this);
    this.onQnStatusChange = this.onQnStatusChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, status: "" });
  }
  onChoiceChange(e) {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        text: value,
      },
      status: "",
    }));
  }
  onCorrectChange(e) {
    const { name } = e.target;
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        correct:
          !prevState[name].correct || prevState[name].correct === 0 ? 1 : 0,
      },
      status: "",
    }));
  }

  async onImageChange(e) {
    this.setState({
      qnImgStatus: "uploading",
      status: "",
    });

    let res = await this.props.saveImage(e.target.files[0]);
    let status = await res.DESCRIPTION;
    let obj = await res.OBJECT;

    if (status === "added") {
      this.setState({
        qnImgStatus: "uploaded",
        qnImage: obj,
      });
    } else {
      this.setState({
        [status]: "failed",
      });
    }
  }
  async onChoiceImageChange(e) {
    const { name, value } = e.target;

    let statusName = name + "ImgStatus";
    this.setState({
      [statusName]: "uploading",
      status: "",
    });

    let res = await this.props.saveImage(e.target.files[0]);
    let status = await res.DESCRIPTION;
    let obj = await res.OBJECT;
    if (status === "added") {
      this.setState((prevState) => ({
        [name]: {
          ...prevState[name],
          photo: obj,
        },
        [statusName]: "uploaded",
      }));
    } else {
      this.setState({
        [statusName]: "failed",
      });
    }
  }

  onClearQnImage(e) {
    e.preventDefault();
    this.setState({ qnImage: "", status: "" });
  }
  onClearChoiceImage(e, name) {
    e.preventDefault();
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        photo: "",
      },
      status: "",
    }));
  }

  onQnStatusChange(e) {
    e.preventDefault();
    this.setState({
      qnStatus: this.state.qnStatus === 0 ? 1 : 0,
      status:""
    });
  }

  async onSaveQuestion(e) {
    e.preventDefault();
    this.props.saveQuestion({ id: 1 });

    this.setState({
      status: "initiated",
    });

    const questionDto = {
      question: this.state.question,
      choices: [
        this.state.choice1.sequence===null?{...this.state.choice1,sequence:1}:this.state.choice1,
        this.state.choice2.sequence===null?{...this.state.choice2,sequence:2}:this.state.choice2,
        this.state.choice3.sequence===null?{...this.state.choice3,sequence:3}:this.state.choice3,
        this.state.choice4.sequence===null?{...this.state.choice4,sequence:4}:this.state.choice4,
      ],
      testId: this.props.testId,
      qnId: this.props.question ? this.props.question.qnId : null,
      qnImage: this.state.qnImage,
      qnStatus:this.state.qnStatus
    };

    const result = await this.props.saveToDbQuestion(questionDto);
    this.setState({
      testStatus: await result.DESCRIPTION,
    });
    if ((await result.DESCRIPTION) === "added") {
      this.setState({
        status: "saved",
      });
    } else {
      this.setState({
        status: "failed",
      });
    }
  }

  onUpdate(e) {
    e.preventDefault();
  }

  componentDidMount() {}
  render() {
    const {
      status,
      choice1,
      choice2,
      choice3,
      choice4,
      choice1ImgStatus,
      choice2ImgStatus,
      choice3ImgStatus,
      choice4ImgStatus,
      qnImgStatus,
      qnImage,
      qnStatus,
    } = this.state;
    const { question, cdnSource } = this.props;
    return (
      <Card className="main-card mb-3">
        <CardBody>
          <CardTitle>QUESTION {this.props.index} </CardTitle>
          <Form onSubmit={this.onSaveQuestion}>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <Label for="question">Question text</Label>
                  <Input
                    type="textarea"
                    name="question"
                    onChange={this.onChange}
                    value={this.state.question}
                    required
                  />
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="question">Question Image </Label>
                  <Input
                    type="file"
                    name="question-image"
                    className="mt-3"
                    onChange={this.onImageChange}
                  />
                  {qnImgStatus === "uploading" ? (
                    <div className="mt-3">Uploading...</div>
                  ) : (
                    ""
                  )}
                  {qnImgStatus === "uploaded" ? (
                    <div className="mt-3">Uploaded</div>
                  ) : (
                    ""
                  )}
                  {qnImgStatus === "failed" ? (
                    <div className="mt-3">Failed, Re-upload</div>
                  ) : (
                    ""
                  )}
                </FormGroup>
              </Col>
              {qnImage === "" || qnImage === null ? (
                ""
              ) : (
                <Col lg="3">
                  <img src={cdnSource + qnImage} width="150" height="150" />{" "}
                  <Button onClick={this.onClearQnImage}>Remove</Button>
                </Col>
              )}
            </Row>
            <Row>
              <Col lg="1">
                <input
                  type="checkbox"
                  name="choice1"
                  className="ml-4 mt-3"
                  onChange={this.onCorrectChange}
                  checked={choice1.correct === 1}
                />
              </Col>
              <Col lg="5">
                <FormGroup>
                  <Label for="choice1">
                    Answer Choice 1 {choice1.correct === 1 ? "(Correct)" : ""}
                  </Label>
                  <Input
                    type="textarea"
                    name="choice1"
                    onChange={this.onChoiceChange}
                    value={choice1.text}
                    required
                  />
                </FormGroup>
              </Col>
              <Col lg="3" className="pt-4">
                <FormGroup>
                  <Label for="choice1">Answer 1 Image</Label>
                  <Input
                    type="file"
                    name="choice1"
                    className="mt-3"
                    onChange={this.onChoiceImageChange}
                  />
                  {choice1ImgStatus === "uploading" ? (
                    <div className="mt-3">Uploading...</div>
                  ) : (
                    ""
                  )}
                  {choice1ImgStatus === "uploaded" ? (
                    <div className="mt-3">Uploaded</div>
                  ) : (
                    ""
                  )}
                  {choice1ImgStatus === "failed" ? (
                    <div className="mt-3">Failed, Re-upload</div>
                  ) : (
                    ""
                  )}
                </FormGroup>
              </Col>
              {choice1.photo === "" || choice1.photo === null ? (
                ""
              ) : (
                <Col lg="3">
                  <img src={cdnSource + qnImage} width="150" height="150" />{" "}
                  <Button
                    onClick={(e) => this.onClearChoiceImage(e, "choice1")}>
                    Remove
                  </Button>
                </Col>
              )}
            </Row>
            <Row>
              <Col lg="1">
                <input
                  type="checkbox"
                  name="choice2"
                  className="ml-4 mt-3"
                  onChange={this.onCorrectChange}
                  checked={choice2.correct === 1}
                />
              </Col>
              <Col lg="5">
                <FormGroup>
                  <Label for="choice2">
                    Answer Choice 2 {choice2.correct === 1 ? "(Correct)" : ""}
                  </Label>
                  <Input
                    type="textarea"
                    name="choice2"
                    onChange={this.onChoiceChange}
                    value={choice2.text}
                    required
                  />
                </FormGroup>
              </Col>
              <Col lg="3" className="pt-4">
                <FormGroup>
                  <Label for="choice2">Answer 2 Image</Label>
                  <Input
                    type="file"
                    name="choice2"
                    className="mt-3"
                    onChange={this.onChoiceImageChange}
                  />
                  {choice2ImgStatus === "uploading" ? (
                    <div className="mt-3">Uploading...</div>
                  ) : (
                    ""
                  )}
                  {choice2ImgStatus === "uploaded" ? (
                    <div className="mt-3">Uploaded</div>
                  ) : (
                    ""
                  )}
                  {choice2ImgStatus === "failed" ? (
                    <div className="mt-3">Failed, Re-upload</div>
                  ) : (
                    ""
                  )}
                </FormGroup>
              </Col>
              {choice2.photo === "" || choice2.photo === null ? (
                ""
              ) : (
                <Col lg="3">
                  <img src={cdnSource + qnImage} width="150" height="150" />{" "}
                  <Button
                    onClick={(e) => this.onClearChoiceImage(e, "choice2")}>
                    Remove
                  </Button>
                </Col>
              )}
            </Row>
            <Row>
              <Col lg="1">
                <input
                  type="checkbox"
                  name="choice3"
                  className="ml-4 mt-3"
                  onChange={this.onCorrectChange}
                  checked={choice3.correct === 1}
                />
              </Col>
              <Col lg="5">
                <FormGroup>
                  <Label for="choice3">
                    Answer Choice 3 {choice3.correct === 1 ? "(Correct)" : ""}
                  </Label>
                  <Input
                    type="textarea"
                    name="choice3"
                    onChange={this.onChoiceChange}
                    value={choice3.text}
                  />
                </FormGroup>
              </Col>
              <Col lg="3" className="pt-4">
                <FormGroup>
                  <Label for="choice3">Answer 3 Image</Label>
                  <Input
                    type="file"
                    name="choice3"
                    className="mt-3"
                    onChange={this.onChoiceImageChange}
                  />
                  {choice3ImgStatus === "uploading" ? (
                    <div className="mt-3">Uploading...</div>
                  ) : (
                    ""
                  )}
                  {choice3ImgStatus === "uploaded" ? (
                    <div className="mt-3">Uploaded</div>
                  ) : (
                    ""
                  )}
                  {choice3ImgStatus === "failed" ? (
                    <div className="mt-3">Failed, Re-upload</div>
                  ) : (
                    ""
                  )}
                </FormGroup>
              </Col>
              {choice3.photo === "" || choice3.photo === null ? (
                ""
              ) : (
                <Col lg="3">
                  <img src={cdnSource + qnImage} width="150" height="150" />{" "}
                  <Button
                    onClick={(e) => this.onClearChoiceImage(e, "choice3")}>
                    Remove
                  </Button>
                </Col>
              )}
            </Row>
            <Row>
              <Col lg="1">
                <input
                  type="checkbox"
                  name="choice4"
                  className="ml-4 mt-3"
                  onChange={this.onCorrectChange}
                  checked={choice4.correct === 1}
                />
              </Col>
              <Col lg="5">
                <FormGroup>
                  <Label for="choice4">
                    Answer Choice 4 {choice4.correct === 1 ? "(Correct)" : ""}
                  </Label>
                  <Input
                    type="textarea"
                    name="choice4"
                    onChange={this.onChoiceChange}
                    value={choice4.text}
                  />
                </FormGroup>
              </Col>
              <Col lg="3" className="pt-4">
                <FormGroup>
                  <Label for="choice4">Answer 4 Image</Label>
                  <Input
                    type="file"
                    name="choice4"
                    className="mt-3"
                    onChange={this.onChoiceImageChange}
                  />
                  {choice4ImgStatus === "uploading" ? (
                    <div className="mt-3">Uploading...</div>
                  ) : (
                    ""
                  )}
                  {choice4ImgStatus === "uploaded" ? (
                    <div className="mt-3">Uploaded</div>
                  ) : (
                    ""
                  )}
                  {choice4ImgStatus === "failed" ? (
                    <div className="mt-3">Failed, Re-upload</div>
                  ) : (
                    ""
                  )}
                </FormGroup>
              </Col>
              {choice4.photo === "" || choice4.photo === null ? (
                ""
              ) : (
                <Col lg="3">
                  <img src={cdnSource + qnImage} width="150" height="150" />{" "}
                  <Button
                    onClick={(e) => this.onClearChoiceImage(e, "choice4")}>
                    Remove
                  </Button>
                </Col>
              )}
            </Row>
            <Row>
              <Col lg="2">
                <input type="checkbox" onChange={this.onQnStatusChange} className="mr-2" checked={qnStatus===0}/>
                Visible to the users
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <FormGroup className="mt-3">
                  <FormGroup>
                    {status === "" ? (
                      <Button className="btn-warning">Save</Button>
                    ) : (
                      ""
                    )}
                    {status === "initiated" ? (
                      <Button className="btn-warning">Loading...</Button>
                    ) : (
                      ""
                    )}
                    {status === "failed" ? (
                      <Button className="btn-warning">
                        Failed, But Try again
                      </Button>
                    ) : (
                      ""
                    )}

                    {status === "saved" ? <Button disabled>Saved</Button> : ""}
                  </FormGroup>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  cdnSource: state.ThemeOptions.cdnSource,
});

export default connect(mapStateToProps, {
  saveQuestion,
  saveToDbQuestion,
  saveImage,
})(Question);
