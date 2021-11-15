import React from 'react';
import { Table, Button } from 'reactstrap';

export default class TestRow extends React.Component {
  render() {
    return (
     
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Description</th>
        <th>Language</th>
        <th>Date Created</th>
        <th>Action</th>
      </tr>
    </thead>
         
    );
  }
}
