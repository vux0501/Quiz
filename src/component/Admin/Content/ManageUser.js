import React from 'react';
import ModalCreateUser from './ModalCreateUser';

const ManageUser = () => {
    return (
        <div className="manage-user-container">
            <div className="title">Manage User</div>
            <div className="user-content">
                <div>
                    <button className="add-user">Add new user</button>
                </div>
                <div>
                    Table users
                    <ModalCreateUser />
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
