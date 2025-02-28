import React from 'react';
import { FaAd, FaBoxOpen, FaCalendar, FaEdit, FaHome, FaListOl, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { MdEdit, MdReviews } from 'react-icons/md';
import { FaUsersViewfinder } from 'react-icons/fa6';

const AdminSiteBar = () => {
    return (
        <div>
            <li>
                <NavLink to="adminHome">
                    <FaHome />
                    Admin Home
                </NavLink>
            </li>
            <li>
                <NavLink to="alldeliverymen">
                    <FaUsersViewfinder />
                    All Delivery Men
                </NavLink>
            </li>
            <li>
                <NavLink to="AllUsers">
                    <FaUsers />
                    All Users
                </NavLink>
            </li>
            <li>
                <NavLink to="AllParcels">
                    <FaBoxOpen />
                    All Parcels
                </NavLink>
            </li>
        </div>
    );
};

export default AdminSiteBar;