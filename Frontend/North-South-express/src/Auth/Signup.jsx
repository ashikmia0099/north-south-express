import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';

import lottyimg from '../assets/images/auth/signup.json'
import Lottie from 'lottie-react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';



const Signup = () => {

    const axiosPublic = useAxiosPublic();

    const [error, setError] = useState({});
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const { users, setUsers, loading, setLoading, SignInWithEmail, SignUpWithEmail, SignInWithGoogle, updateUserProfile, Logout, updatePhoneNumber } = useContext(AuthContext);


    const handelSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const name = form.get('name');
        const phone = form.get('phone');
        const photourl = form.get('photourl');
        const email = form.get('email');
        const password = form.get('password');



        // phoneNumber

        SignUpWithEmail(email, password)
            .then(() => {
                updateUserProfile({ displayName: name, photoURL: photourl, phoneNumber: phone });
                
                // create user set in database on mongodb by express js
                
                const userInfo = {
                    name: name,
                    photo: photourl, 
                    email: email,
                    phoneNumber: phone,
                    // role: 'user'
                }
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        console.log('user added to the database')
                        
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User created successfully.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })

                
                return Logout();
            })
            .then(() => {
                navigate('/login');
            })
            .catch((err) => {
                let errorMessage;
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'This email is already in use.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address.';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'Password must be at least 6 characters.';
                        break;
                    default:
                        errorMessage = 'Something went wrong. Please try again.';
                }
                setError({ ...error, firebase: errorMessage });
            });
    };


    




    return (
        <div>

            <div className="bg-base-200 my-10">
                <h1 className="text-5xl font-bold  my-10 pt-10 uppercase">Sign UP now!</h1>
                <div className=" grid lg:grid-cols-2 py-10 px-5">
                    <div className="text-center lg:text-left ">
                        <Lottie animationData={lottyimg} loop={true} className=" mx-auto" />

                    </div>
                    <div className="card  bg-base-100 w-full  shadow-2xl ">
                        <form onSubmit={handelSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                            </div>
                            {error.name && <label className="label text-red-500">{error.name}</label>}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Phone Number</span>
                                </label>
                                <input type="number" name="phone" placeholder="Phone Number" className="input input-bordered" required />
                            </div>
                            {error.phone && <label className="label text-red-500">{error.phone}</label>}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Photo URL</span>
                                </label>
                                <input type="text" name="photourl" placeholder="Photo URL" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Password</span>
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    className="input input-bordered"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 text-xl top-12"
                                >
                                    {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            {error.firebase && <label className="label text-red-500">{error.firebase}</label>}

                            <div className="form-control w-full mt-6 mb-4">
                                <button className="btn bg-black border-none text-[#A4DBC1] text-xl font-semibold w-full hover:rounded-full hover:bg-[#6b9481] hover:text-black">
                                    Register
                                </button>
                            </div>
                        </form>
                        <p className='my-4'> <Link to={'/login'}>Already have an account</Link></p>
                        {/* <SocialLogin></SocialLogin> */}

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Signup;

