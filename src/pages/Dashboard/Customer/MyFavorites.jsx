import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import CustomerFavoritesDataRow from '../../../components/Dashboard/TableRows/CustomerFavoritesDataRow';

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetching data with refetch capability
  const { data: favorites = [], isLoading, refetch } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/favorites/${user?.email}`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h2 className="text-2xl font-semibold leading-tight mb-4">My Favorite Meals</h2>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold">Meal Image</th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold">Meal Name</th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold">Chef Name</th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold">Price</th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold">Date Added</th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((favorite) => (
                  <CustomerFavoritesDataRow 
                    key={favorite._id} 
                    favorite={favorite} 
                    refetch={refetch} 
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFavorites;