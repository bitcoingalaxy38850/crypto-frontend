import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import useLocalStorage from "../utils/hooks/useLocalStorage";
import { HOST_URL } from "../utils/constant";
import Loading from "./Loading";
import { addMachines } from "../redux/features/Machine_Slice";


const MachineListing = () => {
  const [token] = useLocalStorage("authToken"); // 1 hour expiry
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const machines = useSelector((store) => store.machine.machines);

  // Fetch machines from the API
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get(
          `${HOST_URL}/display+machine/getall+display+machines`
        );
        dispatch(addMachines(response.data));
      } catch (error) {
        console.error("Error fetching machines:", error);
        setError("Failed to load machines");
      } finally {
        setLoading(false);
      }
    };

    if (!token) {
      navigate("/");
    } else {
      fetchMachines();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({
          length: machines && machines.length > 0 ? machines.length : 4,
        }).map((_, index) => (
          <Loading key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!machines || machines.length === 0) {
    return <p className="text-center text-white">No machines are available.</p>;
  }

  const handleMachineClicked = (id) => {
    navigate(`/buy_machine/${id}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {machines.map((machine) => (
          <div
            className="bg-gray-800 p-3 rounded-lg shadow-md"
            key={machine.machine_id}
          >
            <img
              src={machine.url}
              loading="lazy"
              alt={machine.machine_name}
              className=" w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-white mb-2">
              {machine.machine_name}
            </h3>
            <p className="text-lg text-gray-300 mb-1">
              Price: ₹{machine.price}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              Valid for: {machine.valid_days} days
            </p>
            <p className="text-sm text-gray-400 mb-1">
              Interest Per Day: ₹
              {Math.round((machine.price * machine.interest_per_day) / 100)}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              Total Maturity Amount: ₹
              {Math.round(((machine.price * machine.interest_per_day) / 100) *
                machine.valid_days)}
            </p>
            <button
              onClick={() => handleMachineClicked(machine.machine_id)}
              className="bg-green-500 mt-3 w-full text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Start Mining
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default MachineListing;
