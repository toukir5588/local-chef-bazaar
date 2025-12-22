import { useQuery } from "@tanstack/react-query";
import { FaUserAlt, FaDollarSign, FaTruck, FaHourglassHalf } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-stats");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Chart Data for BarChart
  const barData = [
    { name: "Total Orders", count: stats.totalOrders },
    { name: "Pending", count: stats.pendingOrders },
    { name: "Delivered", count: stats.deliveredOrders },
  ];

  // Chart Data for PieChart
  const pieData = [
    { name: "Pending", value: stats.pendingOrders },
    { name: "Delivered", value: stats.deliveredOrders },
  ];
  const COLORS = ["#F59E0B", "#10B981"];

  return (
    <div>
      <div className="mt-12">
        {/* Statistics Cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-4 grow">
          
          {/* Total Revenue */}
          <StatCard 
            title="Total Revenue" 
            value={`$${stats.totalRevenue}`} 
            icon={<FaDollarSign />} 
            color="from-orange-600 to-orange-400" 
          />

          {/* Total Users */}
          <StatCard 
            title="Total Users" 
            value={stats.users} 
            icon={<FaUserAlt />} 
            color="from-green-600 to-green-400" 
          />

          {/* Pending Orders */}
          <StatCard 
            title="Orders Pending" 
            value={stats.pendingOrders} 
            icon={<FaHourglassHalf />} 
            color="from-blue-600 to-blue-400" 
          />

          {/* Delivered Orders */}
          <StatCard 
            title="Orders Delivered" 
            value={stats.deliveredOrders} 
            icon={<FaTruck />} 
            color="from-pink-600 to-pink-400" 
          />
        </div>

        {/* Charts Section */}
        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* Bar Chart */}
          <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Order Overview</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#4F46E5" barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Delivery Status Ratio</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon, color }) => (
  <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
    <div className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center ${color} text-white shadow-gray-500/40`}>
      {icon}
    </div>
    <div className="p-4 text-right">
      <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{title}</p>
      <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{value}</h4>
    </div>
  </div>
);

export default AdminStatistics;