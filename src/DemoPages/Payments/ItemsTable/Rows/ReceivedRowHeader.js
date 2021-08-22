import React from 'react';
import { Table, Button } from 'reactstrap';

export default class UserRow extends React.Component {
  render() {
    return (
     
      <thead>
      <tr>
        <th>#</th>
        <th>Trx Date </th>
        <th>Sender (Payer)</th>
        <th>Amount (RWF)</th>
        <th>Gateway Message</th>
        <th>Status</th>
      </tr>
    </thead>
         
    );
  }
}
