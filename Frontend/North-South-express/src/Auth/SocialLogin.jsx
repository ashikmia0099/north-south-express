import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const SocialLogin = () => {


    const { users, setUsers, loading, setLoading, SignInWithEmail, SignUpWithEmail, SignInWithGoogle, updateUserProfile, Logout, updatePhoneNumber } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate()
    


    const handleGoogleSignin = () => {
        SignInWithGoogle()
            .then((result) => {
                console.log(result.user);
    
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    // role: 'user'
                };
    
                axiosPublic.post('/users', userInfo)
                    .then((res) => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500,
                            });
    
                            // Navigate to dashboard 
                            navigate('/deshboard');
                        }
                    })
                    .catch((err) => {
                        console.error('Error adding user to the database:', err);
                    });
            })
            .catch((err) => {
                console.error('Error signing in with Google:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong with Google Sign-in!',
                });
            });
    };
    
    

    return (
        <div>
            <button onClick={handleGoogleSignin} className='btn mt-2 mx-2' > <FcGoogle /> Google</button>
        </div>
    );
};

export default SocialLogin;