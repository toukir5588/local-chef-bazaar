import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddMealForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser, isLoading: userLoading } = useQuery({
    queryKey: ['dbUser', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user?.email}`);
      return data;
    },
  });

  const { isPending, isError, mutateAsync, reset: mutationReset } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post(`/meals`, payload),
    onSuccess: () => {
      toast.success("Meal added to Bazaar successfully!");
      mutationReset();
      reset(); 
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const imageFile = data.foodImage[0]; 

    try {
      const imageUrl = await imageUpload(imageFile);
      
      const ingredientsArray = data.ingredients
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== "");

      const mealData = {
        foodName: data.foodName,
        chefName: user?.displayName,
        foodImage: imageUrl,
        chefImage: user?.photoURL, 
        price: Number(data.price),
        rating: 0, 
        quantity: Number(data.quantity),
        Category: data.Category,
        ingredients: ingredientsArray,
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        chefId: dbUser?.chefId, 
        userEmail: user?.email,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
      };

      await mutateAsync(mealData);
    } catch (err) {
      toast.error(err.message || "Failed to process request");
    }
  };

  if (isPending || userLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 p-5 font-sans">
      <h2 className="text-3xl font-extrabold mb-6 text-amber-600 uppercase tracking-wider">
        Add New Meal
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-2xl border-t-8 border-amber-500">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-5">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Food Name</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                {...register("foodName", { required: "Food name is required" })}
                placeholder="e.g. Spicy Chicken Curry"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all cursor-pointer"
                  {...register("Category", { required: true })}
                >
                  <option value="Local">Local</option>
                  <option value="Fast Food">Fast Food</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Traditional">Traditional</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  {...register("quantity", { required: true, min: 1 })}
                  defaultValue={1}
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Short Description</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                {...register("shortDescription", { required: true })}
                placeholder="A quick summary of the dish"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Long Description</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none h-32 transition-all resize-none"
                {...register("longDescription", { required: true })}
                placeholder="Share the full recipe story or details..."
              ></textarea>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all font-mono"
                  {...register("price", { required: true })}
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Delivery Time</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  {...register("estimatedDeliveryTime", { required: true })}
                  placeholder="e.g. 30-45 mins"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Ingredients (Separated by commas)</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none h-20 transition-all resize-none"
                {...register("ingredients", { required: true })}
                placeholder="e.g. Salt, Pepper, Chicken, Garlic"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Chef ID (Auto)</label>
                <input
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-amber-700 font-bold cursor-not-allowed"
                  value={dbUser?.chefId || "Not Assigned"}
                  readOnly
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Chef Experience</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  {...register("chefExperience", { required: true })}
                  placeholder="e.g. 5 Years"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Chef Email</label>
              <input
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                value={user?.email}
                readOnly
              />
            </div>

            <div className="relative group">
              <div className="p-6 border-2 border-dashed border-amber-300 rounded-xl text-center bg-amber-50 group-hover:bg-amber-100 transition-colors">
                <input
                  type="file"
                  id="foodImage"
                  accept="image/*"
                  {...register("foodImage", { required: "Please upload an image" })}
                  className="hidden"
                />
                <label htmlFor="foodImage" className="cursor-pointer">
                  <span className="bg-amber-600 text-white px-8 py-2 rounded-full font-bold hover:bg-amber-700 transition shadow-md inline-block">
                    Upload Food Image
                  </span>
                  <p className="mt-2 text-sm text-amber-700 font-medium">Click to select high-quality food photo</p>
                </label>
              </div>
              {errors.foodImage && <p className="text-red-500 text-xs mt-2 absolute">{errors.foodImage.message}</p>}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 mt-12 bg-amber-600 text-white font-black text-xl rounded-xl hover:bg-amber-700 transition duration-300 shadow-xl active:scale-[0.98] flex justify-center items-center uppercase tracking-widest"
        >
          {isPending ? (
            <TbFidgetSpinner className="animate-spin text-3xl" />
          ) : (
            "Save Meal to Bazaar"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddMealForm;