// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import Pagination from "./Pagination";
// import CouncilorList from "./CouncilorList";
// import {
//   getAllCouncilorsAsync,
//   deleteUserByIdAsync,
// } from "../../store/features/auth/userSlice";

// const Councilor = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { councilors, loading, error, pagination } = useSelector(
//     (state) => state.user
//   );

//   const [limit, setLimit] = useState(pagination.limit);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [councilorToDelete, setCouncilorToDelete] = useState(null);

//   useEffect(() => {
//     dispatch(
//       getAllCouncilorsAsync({
//         page: pagination.currentPage,
//         limit,
//       })
//     );
//   }, [dispatch, pagination.currentPage, limit]);

//   const handleCouncilorClick = (id) => {
//     navigate(`/councilor/user-list/${id}`);
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= pagination.totalPages) {
//       dispatch(
//         getAllCouncilorsAsync({
//           page,
//           limit,
//         })
//       );
//     }
//   };

//   const handleLimitChange = (e) => {
//     setLimit(Number(e.target.value));
//     dispatch(
//       getAllCouncilorsAsync({
//         page: 1, // Reset to page 1 on limit change
//         limit: Number(e.target.value),
//       })
//     );
//   };

//   const handleDeleteClick = (councilor) => {
//     setCouncilorToDelete(councilor);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteCouncilor = () => {
//     if (councilorToDelete) {
//       dispatch(deleteUserByIdAsync({ id: councilorToDelete._id })).then(() => {
//         setIsDeleteDialogOpen(false);
//         setCouncilorToDelete(null);
//         dispatch(
//           getAllCouncilorsAsync({
//             page: pagination.currentPage,
//             limit,
//           })
//         );
//       });
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Councilor List</h2>
//         <div className="flex space-x-4">
//           <select
//             value={limit}
//             onChange={handleLimitChange}
//             className="border rounded-md px-4 py-2"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//             <option value={50}>50</option>
//             <option value={100}>100</option>
//           </select>
//         </div>
//       </div>

//       <CouncilorList
//         councilors={councilors}
//         handleCouncilorClick={handleCouncilorClick}
//         handleDeleteClick={handleDeleteClick}
//       />

//       <Pagination
//         currentPage={pagination.currentPage}
//         totalPages={pagination.totalPages}
//         handlePageChange={handlePageChange}
//       />

//       {/* Delete Confirmation Dialog */}
//       {isDeleteDialogOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h3 className="text-lg font-bold">Confirm Deletion</h3>
//             <p>Are you sure you want to delete this councilor?</p>
//             <div className="mt-4 flex justify-end space-x-4">
//               <button
//                 onClick={() => setIsDeleteDialogOpen(false)}
//                 className="px-4 py-2 bg-gray-300 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeleteCouncilor}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Councilor;
//=================================================
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import CouncilorList from "./CouncilorList";
import {
  getAllCouncilorsAsync,
  deleteUserByIdAsync,
} from "../../store/features/auth/userSlice";
import axiosInstance from "../../api/axiosInstance";

const Councilor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { councilors, loading, error, pagination } = useSelector(
    (state) => state.user
  );

  const [limit, setLimit] = useState(pagination.limit);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [councilorToDelete, setCouncilorToDelete] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  useEffect(() => {
    dispatch(
      getAllCouncilorsAsync({
        page: pagination.currentPage,
        limit,
      })
    );
  }, [dispatch, pagination.currentPage, limit]);

  const handleCouncilorClick = (id) => {
    navigate(`/councilor/user-list/${id}`);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      dispatch(
        getAllCouncilorsAsync({
          page,
          limit,
        })
      );
    }
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    dispatch(
      getAllCouncilorsAsync({
        page: 1, // Reset to page 1 on limit change
        limit: Number(e.target.value),
      })
    );
  };

  const handleDeleteClick = (councilor) => {
    setCouncilorToDelete(councilor);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCouncilor = () => {
    if (councilorToDelete) {
      dispatch(deleteUserByIdAsync({ id: councilorToDelete._id })).then(() => {
        setIsDeleteDialogOpen(false);
        setCouncilorToDelete(null);
        dispatch(
          getAllCouncilorsAsync({
            page: pagination.currentPage,
            limit,
          })
        );
      });
    }
  };

  const handleCreateCouncilor = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/create-councilors", formData);
      setIsCreateModalOpen(false);
      setFormData({
        name: "",
        mobile: "",
        email: "",
        password: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
      });
      dispatch(
        getAllCouncilorsAsync({
          page: pagination.currentPage,
          limit,
        })
      );
    } catch (error) {
      console.error("Error creating councilor:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Councilor List</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add Councilor
          </button>
          <select
            value={limit}
            onChange={handleLimitChange}
            className="border rounded-md px-4 py-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <CouncilorList
        councilors={councilors}
        handleCouncilorClick={handleCouncilorClick}
        handleDeleteClick={handleDeleteClick}
      />

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        handlePageChange={handlePageChange}
      />

      {/* Create Councilor Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-bold">Create Councilor</h3>
            <form onSubmit={handleCreateCouncilor} className="mt-4">
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border rounded-md px-4 py-2"
                  required
                />
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="border rounded-md px-4 py-2"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border rounded-md px-4 py-2"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border rounded-md px-4 py-2"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="border rounded-md px-4 py-2"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="border rounded-md px-4 py-2"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="border rounded-md px-4 py-2"
                />
                <input
                  type="text"
                  name="pinCode"
                  placeholder="Pin Code"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  className="border rounded-md px-4 py-2"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold">Confirm Deletion</h3>
            <p>Are you sure you want to delete this councilor?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCouncilor}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Councilor;
