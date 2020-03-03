import React from 'react';
import EditUser from './EditUser';

const replaceIntToStr= (roleId) =>{
    if (roleId === 1)
        return "Read Only"
    else
        return "Admin"
}

const User = ({ id, username, email, role }) => {
    role = replaceIntToStr(role)
  
    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{role}</td>
            {/* <td><EditUser id={id} username={username} email={email} role={role} /></td> */}
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                Edit
            </button>
        </tr>
    );
}

export default User;