import React, { Fragment } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
// import {deleteProdCateg} from '../../../../actions/productCategActions';
import { connect } from 'react-redux';


class ItemRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  onUpdate(id) {
    window.location.assign("#/store/stock/update-stock-product/" + id)
  }
  onToggle() {
    this.setState({
      modal: !this.state.modal
    })
  }
  render() {

    const { item, index } = this.props;
    const { modal } = this.state;

    return (
      <Fragment>
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{item.product.product_name}</td>
          <td>{item.created_date}</td>
          <td>{item.entryQuantity}{' '}{item.unit}</td>
          <td>{parseInt(item.unit_price) * parseInt(item.entryQuantity)}</td>
          <td>{item.supplier.supplier_name}</td>
          <td>{item.paid == 0 ? <div className="badge badge-warning">Not paid</div> : <div className="badge badge-success">Paid</div>}</td>
          <td> <Button className=" btn-transition"
            color="primary" onClick={() => this.onToggle()}>Details</Button>{' '}{item.paid == 0 || this.props.user.role == 1 || this.props.user.role == 2 ? <Button outline className="btn-transition" color="primary" onClick={() => this.onUpdate(item.stock_product_id)}>Update</Button> :
              ''}</td>
        </tr>

        <Modal isOpen={modal} toggle={() => this.onToggle()} className="">
          <ModalHeader toggle={() => this.onToggle()}><b>{item.product.product_name}</b></ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Quantity Purchased: {item.entryQuantity}{' '+item.unit}</Label>
            </FormGroup>
            <FormGroup>
              <Label>Unit Price (FRW): {item.unit_price}</Label>
            </FormGroup>
            <FormGroup>
              <Label>Total Price (FRW): {parseInt(item.unit_price) * parseInt(item.entryQuantity)}</Label>
            </FormGroup>
            <FormGroup>
              <Label>Supplied By: {item.supplier.supplier_name}</Label>
            </FormGroup>
            <FormGroup>
              <Label>Entered in the store on: {item.created_date}</Label>
            </FormGroup>
            <FormGroup>
              <Label>Payment Status: {item.paid == 0 ? <div className="badge badge-warning">Not paid</div> : <div className="badge badge-success">Paid</div>}</Label>
            </FormGroup>
            <FormGroup>
              <Label>Payment Note: {item.pyt_note}</Label>
            </FormGroup>
            {item.modifier!=null?
            <FormGroup>
              <Label>Last Updated By: {item.modifier.names}</Label>
            </FormGroup>:''}
            {item.modified_date!=''?
            <FormGroup>
              <Label>Last Updated On: {item.modified_date}</Label>
            </FormGroup>:''}

          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </Modal>

      </Fragment>



    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, null)(ItemRow);