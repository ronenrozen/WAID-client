import React from 'react';
import EditRule from './EditRule';

// const replaceIntToStr= (roleId) =>{
//     if (roleId === 1)
//         return "Read Only"
//     else
//         return "Admin"
// }

const Rule = ({ id, rule, type, action }) => {
    // role = replaceIntToStr(role)
  
    return (
        <tr>
            <td>{id}</td>
            <td>{rule}</td>
            <td>{type}</td>
            <td>{action}</td>
            <td><EditRule id={id} rule={rule} type={type} action={action} /></td>
        </tr>
    );
}

export default Rule;