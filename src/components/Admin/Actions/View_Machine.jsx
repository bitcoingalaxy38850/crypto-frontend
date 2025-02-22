import React, { useEffect, useState } from "react";
import axios from "axios";
import { HOST_URL } from "../../../utils/constant";
import ReactPaginate from "react-paginate";

import ModalEdit from "./ModalEdit";
import BackButton from "../../BackButton";
import toast from "react-hot-toast";

const View_Machine = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [singleMachine, setSingleMachine] = useState({});
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage] = useState(10); // Items per page
  const [flag , setFlag] = useState(false)

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get(
          `${HOST_URL}/display+machine/getall+display+machines`
        );
        setMachines(response.data); // Assuming response.data is an array of machines
 
        
   
      } catch (err) {
        setError("Error fetching machines");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, [singleMachine , flag]);

  if (loading) return <h1 className="text-center mt-10">Loading...</h1>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  // Calculate current machines to display
  const offset = currentPage * itemsPerPage;
  const currentMachines = machines.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(machines.length / itemsPerPage);

  // Handle page change
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Edit button click handler
  const handleEditClick = (item) => {
    setSingleMachine(item);
    setShowModal(true);
  };

  const handleUpdate = async (updateInfo) => {
   
  
    try {
      // Make the PUT or POST request to the API
      const response = await axios.put(`${HOST_URL}/display+machine/updatemachine`, updateInfo);
      setFlag(true)
  
      // Handle the response
      if (response.status === 200) {
   
        toast.success("Machine updated successfully!");
      } else {
        toast.error("Failed to update the machine.");
      }
    } catch (error) {
      console.error("Error updating the machine:", error);
      toast.error("Error updating the machine. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen bg-[#161925] w-full ">
    <div className="container bg-[#161925] mx-auto p-6">
      <h2 className="text-2xl text-white font-bold mb-4 text-center">View Machines</h2>
      <BackButton />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                Machine Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                Price
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                Valid Days
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                Interest Per Day (%)
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                Machine URL
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentMachines.map((machine) => (
              <tr key={machine.machine_id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="py-3 px-4 border-b border-gray-300">
                  {machine.machine_name}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                ₹{machine.price.toFixed(2)}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {machine.valid_days}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {machine.interest_per_day}%
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  <img
                    src={machine.url}
                    alt="Machine QR Code"
                    className="h-16 w-16 rounded"
                  />
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  <button
                    onClick={() => handleEditClick(machine)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={
          <span className="text-white font-semibold">Previous</span>
        }
        nextLabel={<span className="text-white font-semibold">Next</span>}
        breakLabel={<span className="text-white">...</span>}
        breakClassName={"mx-2"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center mt-6"}
        pageClassName={"mx-1"}
        pageLinkClassName={
          "border border-gray-300 hover:border-blue-500 text-white hover:bg-blue-100 px-3 py-1 rounded transition duration-200"
        }
        previousClassName={"mx-1"}
        previousLinkClassName={
          "border border-gray-300 hover:border-blue-500 hover:bg-blue-100 px-3 py-1 rounded transition duration-200"
        }
        nextClassName={"mx-1"}
        nextLinkClassName={
          "border border-gray-300 hover:border-blue-500 hover:bg-blue-100 px-3 py-1 rounded transition duration-200"
        }
        activeClassName={"bg-blue-500 text-white"}
        disabledClassName={"text-gray-300"}
      />

      <ModalEdit
        type="machine"
        showModal={showModal}
        setShowModal={setShowModal}
        data={singleMachine}
        handleUpdate={handleUpdate}
      />
    </div>
    </div>
  );
};

export default View_Machine;
