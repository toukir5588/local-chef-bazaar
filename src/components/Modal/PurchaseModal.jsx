import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useState, useEffect } from "react"; // useEffect আমদানি করা হলো
import { useForm, useWatch } from "react-hook-form";

const PurchaseModal = ({ closeModal, isOpen, meal }) => {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      receiverRegion: "",
      receiverDistrict: "",
      receiverCoveredArea: "",
      receiverAddress: "",
    },
  });

  const { user } = useAuth();
  const { _id, foodName, price, description, foodImage, chefName } = meal || {};

  const [totalQuantity, setTotalQuantity] = useState(1);

  // 1. Data Loading State
  const [serviceCenters, setServiceCenters] = useState([]);
  const [regions, setRegions] = useState([]);

  // Load data from the public folder (assuming the file path is correct)
  useEffect(() => {
    fetch("/serviceCenters.json")
      .then((res) => res.json())
      .then((data) => {
        setServiceCenters(data);

        // Extract unique regions after loading
        const regionsDuplicate = data.map((c) => c.region);
        setRegions([...new Set(regionsDuplicate)]);
      })
      .catch((error) => {
        console.error("Error loading service center data:", error);
      });
  }, []); // Only runs once on mount

  // 2. Dynamic Region/District Logic Setup
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  // Reset receiverDistrict when receiverRegion changes
  useEffect(() => {
    setValue("receiverDistrict", "");
  }, [receiverRegion, setValue]);

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const receiverDistrict = useWatch({ control, name: "receiverDistrict" });

  // Reset receiverCoveredArea when receiverDistrict changes
  useEffect(() => {
    setValue("receiverCoveredArea", "");
  }, [receiverDistrict, setValue]);

  const coveredAreasByDistrict = (region, district) => {
    const districtData = serviceCenters.find(
      (c) => c.region === region && c.district === district
    );
    return districtData?.covered_area || [];
  };

  // Quantity Handlers (unchanged)
  const handleIncrease = () => {
    if (totalQuantity < meal?.quantity) {
      setTotalQuantity(totalQuantity + 1);
    }
  };
  const handleDecrease = () => {
    if (totalQuantity > 1) {
      setTotalQuantity(totalQuantity - 1);
    }
  };

  const totalPrice = (meal?.price * totalQuantity).toFixed(2);

  // Form Submission Handler
  const onSubmit = async (addressData) => {
    if (
      !addressData.receiverAddress ||
      !addressData.receiverRegion ||
      !addressData.receiverDistrict
    ) {
      alert(
        "Please fill in all delivery details: Region, District, and Address."
      );
      return;
    }

    const paymentInfo = {
      mealId: _id,
      name: foodName,
      price: price,
      description,
      foodImage,
      quantity: totalQuantity,
      chef: chefName,
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        // Delivery Data
        deliveryData: {
             receiverRegion: addressData.receiverRegion ,
             receiverDistrict: addressData.receiverDistrict ,
             receiverCoveredArea: addressData.receiverCoveredArea ,
             receiverAddress: addressData.receiverAddress ,
         },
      },
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo
      );
      window.location.href = data.url;
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Review Info Before Purchase
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4 mt-4">
                {/* Quantity Selection (unchanged) */}
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-700">
                    Select Quantity:
                  </span>
                  {/* ... quantity buttons ... */}
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      className="w-8 h-8 flex text-center items-center justify-center rounded-full bg-white border border-yellow-600 text-yellow-600 font-bold hover:bg-yellow-600 hover:text-white transition"
                    >
                      -
                    </button>

                    <span className="text-xl font-bold w-6 text-center">
                      {totalQuantity}
                    </span>

                    <button
                      type="button"
                      onClick={handleIncrease}
                      className="w-8 h-8 flex text-center items-center justify-center rounded-full bg-white border border-yellow-600 text-yellow-600 font-bold hover:bg-yellow-600 hover:text-white transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* DELIVERY ADDRESS FIELDS */}
                <div className="mt-4 p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <h4 className="text-md font-bold mb-3 text-gray-800">
                    Delivery Location
                  </h4>

                  {/* receiver region */}
                  <fieldset className="fieldset mb-3">
                    <label className="label text-sm">Receiver Region</label>
                    <select
                      {...register("receiverRegion", {
                        required: "Region is required",
                      })}
                      defaultValue=""
                      className="w-full select select-bordered border border-gray-300 rounded-md p-2"
                    >
                      <option value="" disabled>
                        Pick a region
                      </option>
                      {/* Only render regions if data is loaded */}
                      {regions.length > 0 ? (
                        regions.map((r, i) => (
                          <option key={i} value={r}>
                            {r}
                          </option>
                        ))
                      ) : (
                        <option disabled>Loading Regions...</option>
                      )}
                    </select>
                  </fieldset>

                  {/* receiver district */}
                  <fieldset className="fieldset mb-3">
                    <label className="label text-sm">Receiver District</label>
                    <select
                      {...register("receiverDistrict", {
                        required: "District is required",
                      })}
                      defaultValue=""
                      className="w-full select select-bordered border border-gray-300 rounded-md p-2"
                      disabled={!receiverRegion}
                    >
                      <option value="" disabled>
                        Pick a district
                      </option>
                      {receiverRegion &&
                        districtsByRegion(receiverRegion).map((d, i) => (
                          <option key={i} value={d}>
                            {d}
                          </option>
                        ))}
                    </select>
                  </fieldset>

                  {/* receiver covered area */}
                  <fieldset className="fieldset mb-3">
                    <label className="label text-sm">
                      Receiver Covered Area
                    </label>
                    <select
                      {...register("receiverCoveredArea", {
                        required: "Covered area is required",
                      })}
                      defaultValue=""
                      className="w-full select select-bordered border border-gray-300 rounded-md p-2"
                      disabled={!receiverDistrict}
                    >
                      <option value="" disabled>
                        Pick a covered area
                      </option>
                      {receiverRegion &&
                        receiverDistrict &&
                        coveredAreasByDistrict(
                          receiverRegion,
                          receiverDistrict
                        ).map((area, i) => (
                          <option key={i} value={area}>
                            {area}
                          </option>
                        ))}
                    </select>
                  </fieldset>

                  {/* receiver address */}
                  <label className="label text-sm mt-2">Receiver Address</label>
                  <input
                    type="text"
                    {...register("receiverAddress", {
                      required: "Address is required",
                    })}
                    className="input w-full border border-gray-300 rounded-md p-2"
                    placeholder="Full delivery address"
                  />
                </div>
                {/* END OF DELIVERY ADDRESS FIELDS */}

                {/* Total Price */}
                <div className="flex justify-between items-center px-2 pt-4 border-t border-dashed">
                  <span className="text-gray-500 font-medium">
                    Total Payable Amount:
                  </span>
                  <span className="text-2xl font-extrabold text-yellow-600">
                    ${totalPrice}
                  </span>
                </div>
              </div>

              {/* Other info (Meal, Customer) */}
              <div className="mt-2">
                <p className="text-sm text-gray-500">Meal: {foodName}</p>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Customer: {user?.displayName}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex mt-6 justify-around">
                <button
                  type="submit"
                  className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  Pay
                </button>
                <button
                  type="button"
                  className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
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

export default PurchaseModal;
