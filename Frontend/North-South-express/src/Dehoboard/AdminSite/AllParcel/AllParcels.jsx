import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineManageSearch } from 'react-icons/md';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const AllParcels = () => {

    const { setUsers, alluser, setallUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [selectedDeliveryman, setSelectedDeliveryman] = useState(null);


    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels');
            return res.data;
        }
    })


    const { data: dailverymans = [], } = useQuery({
        queryKey: ['dailveryman'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/deliverymen');
            return res.data;
        }
    })


    // handle delivery setup



    const handleDelivery = (event, id) => {
        event.preventDefault(); 

        const form = new FormData(event.target);
        const status = form.get('status');
        const appxdeliveryDate = form.get('appxdeliveryDate');

        if (!selectedDeliveryman) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please select a deliveryman',
                showConfirmButton: false,
                timer: 1500,
            });
            return; 
        }

        const formData = {
            status,
            deliveryman: selectedDeliveryman.name,  
            deliverymanId: selectedDeliveryman._id, 
            deliverymanemail: selectedDeliveryman.email, 
            appxdeliveryDate,
        };

        axiosSecure.patch(`/parcels/${id}`, formData)
            .then((response) => {
                const data = response.data;
                if (data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Parcel updated successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
                document.getElementById(`modal-${id}`).close();
            })
            .catch((error) => {
                console.error('Error updating parcel:', error);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Failed to update parcel!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };









    return (
        <div>
            <h1 className='text-3xl font-semibold uppercase'>All Parcels</h1>
            <div className="overflow-x-auto my-10">
                <table className="table">
                    <thead>
                        <tr>

                            <th>#</th>
                            <th>User Name</th>
                            <th>User Phone</th>
                            <th>Booking Date</th>
                            <th>Requested Delivery Date</th>
                            <th>Cost</th>
                            <th>Status </th>
                            <th>Manage Button</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => (<tr key={parcel._id} className='text-center'>

                                <th>{index + 1}</th>
                                <th>{parcel.name}</th>
                                <td>{parcel.Phonenumber}</td>
                                <td>{parcel.timestamp}</td>
                                <td>{parcel.timestamp}</td>
                                <td>{parcel.price}</td>
                                <td>{parcel.status}</td>
                                <td>

                                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                    {
                                        parcel.status === 'delivered' ? (
                                            <button className=' text-3xl text-gray-600' disabled onClick={() => document.getElementById(`modal-${parcel._id}`).showModal()}><FaEdit /></button>
                                        ):(
                                            <button className=' text-3xl text-green-600' onClick={() => document.getElementById(`modal-${parcel._id}`).showModal()}><FaEdit /></button>
                                        )
                                    }
                                    
                                    <dialog id={`modal-${parcel._id}`} className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <form onSubmit={(e) => handleDelivery(e, parcel._id)}>
                                                {/* delivery current position */}
                                                <h1>{parcel.name}</h1>
                                                <select
                                                    name="status"
                                                    defaultValue={parcel.status} 
                                                    onChange={(e) => {
                                                       
                                                        const updatedStatus = e.target.value;
                                                        const updatedParcel = { ...parcel, status: updatedStatus };

                                                        handleDelivery(e, parcel._id, updatedParcel);
                                                    }}
                                                    className="select select-bordered w-full my-2 mt-4"
                                                >
                                                    <option disabled>Set Status</option>
                                                    <option value="ontheway">On The Way</option>
                                                    <option value="pending">Pending</option>
                                                </select>

                                                {/* All delivery Men*/}
                                                <select
                                                    name="deliveryman"
                                                    onChange={(e) => {
                                                        const deliveryman = dailverymans.find(d => d.name === e.target.value); // Find the selected deliveryman
                                                        setSelectedDeliveryman(deliveryman); // Update the selected deliveryman state
                                                    }}
                                                    defaultValue={""}
                                                    className="select select-bordered w-full my-2"
                                                >
                                                    <option disabled selected>Select Delivery Men</option>
                                                    {dailverymans.map(singledeliverymen => (
                                                        <option key={singledeliverymen._id}>{singledeliverymen.name}</option>
                                                    ))}
                                                </select>


                                                {/* appromix date input */}
                                                <input type='datetime-local' name='appxdeliveryDate' placeholder="Delivery Date" className=" w-full input input-bordered" required />
                                                <div className=" justify-around my-2 ">
                                                    <button className="btn btn-primary">Submit</button>


                                                </div>
                                            </form>
                                        </div>
                                    </dialog>
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

export default AllParcels;