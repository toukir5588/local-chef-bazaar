import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import UpdateOrderStatusModal from './UpdateOrderStatusModal'
const SellerOrderDataRow = ({ order ,user, refetch}) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  const { 

mealName, price, quantity, status, customer } = order || {}

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{mealName}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{customer}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>${price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{quantity}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className={`text-gray-900 ${status === 'delivered' ? 'text-green-500' : status === 'cancelled' ? 'text-red-500' : 'text-blue-500'}`}>{status}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
  
              <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Status</span>
        </span>
        {/* Modal */}
        <UpdateOrderStatusModal
          user={user}
          refetch={refetch}
          order={order}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
     
    
    </tr>
  )
}

export default SellerOrderDataRow
