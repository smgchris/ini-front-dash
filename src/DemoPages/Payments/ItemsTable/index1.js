import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

import PageTitle from '../../../../Layout/AppMain/PageTitle3';
import ItemsTableBordered from './Tables/ItemsTableBordered';



class ItemsTable extends React.Component {
    state = {
        buttonOptions: [
            {
                id: 1,
                text: 'Add new Stock product',
                uri: 'add-new-stock-product',
                icon: 'faPlusCircle'
            }
        ]
    }

    render() { 
        
        return <Fragment>
            <PageTitle
                heading="Products in the Stock"
                subheading="current available products in the stock"
                icon="pe-7s-drawer icon-gradient bg-happy-itmeo"
                buttonOptions={this.state.buttonOptions}

            />
            
            <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <Row>
                    <Col lg="12">
                        
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>Stock</CardTitle>
                                <ItemsTableBordered/>
                                
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
            </ReactCSSTransitionGroup>
        </Fragment>
    }
}


export default ItemsTable;
