// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../api/axiosInstance";

// const LabBoyList = () => {
//   const [labBoys, setLabBoys] = useState([]);
//   const [labs, setLabs] = useState([]);
//   const [selectedLabBoy, setSelectedLabBoy] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     contactNumber: "",
//     assignedLab: "",
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   useEffect(() => {
//     fetchLabBoys();
//     fetchLabs();
//   }, []);

//   const fetchLabBoys = async () => {
//     try {
//       const response = await axiosInstance.get("/get-all-lab-boy");
//       setLabBoys(response);
//     } catch (error) {
//       console.error("Error fetching lab boys:", error);
//     }
//   };

//   const fetchLabs = async () => {
//     try {
//       const response = await axiosInstance.get("/get-all-labs");
//       setLabs(response);
//     } catch (error) {
//       console.error("Error fetching labs:", error);
//     }
//   };

//   const getLabBoyById = async (id) => {
//     try {
//       const response = await axiosInstance.get(`/get-lab-boy/${id}`);
//       setSelectedLabBoy(response);
//       setFormData({
//         name: response.name,
//         email: response.email,
//         contactNumber: response.contactNumber,
//         assignedLab: response.assignedLab?._id || "",
//       });
//       setIsModalOpen(true); // Open the modal for editing
//     } catch (error) {
//       console.error("Error fetching lab boy by ID:", error);
//     }
//   };

//   const createLabBoy = async () => {
//     try {
//       await axiosInstance.post("/create-lab-boy", formData);
//       fetchLabBoys();
//       closeModal();
//     } catch (error) {
//       console.error("Error creating lab boy:", error);
//     }
//   };

//   const updateLabBoy = async (id) => {
//     try {
//       await axiosInstance.put(`/update-lab-boy/${id}`, formData);
//       fetchLabBoys();
//       closeModal();
//     } catch (error) {
//       console.error("Error updating lab boy:", error);
//     }
//   };

//   const deleteLabBoy = async (id) => {
//     try {
//       await axiosInstance.delete(`/delete-lab-boy/${id}`);
//       fetchLabBoys();
//       closeDeleteModal();
//     } catch (error) {
//       console.error("Error deleting lab boy:", error);
//     }
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     resetForm();
//   };

//   const openDeleteModal = (labBoy) => {
//     setSelectedLabBoy(labBoy);
//     setIsDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     setSelectedLabBoy(null);
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       contactNumber: "",
//       assignedLab: "",
//     });
//     setSelectedLabBoy(null);
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (selectedLabBoy) {
//       updateLabBoy(selectedLabBoy._id);
//     } else {
//       createLabBoy();
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Lab Boys List</h1>

//       <button
//         onClick={openModal}
//         className="mb-4 px-4 py-2 bg-gray-200 rounded-md ml-auto block"
//       >
//         Add Lab Boy
//       </button>

//       {/* Modal for Creating/Updating Lab Boy */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">
//               {selectedLabBoy ? "Update Lab Boy" : "Add Lab Boy"}
//             </h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//               </div>
//               <div className="mb-4">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//               </div>
//               <div className="mb-4">
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//               </div>
//               <div className="mb-4">
//                 <input
//                   type="text"
//                   name="contactNumber"
//                   placeholder="Contact Number"
//                   value={formData.contactNumber}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//               </div>
//               <div className="mb-4">
//                 <select
//                   name="assignedLab"
//                   value={formData.assignedLab}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 >
//                   <option value="">Select a Lab</option>
//                   {labs.map((lab) => (
//                     <option key={lab._id} value={lab._id}>
//                       {lab.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                 >
//                   {selectedLabBoy ? "Update" : "Create"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {isDeleteModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Delete Lab Boy</h2>
//             <p className="mb-4">
//               Are you sure you want to delete {selectedLabBoy?.name}?
//             </p>
//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={closeDeleteModal}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={() => deleteLabBoy(selectedLabBoy._id)}
//                 className="px-4 py-2 bg-red-500 text-white rounded-md"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Table of Lab Boys */}
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-blue-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Contact Number
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Lab
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {labBoys.map((labBoy) => (
//               <tr key={labBoy._id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {labBoy.name}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {labBoy.email}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {labBoy.contactNumber}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {labBoy.assignedLab?.name || "N/A"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button
//                     onClick={() => getLabBoyById(labBoy._id)}
//                     className="text-blue-600 hover:text-blue-900"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => openDeleteModal(labBoy)}
//                     className="text-red-600 hover:text-red-900 ml-4"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default LabBoyList;
//================================================
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const LabBoyList = () => {
  const [labBoys, setLabBoys] = useState([]);
  const [labs, setLabs] = useState([]);
  const [selectedLabBoy, setSelectedLabBoy] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    assignedLab: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  useEffect(() => {
    fetchLabBoys(currentPage, itemsPerPage); // Fetch lab boys for the current page and items per page
    fetchLabs();
  }, [currentPage, itemsPerPage]); // Dependency on currentPage and itemsPerPage

  const fetchLabBoys = async (page, perPage) => {
    try {
      const response = await axiosInstance.get(
        `/get-all-lab-boy?page=${page}&limit=${perPage}`
      );
      setLabBoys(response.labBoys);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching lab boys:", error);
    }
  };

  const fetchLabs = async () => {
    try {
      const response = await axiosInstance.get("/get-all-labs");
      setLabs(response);
    } catch (error) {
      console.error("Error fetching labs:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedLabBoy) {
      await updateLabBoy(selectedLabBoy._id, formData);
    } else {
      await createLabBoy(formData);
    }
    setFormData({
      name: "",
      email: "",
      password: "",
      contactNumber: "",
      assignedLab: "",
    });
    setIsModalOpen(false);
    setSelectedLabBoy(null);
    fetchLabBoys(currentPage, itemsPerPage);
  };

  const createLabBoy = async (labBoyData) => {
    try {
      await axiosInstance.post("/create-lab-boy", labBoyData);
    } catch (error) {
      console.error("Error creating lab boy:", error);
    }
  };

  const updateLabBoy = async (labBoyId, labBoyData) => {
    try {
      await axiosInstance.put(`/update-lab-boy/${labBoyId}`, labBoyData);
    } catch (error) {
      console.error("Error updating lab boy:", error);
    }
  };

  const deleteLabBoy = async (labBoyId) => {
    try {
      await axiosInstance.delete(`/delete-lab-boy/${labBoyId}`);
      setIsDeleteModalOpen(false);
      setSelectedLabBoy(null);
      fetchLabBoys(currentPage, itemsPerPage);
    } catch (error) {
      console.error("Error deleting lab boy:", error);
    }
  };

  const openModal = (labBoy) => {
    if (labBoy) {
      setSelectedLabBoy(labBoy);
      setFormData({
        name: labBoy.name,
        email: labBoy.email,
        password: "",
        contactNumber: labBoy.contactNumber,
        assignedLab: labBoy.assignedLab?._id || "",
      });
    } else {
      setSelectedLabBoy(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        contactNumber: "",
        assignedLab: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLabBoy(null);
  };

  const openDeleteModal = (labBoy) => {
    setSelectedLabBoy(labBoy);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedLabBoy(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Lab Boys List</h1>

      <button
        onClick={() => openModal(null)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded-md ml-auto block"
      >
        Add Lab Boy
      </button>

      {/* Items Per Page Selector */}
      <div className="mb-4">
        <label htmlFor="itemsPerPage" className="mr-2">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Modal for Creating/Updating Lab Boy */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {selectedLabBoy ? "Edit Lab Boy" : "Add Lab Boy"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="assignedLab"
                  className="block text-sm font-medium"
                >
                  Assigned Lab
                </label>
                <select
                  id="assignedLab"
                  name="assignedLab"
                  value={formData.assignedLab}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                >
                  <option value="">Select Lab</option>
                  {labs?.map((lab) => (
                    <option key={lab._id} value={lab._id}>
                      {lab.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  {selectedLabBoy ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Delete Lab Boy</h2>
            <p className="mb-4">
              Are you sure you want to delete this lab boy?
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteLabBoy(selectedLabBoy._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lab Boys List */}
      <table className="w-full border border-gray-300">
        <thead className="bg-blue-50">
          <tr>
            <th className="border-b border-gray-300 p-2">Name</th>
            <th className="border-b border-gray-300 p-2">Email</th>
            <th className="border-b border-gray-300 p-2">Contact Number</th>
            <th className="border-b border-gray-300 p-2">Assigned Lab</th>
            <th className="border-b border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {labBoys.map((labBoy) => (
            <tr key={labBoy._id}>
              <td className="border-b border-gray-300 p-2">{labBoy.name}</td>
              <td className="border-b border-gray-300 p-2">{labBoy.email}</td>
              <td className="border-b border-gray-300 p-2">
                {labBoy.contactNumber}
              </td>
              <td className="border-b border-gray-300 p-2">
                {labBoy.assignedLab?.name || "N/A"}
              </td>
              <td className="border-b border-gray-300 p-2">
                <button
                  onClick={() => openModal(labBoy)}
                  className="px-2 py-1 bg-green-500 text-white rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(labBoy)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LabBoyList;
