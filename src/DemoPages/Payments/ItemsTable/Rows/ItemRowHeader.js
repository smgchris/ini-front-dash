import React from 'react';
import { Table, Button } from 'reactstrap';

export default class ItemRowHeader extends React.Component {
  render() {
    return (
     
      <thead>
      <tr>
        <th>#</th>
        <th>Product Name</th>
        <th>Quantity</th>
        <th>Unit Price</th>
        <th>Total Price</th>
        <th>Expiration Date</th>
        <th>Date Added</th>
        <th>Supplier</th>
        
      </tr>
    </thead>
         
    );
  }
}
