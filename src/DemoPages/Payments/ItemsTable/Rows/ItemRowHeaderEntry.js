import React from 'react';
import { Table, Button } from 'reactstrap';

export default class ItemRowHeader extends React.Component {
  render() {
    return (
     
      <thead>
      <tr>
        <th>#</th>
        <th>Product Name</th>
        <th>Date Added</th>
        <th>Quantity</th>
        <th>Total Price</th>
        <th>Supplier</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
         
    );
  }
}
