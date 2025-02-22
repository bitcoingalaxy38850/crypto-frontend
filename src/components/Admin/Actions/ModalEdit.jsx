import React, { useEffect, useState } from "react";

const ModalEdit = ({ showModal, setShowModal, type, data, handleUpdate }) => {
  //  it is taking time to load the data thats why we use {}
  const [formData, setFormData] = useState(data);



  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

 

  const handleChange = (e) => {


    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData);
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">
          {type === "qrcode" ? "QR Code Information" : "Machine Information"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Conditionally render Machine data fields */}
          {type === "machine" && (
            <>
              <div className="mb-4">
                <label className="block mb-2">Machine Name</label>
                <input
                  type="text"
                  name="machine_name"
                  value={formData.machine_name}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Valid Days</label>
                <input
                  type="number"
                  name="valid_days"
                  value={formData.valid_days}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Interest Per Day</label>
                <input
                  type="text"
                  name="interest_per_day"
                  value={formData.interest_per_day}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Image URL</label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
 
            </>
          )}

          {/* Conditionally render QR Code data fields */}
          {type === "qrcode" && (
            <>
              <div className="mb-4">
                <label className="block mb-2">Bank Name</label>
                <input
                  type="text"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Owner Name</label>
                <input
                  type="text"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">UPI ID</label>
                <input
                  type="text"
                  name="upi_id"
                  value={formData.upi_id}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">QR Code Image URL</label>
                <input
                  type="text"
                  name="qrcode_image"
                  value={formData.qrcode_image}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>

            </>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="bg-red-500 text-white py-2 px-4 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;
