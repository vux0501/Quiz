import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const TableUser = (props) => {
    const { listUsers, handleClickBtnUpdate, handleClickBtnView, handleClickBtnDelete } = props;

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers &&
                        listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <Button variant="dark" onClick={() => handleClickBtnView(item)}>
                                            View
                                        </Button>
                                        <Button
                                            variant="warning"
                                            className="mx-3"
                                            onClick={() => handleClickBtnUpdate(item)}
                                        >
                                            Update
                                        </Button>
                                        <Button variant="danger" onClick={() => handleClickBtnDelete(item)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    {listUsers && listUsers.length === 0 && (
                        <tr>
                            <td colSpan={4}>Not found data</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
};

export default TableUser;
