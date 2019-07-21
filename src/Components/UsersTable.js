import React from 'react';
import { Table } from 'react-bootstrap';
import UserDetails from './UserDetails';
import PropTypes from 'prop-types';

const UsersTable = props => {
    return (
        <Table>
            <thead>
                <tr>
                    {
                        props.tableHeader.map((header, index) => {
                            return (
                                <th key={index}>{header}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.userList.map((row, index) => {
                        return (
                            <UserDetails row={row} key={index} />
                        )
                    })
                }
                {
                    props.userList.length === 0 &&
                    <tr>
                        <td>No Results Found</td>
                    </tr>
                }
            </tbody>
        </Table>
    );
}

UsersTable.propTypes = {
    tableHeader: PropTypes.string.isRequired,
    userList: PropTypes.array.isRequired
};


export default UsersTable;