

import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
const useRole = () => {
    const { users: user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: role, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !!user?.email && !loading, 
        queryFn: async () => {
            console.log("Checking user role for:", user?.email);
            const { data } = await axiosSecure.get(`/users/role/${user?.email}`);
            return data.role;
        }
    });

    return [role, isLoading];
};
export default useRole;

