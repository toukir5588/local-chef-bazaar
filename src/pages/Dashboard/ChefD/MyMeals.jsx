import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import ChefMealCard from "./ChefMealCard";

const MyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: meals = [], isLoading, refetch } = useQuery({
    queryKey: ["my-meals", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/chef-inventory/${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email, 
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this meal?")) {
      try {
        const { data } = await axiosSecure.delete(`/remove-meal/${id}`);
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Meal removed successfully!");
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="flex flex-col mb-8">
        <h2 className="text-3xl font-black text-gray-800">My Kitchen Inventory</h2>
        <p className="text-gray-500">Manage and update your delicious creations.</p>
      </div>

      {meals.length === 0 ? (
        <div className="text-center py-20 text-gray-400 font-bold text-xl">
          No meals found. Start by adding one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((meal) => (
            <ChefMealCard 
              key={meal._id} 
              meal={meal} 
              handleDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyMeals;