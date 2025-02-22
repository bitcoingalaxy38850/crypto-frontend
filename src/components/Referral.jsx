import { useState, useEffect } from "react";
import { HOST_URL } from "../utils/constant";
import useLocalStorage from "../utils/hooks/useLocalStorage.js";
import Modal from "./ModalWithDraw";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingIcon from "./LoadingIcon"; // Importing LoadingIcon component
import toast from "react-hot-toast";
import BackButton from "./BackButton.jsx";
import MessageBox from "./MessageBox.jsx";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Referral = () => {
  const [userId] = useLocalStorage("authToken");
  const [userDetails, setUserDetails] = useState([]);
  const [tableData, setTableData] = useState({});
  const [flag, setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const user_data = useSelector((store) => store.user.userInfo);

  const handleButtonClicked = () => {
    if (
      user_data.ifsc_code &&
      user_data.bank_name &&
      user_data.account_no &&
      user_data.upi_id
    ) {
      setIsModalOpen(true);
    } else {
      toast.error("Please Enter Your Bank Information from Profile Section");
    }
  };
  
  const handleWithdraw = async (amount) => {
    try {
      const response = await axios.post(
        `${HOST_URL}/user+withdrawal/save+pending+request`,
        {
          user_id: userId,
          withdrawal_amount: amount - amount * 0.10, // Cutting 10% from the original amount
          is_success: false,
          type: "REFERRAL",
        }
      );
  
      if (response.data) {
        toast.success(`Withdrawal of ${amount} initiated successfully!`);
      } else {
        toast.error("Error in processing your withdrawal request.");
      }
      
      setFlag(true); // Set flag to true if request was successful
    } catch (error) {
      console.error("Error during withdrawal:", error);
      toast.error(
        "An error occurred while processing your withdrawal. Please try again later."
      );
    } finally {
      setIsModalOpen(false); // Close the modal in the finally block
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading

      try {
        const userDetailsResponse = await fetch(
          `${HOST_URL}/user/getall+refferalusers/${userId}`
        );
        const tableDataResponse = await fetch(
          `${HOST_URL}/user/getuser+referraldetails/${userId}`
        );

        setUserDetails(await userDetailsResponse.json());
        setTableData(await tableDataResponse.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    if (userId) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, [flag, userId]);

  const pageCount = Math.ceil(userDetails.length / itemsPerPage);
  const currentItems = userDetails.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  return (
    <section className="bg-[#161925]  p-6 space-y-8">
      <BackButton />

      <MessageBox name="referral" />

      <div className=" mx-auto md:p-6 p-4 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="lg:text-4xl text-3xl font-bold mb-6 text-center text-white">
          Referral Overview
        </h1>

        {/* Show LoadingIcon while loading */}
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <LoadingIcon /> {/* Show loading icon while loading */}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-600 text-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col justify-between">
                <h2 className="text-lg sm:text-xl font-semibold">
                  Total Referrals Earned
                </h2>
                <p className="mt-2 text-3xl sm:text-4xl font-bold">
                  ₹{tableData.total__referral_earned}
                </p>
              </div>
              <div className="bg-blue-600 text-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col justify-between">
                <h2 className="text-lg sm:text-xl font-semibold">
                  Available to Withdraw
                </h2>
                <p className="mt-2 text-3xl sm:text-4xl font-bold">
                  ₹{tableData.referral_amount_withdraw}
                </p>
              </div>
            </div>
            <div className="flex justify-center mb-6">
              <button
                className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300"
                onClick={handleButtonClicked}
              >
                Withdraw
              </button>
            </div>

            <h2 className="text-3xl text-center  font-semibold mb-4 text-white">
              Referral Details
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-lg rounded-lg border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-left text-[10px] md:text-[16px]">
                    <th className="py-2 pl-2 sm:py-4 md:px-6 font-semibold">
                      Referred Name
                    </th>
                    <th className="py-2 pl-2 sm:py-4 md:px-6 font-semibold">
                      Referral Date
                    </th>
                    <th className="py-2 pl-2 sm:py-4 md:px-6 font-semibold">
                      First Deposit
                    </th>
                    <th className="py-2 pl-2 sm:py-4 md:px-6 font-semibold">
                      Referral Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((referral) => (
                      <tr
                        key={referral.id}
                        className="border-t border-gray-200 hover:bg-gray-100 transition-colors duration-300"
                      >
                        <td className="py-2 px-2 sm:py-4 sm:px-6 text-gray-800 text-xs sm:text-sm">
                          {referral.referred_username}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-6 text-gray-800 text-[10px] md:text-sm">
                          {new Date(referral.reffered_date).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="py-2 px-2 sm:py-4 sm:px-6 text-gray-800 text-xs sm:text-sm">
                          ₹{referral.first_deposit}
                        </td>
                        <td className="py-2 px-2 sm:py-4 sm:px-6 text-gray-800 text-xs sm:text-sm">
                          ₹{referral.referral_amount}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-4 text-gray-400 text-center"
                      >
                        No pending Referral available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {userDetails.length > itemsPerPage && (
                <ReactPaginate
                  previousLabel={"←"}
                  nextLabel={"→"}
                  breakLabel={"..."}
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
                  pageLinkClassName="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
                />
              )}
            </div>
          </>
        )}

        {/* Modal for Withdraw */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onWithdraw={handleWithdraw}
          initialAmount={tableData.referral_amount_withdraw}
        />
      </div>
    </section>
  );
};

export default Referral;
