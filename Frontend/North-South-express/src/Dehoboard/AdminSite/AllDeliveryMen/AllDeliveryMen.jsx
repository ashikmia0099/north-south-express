import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllDeliveryMen = () => {


    const { users, setUsers, alluser, setallUser, avarageReview, setAvarageReview } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
  
    const [deliveryMenWithReviews, setDeliveryMenWithReviews] = useState([]);

    const { data: dailverymans = [], refetch } = useQuery({
        queryKey: ['dailveryman'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/deliverymen');
            return res.data;
        }
    })





    // useEffect(() => {
    //     fetch(`https://north-south-express-render.onrender.com/deliverymen/parcels?email=${users.email}`)
    //         .then((res) => res.json())
    //         .then(data => {
    //             if (data.length > 0) {
    //                 const totalReviews = data.reduce((sum, item) => sum + (item.reviewStar || 0), 0);
    //                 const averageReview = totalReviews / data.length;
    //                 setAvarageReview(averageReview);
    //             } else {
    //                 setAvarageReview(0);
    //             }
    //         })

    // }, [users.email, setAvarageReview]);



    useEffect(() => {
        const fetchAverageReviews = async () => {
            const updatedDeliveryMen = await Promise.all(
                dailverymans.map(async (deliveryMen) => {
                    const res = await fetch(`https://north-south-express-render.onrender.com/deliverymen/parcels?email=${deliveryMen.email}`);
                    const parcels = await res.json();
                    if (parcels.length > 0) {
                        const totalReviews = parcels.reduce((sum, parcel) => sum + (parcel.reviewStar || 0), 0);
                        const averageReview = totalReviews / parcels.length;
                        return { ...deliveryMen, avarageReview: averageReview.toFixed(1) };
                    } else {
                        return { ...deliveryMen, avarageReview: '0' };
                    }
                })
            );
            setDeliveryMenWithReviews(updatedDeliveryMen);
        };
    
        if (dailverymans.length > 0) {
            fetchAverageReviews();
        }
    }, [dailverymans]);
    


    // console.log(avarageReview)

    console.log(avarageReview)



    return (
        <div>
            <h1 className='text-3xl font-semibold uppercase'>All Delivery Men</h1>
            <div className="overflow-x-auto my-10">
                <table className="table">
                    <thead>
                        <tr className='text-center'>
                            <th>#</th>
                            <th>Delivery Man Name</th>
                            <th>Delivery Man  Phone</th>
                            <th>Total Parcel Delivery</th>
                            <th>Avarage Review</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            deliveryMenWithReviews.map((delivery, index) => (
                                <tr key={delivery._id} className='text-center'>
                                    <th>{index + 1}</th>
                                    <th>{delivery.name}</th>
                                    <td>{delivery.phoneNumber}</td>
                                    <td>300</td>
                                    <td>{delivery.avarageReview}</td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDeliveryMen;


// // to do read
