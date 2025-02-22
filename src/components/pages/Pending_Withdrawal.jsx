import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { HOST_URL } from "../../utils/constant";
import ModalBankInfo from "./ModalBankInfo";
import { addPendingWithdrawal } from "../../redux/features/AdminSlice";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import LoadingIcon from "../../components/LoadingIcon"; // Assuming LoadingIcon is imported
import toast from "react-hot-toast";
import BackButton from "../BackButton";

const Pending_Withdrawal = () => {
  const dispatch = useDispatch();
  const pending_withdrawal = useSelector(
    (state) => state.admin.admin.pending_withdrawal || []
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [userId] = useLocalStorage("authToken"); // 1 day expiry
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPendingWithdrawals = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${HOST_URL}/user+withdrawal/getAll+pending+request`
        );

        console.log(response.data);

        dispatch(addPendingWithdrawal(response.data));
      } catch (error) {
        console.error("Error fetching pending withdrawals:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!userId) {
      navigate("/login");
    } else {
      console.log("hello");

      fetchPendingWithdrawals();
    }
  }, [flag]);

  const pageCount = Math.ceil(pending_withdrawal.length / itemsPerPage);
  const currentItems = pending_withdrawal.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const handleModalClicked = (item) => {
    setItem(item);
    setShowModal(true);
  };

  const handleApprove = async (item) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${HOST_URL}/user+withdrawal/approve+request/${item.id}/${item.user_id}`,
        item
      );
      if (response) {
        toast.success("Withdrawal approved successfully");

        setShowModal(false);
        setFlag(true);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error approving withdrawal:");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[#1E1E2E]">
      <h2 className="text-3xl text-white font-semibold mb-8 text-center">
        Pending Withdrawals
      </h2>
      <BackButton />

      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingIcon />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700">
            <table className="min-w-full  bg-gray-900 text-white">
              <thead>
                <tr className="bg-gradient-to-r from-purple-500 to-blue-500">
                  <th className="py-3 px-4 border-b border-gray-600">ID</th>
                  <th className="py-3 px-4 border-b border-gray-600">
                    User ID
                  </th>
                  <th className="py-3 px-4 border-b border-gray-600">
                    Withdrawal Amount
                  </th>
                  <th className="py-3 px-4 border-b border-gray-600">Status</th>
                  <th className="py-3 px-4 border-b border-gray-600">
                    Withdrawal Date
                  </th>
                  <th className="py-3 px-4 border-b border-gray-600">
                    Actions
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
                        {new Date(item.withdrawal_date).toLocaleString(
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

                      <td
                        onClick={() => handleModalClicked(item)}
                        className=" cursor-pointer bg-blue-500 rounded text-center  transition-colors duration-300 hover:bg-blue-600"
                      >
                        View & Approve
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-4 text-center text-gray-400 border-b border-gray-600"
                    >
                      No Pending Withdrawals
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {pending_withdrawal.length > itemsPerPage && (
            <ReactPaginate
              previousLabel={"← "}
              nextLabel={" →"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination flex justify-center mt-6"}
              activeClassName={"bg-green-600 text-white"}
              pageClassName={"mx-1"}
              previousClassName={"mx-1"}
              nextClassName={"mx-1"}
              className="pagination flex justify-center items-center space-x-2"
              pageLinkClassName=" text-white px-4 py-2 rounded transition"
            />
          )}

          <ModalBankInfo
            showModal={showModal}
            setShowModal={setShowModal}
            data={item}
            handleApprove={handleApprove}
          />
        </>
      )}
    </div>
  );
};

export default Pending_Withdrawal;
