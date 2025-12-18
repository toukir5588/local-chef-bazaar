import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SellerRequestsDataRow = ({ req, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleRoleUpdate = async () => {
    try {
      
      await axiosSecure.patch("/update-role", {
        email: req?.userEmail,
        role: "chef",
      });

      toast.success("Role Updated to Chef with a Unique ID!");

      
      await axiosSecure.delete(`/cancel-request/${req?.userEmail}`);

      
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to update role");
    }
  };

  const handleCancelRequest = async () => {
    try {
      await axiosSecure.delete(`/cancel-request/${req?.userEmail}`);
      toast.success("Request Rejected/Cancelled!");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Could not reject request");
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{req?.userEmail}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm space-x-3">
        {/* Approve/Make Chef Button */}
        <span
          onClick={handleRoleUpdate}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Make Chef</span>
        </span>

        {/* Reject/Cancel Button */}
        <span
          onClick={handleCancelRequest}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Reject</span>
        </span>
      </td>
    </tr>
  );
};

export default SellerRequestsDataRow;
