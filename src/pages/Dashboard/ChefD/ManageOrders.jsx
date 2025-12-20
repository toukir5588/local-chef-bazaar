import SellerOrderDataRow from '../../../components/Dashboard/TableRows/ChefOrderDataRow'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const ManageOrders = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(`/manage-orders/${user?.email}`)
      return result.data
    },
  })
  console.log(orders);

  if (isLoading) return <LoadingSpinner />

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-8'>
        <h2 className="text-2xl font-bold mb-4 text-amber-600">Manage Your Orders</h2>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden border border-gray-200'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr className='bg-amber-50'>
                  <th className='px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold'>
                    Meal Name
                  </th>
                  <th className='px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold'>
                    Customer
                  </th>
                  <th className='px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold'>
                    Price
                  </th>
                  <th className='px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold'>
                    Quantity
                  </th>
                  <th className='px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold'>
                    Status
                  </th>
                  <th className='px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold'>
                    Action
                  </th>
                  {/* <th className='px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold'>
                    Cancel
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <SellerOrderDataRow 
                    key={order._id} 
                    order={order} 
                    user={user}
                    refetch={refetch} 
                  />
                ))}
              </tbody>
            </table>
            {orders.length === 0 && (
              <div className="text-center py-10 text-gray-500 bg-white">
                No orders found yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageOrders