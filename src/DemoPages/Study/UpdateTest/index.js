import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { fetchTests } from '../../../actions/studyActions';


import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import UpdateTestForm from './UpdateTestForm';


class UpdateItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tests:this.props.tests
        }
    }
    
    componentDidMount() {
        const { fetchTests} = this.props
       
        fetchTests
    
    
    }

    componentDidUpdate(prevProps){
        
        if (this.props.tests !== prevProps.tests) {
            this.setState({
              tests: this.props.tests,
              
            })
          }
    }

    render() {
        if(typeof this.state.tests !== 'undefined' && this.state.tests.length === 0)
        return <div></div>

        const test=this.state.tests.find(test=>""+test.testId===""+this.props.match.params.id)
        return (
            <Fragment>
            
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Row>
                        <Col lg="12">
                            
                                    <CardTitle>EDIT TEST</CardTitle>
                                    <UpdateTestForm item_id={this.props.match.params.id} test={test}/>
                              
                            
                        </Col>

                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    tests: state.study.tests || [],
  })

export default connect(mapStateToProps, {fetchTests})(UpdateItem);
