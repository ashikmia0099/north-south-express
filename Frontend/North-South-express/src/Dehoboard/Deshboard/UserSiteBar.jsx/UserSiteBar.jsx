import React from 'react';
import { FaAd, FaBoxOpen, FaCalendar, FaEdit, FaHome, FaListOl, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { MdEdit, MdReviews } from 'react-icons/md';
import { FaUsersViewfinder } from 'react-icons/fa6';



const UserSiteBar = () => {
    return (
        <div>
            
            <li>
                <NavLink to="bookparcel">
                    <FaCalendar />
                    Book Parcel
                </NavLink>
            </li>
            <li>
                <NavLink to="myparcels">
                    <FaShoppingCart />
                    My Parcels
                </NavLink>
            </li>
            
            
        </div>
    );
};

export default UserSiteBar;