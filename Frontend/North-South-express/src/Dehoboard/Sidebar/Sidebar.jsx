import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUsers, FaBoxOpen, FaListOl, FaCalendar, FaShoppingCart, FaEdit } from 'react-icons/fa';
import { MdReviews, MdEdit } from 'react-icons/md';
import { FaUsersViewfinder } from 'react-icons/fa6';

const Sidebar = ({ role }) => {
  const menus = {
    Admin: [
      { name: 'Admin Home', path: 'adminHome', icon: <FaHome /> },
      { name: 'All Delivery Men', path: 'alldeliverymen', icon: <FaUsersViewfinder /> },
      { name: 'All Users', path: 'AllUsers', icon: <FaUsers /> },
      { name: 'All Parcels', path: 'AllParcels', icon: <FaBoxOpen /> },
    ],
    DeliveryMen: [
      { name: 'My Delivery List', path: 'deliveryList', icon: <FaListOl /> },
      { name: 'My Reviews', path: 'myreviews', icon: <MdReviews /> },
    ],
    User: [
      { name: 'User Home', path: '', icon: <FaHome /> },
      { name: 'Book Parcel', path: 'bookparcel', icon: <FaCalendar /> },
      { name: 'My Parcels', path: 'myparcels', icon: <FaShoppingCart /> },
      { name: 'Update Parcel', path: 'updateparcle', icon: <FaEdit /> },
      { name: 'Update Profile', path: 'updateprofile', icon: <MdEdit /> },
    ],
  };

  const roleMenus = menus[role] || []; 

  return (
    <div className="sidebar">
      <ul>
        {roleMenus.map((menu) => (
          <li key={menu.path}>
            <NavLink to={`/deshboard/${menu.path}`} className="flex items-center gap-2">
              {menu.icon}
              {menu.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

