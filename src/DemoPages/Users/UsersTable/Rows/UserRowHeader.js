import React from 'react';
import { Table, Button } from 'reactstrap';

export default class UserRow extends React.Component {
  render() {
    return (
     
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Username</th>
        <th>Balance</th>
        <th>End of Subscription</th>
        <th>Action</th>
      </tr>
    </thead>
         
    );
  }
}
