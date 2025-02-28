import React, { useContext, useEffect, useState } from 'react';
import { FaRegStar } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const MyReviews = () => {


    const axiosPublic = useAxiosPublic();

    const { users, setUsers, avarageReview, setAvarageReview } = useContext(AuthContext);

    const [name, setName] = useState(['']);


    // console.log(name)




    const { data: parcels = [], isError, isLoading } = useQuery({
        queryKey: ['parcels', name],
        queryFn: async () => {
            if (!name) return [];
            try {

                const res = await axiosPublic.get(`/deliverymen/parcels?email=${users.email}`);
                return res.data || [];
            } catch (error) {
                console.error('Error fetching parcels:', error);
                throw new Error('Failed to fetch parcels');
            }
        },
    });



    // review sum

    useEffect(() => {
        if (parcels.length > 0) {
            const totalStars = parcels.reduce((sum, parcel) => {
                // console.log( sum + (parcel.reviewStar || 0)); 
                return sum + (parcel.reviewStar || 0);
            }, 0);
            const average = (totalStars / 5).toFixed(2);
            setAvarageReview(average);
        }
    }, [parcels]);

    // console.log(avarageReview)





    useEffect(() => {
        if (users.length > 0) {
            users.forEach(user => {
                setName(user.name)
                // console.log('all users', (user.name[0])); 
            });
        }
    }, [users]);



    return (
        <div>
            <h1 className='text-4xl font-semibold uppercase'>All Review User</h1>
            <div className="overflow-x-auto my-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-center '>

                            <th>#</th>
                            <th>Name</th>
                            <th>Review Giving Date</th>
                            <th>Rating out of 5</th>
                            <th>Feedback </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            parcels.map((parcelreview, index) => <tr key={parcelreview._id} className='text-center'>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">

                                        <div>
                                            <div className="font-bold">{parcelreview.name}</div>

                                        </div>
                                    </div>
                                </td>
                                <td>{parcelreview.reviewDate}</td>
                                <td className=' flex items-center pt-6 '>
                                    <div><span>{parcelreview.reviewStar || 0} out of 5</span></div>
                                    <div>
                                    <span className='flex items-center text-center mx-auto text-yellow-400'>
                                        {[...Array(5)].map((_, i) => (
                                            <FaRegStar key={i} className={i < parcelreview.reviewStar ? 'text-yellow-400' : 'text-gray-300'} />
                                        ))}
                                    </span>
                                    </div>
                                </td>
                                <td className="overflow-hidden text-left">
                                    <p className="max-h-20 overflow-y-auto">
                                       {parcelreview.reviewComment}
                                    </p>
                                </td>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyReviews;