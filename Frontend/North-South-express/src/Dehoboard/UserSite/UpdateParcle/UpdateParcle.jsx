import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';



const UpdateParcle = () => {


    const { users } = useContext(AuthContext);
    const UpdateParcelData = useLoaderData()

    const { _id, name, email, Phonenumber, parcelType, parcelWeight, recivername, ReciverPhone, deliveryAddress, timestamp, deliveryLititude, deliveryLongitude, price, } = UpdateParcelData;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;


    


    // update parcel data

    const handleUpdateParcel = e => {
        e.preventDefault();
        // console.log('Update a Pacel')

        const form = e.target;
        const number = form.number.value;
        const parcelType = form.parcelType.value;
        const parcelWeight = form.parcelWeight.value;
        const recivername = form.recivername.value;
        const ReciverPhone = form.ReciverPhone.value;
        const deliveryAddress = form.deliveryAddress.value;
        // const timestamp = form.timestamp.value;
        const deliveryLititude = form.deliveryLititude.value;
        const deliveryLongitude = form.deliveryLongitude.value;
        const price = form.price.value;



        // console.log(number, parcelType, parcelWeight, recivername, ReciverPhone, deliveryAddress, timestamp, deliveryLititude, deliveryLongitude, price,);

        const UpdateParcelData = {

            number,
            parcelType,
            parcelWeight,
            recivername,
            ReciverPhone,
            deliveryAddress,
            timestamp,
            deliveryLititude,
            deliveryLongitude,
            price,
            status: "pending",
            timestamp: formattedDate

        };


        fetch(`https://north-south-express-render.onrender.com/parcel/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(UpdateParcelData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Parcel Post Update Successfull",
                        icon: "success",
                        draggable: true
                    });
                }
            })
    }





    return (
        <div>
            <h1 className='text-white text-3xl font-semibold'>Update A Parcel</h1>

            <div>
                <form onSubmit={handleUpdateParcel} className="card-body">
                    {/* Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text"> Name</span>
                        </label>
                        <input type="text" name='name' defaultValue={users.displayName} disabled placeholder="Name" className="input input-bordered" required />
                    </div>
                    {/* Eamil */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">User Email</span>
                        </label>
                        <input type="text" name='email' defaultValue={users?.email} disabled placeholder="User Email" className="input input-bordered" required />
                    </div>
                    {/* phone number */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="number" name='number' defaultValue={Phonenumber} placeholder="Phone Number" className="input input-bordered" required />
                    </div>
                    {/* parcel type and parcel weight */}
                    <div className='grid lg:grid-cols-2 gap-3'>
                        {/* parcel type */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Parcel type</span>
                            </label>
                            <input type="text" name='parcelType' defaultValue={parcelType} placeholder="Parcel type" className="input input-bordered" required />
                        </div>
                        {/* parcel weight */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Parcel Weight</span>
                            </label>
                            <input type='number' name='parcelWeight' defaultValue={parcelWeight} placeholder="Parcel Weight" className="input input-bordered" required />
                        </div>
                    </div>
                    {/* Reciver name and Reciver phone number */}
                    <div className='grid lg:grid-cols-2 gap-3'>
                        {/* Reciver name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Reciver Name </span>
                            </label>
                            <input type="text" name='recivername' defaultValue={recivername} placeholder="Reciver Name" className="input input-bordered" required />
                        </div>
                        {/* Reviver Phone number */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Reciver Phone</span>
                            </label>
                            <input type='text' name='ReciverPhone' defaultValue={ReciverPhone} placeholder="Reciver Phone" className="input input-bordered" required />
                        </div>
                    </div>
                    {/* Parcel deliver address and delivery date*/}
                    <div className='grid lg:grid-cols-2 gap-3'>
                        {/* Delivery Address */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Delivery Address </span>
                            </label>
                            <input type="text" name='deliveryAddress' defaultValue={deliveryAddress} placeholder="Delivery Address" className="input input-bordered" required />
                        </div>
                        {/* delivery price */}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type='number' name='price' defaultValue={price} placeholder="Price" className="input input-bordered" required />

                        </div>

                    </div>
                    {/* Parcel Delivery Address Latitude Delivery Address longitude*/}
                    <div className='grid lg:grid-cols-2 gap-3'>

                        {/* Delivery Address */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">delivery Address Latitude </span>
                            </label>
                            <input type="text" defaultValue={deliveryLititude} name='deliveryLititude' placeholder="Delivery Address" className="input input-bordered" required />
                        </div>
                        {/*Delivery date */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Delivery Address longitude</span>
                            </label>
                            <input type='text' defaultValue={deliveryLongitude} name='deliveryLongitude' placeholder="Delivery Address longitudee" className="input input-bordered" required />
                        </div>
                    </div>





                    {/* submit button */}
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateParcle;