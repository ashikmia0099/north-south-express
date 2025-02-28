import React from 'react';
import { FaAd, FaBoxOpen, FaCalendar, FaEdit, FaHome, FaListOl, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { MdEdit, MdReviews } from 'react-icons/md';
import { FaUsersViewfinder } from 'react-icons/fa6';


const DeliverySiteBar = () => {
    return (
        <div>
            <li>
                <NavLink to="deliveryList">
                    <FaListOl />
                    My Delivery List
                </NavLink>
            </li>
            <li>
                <NavLink to="myreviews">
                    <MdReviews />
                    My Reviews
                </NavLink>
            </li>

        </div>
    );
};

export default DeliverySiteBar;