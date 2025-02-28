import { MdHealthAndSafety, MdOutlineSubtitles } from "react-icons/md";
import CountUp from 'react-countup';
import { FaShuttleVan, FaUsers } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const Fetures = () => {

     const { users, setUsers,parcel, setParcels } = useContext(AuthContext);
    

   
    
        useEffect(()=> {
                fetch('https://north-south-express-render.onrender.com/users')
                .then((res) => res.json())
                .then(data =>{
                    setUsers(data)
                })
                .catch(err => console.error('Error fetching users:', err));
            },[setUsers])
    
      
  
        useEffect(()=> {
                fetch('https://north-south-express-render.onrender.com/parcels')
                .then((res) => res.json())
                .then(data =>{
                    setParcels(data)
                })
                .catch(err => console.error('Error fetching users:', err));
            },[setParcels])
    
      

        const totalUser = users?.length || 0
        const totalParcel = parcel?.length || 0
  

     
    


    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-14">
            <div className=" px-10 py-5 bg-white shadow-xl mt-3 ">

                <div className="flex items-center">
                    <div>
                        <MdHealthAndSafety className="text-7xl text-slate-700 " />
                    </div>
                    <div className="text-4xl ">
                        <CountUp 
                        end={totalParcel}
                        duration={1} />
                        
                        </div>
                </div>

                <div className="card-body px-4 py-3">
                    <h2 className="card-title text-black flex font-bold items-center"> <span><MdOutlineSubtitles className='text-gray-500 text-2xl font-bold' /></span><span>Parcels Booked
                    </span></h2>
                    <p className='text-left text-stone-500 font-semibold'>Sending order update text messages builds trust in the purchase process and leads to long-lasting relationships between your brand and customers</p>
                </div>
            </div>
            <div className=" px-10 py-5 bg-white shadow-xl mt-3 ">

                <div className="flex items-center gap-4">
                    <div>
                        <FaShuttleVan className="text-7xl text-slate-700 " />
                    </div>
                    <div className="text-4xl ">
                        <CountUp 
                        end={400}
                        duration={1} />
                        
                        </div>
                </div>

                <div className="card-body px-4 py-3">
                    <h2 className="card-title text-black flex font-bold items-center"> <span><FaShuttleVan className='text-gray-500 text-2xl font-bold' /></span><span>Super Fast Delivery</span></h2>
                    <p className='text-left text-stone-500 font-semibold'>Over 2 lac people shop online worldwide, and they appreciate updates on their purchases and returns. </p>
                </div>
            </div>
            <div className=" px-10 py-5 bg-white shadow-xl mt-3 ">

                <div className="flex items-center gap-4">
                    <div>
                        <FaUsers  className="text-7xl text-slate-700 " />
                    </div>
                    <div className="text-4xl ">
                        <CountUp 
                        end={totalUser}
                        duration={1} />
                        
                        </div>
                </div>

                <div className="card-body px-4 py-3">
                    <h2 className="card-title text-black flex font-bold items-center"> <span><FaUsers className='text-gray-500 text-2xl font-bold' /></span><span>Our Happy Clients</span></h2>
                    <p className='text-left text-stone-500 font-semibold'>Ecommerce sales continue to surge as more consumers discover the benefits of online shopping, like lower prices and free shipping. </p>
                </div>
            </div>
           
        </div>
    );
};

export default Fetures;