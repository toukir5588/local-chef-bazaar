import { useState } from 'react';
import DeleteModal from '../../Modal/DeleteModal';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CustomerFavoritesDataRow = ({ favorite, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const closeModal = () => setIsOpen(false);

  // Note: Ensure your 'favorites' collection uses these field names
  const { foodImage, foodName, chefName, price, _id, dateAdded } = favorite || {};

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/favorite/${_id}`);
      toast.success("Meal removed from favorites successfully.");
      refetch(); // Refresh the list
      closeModal();
    } catch (err) {
      toast.error("Failed to remove favorite.");
      console.log(err);
    }
  };

  return (
    <tr>
      {/* Image */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <img
          alt={foodName}
          src={foodImage}
          className='mx-auto object-cover rounded h-12 w-20'
        />
      </td>

      {/* Meal Name */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 font-medium'>{foodName}</p>
      </td>

      {/* Chef Name */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{chefName}</p>
      </td>

      {/* Price */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 font-semibold'>${price}</p>
      </td>

      {/* Date Added */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>
          {dateAdded ? new Date(dateAdded).toLocaleDateString() : 'N/A'}
        </p>
      </td>

      {/* Delete Button */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-4 py-2 font-semibold text-red-900 leading-tight hover:scale-105 transition'
        >
          <span className='absolute inset-0 bg-red-200 opacity-50 rounded-lg'></span>
          <span className='relative'>Delete</span>
        </button>

        {/* Modular Delete Confirmation */}
        <DeleteModal 
            isOpen={isOpen} 
            closeModal={closeModal} 
            handleDelete={handleDelete} 
            id={_id} 
        />
      </td>
    </tr>
  );
};

export default CustomerFavoritesDataRow;