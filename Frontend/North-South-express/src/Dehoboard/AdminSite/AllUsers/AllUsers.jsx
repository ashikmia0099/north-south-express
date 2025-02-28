import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllUsers = () => {
    
    const {  setUsers, alluser, setallUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    



    // all user use tenstack query

    const {data : users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () =>{
            const res = await axiosSecure.get('parcels/count-user');
            return res.data.updatedUsers || [];
        }
    })

 
    
    

    
    const hadleRole = (userId, role) => {
        if (!userId || !role) return;
      
        axiosSecure.patch(`/user/admin/${userId}`, { role }) 
          .then((response) => {
            const data = response.data;
            if (data.modifiedCount > 0) {
              // Update the `alluser` state
              setallUser((prevUsers) =>
                prevUsers.map((user) =>
                  user._id === userId ? { ...user, role } : user
                )
              );
              refetch();
      
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User role updated successfully!',
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.error('Error updating role:', error);
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Failed to update role!',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      };
      

    return (
        <div>
            <h1 className="text-3xl font-semibold uppercase">All Users</h1>
            <div className="overflow-x-auto my-10">
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Total Parcel</th>
                            <th>User Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((singleUser, index) => (
                            <tr key={singleUser._id} className="text-center">
                                <th>{index + 1}</th>
                                <td>{singleUser.name}</td>
                                <td>{singleUser.email}</td>
                                <td>{singleUser.phoneNumber}</td>
                                <td>{singleUser.totalParcels}</td>
                                <td>
                                    <select
                                        className="select select-bordered w-full max-w-xs"
                                        value={singleUser.role}
                                        onChange={(e) => hadleRole(singleUser._id, e.target.value)}
                                    >
                                        <option disabled>User Type</option>
                                        <option value="admin">Admin</option>
                                        <option value="deliveryman">Delivery Men</option>
                                        <option value="user">User</option>
                                    </select>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
