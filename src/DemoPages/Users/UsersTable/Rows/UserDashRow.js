import React from 'react';
import { Table, Button } from 'reactstrap';
import { deleteUser, selectUser } from '../../../../actions/userActions';
import { connect } from 'react-redux';
import { AddUserForm } from '../../AddUser/AddUserForm'


class UserRow extends React.Component {
  onDelete(id) {
    this.props.deleteUser(id)
  }

  onUpdate(id) {
    window.location.assign("#/users/update-user/" + id)
  }

  onActivate(id){

  }

  // onUpdate(user){
  //   // const userItems= this.props.user.map(user => (
  //   //   <AddUserForm key={user.user_id} user={user} />
  //   // ))
  //   window.location.assign(`#/users/add-new-user`)
  //   // this.props.selectUser(user)
  // }
  render() {
    const { user, index } = this.props;
    let unix_timestamp = user.packs
    var date = new Date(unix_timestamp);
    var day=date.getDate()
    var month=date.getMonth()+1
    var year=date.getFullYear()
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime =day+'/'+month+'/'+year;

    return (

      <tr>
        <th scope="row">{index + 1}</th>
        <td>{user.firstName}</td>
        <td>{user.username}</td>
        <td>{user.role.name}</td>
        <td>{user.status===0?<div className="badge badge-success">Active</div>:<div className="badge badge-warning">Deactivated</div>}</td>
        <td><Button outline className="mb-2 mr-2 btn-transition" color="primary" onClick={() => this.onUpdate(user.id)}>Update</Button>
        
        </td>
      </tr>

    );
  }
}



export default connect(null, { deleteUser })(UserRow);


// https://stackoverflow.com/questions/62335311/how-to-update-user-info-with-react-redux
