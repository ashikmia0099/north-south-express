import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router-dom';

import lottyimglogin from '../assets/images/auth/loginlotte.json'
import Lottie from 'lottie-react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaEyeSlash, FaFacebook, FaRegEye } from 'react-icons/fa';
import { AuthContext } from '../AuthProvider/AuthProvider';
import SocialLogin from './SocialLogin';
import useRole from '../hooks/useRole';



const Login = () => {



    const { users, setUsers, SignInWithEmail, SignInWithGoogle, Logout, } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
   

    const handleEmailSignIn = e => {
        e.preventDefault();


        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        SignInWithEmail(email, password)
            .then((result) => {
                const user = result.user;
                setUsers(user);
                navigate('/deshboard');

                
                console.log(user);
            })
            .catch((error) => {
                console.log('Error', error)
                // return ('Error', error)
            })

        console.log('Sing in with email', email, password)
        // return ('Sing in with email', email, password)
    }







    return (
        <div>

            <div className="bg-base-200 my-10">
                <h1 className="text-5xl font-bold  my-10 pt-10 uppercase">Sign in now!</h1>
                <div className=" grid lg:grid-cols-2 py-10 px-5">
                    <div className="text-center lg:text-left ">
                        <Lottie animationData={lottyimglogin} loop={true} className=" mx-auto h-full" />

                    </div>
                    <div className="card  bg-base-100 w-full  shadow-2xl ">
                        <form onSubmit={handleEmailSignIn} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Password</span>
                                </label>

                                <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered" required />
                                <button onClick={() => setShowPassword(!showPassword)} className=' absolute right-4 text-xl top-12'>{showPassword ? <FaRegEye /> : <FaEyeSlash />}</button>

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover text-white hover:text-white">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6 mb-4">
                                <button className="btn bg-black border-none text-[#A4DBC1] text-xl font-semibold w-full hover:rounded-full hover:bg-[#6b9481] hover:text-black">Login</button>
                            </div>
                            <div className=' md:flex  gap-4 '>
                                <SocialLogin></SocialLogin>
                                <button className='btn mt-2 mx-2'><FaFacebook className='text-[#005EFF]' />Facebook</button>
                                <button className='btn mt-2 mx-2'> <FaApple /> Apple</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;