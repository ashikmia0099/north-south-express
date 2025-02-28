


import Navbar from '../../Shared/Navbar';
import { Navigate, Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import { FaAd, FaBoxOpen, FaCalendar, FaEdit, FaHome, FaListOl, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { MdEdit, MdReviews } from 'react-icons/md';
import { FaUsersViewfinder } from 'react-icons/fa6';
import useRole from '../../hooks/useRole';
import AdminSiteBar from './AdminSiteBar/AdminSiteBar';
import DeliverySiteBar from './DeliverySiteBar/DeliverySiteBar';
import UserSiteBar from './UserSiteBar.jsx/UserSiteBar';



const Deshboard = () => {


    
    const [isActive, setActive] = useState(false);
    const [role, isLoading] = useRole();
    // console.log(role)

    



    return (
        <div>
            <Navbar />
            <div className="lg:flex">
                {/* dashboard side bar */}
                <div className="lg:w-64 lg:min-h-screen bg-neutral-800">


                    <ul className="menu p-4">

                        {role === 'admin' && <AdminSiteBar></AdminSiteBar>}
                        {role === 'deliveryman' && <DeliverySiteBar></DeliverySiteBar>}
                        {role === 'user' && <UserSiteBar></UserSiteBar>}
                        <li>
                            <NavLink to="updateprofile">
                                <MdEdit />
                                Update Profile
                            </NavLink>
                        </li>
                    </ul>
                </div>
                {/* dashboard content */}
                <div className="flex-1 p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};


export default Deshboard;