import React from 'react';
import { Table, Button } from 'reactstrap';

export default class UserRow extends React.Component {
  render() {
    return (
     
      <thead>
      <tr>
        <th>#</th>
        <th>Trx Date </th>
        <th>Recipient</th>
        <th>Amount (RWF)</th>
        <th>Trx Cost (RWF)</th>
        <th>Initiator</th>
        <th>Reason</th>
        <th>GW Message</th>
        <th>Status</th>
      </tr>
    </thead>
         
    );
  }
}
