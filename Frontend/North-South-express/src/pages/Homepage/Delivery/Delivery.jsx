import React, {  useContext, useEffect, useState } from 'react';

import img1 from '../../../assets/images/Delivery/person1.jpg';
import img2 from '../../../assets/images/Delivery/person2.jpg';
import img3 from '../../../assets/images/Delivery/person3.jpg';
import { FaPerson, FaRegStar, FaVanShuttle } from 'react-icons/fa6';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const Delivery = () => {


    const [AllDeliveryMens, setAllDeliveryMen] = useState([]);
    const [Allparcels, setAllparcels] = useState([]);
    
    const {reviews, setReviews} = useContext(AuthContext);


    // Fetch all delivery men
    useEffect(() => {
        fetch('https://north-south-express-render.onrender.com/users/deliverymen')
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setAllDeliveryMen(data);
            });
    }, []);



    // Fetch all parcels
    useEffect(() => {
        fetch('https://north-south-express-render.onrender.com/parcels')
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setAllparcels(data);
            });
    }, []);



    useEffect(() => {

        const deliverymenwisereview = AllDeliveryMens.map((deliveryman) => {

            const reviewsForDeliveryMan = Allparcels

                .filter((parcel) => parcel.deliverymanemail === deliveryman.email)
                .map((parcel) => ({
                    reviewStar: parcel.reviewStar,
                    reviewComment: parcel.reviewComment,
                  
                }));

            return {
                ...deliveryman,
                reviews: reviewsForDeliveryMan,
            };
        });

        setReviews(deliverymenwisereview);

    }, [AllDeliveryMens, Allparcels]);

    return (
        <div className="lg:px-20">
            <h1 className=" text-2xl md:text-4xl font-semibold my-10 uppercase">Our Fastest Delivery</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.slice(0, 3).map((deliveryman) => (
                    <div key={deliveryman.id} className="p-0 bg-white shadow-xl mt-3">
                        <img
                            className="w-full h-60 object-cover"
                            src={deliveryman.photo || img1}
                            alt="Delivery Person"
                        />
                        <div className="card-body px-4 py-3">
                            <h2 className="card-title text-black flex font-bold items-center">
                                <span>
                                    <FaPerson className="text-gray-500" />
                                </span>
                                <span>{deliveryman.name}</span>
                            </h2>
                            <h2 className="card-title text-black flex items-center">
                                <span>
                                    <FaVanShuttle className="text-gray-500" />
                                </span>
                                <span>100+</span>
                            </h2>
                            
                            <h2 className="card-title text-black flex items-center">
                                <FaRegStar className="text-orange-400 mr-2" />
                                {deliveryman.reviews.length > 0
                                    ? `${(deliveryman.reviews.reduce((sum, review) => sum + (review.reviewStar || 0), 0) / deliveryman.reviews.length).toFixed(1)} out of 5`
                                    : ' out of 5'}
                            </h2>

                            <p className="text-left text-stone-500 font-semibold">
                            Progressively underwhelm just in time resources via economically sound supply chains. Rapidiously target installed base portals without 24/365 supply chains. Continually utilize quality solutions before excellent.
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Delivery;
