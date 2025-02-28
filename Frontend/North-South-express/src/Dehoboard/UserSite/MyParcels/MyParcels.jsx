

import React, { useContext, useEffect, useState } from 'react';
import { FaCcAmazonPay, FaEdit } from 'react-icons/fa';
import { MdDeleteForever, MdReviews } from 'react-icons/md';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const MyParcels = () => {
    const [myParcels, setMyParcels] = useState([]);
    const { users, setUsers, alluser, setallUser } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();



    useEffect(() => {
        if (users?.email) {
            // Fetch parcels using by login user email

            fetch(`https://north-south-express-render.onrender.com/parcels?email=${users.email}`)
                .then((res) => res.json())
                .then((data) => setMyParcels(data));
        }
    }, [users?.email]);


    // handle delete

    const handleDelete = (_id) => {


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://north-south-express-render.onrender.com/parcels/${_id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                })

                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount > 0) {

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel data has been deleted.",
                                icon: "success"
                            });


                            const remaining = myParcels.filter(parcel => parcel._id !== _id);
                            setMyParcels(remaining);
                        }
                    })
            }
        });
    }









    // Handle review submission
    const handleReview = (event, id) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const reviewStar = formData.get('reviewStar');
        const reviewComment = formData.get('reviewComment');


        const reviewDate = new Date().toLocaleString();

        const reviewData = {
            reviewStar,
            reviewComment,
            reviewDate
        };

        axiosSecure
            .patch(`/parcelsreview/${id}`, reviewData)
            .then((response) => {
                if (response.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Review submitted successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    // close  modal
                    document.getElementById(`modal-${id}`).close();
                }
            })
            .catch((error) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Failed to submit review!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                console.error('Error submitting review:', error);
            });
    };







    return (
        <div>
            <h1 className="text-4xl font-semibold uppercase">My All Booked Parcels</h1>

            <div className="overflow-x-auto my-10">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Requested Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Cancel</th>
                            <th>Review</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myParcels.map((parcel, index) => (
                            <tr key={parcel._id} className="text-center">
                                <th>{index + 1}</th>
                                <td>{parcel.timestamp}</td>
                                <td>{parcel.appxdeliveryDate}</td>
                                <td>{parcel.status || 'Pending'}</td>
                                <td>
                                    {
                                        parcel.status === 'pending' ? (

                                            <Link to={`/deshboard/updateparcle/${parcel._id}`}><button className='text-3xl text-green-600'><FaEdit /></button></Link>

                                        ) : (
                                            <button className='text-3xl text-gray-500' disabled><FaEdit /></button>
                                        )
                                    }



                                </td>
                                <td>
                                    {
                                        parcel.status === 'pending' ? (

                                            <button onClick={() => handleDelete(parcel._id)} className='text-3xl text-red-600'><MdDeleteForever /></button>


                                        ) : (
                                            <button disabled className='text-3xl text-gray-400'><MdDeleteForever /></button>
                                        )
                                    }
                                </td>
                                <td>
                                    {/* Trigger the modal */}
                                    {
                                        parcel.status === 'pending' || parcel.status === 'ontheway' ? (
                                            <button
                                                className="text-2xl text-gray-800"
                                                onClick={() => document.getElementById(`modal-${parcel._id}`).showModal()}
                                            >
                                                <MdReviews />
                                            </button>
                                        ) : (
                                            <button
                                                className="text-2xl text-yellow-800"
                                                onClick={() => document.getElementById(`modal-${parcel._id}`).showModal()}
                                            >
                                                <MdReviews />
                                            </button>
                                        )
                                    }

                                    {/* Modal */}
                                    <dialog id={`modal-${parcel._id}`} className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <form onSubmit={(event) => handleReview(event, parcel._id)}>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                                    onClick={() => document.getElementById(`modal-${parcel._id}`).close()}
                                                >
                                                    ✕
                                                </button>
                                                <h3 className="font-bold text-lg">Please Review the Delivery</h3>

                                                {/* Rating */}
                                                <div className="flex items-center gap-4 mt-4">
                                                    <label htmlFor="reviewStar" className="text-xl font-bold">
                                                        Rating:
                                                    </label>
                                                    <div className="rating">
                                                        <input
                                                            type="radio"
                                                            name="reviewStar"
                                                            value="1"
                                                            className="mask mask-star-2 bg-orange-400"
                                                        />
                                                        <input
                                                            type="radio"
                                                            name="reviewStar"
                                                            value="2"
                                                            className="mask mask-star-2 bg-orange-400"
                                                        />
                                                        <input
                                                            type="radio"
                                                            name="reviewStar"
                                                            value="3"
                                                            className="mask mask-star-2 bg-orange-400"
                                                        />
                                                        <input
                                                            type="radio"
                                                            name="reviewStar"
                                                            value="4"
                                                            className="mask mask-star-2 bg-orange-400"
                                                        />
                                                        <input
                                                            type="radio"
                                                            name="reviewStar"
                                                            value="5"
                                                            className="mask mask-star-2 bg-orange-400"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Comment */}
                                                <textarea
                                                    name="reviewComment"
                                                    className="textarea textarea-bordered w-full mt-5"
                                                    placeholder="Write your review here"
                                                    required
                                                ></textarea>

                                                <button type="submit" className="btn mt-4">
                                                    Submit
                                                </button>
                                            </form>
                                        </div>
                                    </dialog>
                                </td>

                                <td>
                                    <button className='text-3xl text-green-300'><FaCcAmazonPay /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;
