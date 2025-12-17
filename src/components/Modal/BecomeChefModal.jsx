import React from 'react';
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form"; 
const BecomeChefModal = ({closeModal, isOpen}) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: user?.displayName || "", 
    },
  });

  const onSubmit = async (data) => {
    const requestInfo = {
      userName: data.userName, 
      userEmail: user?.email,
      requestType: "chef",
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/become-chef", requestInfo);
      toast.success("Request sent, please wait for admin approval!");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong!");
    } finally {
      closeModal();
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 shadow-xl rounded-2xl duration-300 ease-out"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-bold text-center text-gray-900"
            >
              Become A Chef!
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
              {/* Name Input Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Full Name
                </label>
                <input
                  type="text"
                  {...register("userName", { required: "Name is required" })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500"
                  placeholder="Enter your name"
                />
                {errors.userName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email (Read Only)
                </label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500"
                />
              </div>

              <p className="text-xs text-gray-500">
                By clicking continue, you agree to our chef terms and
                conditions.
              </p>

              <hr className="mt-4" />

              <div className="flex mt-4 justify-around">
                <button
                  type="submit"
                  className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-6 py-2 text-sm font-medium text-green-900 hover:bg-green-200"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-6 py-2 text-sm font-medium text-red-900 hover:bg-red-200"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default BecomeChefModal;