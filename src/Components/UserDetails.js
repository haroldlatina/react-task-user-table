import React from 'react';
import PropTypes from 'prop-types';

const UserDetails = ({ row }) => {
    return (
        <tr>
            <td>
                {row.name}
            </td>
            <td>
                {row.gender}
            </td>
            <td>
                {row.age}
            </td>

        </tr>
    );
}

UserDetails.propTypes = {
    row: PropTypes.object,
};


export default UserDetails;