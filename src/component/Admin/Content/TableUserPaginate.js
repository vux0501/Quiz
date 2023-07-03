import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import ReactPaginate from 'react-paginate';

const TableUserPaginate = (props) => {
    const {
        listUsers,
        handleClickBtnUpdate,
        handleClickBtnView,
        handleClickBtnDelete,
        fetchListUsersWithPaginate,
        pageCount,
        currentPage,
        setCurrentPage,
    } = props;
    const handlePageClick = (event) => {
        fetchListUsersWithPaginate(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
    };

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
                            <td colSpan={5}>Not found data</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className="table-paginate">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    );
};

export default TableUserPaginate;
