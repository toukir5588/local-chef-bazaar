import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

const FavoriteMeals = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: favorites = [], refetch } = useQuery({
        queryKey: ['favorites', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/favorites/${user?.email}`);
            return data;
        },
    });

    const handleDelete = async (id) => {
        try {
            const { data } = await axiosSecure.delete(`/favorite/${id}`);
            if (data.deletedCount > 0) {
                toast.success("Meal removed from favorites successfully.");
                refetch();
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Favorite Meals</h2>
            <div className="overflow-x-auto border rounded-lg">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Meal Name</th>
                            <th>Chef Name</th>
                            <th>Price</th>
                            <th>Date Added</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favorites.map(item => (
                            <tr key={item._id}>
                                <td>{item.foodName}</td>
                                <td>{item.chefName}</td>
                                <td>${item.price}</td>
                                <td>{new Date(item.dateAdded).toLocaleDateString()}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-sm bg-red-500 text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FavoriteMeals;