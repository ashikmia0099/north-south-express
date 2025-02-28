import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { FaLocationDot } from 'react-icons/fa6';
import { MdCancel } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';



const DeliveryList = () => {


    const axiosPublic = useAxiosPublic();

    const { users, setUsers } = useContext(AuthContext);

    const [name, setName] = useState(['']);
    const [delivery, setDelivery] = useState([]);



    const axiosSecure = useAxiosSecure();




    // https://north-south-express-render.onrender.com/deliverymen/parcels?email=watermelon@gmail.com

    const { data: parcels = [], isError, isLoading } = useQuery({
        queryKey: ['parcels', name],
        queryFn: async () => {

            try {
                const res = await axiosPublic.get(`/deliverymen/parcels?email=${users.email}`);
                return res.data || [];
            } catch (error) {
                console.error('Error fetching parcels:', error);
                throw new Error('Failed to fetch parcels');
            }
        },
    });





    useEffect(() => {
        if (users.length > 0) {
            users.forEach(user => {
                setName(user.name)
                console.log('all users', (user.name[0]));
            });
        }
    }, [users]);





    // cancel parcel 

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

                            const remaining = delivery.filter(parcel => parcel._id !== _id);
                            setDelivery(remaining);


                        }
                    })
            }
        });
    }



    // handle delivery

    const handleDelivery = (_id) => {
        const deliveryman = users.name;
        const deliverymanId = users._id;
        const appxdeliveryDate = new Date().toISOString();

        fetch(`https://north-south-express-render.onrender.com/parcels/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: 'delivered',
                deliveryman,
                deliverymanId,
                deliverymanemail: users.email,
                appxdeliveryDate,
            }),
        })
            .then(res => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'The delivery status has been updated.',
                        icon: 'success',
                    });

                    setDelivery(prevDelivery =>
                        prevDelivery.map(parcel =>
                            parcel._id === _id ? { ...parcel, status: 'delivered', appxdeliveryDate, deliveryman, deliverymanId, deliverymanemail: users.email } : parcel
                        )
                    );
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to update the status.',
                        icon: 'error',
                    });
                }
            });
    };






    return (
        <div>

          
            <h1 className='text-4xl font-semibold uppercase'>All Delivery list</h1>
            <div className="overflow-x-auto my-10">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Booked User </th>
                            <th>Receive User</th>
                            <th>Booked Phone</th>
                            <th>Delivery Date</th>
                            <th>Appx Date</th>
                            <th>Receiver Phone</th>
                            <th>Receiver Address</th>
                            <th>Location Map</th>
                            <th>Cancel/Deliver  </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((user, index) => (
                                <tr key={user._id} className="text-center">
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.recivername}</td>
                                    <td>{user.Phonenumber}</td>
                                    <td>{user.timestamp}</td>
                                    <td>{user.appxdeliveryDate}</td>
                                    <td>{user.ReciverPhone}</td>
                                    <td>{user.deliveryAddress}</td>
                                    <td>
                                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                        <button className="btn" onClick={() => document.getElementById('my_modal_4').showModal()}><FaLocationDot className='text-2xl font-bold' /></button>
                                        <dialog id="my_modal_4" className="modal">
                                            <div className="modal-box w-11/12 max-w-5xl">
                                                <h3 className="font-bold text-lg">Hello!</h3>
                                                <p className="py-4">Click the button below to close</p>
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        {/* if there is a button, it will close the modal */}
                                                        <button className="btn">Close</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                        {/* <FaLocationDot className='text-2xl font-bold' /> */}
                                    </td>
                                    <td className=' items-center'>
                                        <div>
                                            <button onClick={() => handleDelete(user._id)} className='btn btn-xs text-red-500 my-2'>Cancel</button>

                                        </div>
                                        <td className=' items-center'>

                                            <div>
                                                <button
                                                    onClick={() => handleDelivery(user._id)}
                                                    className='btn btn-xs text-green-500 my-2'
                                                >
                                                    Delivery
                                                </button>
                                            </div>
                                        </td>

                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeliveryList;
