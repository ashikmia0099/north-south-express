import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase/firebase.init';
import useAxiosPublic from '../hooks/useAxiosPublic';





export const AuthContext = createContext()

const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {


    const [alluser, setallUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUerData] = useState(null);
    const axiosPublic = useAxiosPublic();
    const [role, setRole] = useState(null);
    const [avarageReview, setAvarageReview] = useState({});
    const [parcel, setParcels] = useState([]);
    const [reviews, setReviews] = useState([]);


    // all user fetch

    useEffect(()=> {
        fetch('https://north-south-express-render.onrender.com/users')
        .then((res) => res.json())
        .then(data =>{
            setUsers(data)
        })
    },[setUsers])
    

    

    const totalUser = users?.length || 0
  





    // sign up with email

    const SignUpWithEmail = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)

       

       

    }

    // SignIn with email password

    const SignInWithEmail = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Sign in with Google

    const SignInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    }



    const updateUserProfile = (updatedData) =>{
        
        return updateProfile(auth.currentUser, updatedData);

    }




    // Sign Out user

    const Logout = () =>{
        return signOut(auth);
    }





    // handle onauthstate changed


    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUsers(currentUser);
            console.log(currentUser);
            if(currentUser){
                // get token store client site
                const userInfo = {email: currentUser.email};
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                    }
                })

            }
            else{
                // todo: remove token
                localStorage.removeItem('access-token')

            }
            setLoading(false);

        })

        return () => {
            unsubscribe();
        }

    }, [axiosPublic])



   


    const userInfo = {

        users,
        setUsers,
        loading,
        setLoading,
        SignInWithEmail,
        SignUpWithEmail,
        SignInWithGoogle,
        updateUserProfile,
        Logout,
        userData, 
        setUerData,
        alluser, 
        setallUser,
        role,
        setRole,
        avarageReview, 
        setAvarageReview,
        parcel, 
        setParcels,
        totalUser,
        reviews, setReviews
        

    }



    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;