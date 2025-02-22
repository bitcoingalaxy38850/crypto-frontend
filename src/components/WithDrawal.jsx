import { useState, useEffect } from "react";
import { HOST_URL } from "../utils/constant";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import LoadingIcon from "./LoadingIcon";
import MessageBox from "./MessageBox";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const WithDrawal = () => {
  const [userId] = useLocalStorage("authToken");
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [successWithdrawals, setSuccessWithdrawals] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPendingPage, setCurrentPendingPage] = useState(0);
  const [currentSuccessPage, setCurrentSuccessPage] = useState(0);
  const itemsPerPage = 5; // Adjust as needed

  const navigate = useNavigate();

  useEffect(() => {
    const getPendingUrl = `${HOST_URL}/user+withdrawal/getsingle+pending+withdrawals/${userId}`;
    const getSuccessUrl = `${HOST_URL}/user+withdrawal/getsingle+success+withdrawals/${userId}`;

    // Fetch pending withdrawals
    const fetchPendingWithdrawals = async () => {
      try {
        const response = await fetch(getPendingUrl);
        const data = await response.json();
        setPendingWithdrawals(data);
      } catch (error) {
        console.error("Error fetching pending withdrawals:", error);
      }
    };

    // Fetch successful withdrawals
    const fetchSuccessWithdrawals = async () => {
      try {
        const response = await fetch(getSuccessUrl);
        const data = await response.json();
        setSuccessWithdrawals(data);
      } catch (error) {
        console.error("Error fetching successful withdrawals:", error);
      }
    };

    if (!userId) {
      navigate("/login");
    } else {
      setLoading(true);
      Promise.all([fetchPendingWithdrawals(), fetchSuccessWithdrawals()])
        .finally(() => setLoading(false)); 
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIcon />
      </div>
    );
  }

  // Handle pagination for pending withdrawals
  const pendingPageCount = Math.ceil(pendingWithdrawals.length / itemsPerPage);
  const displayedPendingWithdrawals = pendingWithdrawals.slice(
    currentPendingPage * itemsPerPage,
    (currentPendingPage + 1) * itemsPerPage
  );

  // Handle pagination for successful withdrawals
  const successPageCount = Math.ceil(successWithdrawals.length / itemsPerPage);
  const displayedSuccessWithdrawals = successWithdrawals.slice(
    currentSuccessPage * itemsPerPage,
    (currentSuccessPage + 1) * itemsPerPage
  );

  return (
    <section className="bg-[#161925] p-6">
      <MessageBox name="withdrawal" />
      <BackButton />

      <div className="mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          Withdrawals
        </h1>

        {/* Tab Buttons */}
        <div className="flex flex-col md:flex-row justify-center mb-6">
          <button
            className={`px-6 py-3 rounded-l-lg md:rounded-l-lg md:rounded-r-none transition-colors duration-300 ${
              activeTab === "pending"
                ? "bg-violet-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => {
              setActiveTab("pending");
              setCurrentPendingPage(0); // Reset to first page
            }}
          >
            Pending Withdrawals
          </button>
          <button
            className={`px-6 py-3 rounded-r-lg md:rounded-l-none md:rounded-r-lg transition-colors duration-300 ${
              activeTab === "success"
                ? "bg-violet-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => {
              setActiveTab("success");
              setCurrentSuccessPage(0); // Reset to first page
            }}
          >
            Successful Withdrawals
          </button>
        </div>

        {/* Pending Withdrawals Table */}
        {activeTab === "pending" && (
          <div className="overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Pending Withdrawals
            </h2>
            <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
              <thead className="bg-violet-600 text-white">
                <tr>
                  <th className="py-2 md:py-4 px-2 text-left font-semibold text-[10px] md:text-[16px] uppercase ">
                    Date
                  </th>
                  <th className="py-2 md:py-4 px-2 md:px-6 text-left font-semibold text-[10px] md:text-[16px] uppercase">
                    Amount
                  </th>
                  <th className="py-2 md:py-4 px-2 md:px-6 text-left font-semibold text-[10px] md:text-[16px] uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedPendingWithdrawals.length > 0 ? (
                  displayedPendingWithdrawals.map((withdrawal) => (
                    <tr
                      key={withdrawal.id}
                      className="border-t border-gray-200 hover:bg-gray-100 transition-colors duration-300"
                    >
                      <td className="py-2 md:py-3 px-2 md:px-6 text-gray-800 text-[10px] md:text-[16px]">
                        {new Date(
                          withdrawal.withdrawal_date
                        ).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-6 text-gray-800 text-[10px] md:text-[16px] ">
                        ₹{withdrawal.withdrawal_amount}
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-6 text-gray-800 text-[10px] md:text-[16px] ">
                        {withdrawal.is_success ? "Success" : "Pending"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="py-4 text-center text-gray-500 text-sm"
                    >
                      No pending withdrawals
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination for Pending Withdrawals */}
            {pendingPageCount > 1 && (
              <ReactPaginate
                previousLabel={"←"}
                nextLabel={"→"}
                breakLabel={"..."}
                pageCount={pendingPageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(data) => setCurrentPendingPage(data.selected)}
                containerClassName={"flex justify-center mt-6"}
                activeClassName={"bg-violet-600 text-white"}
                pageClassName={"mx-1"}
                previousClassName={"mx-1"}
                nextClassName={"mx-1"}
                className="pagination flex justify-center items-center space-x-2"
                pageLinkClassName="text-white px-4 py-2 rounded transition"
              />
            )}
          </div>
        )}

        {/* Successful Withdrawals Table */}
        {activeTab === "success" && (
          <div className="overflow-x-auto mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Successful Withdrawals
            </h2>
            <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
              <thead className="bg-violet-600 text-white">
                <tr>
                  <th className="py-4 md:px-6 px-2 text-left font-semibold text-[8px] md:text-[16px] uppercase tracking-wide">
                    Date
                  </th>
                  <th className="py-4 md:px-6 px-2 text-left font-semibold text-[8px] md:text-[16px] uppercase tracking-wide">
                    Amount
                  </th>
                  <th className="py-4 md:px-6 px-2 text-left font-semibold text-[8px] md:text-[16px] uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedSuccessWithdrawals.length > 0 ? (
                  displayedSuccessWithdrawals.map((withdrawal) => (
                    <tr
                      key={withdrawal.id}
                      className="border-t border-gray-200 hover:bg-gray-100 transition-colors duration-300"
                    >
                      <td className="py-2 md:py-3 px-2 md:px-6 text-gray-800 text-[10px] md:text-[16px]">
                        {new Date(
                          withdrawal.withdrawal_date
                        ).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-6 text-gray-800 text-[10px] md:text-[16px]">
                        ₹{withdrawal.withdrawal_amount}
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-6 text-gray-800 text-[10px] md:text-[16px]">
                        {withdrawal.is_success ? "Success" : "Pending"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="py-4 text-center text-gray-500 text-sm"
                    >
                      No successful withdrawals
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination for Successful Withdrawals */}
            {successPageCount > 1 && (
              <ReactPaginate
                previousLabel={"←"}
                nextLabel={"→"}
                breakLabel={"..."}
                pageCount={successPageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(data) => setCurrentSuccessPage(data.selected)}
                containerClassName={"flex justify-center mt-6"}
                activeClassName={"bg-violet-600 text-white"}
                pageClassName={"mx-1"}
                previousClassName={"mx-1"}
                nextClassName={"mx-1"}
                className="pagination flex justify-center items-center space-x-2"
                pageLinkClassName=" text-white px-4 py-2 rounded transition"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default WithDrawal;
