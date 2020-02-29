import React from 'react';

const User = ({ key, username, password, email, role }) => {
    return (
        <React.Fragment>
            <td>{key}</td>
            <td>{username}</td>
            <td>{password}</td>
            <td>{email}</td>
            <td>{role}</td>
        </React.Fragment>
    );
}

export default User;