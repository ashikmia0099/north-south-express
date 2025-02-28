import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useRole from '../../hooks/useRole'
import { Navigate } from 'react-router-dom';

const DeliveryRouter = ({ children }) => {
    const { users, loading } = useContext(AuthContext);
    const [role, isLoading] = useRole();

    if (isLoading) {
        return <div>
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    if (role === 'deliveryman') {
        return children
    };


    return <Navigate to='login'></Navigate>
};

export default DeliveryRouter;