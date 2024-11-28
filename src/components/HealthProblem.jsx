import React, { useState, useEffect, useCallback, useMemo } from "react";
import axiosInstance from "../api/axiosInstance";
import uploadImage from "../firebase/image"; // Import the uploadImage function

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        {children}
        <button className="mt-4 text-red-500" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// Confirm Dialog Component
const ConfirmDialog = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <p>{message}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white p-2 mr-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white p-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const HealthProblemCRUD = () => {
  const [healthProblems, setHealthProblems] = useState([]);
  const [currentHealthProblem, setCurrentHealthProblem] = useState({
    name: "",
    image: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [deleteId, setDeleteId] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null); // State for image file
  const [progressStatus, setProgressStatus] = useState(null); // Progress status for image upload
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all health problems with pagination
  const fetchHealthProblems = useCallback(
    async (page = 1, limit = itemsPerPage) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/health-problems", {
          params: { page, limit },
        });
        setHealthProblems(response.healthProblems);
        setTotalPages(Math.ceil(response.totalCount / limit));
      } catch (err) {
        setError("Error fetching health problems");
      } finally {
        setIsLoading(false);
      }
    },
    [itemsPerPage]
  );

  useEffect(() => {
    fetchHealthProblems(currentPage, itemsPerPage);
  }, [fetchHealthProblems, currentPage, itemsPerPage]);

  // Filter health problems based on search term
  const filteredHealthProblems = useMemo(() => {
    return healthProblems.filter((hp) =>
      hp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [healthProblems, searchTerm]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle open modal for creating or editing
  const handleOpenModal = (healthProblem = { name: "", image: "" }) => {
    setCurrentHealthProblem(healthProblem);
    setIsEditing(Boolean(healthProblem._id));
    setIsModalOpen(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentHealthProblem({ name: "", image: "" });
    setImageFile(null); // Reset the image file
    setProgressStatus(null); // Reset progress status
    setIsEditing(false);
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Create or update health problem
  const handleSaveHealthProblem = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = currentHealthProblem.image;

      if (imageFile) {
        // Upload image and get the download URL
        imageUrl = await uploadImage(
          imageFile.name,
          imageFile,
          setProgressStatus
        );
      }

      const healthProblemData = { ...currentHealthProblem, image: imageUrl };

      if (isEditing) {
        // Update existing health problem
        await axiosInstance.put(
          `/health-problems/${currentHealthProblem._id}`,
          healthProblemData
        );
        setHealthProblems(
          healthProblems.map((hp) =>
            hp._id === currentHealthProblem._id ? healthProblemData : hp
          )
        );
      } else {
        // Create new health problem
        const response = await axiosInstance.post(
          "/health-problems",
          healthProblemData
        );
        setHealthProblems([...healthProblems, response]);
      }
      handleCloseModal();
      fetchHealthProblems(currentPage, itemsPerPage); // Refresh data
    } catch (err) {
      setError(
        isEditing
          ? "Error updating health problem"
          : "Error creating health problem"
      );
    }
  };

  // Open delete confirmation dialog
  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
    setIsConfirmDialogOpen(true);
  };

  // Confirm deletion
  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/health-problems/${deleteId}`);
      setHealthProblems(healthProblems.filter((hp) => hp._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError("Error deleting health problem");
    } finally {
      setIsConfirmDialogOpen(false);
    }
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setDeleteId(null);
    setIsConfirmDialogOpen(false);
  };

  // Pagination controls
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page on items per page change
  };

  return (
    <div className="p-4 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Health Problems</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {progressStatus !== null && (
        <div className="mb-4">Upload Progress: {progressStatus}%</div>
      )}

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search health problems..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border p-2 mb-4 w-full"
      />
      <button
        className="bg-blue-500 text-white p-2 mb-4"
        onClick={() => handleOpenModal()}
      >
        Add Health Problem
      </button>

      {/* Select Per Page */}
      <div className="mb-4">
        <label htmlFor="itemsPerPage" className="mr-2">
          Items Per Page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border p-2"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* List of health problems */}
      <div className="flex gap-4 flex-wrap items-center container mx-auto">
        {filteredHealthProblems.map((hp) => (
          <div
            key={hp._id}
            className="flex justify-between items-center mb-2 border rounded-2xl p-2 flex-col h-56 w-56"
          >
            <div className="flex flex-col items-center justify-center">
              <img
                src={hp.image}
                alt={hp.name}
                className="w-24 h-24 object-cover mr-2 inline-block"
              />
              <span className="mr-2">{hp.name}</span>
            </div>
            <div>
              <button
                onClick={() => handleOpenModal(hp)}
                className="bg-green-500 text-white p-2 mr-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteConfirmation(hp._id)}
                className="bg-red-500 text-white p-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-l"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-r"
        >
          Next
        </button>
      </div>

      {/* Modal for creating or editing */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit" : "Add"} Health Problem
        </h2>
        <form onSubmit={handleSaveHealthProblem}>
          <input
            type="text"
            placeholder="Health Problem Name"
            value={currentHealthProblem.name}
            onChange={(e) =>
              setCurrentHealthProblem({
                ...currentHealthProblem,
                name: e.target.value,
              })
            }
            className="border p-2 mb-2 w-full"
            required
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="border p-2 mb-2 w-full"
          />
          <button type="submit" className="bg-green-500 text-white p-2">
            {isEditing ? "Update" : "Add"}
          </button>
        </form>
      </Modal>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="Are you sure you want to delete this health problem?"
      />
    </div>
  );
};

export default HealthProblemCRUD;
// ================================================
