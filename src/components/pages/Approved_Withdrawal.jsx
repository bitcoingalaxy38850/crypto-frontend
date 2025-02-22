import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import LoadingIcon from "../LoadingIcon";
import BackButton from "../BackButton";
import { addApprovedWithDrawal } from "../../redux/features/AdminSlice";
import { HOST_URL } from "../../utils/constant";
import axios from "axios";


const Approved_Withdrawal = () => {
  const approved_withdrawal =
    useSelector((state) => state.admin.admin.approved_withdrawal) || [];


    const dispatch = useDispatch();
    
  const [currentPage, setCurrentPage] = useState(0);
  const [userId, setUserId] = useLocalStorage("authToken"); // 1 day expiry
  const [loading, setLoading] = useState(true); // Loading state
  const [flag , setFlag] = useState(false)

  const itemsPerPage = 10;
  const navigate = useNavigate();
  const getApprovedWithdrawalsUrl = `${HOST_URL}/user+withdrawal/getAll+approved+withdrawals`;

  // Calculate number of pages
  const pageCount = Math.ceil(approved_withdrawal.length / itemsPerPage);

  // Get current items for the table
  const currentItems = approved_withdrawal.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );


  useEffect(() => {

    const fetchApprovedWithdrawal = async () => {
      
      try {
        const response = await axios.get(getApprovedWithdrawalsUrl);
        dispatch(addApprovedWithDrawal(response.data));

        setFlag(true)
  
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error("Error fetching pending deposits:", error);
        setLoading(false); // Stop loading on error
      }
    };
    if (!userId) {
      navigate("/login");
    } else {
      
      fetchApprovedWithdrawal();
    }
  }, [flag]);



  // Handle page change
  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  return (
    <div className="p-6 min-h-screen bg-[#1E1E2E]">
      <h2 className="text-3xl text-white font-semibold mb-8 text-center">
        Approved Withdrawals
      </h2>
      <BackButton />

      {loading ? ( // Show loading icon while loading
        <div className="flex justify-center items-center">
          <LoadingIcon />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700">
            <table className="min-w-full bg-gray-900 text-white">
              <thead>
                <tr className="bg-gradient-to-r from-purple-500 to-blue-500">
                  <th className="py-3 px-4 border-b border-gray-600">ID</th>
                  <th className="py-3 px-4 border-b border-gray-600">User ID</th>
                  <th className="py-3 px-4 border-b border-gray-600">
                    Withdrawal Amount
                  </th>
                  <th className="py-3 px-4 border-b border-gray-600">Status</th>
                  <th className="py-3 px-4 border-b border-gray-600">
                    Withdrawal Date
                  </th>
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
                      ₹{item.withdrawal_amount}
                      </td>
                      <td className="py-4 px-4 border-b border-gray-600">
                        {item.is_success ? "Success" : "Pending"}
                      </td>
                      <td className="py-4 px-4 border-b border-gray-600">
                      {new Date(item.withdrawal_date).toLocaleDateString(
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
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-4 text-center text-gray-400 border-b border-gray-600"
                    >
                      No Approved Withdrawals
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {approved_withdrawal.length > itemsPerPage && (
            <ReactPaginate
              previousLabel={"← "}
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

export default Approved_Withdrawal;
