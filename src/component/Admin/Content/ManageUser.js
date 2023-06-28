import React from 'react';
import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const ManageUser = () => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    return (
        <div className="manage-user-container">
            <div className="title">Manage User</div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}>
                        <FaPlus /> Add new user
                    </button>
                </div>
                <div>Table users</div>
                <ModalCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser} />
            </div>
        </div>
    );
};

export default ManageUser;
