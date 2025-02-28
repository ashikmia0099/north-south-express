import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const BookParcel = () => {

    const { users } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic()
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const [price, setPrice] = useState(0);





    const handleBookParcle = e => {
        e.preventDefault();


        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const Phonenumber = form.Phonenumber.value;
        const parcelType = form.parcelType.value;
        const parcelWeight = form.parcelWeight.value;
        const recivername = form.recivername.value;
        const ReciverPhone = form.ReciverPhone.value;
        const deliveryAddress = form.deliveryAddress.value;
        // const deliveryDate = form.deliveryDate.value;
        const deliveryLititude = form.deliveryLititude.value;
        const deliveryLongitude = form.deliveryLongitude.value;
        const price = form.price.value;

        // console.log(name, email, Phonenumber, parcelType, parcelWeight, recivername, ReciverPhone, deliveryAddress, deliveryLititude, deliveryLongitude, price,)

        const parcelInfo = {
            name: users.displayName,
            email: users.email,
            Phonenumber,
            parcelType,
            parcelWeight,
            recivername,
            ReciverPhone,
            deliveryAddress,
            // deliveryDate,
            deliveryLititude,
            deliveryLongitude,
            price,
            status: "pending",
            timestamp: formattedDate
        }

        axiosPublic.post('/parcels', parcelInfo)
            .then(res => {
                if (res.data.insertedId) {
                    // console.log('parcel added to the database')

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Parcel Added Successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })


    }



    
    

    // calculate price
    const calculatePrice = (weight) => {

        const weigthGramsConvert = weight * 1000;
        const totalPrice = weigthGramsConvert / 20;
        console.log(weigthGramsConvert, totalPrice );
        return totalPrice ;

       
    };

     // update price onchange
     const handleWeightChange = (e) => {
        const weight = parseFloat(e.target.value);
        setPrice(calculatePrice(weight));
    };


    return (
        <div>
            <h1 className='text-white text-3xl font-semibold'>Book A Parcel</h1>

            <div>
                <form onSubmit={handleBookParcle} className="card-body">
                    {/* Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text"> Name</span>
                        </label>
                        <input type="text" name='name' disabled defaultValue={users?.displayName || ''} placeholder="Name" className="input input-bordered" required />
                    </div>
                    {/* Eamil */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">User Email</span>
                        </label>
                        <input type="text" disabled name='email' defaultValue={users?.email} placeholder="User Email" className="input input-bordered" required />
                    </div>
                    {/* phone number */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="number" name='Phonenumber' defaultValue={users?.phoneNumber} placeholder="Phone Number" className="input input-bordered" required />
                    </div>
                    {/* parcel type and parcel weight */}
                    <div className='grid lg:grid-cols-2 gap-3'>
                        {/* parcel type */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Parcel type</span>
                            </label>
                            <input type="text" name='parcelType' placeholder="Parcel type" className="input input-bordered" required />
                        </div>
                        {/* parcel weight */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Parcel Weight ( kg )</span>
                            </label>
                            <input type='number' name='parcelWeight' onChange={handleWeightChange} placeholder="Parcel Weight ( kg )" className="input input-bordered" required />
                        </div>
                    </div>
                    {/* Reciver name and Reciver phone number */}
                    <div className='grid lg:grid-cols-2 gap-3'>
                        {/* Reciver name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Reciver Name </span>
                            </label>
                            <input type="text" name='recivername' placeholder="Reciver Name" className="input input-bordered" required />
                        </div>
                        {/* Reviver Phone number */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Reciver Phone</span>
                            </label>
                            <input type='text' name='ReciverPhone' placeholder="Reciver Phone" className="input input-bordered" required />
                        </div>
                    </div>
                    {/* Parcel deliver address and delivery date*/}
                    <div className='grid lg:grid-cols-2 gap-3'>
                        {/* Delivery Address */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Delivery Address </span>
                            </label>
                            <input type="text" name='deliveryAddress' placeholder="Delivery Address" className="input input-bordered" required />
                        </div>
                        {/*Delivery date */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type='number' name='price' value={price} placeholder="Price" className="input input-bordered" required />

                        </div>
                    </div>
                    {/* Parcel Delivery Address Latitude Delivery Address longitude*/}
                    <div className='grid lg:grid-cols-2 gap-3'>
                        {/* Delivery Address */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Delivery Address Latitude </span>
                            </label>
                            <input type="text" name='deliveryLititude' placeholder="Delivery Address" className="input input-bordered" required />
                        </div>
                        {/*Delivery price  */}
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Delivery Address longitude</span>
                            </label>
                            <input type='text' name='deliveryLongitude' placeholder="Delivery Address longitudee" className="input input-bordered" required />
                        </div>
                    </div>

                    {/* delivery price */}



                    {/* submit button */}
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookParcel;