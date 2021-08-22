import React, { Fragment } from 'react';
import Tabs from 'react-responsive-tabs';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle3';
import SentTable from './Tables/SentTable';
import ReceivedTable from './Tables/ReceivedTable';
import Balance from "../Balance";



const tabsContent = [
    {
        title: 'Sent ',
        content: 
        <Card className="main-card mb-3">
            <CardBody>
                <SentTable/>
            </CardBody>
        </Card>
    },
    {
        title: 'Received',
        content: 
        <Card className="main-card mb-3">
            <CardBody>
                <ReceivedTable/>
            </CardBody>
        </Card>
    }


];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}


class ItemsTable extends React.Component {
    state = {
        buttonOptions: [
            {
                id: 1,
                text: 'Send Money',
                uri: 'send-money',
                icon: 'faPlusCircle'
            }
        ]
    }
    render() {
        return (
            <Fragment>
                <Balance></Balance>
                <PageTitle
                heading="Transactions History"
                subheading=""
                icon="pe-7s-drawer icon-gradient bg-happy-itmeo"
                buttonOptions={this.state.buttonOptions}

            />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        )
    }
}


export default ItemsTable;
