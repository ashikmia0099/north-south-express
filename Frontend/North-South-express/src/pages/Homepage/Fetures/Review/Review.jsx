import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Navigation } from 'swiper/modules';
import { MdStarPurple500 } from 'react-icons/md';

const Review = () => {
    return (
        <div className=' my-10'>
            <div className='my-10 mx-auto text-center md:w-3/12'>
                <p className='text-yellow-600 pb-2'>---What Our Client Say---</p>
                <h3 className='text-3xl font-semibold py-3 border-y'>Testmonials</h3>
            </div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                <SwiperSlide >
                    <div className='flex flex-col items-center mx-24 my-16'>
                        <h1 className='text-4xl flex text-yellow-500 my-4 '>
                            <MdStarPurple500 />
                            <MdStarPurple500 />
                            <MdStarPurple500 />
                            <MdStarPurple500 />
                            <MdStarPurple500 />
                        </h1>
                        <p>Who doesn’t like to receive a “your order has been shipped” message? Once the order is ready to be dispatched, these templates notify your customers that their order is on the way. Remember to provide tracking information to ensure transparency in the shipping process.Who doesn’t like to receive a “your order has been shipped” message? Once the order is ready to be dispatched, these templates notify your customers that their order is on the way. Remember to provide tracking information to ensure transparency in the shipping process.</p>

                        <h1 className='text-2xl text-yellow-500 my-4'>Harman cardon</h1>
                    </div>

                </SwiperSlide>
                <SwiperSlide >
                    <div className='flex flex-col items-center mx-24 my-16'>
                        <h1 className='text-4xl flex text-yellow-500 my-4 '>
                            <MdStarPurple500 />
                            <MdStarPurple500 />
                            <MdStarPurple500 />
                            <MdStarPurple500 />
                            <MdStarPurple500 />
                        </h1>
                        <p>Sometimes, unforeseen circumstances like stock shortages, manufacturer delays, or backorders can lead to shipment delays. Here are some templates to handle these situations transparently and maintain your customers' trust.

                            Hi [Name], we apologize for the delay in your order from [Company]. Due to unexpected demand, your item is experiencing a slight delay. We'll keep you updated on the new delivery date.</p>

                        <h1 className='text-2xl text-yellow-500 my-4'>Alex Bob cardon</h1>
                    </div>

                </SwiperSlide>
                <SwiperSlide >
                    <div className='flex flex-col items-center mx-24 my-16'>
                        <h1 className='text-4xl flex text-yellow-500 my-4 '>
                            <MdStarPurple500 />
                            <MdStarPurple500 />
                            <MdStarPurple500 />
                            <MdStarPurple500 />
                            <MdStarPurple500 />
                        </h1>
                        <p>Sending a text message is a quick and easy way to ensure complete transparency with customer orders. You can effortlessly stay connected with customers and improve engagement by using an SMS messaging service to automate order confirmations, delivery notifications and return requests.Textedly makes it simple to start sending text messages to your customers. Our user-friendly texting platform has extensive features</p>

                        <h1 className='text-2xl text-yellow-500 my-4'>Danial Ronald </h1>
                    </div>

                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Review;