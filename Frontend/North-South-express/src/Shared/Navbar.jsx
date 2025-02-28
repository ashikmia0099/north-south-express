import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import logo from '../assets/images/logo/logo.png'
import { AuthContext } from '../AuthProvider/AuthProvider';
import { CgProfile } from 'react-icons/cg';
import { MdAttachEmail, MdDashboard } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';



const Navbar = () => {


    const { users, Logout } = useContext(AuthContext);
    const navigate = useNavigate()

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };



    const handleLogout = () => {
        Logout()
            .then(() => {
                navigate("/login")
            })
            .catch((error) => {
                // console.log('Error', error)
                return ('Error', error)
            })
    }


    const links = <>



        {
            users && users?.email ? (
                <div className='lg:flex'>

                    <NavLink to='/' className={({ isActive }) =>
                        isActive ? " border-b-4 border-[#A4DBC1] " : ""
                    }>
                        <li><p className='text-lg font-semibold'>Home</p></li>
                    </NavLink>
                </div>
            ) : (
                <div className='lg:flex'>

                    <NavLink to='/' className={({ isActive }) =>
                        isActive ? " border-b-4 border-[#A4DBC1] " : ""
                    }>
                        <li><p className='text-lg font-semibold'>Home</p></li>
                    </NavLink>
                    
                  
                </div>
            )
        }




    </>


    return (
        <div className="navbar  sticky top-0 z-40 backdrop-blur-xl  bg-white/30 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <img src={logo} className='h-14 w-20' alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            
            <div className="navbar-end flex">
            {users && users.email ? (
                <div className="navbar-end space-x-4 flex items-center">
                    <div className="relative">
                        <button onClick={toggleDropdown}>
                            {users.photoURL ? (
                                <img
                                    src={users.photoURL}
                                    alt="User Profile"
                                    className="h-8 w-8 rounded-full"
                                />
                            ) : (
                                <CgProfile role="button" tabIndex={0} className="h-8 w-8" />
                            )}
                        </button>
                        {dropdownVisible && (
                            <ul
                                className="absolute right-0 mt-2 bg-base-100 rounded-box z-[1]  px-5 py-4 text-left shadow space-y-2"
                            >
                                <li className=' '>
                                    <h3 className=' flex gap-3 items-center'>
                                        <span className="font-bold"><CgProfile></CgProfile></span> <span>{users.displayName}</span>
                                    </h3>
                                </li>
                                <li className=' '>
                                    <h3 className=' flex gap-3 items-center'>
                                        <span className="font-bold"><MdAttachEmail /></span> <span>{users.email}</span>
                                    </h3>
                                </li>
                                <li className=' '>
                                    <Link to='/deshboard'><h3 className=' flex gap-3 items-center'>
                                        <span className="font-bold"><MdDashboard /></span > <span className='font-lg font-semibold'>Dashboard</span>
                                    </h3></Link>
                                </li>
                                <li className=' '>
                                    <Link onClick={handleLogout}><h3 className=' flex gap-3 items-center'>
                                        <span className="font-bold"><IoLogOut /></span > <span className='font-lg font-semibold'>Logout</span>
                                    </h3></Link>
                                </li>
                               
                                
                            </ul>
                        )}
                    </div>
                   
                </div>
            ) : (
                <div className="navbar-end flex items-end justify-end">
                    <Link to="/login">
                        <a className="btn rounded-none rounded-l-full">Login</a>
                    </Link>
                    <Link to="/signup">
                        <a className="btn rounded-none rounded-r-full">Sign up</a>
                    </Link>
                </div>
            )}
        </div>
        </div>
    );
};

export default Navbar;