import React, { useContext } from 'react';
import banner1 from '../../../assets/images/banner/banner1.jpg'
import './banner.css'
import { Parallax } from 'react-parallax';
import { motion } from "framer-motion";
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useAuth from '../../../hooks/useAuth';



const Banner = () => {

const {users, setUser} = useAuth()


    return (

        <div>
            
            <Parallax
                blur={{ min: -50, max: 50 }}
                bgImage={banner1}
                bgImageAlt="the dog"
                strength={-200}>
                <div className="hero min-h-screen bannerimage">

                    <div className="hero-overlay bg-opacity-60"></div>

                    <div className="hero-content text-neutral-content">

                        <div>
                            <div className=" w-full lg:w-[800px] mx-auto">
                                <label className="input input-bordered flex items-center gap-2 rounded-full">
                                    <input type="text" className="grow" placeholder="Search" />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                            fillRule="evenodd"
                                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                            clipRule="evenodd" />
                                    </svg>
                                </label>
                            </div>

                            <div className="grid lg:grid-cols-2 justify-center items-center mt-20">
                                {/* text div */}
                                <div className="text-left lg:ml-10">
                                    <h1 className="text-5xl font-bold my-4">Deliver The Goods On Time</h1>
                                    <h5 className="text-2xl font-semibold lg:w-1/2 my-4">Over All Bangladesh 64 Districts</h5>

                                    <button className="btn btn-outline btn-secondary">View More</button>
                                </div>
                                {/* card div */}
                                <div className='text-right space-y-2 mt-3 lg:mt-0 mx-auto lg:mx-0'>
                                    <div ><h1 className=' text-right opacity-90 w-72 rounded-none btn text-xl font-semibold py-2 text-white' >First Delivaery</h1></div>
                                    <div ><h1 className=' text-right opacity-90 w-72 rounded-none btn text-xl font-semibold py-2 text-white' >Stay On Your Location </h1></div>
                                    <div ><h1 className=' text-right opacity-90 w-72 rounded-none btn text-xl font-semibold py-2 text-white' >Nice User Review</h1></div>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Parallax>

           

        </div>
    );
};

export default Banner;


