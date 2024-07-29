import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  getAllFranchisesAsync,
  createFranchiseAsync,
  updateFranchiseAsync,
  deleteFranchiseAsync,
} from "../store/features/franchise/franchiseSlice";
import {
  MdOutlineDeleteForever,
  MdOutlineModeEdit,
  MdOutlineVisibility,
} from "react-icons/md";
import toast from "react-hot-toast";
import DeleteConfirmationDialog from "./child/DeleteConfirmationDialog";
import AgentTable from "./Agents";

const Franchise = () => {
  const dispatch = useDispatch();
  const { franchise, loading, error } = useSelector((state) => state.franchise);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: {
      address: "",
      city: "",
      state: "",
      pinCode: "",
    },
    contactNumber: "",
    email: "",
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteFranchise, setDeleteFranchise] = useState(null);
  const [showAgentTable, setShowAgentTable] = useState(false);
  const [selectedFranchiseId, setSelectedFranchiseId] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(getAllFranchisesAsync());
  }, [dispatch]);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditId(null);
    setFormData({ name: "", address: "", contactNumber: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const franchiseData = {
      name: formData.name,
      contactNumber: formData.contactNumber,
      email: formData.email,
      location: {
        address: formData.address.address,
        city: formData.address.city,
        state: formData.address.state,
        pinCode: formData.address.pinCode,
      },
    };

    if (isEditing) {
      dispatch(
        updateFranchiseAsync({ id: editId, updateData: franchiseData })
      ).then(() => {
        closeModal();
      });
    } else {
      dispatch(createFranchiseAsync(franchiseData)).then(() => {
        closeModal();
      });
    }
  };

  const handleEdit = (franchise) => {
    setIsEditing(true);
    setEditId(franchise._id);
    setFormData({
      name: franchise.name,
      address: {
        address: franchise.location?.address || "",
        city: franchise.location?.city || "",
        state: franchise.location?.state || "",
        pinCode: franchise.location?.pinCode || "",
      },
      contactNumber: franchise.contactNumber,
      email: franchise.email,
    });
    setShowModal(true);
  };
  const handleDelete = (franchise) => {
    setDeleteFranchise(franchise);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (deleteFranchise?._id) {
      dispatch(deleteFranchiseAsync(deleteFranchise._id)).then(() => {
        toast.error(`Deleted ${deleteFranchise?.name}`);
        setShowDeleteDialog(false);
        setDeleteFranchise(null);
      });
    }
  };

  const handleView = (franchise) => {
    setSelectedFranchiseId(franchise);
    setShowAgentTable(true);
  };

  const handleBack = () => {
    setShowAgentTable(false);
    setSelectedFranchiseId(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredFranchises = franchise.filter((franchise) =>
    franchise.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-white p-10 rounded-lg shadow-md mt-4 w-full">
      {showAgentTable ? (
        <AgentTable
          selectedFranchiseId={selectedFranchiseId}
          onBack={handleBack}
        />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Franchise List</h2>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Filter labs..."
              className="border rounded-md px-3 py-2 w-64"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <button className="px-3 py-2 border rounded-md" onClick={openModal}>
              Create
            </button>
          </div>
          <table className="min-w-full">
            <thead>
              <tr className="text-left border-b bg-blue-50">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Address</th>
                <th className="py-2 px-4">Contact Number</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Created By</th>
                <th className="py-2 px-4">View</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredFranchises.length > 0 ? (
                filteredFranchises.map((franchise) => (
                  <tr
                    key={franchise._id}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="py-3 px-4">{franchise.name}</td>
                    <td className="py-3 px-4">
                      {" "}
                      {`${franchise?.location?.address}, ${franchise?.location?.city}, ${franchise?.location?.state}, ${franchise?.location?.pinCode}`}
                    </td>
                    <td className="py-3 px-4">{franchise.contactNumber}</td>
                    <td className="py-3 px-4">{franchise.email}</td>
                    <td className="py-3 px-4">
                      {franchise.createdBy ? franchise.createdBy.name : ""}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="mr-2 px-2 py-1 border rounded-lg bg-blue-500 text-white"
                        onClick={() => handleView(franchise)}
                      >
                        <MdOutlineVisibility />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        className="mr-2 px-2 py-1 border rounded-lg bg-green-400 text-white"
                        onClick={() => handleEdit(franchise)}
                      >
                        <MdOutlineModeEdit />
                      </button>
                      <button
                        className="mr-2 px-2 py-1 border rounded-lg bg-red-500 text-white"
                        onClick={() => handleDelete(franchise)}
                      >
                        <MdOutlineDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-3 px-4 text-center">
                    No franchises found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {filteredFranchises.length} of {franchise.length} row(s) selected.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Rows per page</span>
              <select className="border rounded-md px-2 py-1">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <div className="flex justify-end space-x-1 text-gray-500">
                <button className="px-2 py-1 border rounded-md ">
                  <FaAngleLeft />
                </button>
                <button className="px-2 py-1 border rounded-md">
                  <FaAngleRight />
                </button>
              </div>
            </div>
          </div>
          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-bold mb-4">
                  {isEditing ? "Edit Franchise" : "Create Franchise"}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 border rounded-md px-3 py-2 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 border rounded-md px-3 py-2 w-full"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address.address"
                      value={formData?.address?.address}
                      onChange={handleChange}
                      className="mt-1 border rounded-md px-3 py-2 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="address.city"
                      value={formData?.address?.city}
                      onChange={handleChange}
                      className="mt-1 border rounded-md px-3 py-2 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="address.state"
                      value={formData?.address?.state}
                      onChange={handleChange}
                      className="mt-1 border rounded-md px-3 py-2 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="pinCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      PIN Code
                    </label>
                    <input
                      type="text"
                      id="pinCode"
                      name="address.pinCode"
                      value={formData?.address?.pinCode}
                      onChange={handleChange}
                      className="mt-1 border rounded-md px-3 py-2 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="contactNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="mt-1 border rounded-md px-3 py-2 w-full"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="px-4 py-2 border rounded-md mr-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      {isEditing ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <DeleteConfirmationDialog
            show={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
            onConfirm={confirmDelete}
          />
        </div>
      )}
    </div>
  );
};

export default Franchise;
