// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import uploadImage from "../firebase/image";
// import {
//   fetchLabTestCategories,
//   setError,
// } from "../store/features/labs/labsSlice";
// import Pagination from "./Pagination";

// const LabCategoriesManager = () => {
//   const dispatch = useDispatch();
//   const { labTestCategories, loading, error, pagination } = useSelector(
//     (state) => state.labs
//   );
//   const [form, setForm] = useState({ name: "", image: "", profileImg: "" });
//   const [editId, setEditId] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [progress, setProgress] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState("");
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     dispatch(
//       fetchLabTestCategories({
//         page: pagination.currentPage,
//         limit: pagination.limit,
//       })
//     );
//   }, [dispatch, pagination.currentPage, pagination.limit]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image" && files[0]) {
//       setImageFile(files[0]);
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (imageFile) {
//         const imageUrl = await uploadImage(
//           "labCategories",
//           imageFile,
//           setProgress
//         );
//         form.image = imageUrl;
//       }

//       if (editId) {
//         await axiosInstance.put(`/lab-test/${editId}`, form);
//       } else {
//         await axiosInstance.post("/lab-test/", form);
//       }
//       setForm({ name: "", image: "" });
//       setImageFile(null);
//       setEditId(null);
//       dispatch(
//         fetchLabTestCategories({
//           page: pagination.currentPage,
//           limit: pagination.limit,
//         })
//       );
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error saving lab category:", error);
//       dispatch(setError("Error saving lab category"));
//     }
//   };

//   const handleEdit = (category) => {
//     setForm({
//       name: category.name,
//       image: category.image,
//       profileImg: category.profileImg,
//     });
//     setEditId(category._id);
//     setModalType("edit");
//     setShowModal(true);
//   };

//   const handleDelete = async () => {
//     try {
//       await axiosInstance.delete(`/lab-test/${deleteId}`);
//       dispatch(
//         fetchLabTestCategories({
//           page: pagination.currentPage,
//           limit: pagination.limit,
//         })
//       );
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error deleting lab category:", error);
//       dispatch(setError("Error deleting lab category"));
//     }
//   };

//   const openDeleteModal = (id) => {
//     setDeleteId(id);
//     setModalType("delete");
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setModalType("");
//     setForm({ name: "", image: "", profileImg: "" });
//     setImageFile(null);
//     setEditId(null);
//   };

//   const handlePageChange = (newPage) => {
//     dispatch(
//       fetchLabTestCategories({ page: newPage, limit: pagination.limit })
//     );
//   };

//   const handleLimitChange = (e) => {
//     const newLimit = Number(e.target.value);
//     dispatch(fetchLabTestCategories({ page: 1, limit: newLimit }));
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">Error: {error}</p>;
//   }

//   if (!Array.isArray(labTestCategories) || labTestCategories.length === 0) {
//     return (
//       <p className="text-red-500">
//         Error: Lab categories data is not available.
//       </p>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Lab Categories Manager</h1>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="flex justify-between items-center mb-6">
//         <button
//           onClick={() => {
//             setModalType("create");
//             setShowModal(true);
//           }}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md"
//         >
//           Add New Category
//         </button>

//         <select
//           value={pagination.limit}
//           onChange={handleLimitChange}
//           className="px-4 py-2 border rounded-md"
//         >
//           <option value={10}>10</option>
//           <option value={20}>20</option>
//           <option value={30}>30</option>
//           <option value={50}>50</option>
//         </select>
//       </div>

//       <table className="min-w-full bg-white border border-gray-200">
//         <thead className="bg-blue-50">
//           <tr>
//             <th className="py-3 px-6 border-b">Name</th>
//             <th className="py-3 px-6 border-b">Image</th>
//             <th className="py-3 px-6 border-b">Profile Image</th>
//             <th className="py-3 px-6 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-700">
//           {labTestCategories.map((category) => (
//             <tr
//               key={category._id}
//               className="hover:bg-gray-100 transition-colors"
//             >
//               <td className="py-3 px-6 border-b">{category.name}</td>
//               <td className="py-3 px-6 border-b">
//                 {category.image ? (
//                   <img
//                     src={category.image}
//                     alt={category.name}
//                     className="h-12"
//                   />
//                 ) : (
//                   "No image"
//                 )}
//               </td>
//               <td className="py-3 px-6 border-b">
//                 {category.profileImg ? (
//                   <img
//                     src={category.profileImg}
//                     alt={`${category.name}-profile-image`}
//                     className="h-12"
//                   />
//                 ) : (
//                   "No image"
//                 )}
//               </td>
//               <td className="py-3 px-6 border-b">
//                 <button
//                   onClick={() => handleEdit(category)}
//                   className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded-md"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => openDeleteModal(category._id)}
//                   className="px-2 py-1 bg-red-500 text-white rounded-md"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Pagination
//         currentPage={pagination.currentPage}
//         totalPages={pagination.totalPages}
//         onPageChange={handlePageChange}
//       />

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-md shadow-lg w-80 relative">
//             <h2 className="text-xl font-bold mb-4">
//               {modalType === "create"
//                 ? "Create Lab Category"
//                 : modalType === "edit"
//                 ? "Edit Lab Category"
//                 : "Delete Lab Category"}
//             </h2>

//             {modalType !== "delete" && (
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border rounded-md"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Image</label>
//                   <input
//                     type="file"
//                     name="image"
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border rounded-md"
//                   />
//                 </div>
//                 {progress !== null && (
//                   <div className="mb-4">
//                     <p>Upload progress: {progress}%</p>
//                   </div>
//                 )}
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Profile Image</label>
//                   <input
//                     type="file"
//                     name="profileImg"
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border rounded-md"
//                   />
//                 </div>
//                 {progress !== null && (
//                   <div className="mb-4">
//                     <p>Upload progress: {progress}%</p>
//                   </div>
//                 )}
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                 >
//                   {modalType === "create" ? "Create" : "Update"}
//                 </button>
//               </form>
//             )}

//             {modalType === "delete" && (
//               <div>
//                 <p>Are you sure you want to delete this category?</p>
//                 <div className="mt-4 flex justify-end">
//                   <button
//                     onClick={handleDelete}
//                     className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={closeModal}
//                     className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-gray-600"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabCategoriesManager;
//======================================================
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import uploadImage from "../firebase/image";
// import {
//   fetchLabTestCategories,
//   setError,
// } from "../store/features/labs/labsSlice";
// import Pagination from "./Pagination";

// const LabCategoriesManager = () => {
//   const dispatch = useDispatch();
//   const { labTestCategories, loading, error, pagination } = useSelector(
//     (state) => state.labs
//   );
//   const [form, setForm] = useState({ name: "", image: "", profileImg: "" });
//   const [editId, setEditId] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [progress, setProgress] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState("");
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     dispatch(
//       fetchLabTestCategories({
//         page: pagination.currentPage,
//         limit: pagination.limit,
//       })
//     );
//   }, [dispatch, pagination.currentPage, pagination.limit]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image" && files[0]) {
//       setImageFile(files[0]);
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (imageFile) {
//         const imageUrl = await uploadImage(
//           "labCategories",
//           imageFile,
//           setProgress
//         );
//         form.image = imageUrl;
//       }

//       if (profileImageFile) {
//         const profileImageUrl = await uploadImage(
//           "labCategories",
//           profileImageFile,
//           setProgress
//         );
//         form.profileImg = profileImageUrl;
//       }

//       if (editId) {
//         await axiosInstance.put(`/lab-test/${editId}`, form);
//       } else {
//         await axiosInstance.post("/lab-test/", form);
//       }

//       // Reset the form and image states
//       setForm({ name: "", image: "" });
//       setImageFile(null);

//       setEditId(null);
//       setShowModal(false);

//       // Fetch updated categories
//       dispatch(
//         fetchLabTestCategories({
//           page: pagination.currentPage,
//           limit: pagination.limit,
//         })
//       );
//     } catch (error) {
//       console.error("Error saving lab category:", error);
//       dispatch(setError("Error saving lab category"));
//     }
//   };

//   const handleEdit = (category) => {
//     setForm({
//       name: category.name,
//       image: category.image,
//       profileImg: category.profileImg,
//     });
//     setEditId(category._id);
//     setModalType("edit");
//     setShowModal(true);
//   };

//   const handleDelete = async () => {
//     try {
//       await axiosInstance.delete(`/lab-test/${deleteId}`);
//       dispatch(
//         fetchLabTestCategories({
//           page: pagination.currentPage,
//           limit: pagination.limit,
//         })
//       );
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error deleting lab category:", error);
//       dispatch(setError("Error deleting lab category"));
//     }
//   };

//   const openDeleteModal = (id) => {
//     setDeleteId(id);
//     setModalType("delete");
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setModalType("");
//     setForm({ name: "", image: "", profileImg: "" });
//     setImageFile(null);

//     setEditId(null);
//   };

//   const handlePageChange = (newPage) => {
//     dispatch(
//       fetchLabTestCategories({ page: newPage, limit: pagination.limit })
//     );
//   };

//   const handleLimitChange = (e) => {
//     const newLimit = Number(e.target.value);
//     dispatch(fetchLabTestCategories({ page: 1, limit: newLimit }));
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">Error: {error}</p>;
//   }

//   if (!Array.isArray(labTestCategories) || labTestCategories.length === 0) {
//     return (
//       <p className="text-red-500">
//         Error: Lab categories data is not available.
//       </p>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Lab Categories Manager</h1>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="flex justify-between items-center mb-6">
//         <button
//           onClick={() => {
//             setModalType("create");
//             setShowModal(true);
//           }}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md"
//         >
//           Add New Category
//         </button>

//         <select
//           value={pagination.limit}
//           onChange={handleLimitChange}
//           className="px-4 py-2 border rounded-md"
//         >
//           <option value={10}>10</option>
//           <option value={20}>20</option>
//           <option value={30}>30</option>
//           <option value={50}>50</option>
//         </select>
//       </div>

//       <table className="min-w-full bg-white border border-gray-200">
//         <thead className="bg-blue-50">
//           <tr>
//             <th className="py-3 px-6 border-b">Name</th>
//             <th className="py-3 px-6 border-b">Image</th>

//             <th className="py-3 px-6 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-700">
//           {labTestCategories.map((category) => (
//             <tr
//               key={category._id}
//               className="hover:bg-gray-100 transition-colors"
//             >
//               <td className="py-3 px-6 border-b">{category.name}</td>
//               <td className="py-3 px-6 border-b">
//                 {category.image ? (
//                   <img
//                     src={category.image}
//                     alt={category.name}
//                     className="h-12"
//                   />
//                 ) : (
//                   "No image"
//                 )}
//               </td>

//               <td className="py-3 px-6 border-b">
//                 <button
//                   onClick={() => handleEdit(category)}
//                   className="mr-2 px-2 py-1 bg-green-500 text-white rounded-md"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => openDeleteModal(category._id)}
//                   className="px-2 py-1 bg-red-500 text-white rounded-md"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Pagination
//         currentPage={pagination.currentPage}
//         totalPages={pagination.totalPages}
//         onPageChange={handlePageChange}
//       />

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-md shadow-lg w-80 relative">
//             <h2 className="text-xl font-bold mb-4">
//               {modalType === "create"
//                 ? "Create Lab Category"
//                 : modalType === "edit"
//                 ? "Edit Lab Category"
//                 : "Delete Lab Category"}
//             </h2>

//             {modalType !== "delete" && (
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border rounded-md"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Image</label>
//                   <input
//                     type="file"
//                     name="image"
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border rounded-md"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Profile Image</label>
//                   <input
//                     type="file"
//                     name="profileImg"
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border rounded-md"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 text-white py-2 rounded-md"
//                 >
//                   {editId ? "Update Category" : "Create Category"}
//                 </button>
//               </form>
//             )}

//             {modalType === "delete" && (
//               <div>
//                 <p>Are you sure you want to delete this category?</p>
//                 <div className="flex justify-end mt-4">
//                   <button
//                     onClick={handleDelete}
//                     className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={closeModal}
//                     className="px-4 py-2 bg-gray-500 text-white rounded-md"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabCategoriesManager;
//==============================================
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import uploadImage from "../firebase/image";
import {
  fetchLabTestCategories,
  setError,
} from "../store/features/labs/labsSlice";
import Pagination from "./Pagination";

const LabCategoriesManager = () => {
  const dispatch = useDispatch();
  const { labTestCategories, loading, error, pagination } = useSelector(
    (state) => state.labs
  );
  const [form, setForm] = useState({ name: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(
      fetchLabTestCategories({
        page: pagination.currentPage,
        limit: pagination.limit,
      })
    );
  }, [dispatch, pagination.currentPage, pagination.limit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setImageFile(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (imageFile) {
        const imageUrl = await uploadImage(
          "labCategories",
          imageFile,
          setProgress
        );
        form.image = imageUrl;
      }

      if (editId) {
        await axiosInstance.put(`/lab-test/${editId}`, form);
      } else {
        await axiosInstance.post("/lab-test/", form);
      }

      // Reset the form and image states
      setForm({ name: "", image: "" });
      setImageFile(null);

      setEditId(null);
      setShowModal(false);

      // Fetch updated categories
      dispatch(
        fetchLabTestCategories({
          page: pagination.currentPage,
          limit: pagination.limit,
        })
      );
    } catch (error) {
      console.error("Error saving lab category:", error);
      dispatch(setError("Error saving lab category"));
    }
  };

  const handleEdit = (category) => {
    setForm({
      name: category.name,
      image: category.image,
    });
    setEditId(category._id);
    setModalType("edit");
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/lab-test/${deleteId}`);
      dispatch(
        fetchLabTestCategories({
          page: pagination.currentPage,
          limit: pagination.limit,
        })
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting lab category:", error);
      dispatch(setError("Error deleting lab category"));
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setModalType("delete");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setForm({ name: "", image: "" });
    setImageFile(null);
    setEditId(null);
  };

  const handlePageChange = (newPage) => {
    dispatch(
      fetchLabTestCategories({ page: newPage, limit: pagination.limit })
    );
  };

  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);
    dispatch(fetchLabTestCategories({ page: 1, limit: newLimit }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!Array.isArray(labTestCategories) || labTestCategories.length === 0) {
    return (
      <p className="text-red-500">
        Error: Lab categories data is not available.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lab Categories Manager</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => {
            setModalType("create");
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add New Category
        </button>

        <select
          value={pagination.limit}
          onChange={handleLimitChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-6 border-b">Name</th>
            <th className="py-3 px-6 border-b">Image</th>
            <th className="py-3 px-6 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {labTestCategories.map((category) => (
            <tr
              key={category._id}
              className="hover:bg-gray-100 transition-colors"
            >
              <td className="py-3 px-6 border-b">{category.name}</td>
              <td className="py-3 px-6 border-b">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-12"
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td className="py-3 px-6 border-b">
                <button
                  onClick={() => handleEdit(category)}
                  className="mr-2 px-2 py-1 bg-green-500 text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(category._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-80 relative">
            <h2 className="text-xl font-bold mb-4">
              {modalType === "create"
                ? "Create Lab Category"
                : modalType === "edit"
                ? "Edit Lab Category"
                : "Delete Lab Category"}
            </h2>

            {modalType !== "delete" && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Image</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                  {editId ? "Update Category" : "Create Category"}
                </button>
              </form>
            )}

            {modalType === "delete" && (
              <div>
                <p>Are you sure you want to delete this category?</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleDelete}
                    className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabCategoriesManager;
