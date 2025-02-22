import React, { useState } from "react";

const Modal = ({ showModal, setShowModal, user, handleUpdate }) => {
  const [formData, setFormData] = useState(user);
  const [error, setError] = useState({ ifsc_code: "", pan_card: "" });
  const [isValid, setIsValid] = useState({ ifsc_code: false, pan_card: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Update form data state
    setFormData({
      ...formData,
      [name]: value, // Ensure you are spreading the rest of formData and updating only the target field
    });
  
    // Validate IFSC code if the input name is "ifsc_code"
    if (name === "ifsc_code") {
      if (validateIFSC(value)) {
        setIsValid({ ...isValid, ifsc_code: true });
        setError({ ...error, ifsc_code: "" });
      } else {
        setIsValid({ ...isValid, ifsc_code: false });
        setError({ ...error, ifsc_code: "Invalid IFSC Code" });
      }
    } 
  
    // Validate PAN card if the input name is "pan_card"
    else if (name === "pan_card") {
      if (validatePAN(value)) {
        setIsValid({ ...isValid, pan_card: true });
        setError({ ...error, pan_card: "" });
      } else {
        setIsValid({ ...isValid, pan_card: false });
        setError({ ...error, pan_card: "Invalid PAN Card" });
      }
    }
  };
  

  

  const handleSubmit = (e) => {
    e.preventDefault();
  

    if (isValid.ifsc_code && isValid.pan_card) {

      console.log(formData);
      handleUpdate(formData); // Pass formData to the update function
      setShowModal(false); // Close modal
    } else {
      // If there are any invalid fields, show error message
      let errorMessage = "Please fill in the form correctly:\n";
      if (!isValid.ifsc_code) {
        errorMessage += "- Invalid IFSC code\n";
      }
      if (!isValid.pan_card) {
        errorMessage += "- Invalid PAN card number\n";
      }
      alert(errorMessage); // Display alert with error details
    }
  };
  

    // Validate IFSC code
    const validateIFSC = (ifscCode) => {
      if(!ifscCode)return;
      const ifscRegex = /^[A-Za-z]{4}0[A-Z0-9]{6}$/;
      return ifscRegex.test(ifscCode);
    };
  
    // Validate PAN card
    const validatePAN = (panCard) => {
      if(!panCard)return;
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      return panRegex.test(panCard);
    };

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 p-10   flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-md w-full max-h-[80%] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Update Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="bg-[#7D60F9] font-bold text-white p-3 mb-4 rounded-xl">
            User Information
          </div>
          <div className="mb-4">
            <label className="block mb-2">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border bg-gray-800 px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border bg-gray-800 px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phone Number:</label>
            <input
              type="text"
              name="phone_number"
              minLength={10}
              maxLength={10}
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full border bg-gray-800 px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border bg-gray-800 px-2 py-1 rounded"
              required
            />
          </div>

          <div className="bg-[#7D60F9] font-bold text-white p-3 mb-4 rounded-xl">
            Bank Information
          </div>
          <div className="mb-4">
            <label className="block mb-2">Account Number:</label>
            <input
              type="text"
              name="account_no"
              minLength={9}
              maxLength={18}
              value={formData.account_no || ""}
              onChange={handleChange}
              className="w-full border bg-gray-800 px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Bank Name:</label>
            <input
              type="text"
              name="bank_name"
              value={formData.bank_name || ""}
              onChange={handleChange}
              className="w-full border bg-gray-800 px-2 py-1 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">IFSC Code:</label>
            <input
              type="text"
              name="ifsc_code"
              minLength={11}
              maxLength={11}
              value={formData.ifsc_code || ""}
              onChange={handleChange}
              className="w-full border bg-gray-800 px-2 py-1 rounded"
            />
               {error.ifsc_code && <p className="text-red-500">{error.ifsc_code}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">UPI ID:</label>
            <input
              type="text"
              name="upi_id"
              value={formData.upi_id || ""}
              onChange={handleChange}
              className="w-full border bg-gray-800 px-2 py-1 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Aadhaar Number:</label>
            <input
              type="text"
              name="aadhaar_number"
              maxLength={12}
              minLength={12}
              value={formData.aadhaar_number || ""}
              onChange={handleChange}
              className="w-full border bg-gray-800 px-2 py-1 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">PAN Number</label>
            <input
              type="text"
              name="pan_card"
              maxLength={10}
              minLength={10}
              value={formData.pan_card || ""}
              onChange={handleChange}
              className="w-full border bg-gray-800 px-2 py-1 rounded"
            />
               {error.pan_card && <p className="text-red-500">{error.pan_card}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#7D60F9] text-white py-2 px-4 rounded mr-2"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
