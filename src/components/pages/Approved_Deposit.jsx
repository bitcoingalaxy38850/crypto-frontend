import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import LoadingIcon from "../../components/LoadingIcon"; // Import your loading icon component
import BackButton from "../BackButton";
import axios from "axios";
import { HOST_URL } from "../../utils/constant";
import { addApprovedDeposit, addApprovedWithDrawal } from "../../redux/features/AdminSlice";

const Approved_Deposit = () => {
  const approved_deposit =
    useSelector((state) => state.admin.admin.approved_deposit) || [];
  const [userId, setUserId] = useLocalStorage("authToken"); // 1 day expiry
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const dispatch = useDispatch();

  const getApprovedDepositsUrl = `${HOST_URL}/deposit+success/getall+success+request`;

  // Calculate number of pages
  const pageCount = Math.ceil(approved_deposit.length / itemsPerPage);

  // Get current items for the table
  const currentItems = approved_deposit.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
 

  useEffect(() => {
    const fetchApprovedDeposit = async () => {
      
      try {
        const response = await axios.get(getApprovedDepositsUrl);
        dispatch(addApprovedDeposit(response.data));
  
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error("Error fetching pending deposits:", error);
        setLoading(false); // Stop loading on error
      }
    };

    if (!userId) {
      navigate("/login");
    } else {
      
      fetchApprovedDeposit();
    }
  }, [userId]);

  // Handle page change
  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  return (
    <div className="p-6  bg-[#1E1E2E]">
      <h2 className="text-3xl text-white font-semibold mb-8 text-center">
        Approved Deposits
      </h2>
      <BackButton />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingIcon /> {/* Display loading icon */}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700">
            <table className="min-w-full bg-gray-900 text-white">
              <thead>
                <tr className="bg-gradient-to-r from-purple-500 to-blue-500">
                  <th className="py-3 px-4 border-b border-gray-600">ID</th>
                  <th className="py-3 px-4 border-b border-gray-600">User ID</th>
                  <th className="py-3 px-4 border-b border-gray-600">Name</th>
                  <th className="py-3 px-4 border-b border-gray-600">UTR Number</th>
                  <th className="py-3 px-4 border-b border-gray-600">Approved Date</th>
                  <th className="py-3 px-4 border-b border-gray-600">Machine Price</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-800 transition-colors duration-300"
                    >
                      <td className="py-4 px-4 border-b border-gray-600">
                        {item.id}
                      </td>
                      <td className="py-4 px-4 border-b border-gray-600">
                        {item.user_id}
                      </td>
                      <td className="py-4 px-4 border-b border-gray-600">
                        {item.first_name}
                      </td>
                      <td className="py-4 px-4 border-b border-gray-600">
                        {item.utr_number}
                      </td>
                      <td className="py-4 px-4 border-b border-gray-600">
                      {new Date(item.approved_date).toLocaleDateString(
                        "en-IN",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true, // Optional: to show time in 12-hour format with AM/PM
                        }
                      )}
                    </td>
                      <td className="py-4 px-4 border-b border-gray-600">
                      ₹{item.machine_price}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-4 text-center text-gray-400 border-b border-gray-600"
                    >
                      No Approved Deposits
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {approved_deposit.length > itemsPerPage && (
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={" →"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"flex justify-center mt-6"}
              activeClassName={"bg-green-600 text-white"}
              pageClassName={"mx-1"}
              previousClassName={"mx-1"}
              nextClassName={"mx-1"}
              className="pagination flex justify-center items-center space-x-2"
              pageLinkClassName=" text-white px-4 py-2 rounded transition"
            />
          )}
        </>
      )}
    </div>
  );
};

export default Approved_Deposit;
