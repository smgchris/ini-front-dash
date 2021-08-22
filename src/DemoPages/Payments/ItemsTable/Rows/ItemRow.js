import React from 'react';
import { Table, Button } from 'reactstrap';
// import {deleteProdCateg} from '../../../../actions/productCategActions';
import { connect } from 'react-redux';


class ItemRow extends React.Component {
  onDelete(id) {
    // this.props.deleteProdCateg(id)
  }

  onUpdate(id){
    window.location.assign("#/store/stock/update-stock-product/"+id)
  }
  render() {

    const {item,index} = this.props;


    return (

      <tr>
        <th scope="row">{index+1}</th>
        <td>{item.product.product_name }</td>
        <td>{item.quantity}{' '}{item.unit}</td>
        <td>{item.unit_price}</td>
        <td>{parseInt(item.unit_price)*parseInt(item.quantity)}</td>
        <td>{item.expiration_date}</td>
        <td>{item.created_date}</td>
        <td>{item.supplier.supplier_name}</td>
      </tr>



    );
  }
}



export default connect(null, null)(ItemRow);