import React, { Fragment } from "react";

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
  resetState,
  setCurrentTestId,
  createTest,
  fetchQuestions,
  publishTest,
  saveImage
} from "../../../actions/studyActions";
import { PropTypes } from "prop-types";
import Question from "../AddTest/templates/Question";

class UpdateTestForm extends React.Component {
  constructor(props) {
    super(props);
    const { test } = this.props;
    this.state = {
      id: test.testId,
      title: test.testName,
      description: test.testDesc,
      language: test.locale,
      questions: [],
      testImage:test.displayPhoto,
      noq: test.questions,

      step: 1,
      savedNumberOfQuestions: this.props.numberOfQuestions,
      numberQuestions: 1,

      testStatus: "",
      modified: false,
      publishStatus: "",
      testImgStatus: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onTestSubmit = this.onTestSubmit.bind(this);
    this.onAddQuestion = this.onAddQuestion.bind(this);
    this.onTestPublish = this.onTestPublish.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onClearTestImage = this.onClearTestImage.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, modified: true });
  }
  onClearTestImage(e) {
    e.preventDefault();
    this.setState({ testImage: "", modified: true });
  }

  async onImageChange(e) {
    this.setState({
      testImgStatus: "uploading",
      modified: true
    });

    let res = await this.props.saveImage(e.target.files[0]);
    let status = await res.DESCRIPTION;
    let obj = await res.OBJECT;

    if (status === "added") {
      this.setState({
        testImgStatus: "uploaded",
        testImage: obj,
      });
    } else {
      this.setState({
        testImgStatus: "failed",
      });
    }
  }

  async onTestSubmit(e) {
    e.preventDefault();
    if (this.state.modified === true) {
      this.setState({
        testStatus: "initiated",
      });

      const testDto = {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        language: this.state.language,
        noq: this.state.noq,
        photo:this.state.testImage
      };

      const result = await this.props.createTest(testDto);
      this.setState({
        testStatus: await result.DESCRIPTION,
      });
      if ((await result.DESCRIPTION) === "added") {
        this.setState({
          step: this.state.step + 1,
          questions: this.state.questions,
        });
      } else {
        this.setState({
          testStatus: "failed",
        });
      }
    } else {
      this.setState({
        step: this.state.step + 1,
        questions: this.state.questions,
      });
    }
    this.props.setCurrentTestId(this.props.test.testId);
  }
  async onTestPublish(e) {
    e.preventDefault();
    this.setState({
      publishStatus: "publishing",
    });
    const result = await this.props.publishTest(this.state.id);

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

  onUpdate(e) {
    e.preventDefault();
  }
  onAddQuestion(e) {
    e.preventDefault();
    this.setState({
      questions: [
        ...this.state.questions,
        <Question
          key={this.state.numberQuestions}
          index={this.state.numberQuestions}
          testId={this.state.id}
        />,
      ],
      numberQuestions: this.state.numberQuestions + 1,
    });
  }

  async componentDidMount() {
    await this.props.fetchQuestions({ testId: this.state.id });
  }
  componentDidUpdate(prevProps) {
    if (this.props.numberOfQuestions !== prevProps.numberOfQuestions) {
      this.setState({
        savedNumberOfQuestions: this.props.numberOfQuestions,
      });
    }
    if (this.props.testId !== prevProps.testId) {
      this.setState({
        currentTestId: this.props.testId,
      });
    }
    if (this.props.questions !== prevProps.questions) {
      const questionsList = this.props.questions.map((question, index) => (
        <Question
          index={index + 1}
          key={index}
          question={question}
          testId={this.state.id}
        />
      ));
      this.setState({
        questions: questionsList,
      });
    }
  }
  render() {
    const { step, questions, savedNumberOfQuestions, testStatus, publishStatus, testImgStatus,testImage } = this.state;
    const {test,cdnSource}=this.props;

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
          {step === 1 ? (
            <Card className="main-card mb-3">
              <CardBody>
                <Form onSubmit={this.onTestSubmit}>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <Label for="title">Title</Label>
                        <Input
                          type="text"
                          name="title"
                          onChange={this.onChange}
                          value={this.state.title}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                          type="text"
                          name="description"
                          onChange={this.onChange}
                          value={this.state.description}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="language">Language</Label>
                        <Input
                          type="select"
                          bsSize="sm"
                          name="language"
                          onChange={this.onChange}
                          value={this.state.value}
                          required
                        >
                          <option value="en">English</option>
                          <option value="rw">Kinyarwanda</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="noq">Number of questions</Label>
                        <Input
                          type="number"
                          bsSize="sm"
                          name="noq"
                          onChange={this.onChange}
                          value={this.state.value}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label for="testimg">Test Thumbnail </Label>
                        <Input
                          type="file"
                          name="test-image"
                          className="mt-3"
                          onChange={this.onImageChange}
                        />
                        {testImgStatus === "uploading" ? (
                          <div className="mt-3">Uploading...</div>
                        ) : (
                          ""
                        )}
                        {testImgStatus === "uploaded" ? (
                          <div className="mt-3">Uploaded</div>
                        ) : (
                          ""
                        )}
                        {testImgStatus === "failed" ? (
                          <div className="mt-3">Failed, Re-upload</div>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </Col>
                    {testImage === "" || testImage === null ? (
                ""
              ) : (
                <Col lg="3">
                  <img src={cdnSource + testImage} width="150" height="150" />{" "}
                  <Button onClick={this.onClearTestImage}>Remove</Button>
                </Col>
              )}
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        {testStatus === "" ? <Button>Next</Button> : ""}
                        {testStatus === "initiated" ? (
                          <Button>Loading...</Button>
                        ) : (
                          ""
                        )}
                        {testStatus === "failed" ? (
                          <Button>Failed, But Try again</Button>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          ) : (
            <div></div>
          )}

          {step === 2 ? (
            <div>
              {questions}

              <div className="mt-3 mb-4">
                <Button onClick={this.onAddQuestion}>
                  Add another question
                </Button>
                {savedNumberOfQuestions > 0 ? (
                  <div className="mt-3">
                    {publishStatus === ""||publishStatus === "published"? (
                      <Button
                        onClick={this.onTestPublish}
                        className="ml-2 btn-success"
                      >
                       {test.status===1?'Publish Test':'Unpublish'}
                      </Button>
                    ) : (
                      ""
                    )}
                    {publishStatus === "publishing" ? (
                      <Button
                        className="ml-2 btn-success"
                        disabled
                      >
                       Making Changes...
                      </Button>
                    ) : (
                      ""
                    )}
                    {publishStatus=== "published" ? (
                      <Button
                        onClick={this.onTestPublish}
                        className="ml-2 btn-success"
                        disabled
                      >
                        Published
                      </Button>
                    ) : (
                      ""
                    )}
                    {publishStatus === "failed" ? (
                      <Button
                        onClick={this.onTestPublish}
                        className="ml-2 btn-success"
                      >
                        Failed, Try Publishing again
                      </Button>
                    ) : (
                      ""
                    )}

                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  numberOfQuestions: state.study.numberOfQuestions,
  testId: state.study.currentTestId,
  questions: state.study.questions,
  cdnSource: state.ThemeOptions.cdnSource,
});

export default connect(mapStateToProps, {
  resetState,
  setCurrentTestId,
  createTest,
  fetchQuestions,
  publishTest,
  saveImage,
})(UpdateTestForm);
