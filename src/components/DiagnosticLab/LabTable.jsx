// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getAllLabsAsync,
//   createLabAsync,
//   updateLabAsync,
//   deleteLabAsync,
//   createTestAsync,
//   updateTestAsync,
//   deleteTestAsync,
// } from "../../store/features/labs/labsSlice";
// import LabModal from "./LabModal";
// import DeleteConfirmationModal from "./DeleteConfirmationModal";
// import Pagination from "./Pagination";
// import LabTestsTable from "./LabTestsTable";

// const LabTable = () => {
//   const [filter, setFilter] = useState("");
//   const [showLabModal, setShowLabModal] = useState(false);

//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [selectedLab, setSelectedLab] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [viewingLabTests, setViewingLabTests] = useState(false);

//   const dispatch = useDispatch();
//   const { labs, loading, error } = useSelector((state) => state.labs);

//   useEffect(() => {
//     dispatch(getAllLabsAsync());
//   }, [dispatch]);

//   const filteredLabs = labs?.filter(
//     (lab) => lab?.name && lab?.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentLabs = filteredLabs.slice(indexOfFirstItem, indexOfLastItem);

//   const handleCreateLab = () => {
//     setSelectedLab(null); // Clear selected lab
//     setShowLabModal(true);
//     dispatch(getAllLabsAsync());
//   };

//   const handleUpdateLab = async (labId, labData) => {
//     try {
//       await dispatch(updateLabAsync({ id: labId, labData }));
//       setShowLabModal(false);
//       dispatch(getAllLabsAsync());
//     } catch (error) {
//       console.error("Error updating lab:", error);
//     }
//   };

//   const handleCreateLabSubmit = async (labData) => {
//     try {
//       await dispatch(createLabAsync(labData));
//       setShowLabModal(false);
//       dispatch(getAllLabsAsync());
//     } catch (error) {
//       console.error("Error creating lab:", error);
//     }
//   };

//   const handleDeleteLab = async (labId) => {
//     try {
//       await dispatch(deleteLabAsync(labId));
//       setShowDeleteDialog(false);
//       dispatch(getAllLabsAsync());
//     } catch (error) {
//       console.error("Error deleting lab:", error);
//     }
//   };

//   const handleCreateTest = async (testData) => {
//     try {
//       await dispatch(
//         createTestAsync({ ...testData, diagnosticLabId: selectedLab._id })
//       );
//       dispatch(getAllLabsAsync());
//     } catch (error) {
//       console.error("Error creating test:", error);
//     }
//   };

//   const handleUpdateTest = async (testData) => {
//     try {
//       await dispatch(
//         updateTestAsync({
//           diagnosticLabId: selectedLab._id,
//           testId: testData._id,
//           testData,
//         })
//       );
//       dispatch(getAllLabsAsync());
//     } catch (error) {
//       console.error("Error updating test:", error);
//     }
//   };

//   const handleDeleteTest = async (test) => {
//     try {
//       await dispatch(deleteTestAsync(test._id));
//       dispatch(getAllLabsAsync());
//     } catch (error) {
//       console.error("Error deleting test:", error);
//     }
//   };

//   const handleViewTests = (lab) => {
//     setSelectedLab(lab);
//     setViewingLabTests(true);
//   };

//   return (
//     <div>
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>Error: {error.message}</div>
//       ) : viewingLabTests ? (
//         <LabTestsTable
//           lab={selectedLab}
//           onBack={() => setViewingLabTests(false)}
//           onAddTest={handleCreateTest}
//           onEditTest={handleUpdateTest}
//           onDeleteTest={handleDeleteTest}
//         />
//       ) : (
//         <div className="mx-10 py-10">
//           <div className="flex justify-between items-center mb-4">
//             <input
//               type="text"
//               placeholder="Filter by lab name"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border rounded-md px-3 py-2"
//             />
//             <button
//               onClick={handleCreateLab}
//               className="px-3 py-2 border rounded-md"
//             >
//               Add Lab
//             </button>
//           </div>
//           <table className="w-full">
//             <thead className="bg-blue-50">
//               <tr className="border-b">
//                 <th className="py-2 px-4"></th>
//                 <th className="py-2 px-4">Name</th>
//                 <th className="py-2 px-4">Address</th>
//                 <th className="py-2 px-4">Contact</th>
//                 <th className="py-2 px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentLabs.map((lab) => (
//                 <tr key={lab._id} className="border-b">
//                   <td className="py-2 px-4">
//                     <img
//                       className="w-56 h-28 "
//                       src={lab.image}
//                       alt={lab.name}
//                     />
//                   </td>
//                   <td className="py-2 px-4">{lab.name}</td>
//                   <td className="py-2 px-4">
//                     {lab?.address?.address}, {lab?.address?.city},{" "}
//                     {lab?.address?.state}, {lab?.address?.pinCode}
//                   </td>
//                   <td className="py-2 px-4">{lab.contact}</td>
//                   <td className="py-2 px-4 space-x-4">
//                     <button
//                       className="text-blue-600 mr-2"
//                       onClick={() => handleViewTests(lab)}
//                     >
//                       View Tests
//                     </button>
//                     <button
//                       className="text-blue-600 mr-2"
//                       onClick={() => {
//                         setSelectedLab(lab);
//                         setShowLabModal(true);
//                       }}
//                     >
//                       Edit
//                     </button>

//                     <button
//                       className="text-red-600"
//                       onClick={() => {
//                         setSelectedLab(lab);
//                         setShowDeleteDialog(true);
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <Pagination
//             currentPage={currentPage}
//             itemsPerPage={itemsPerPage}
//             totalItems={filteredLabs.length}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         </div>
//       )}

//       {showLabModal && (
//         <LabModal
//           lab={selectedLab}
//           onSubmit={selectedLab ? handleUpdateLab : handleCreateLabSubmit}
//           closeModal={() => setShowLabModal(false)}
//         />
//       )}
//       {showDeleteDialog && (
//         <DeleteConfirmationModal
//           onConfirm={() => handleDeleteLab(selectedLab._id)}
//           onCancel={() => setShowDeleteDialog(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default LabTable;
// ====================================================
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getAllLabsAsync,
//   createLabAsync,
//   updateLabAsync,
//   deleteLabAsync,
//   createTestAsync,
//   updateTestAsync,
//   deleteTestAsync,
// } from "../../store/features/labs/labsSlice";
// import LabModal from "./LabModal";
// import DeleteConfirmationModal from "./DeleteConfirmationModal";
// import Pagination from "./Pagination";
// import LabTestsTable from "./LabTestsTable";

// const LabTable = () => {
//   const [filter, setFilter] = useState("");
//   const [showLabModal, setShowLabModal] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [viewingLabTests, setViewingLabTests] = useState(false);

//   const dispatch = useDispatch();
//   const { labs, loading, error, pagination } = useSelector(
//     (state) => state.labs
//   );

//   useEffect(() => {
//     dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
//   }, [dispatch, currentPage, itemsPerPage]);

//   const filteredLabs = labs?.filter(
//     (lab) => lab?.name && lab?.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   const handleCreateLab = () => {
//     setSelectedLab(null);
//     setShowLabModal(true);
//   };

//   const handleUpdateLab = async (labId, labData) => {
//     try {
//       await dispatch(updateLabAsync({ id: labId, labData }));
//       setShowLabModal(false);
//       dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
//     } catch (error) {
//       console.error("Error updating lab:", error);
//     }
//   };

//   const handleCreateLabSubmit = async (labData) => {
//     try {
//       await dispatch(createLabAsync(labData));
//       setShowLabModal(false);
//       dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
//     } catch (error) {
//       console.error("Error creating lab:", error);
//     }
//   };

//   const handleDeleteLab = async (labId) => {
//     try {
//       await dispatch(deleteLabAsync(labId));
//       setShowDeleteDialog(false);
//       dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
//     } catch (error) {
//       console.error("Error deleting lab:", error);
//     }
//   };

//   const handleCreateTest = async (testData) => {
//     try {
//       await dispatch(
//         createTestAsync({ ...testData, diagnosticLabId: selectedLab._id })
//       );
//       dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
//     } catch (error) {
//       console.error("Error creating test:", error);
//     }
//   };

//   const handleUpdateTest = async (testData) => {
//     try {
//       await dispatch(
//         updateTestAsync({
//           diagnosticLabId: selectedLab._id,
//           testId: testData._id,
//           testData,
//         })
//       );
//       dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
//     } catch (error) {
//       console.error("Error updating test:", error);
//     }
//   };

//   const handleDeleteTest = async (test) => {
//     try {
//       await dispatch(deleteTestAsync(test._id));
//       dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
//     } catch (error) {
//       console.error("Error deleting test:", error);
//     }
//   };

//   const handleViewTests = (lab) => {
//     setSelectedLab(lab);
//     setViewingLabTests(true);
//   };

//   return (
//     <div>
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>Error: {error.message}</div>
//       ) : viewingLabTests ? (
//         <LabTestsTable
//           lab={selectedLab}
//           onBack={() => setViewingLabTests(false)}
//           onAddTest={handleCreateTest}
//           onEditTest={handleUpdateTest}
//           onDeleteTest={handleDeleteTest}
//         />
//       ) : (
//         <div className="mx-10 py-10">
//           <div className="flex justify-between items-center mb-4">
//             <input
//               type="text"
//               placeholder="Filter by lab name"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border rounded-md px-3 py-2"
//             />
//             <button
//               onClick={handleCreateLab}
//               className="px-3 py-2 border rounded-md"
//             >
//               Add Lab
//             </button>
//           </div>
//           <table className="w-full">
//             <thead className="bg-blue-50">
//               <tr className="border-b">
//                 <th className="py-2 px-4"></th>
//                 <th className="py-2 px-4">Name</th>
//                 <th className="py-2 px-4">Address</th>
//                 <th className="py-2 px-4">Contact</th>
//                 <th className="py-2 px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredLabs
//                 .slice(
//                   (currentPage - 1) * itemsPerPage,
//                   currentPage * itemsPerPage
//                 )
//                 .map((lab) => (
//                   <tr key={lab._id} className="border-b">
//                     <td className="py-2 px-4">
//                       <img
//                         className="w-56 h-28"
//                         src={lab.image}
//                         alt={lab.name}
//                       />
//                     </td>
//                     <td className="py-2 px-4">{lab.name}</td>
//                     <td className="py-2 px-4">
//                       {lab?.address?.address}, {lab?.address?.city},{" "}
//                       {lab?.address?.state}, {lab?.address?.pinCode}
//                     </td>
//                     <td className="py-2 px-4">{lab.contact}</td>
//                     <td className="py-2 px-4 space-x-4">
//                       <button
//                         className="text-blue-600 mr-2"
//                         onClick={() => handleViewTests(lab)}
//                       >
//                         View Tests
//                       </button>
//                       <button
//                         className="text-blue-600 mr-2"
//                         onClick={() => {
//                           setSelectedLab(lab);
//                           setShowLabModal(true);
//                         }}
//                       >
//                         Edit
//                       </button>

//                       <button
//                         className="text-red-600"
//                         onClick={() => {
//                           setSelectedLab(lab);
//                           setShowDeleteDialog(true);
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>

//           <Pagination
//             currentPage={pagination.currentPage}
//             itemsPerPage={pagination.limit}
//             totalItems={pagination.totalLabs}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         </div>
//       )}

//       {showLabModal && (
//         <LabModal
//           lab={selectedLab}
//           onSubmit={selectedLab ? handleUpdateLab : handleCreateLabSubmit}
//           closeModal={() => setShowLabModal(false)}
//         />
//       )}
//       {showDeleteDialog && (
//         <DeleteConfirmationModal
//           onConfirm={() => handleDeleteLab(selectedLab._id)}
//           onCancel={() => setShowDeleteDialog(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default LabTable;
//====================================================
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getAllLabsAsync,
//   createLabAsync,
//   updateLabAsync,
//   deleteLabAsync,
//   createTestAsync,
//   updateTestAsync,
//   deleteTestAsync,
// } from "../../store/features/labs/labsSlice";
// import LabModal from "./LabModal";
// import DeleteConfirmationModal from "./DeleteConfirmationModal";
// import Pagination from "./Pagination";
// import LabTestsTable from "./LabTestsTable";

// const LabTable = () => {
//   const [filter, setFilter] = useState("");
//   const [showLabModal, setShowLabModal] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [viewingLabTests, setViewingLabTests] = useState(false);
//   const dispatch = useDispatch();
//   const { labs, loading, error, pagination } = useSelector(
//     (state) => state.labs
//   );

//   useEffect(() => {
//     console.log("Fetching data with:", { currentPage, itemsPerPage });
//     dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
//   }, [dispatch, currentPage, itemsPerPage]);

//   useEffect(() => {
//     console.log("Updated labs:", labs);
//     console.log("Updated pagination:", pagination);
//   }, [labs, pagination]);

//   const handleItemsPerPageChange = (e) => {
//     const newItemsPerPage = parseInt(e.target.value);
//     setItemsPerPage(newItemsPerPage);
//     setCurrentPage(1); // Reset to first page when changing items per page
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };
//   const filteredLabs =
//     labs?.filter(
//       (lab) =>
//         lab?.name && lab?.name.toLowerCase().includes(filter.toLowerCase())
//     ) || [];

//   const handleCreateLab = () => {
//     setSelectedLab(null);
//     setShowLabModal(true);
//   };

//   const handleUpdateLab = async (labId, labData) => {
//     try {
//       await dispatch(updateLabAsync({ id: labId, labData }));
//       setShowLabModal(false);
//       dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
//     } catch (error) {
//       console.error("Error updating lab:", error);
//     }
//   };

//   const handleCreateLabSubmit = async (labData) => {
//     try {
//       await dispatch(createLabAsync(labData));
//       setShowLabModal(false);
//       dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
//     } catch (error) {
//       console.error("Error creating lab:", error);
//     }
//   };

//   const handleDeleteLab = async (labId) => {
//     try {
//       await dispatch(deleteLabAsync(labId));
//       setShowDeleteDialog(false);
//       dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
//     } catch (error) {
//       console.error("Error deleting lab:", error);
//     }
//   };

//   const handleCreateTest = async (testData) => {
//     try {
//       await dispatch(
//         createTestAsync({ ...testData, diagnosticLabId: selectedLab._id })
//       );
//       dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
//     } catch (error) {
//       console.error("Error creating test:", error);
//     }
//   };

//   const handleUpdateTest = async (testData) => {
//     try {
//       await dispatch(
//         updateTestAsync({
//           diagnosticLabId: selectedLab._id,
//           testId: testData._id,
//           testData,
//         })
//       );
//       dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
//     } catch (error) {
//       console.error("Error updating test:", error);
//     }
//   };

//   const handleDeleteTest = async (test) => {
//     try {
//       await dispatch(deleteTestAsync(test._id));
//       dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
//     } catch (error) {
//       console.error("Error deleting test:", error);
//     }
//   };

//   const handleViewTests = (lab) => {
//     console.log("Selected lab:", lab); // Debug log
//     setSelectedLab(lab);
//     setViewingLabTests(true);
//   };

//   return (
//     <div>
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>Error: {error.message}</div>
//       ) : viewingLabTests ? (
//         <div>
//           <LabTestsTable
//             lab={selectedLab}
//             onBack={() => {
//               console.log("Back button clicked"); // Debug log
//               setViewingLabTests(false);
//             }}
//             onAddTest={handleCreateTest}
//             onEditTest={handleUpdateTest}
//             onDeleteTest={handleDeleteTest}
//           />
//         </div>
//       ) : (
//         <div className="mx-10 py-10">
//           <div className="flex justify-between items-center mb-4">
//             <input
//               type="text"
//               placeholder="Filter by lab name"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border rounded-md px-3 py-2"
//             />
//             <div className="flex items-center">
//               <label htmlFor="itemsPerPage" className="mr-2">
//                 Items per page:
//               </label>
//               <select
//                 id="itemsPerPage"
//                 value={itemsPerPage}
//                 onChange={handleItemsPerPageChange}
//                 className="border rounded-md px-3 py-2"
//               >
//                 <option value="5">5</option>
//                 <option value="10">10</option>
//                 <option value="20">20</option>
//                 <option value="30">30</option>
//               </select>
//             </div>
//             <button
//               onClick={handleCreateLab}
//               className="px-3 py-2 border rounded-md"
//             >
//               Add Lab
//             </button>
//           </div>
//           <table className="w-full">
//             <thead className="bg-blue-50">
//               <tr className="border-b">
//                 <th className="py-2 px-4"></th>
//                 <th className="py-2 px-4">Name</th>
//                 <th className="py-2 px-4">Address</th>
//                 <th className="py-2 px-4">Contact</th>
//                 <th className="py-2 px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredLabs.map((lab) => (
//                 <tr key={lab._id} className="border-b">
//                   <td className="py-2 px-4">
//                     <img className="w-56 h-28" src={lab.image} alt={lab.name} />
//                   </td>
//                   <td className="py-2 px-4">{lab.name}</td>
//                   <td className="py-2 px-4">
//                     {lab?.address?.address}, {lab?.address?.city},{" "}
//                     {lab?.address?.state}, {lab?.address?.pinCode}
//                   </td>
//                   <td className="py-2 px-4">{lab.contact}</td>
//                   <td className="py-2 px-4 space-x-4">
//                     <button
//                       className="text-blue-600 mr-2"
//                       onClick={() => handleViewTests(lab)}
//                     >
//                       View Tests
//                     </button>
//                     <button
//                       className="text-blue-600 mr-2"
//                       onClick={() => {
//                         setSelectedLab(lab);
//                         setShowLabModal(true);
//                       }}
//                     >
//                       Edit
//                     </button>

//                     <button
//                       className="text-red-600"
//                       onClick={() => {
//                         setSelectedLab(lab);
//                         setShowDeleteDialog(true);
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <Pagination
//             currentPage={pagination.currentPage}
//             itemsPerPage={pagination.limit}
//             totalItems={pagination.totalLabs}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       )}

//       {showLabModal && (
//         <LabModal
//           lab={selectedLab}
//           onSubmit={selectedLab ? handleUpdateLab : handleCreateLabSubmit}
//           closeModal={() => setShowLabModal(false)}
//         />
//       )}
//       {showDeleteDialog && (
//         <DeleteConfirmationModal
//           onConfirm={() => handleDeleteLab(selectedLab._id)}
//           onCancel={() => setShowDeleteDialog(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default LabTable;

//====================================================
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllLabsAsync,
  createLabAsync,
  updateLabAsync,
  deleteLabAsync,
  createTestAsync,
  updateTestAsync,
  deleteTestAsync,
  toggleHandleViewAsync,
} from "../../store/features/labs/labsSlice";
import LabModal from "./LabModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Pagination from "./Pagination";
import LabTestsTable from "./LabTestsTable";

const LabTable = () => {
  const [filter, setFilter] = useState("");
  const [showLabModal, setShowLabModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewingLabTests, setViewingLabTests] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { labs, loading, error, pagination } = useSelector(
    (state) => state.labs
  );

  useEffect(() => {
    dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const filteredLabs =
    labs?.filter((lab) =>
      lab?.name?.toLowerCase().includes(filter.toLowerCase())
    ) || [];

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCreateLab = () => {
    setSelectedLab(null);
    setShowLabModal(true);
  };

  const handleLabAction = async (action, labId, labData) => {
    try {
      await dispatch(action(labId ? { id: labId, labData } : labData));
      setShowLabModal(false);
      dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
    } catch (error) {
      console.error(`Error ${labId ? "updating" : "creating"} lab:`, error);
    }
  };

  const handleDeleteLab = async (labId) => {
    try {
      await dispatch(deleteLabAsync(labId));
      setShowDeleteDialog(false);
      dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
    } catch (error) {
      console.error("Error deleting lab:", error);
    }
  };

  const handleTestAction = async (action, testData) => {
    try {
      await dispatch(
        action({
          ...testData,
          diagnosticLabId: selectedLab._id,
        })
      );
      dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
    } catch (error) {
      console.error(
        `Error ${action === createTestAsync ? "creating" : "updating"} test:`,
        error
      );
    }
  };

  const handleDeleteTest = async (testId) => {
    try {
      await dispatch(deleteTestAsync(testId));
      dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  const handleViewTests = (lab) => {
    setIsLoading(true);
    setSelectedLab(lab);
    setIsLoading(false);
    setViewingLabTests(true);
  };

  const handleToggleHandleView = async (labId) => {
    try {
      await dispatch(toggleHandleViewAsync(labId));
      dispatch(getAllLabsAsync({ page: currentPage, limit: itemsPerPage }));
    } catch (error) {
      console.error("Error toggling handleView:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-10 py-10">
      {isLoading ? (
        <div>Loading...</div>
      ) : viewingLabTests ? (
        <LabTestsTable
          lab={selectedLab}
          onBack={() => setViewingLabTests(false)}
          onAddTest={(testData) => handleTestAction(createTestAsync, testData)}
          onEditTest={(testData) => handleTestAction(updateTestAsync, testData)}
          onDeleteTest={handleDeleteTest}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Filter by lab name"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-md px-3 py-2"
            />
            <div className="flex items-center">
              <label htmlFor="itemsPerPage" className="mr-2">
                Items per page:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border rounded-md px-3 py-2"
              >
                {[5, 10, 20, 30].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleCreateLab}
              className="px-3 py-2 border rounded-md"
            >
              Add Lab
            </button>
          </div>

          <table className="w-full">
            <thead className="bg-blue-50">
              <tr className="border-b">
                <th className="py-2 px-4"></th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Address</th>
                <th className="py-2 px-4">Contact</th>
                <th className="py-2 px-4">Actions</th>
                <th className="py-2 px-4">Handle Mobile View</th>
              </tr>
            </thead>
            <tbody>
              {filteredLabs.map((lab) => (
                <tr key={lab._id} className="border-b">
                  <td className="py-2 px-4">
                    <img className="w-56 h-28" src={lab.image} alt={lab.name} />
                  </td>
                  <td className="py-2 px-4">{lab.name}</td>
                  <td className="py-2 px-4">{lab.email}</td>
                  <td className="py-2 px-4">
                    {`${lab?.address?.address}, ${lab?.address?.city}, ${lab?.address?.state}, ${lab?.address?.pinCode}`}
                  </td>
                  <td className="py-2 px-4">{lab.contactNumber}</td>
                  <td className="py-2 px-4 space-x-4">
                    <button
                      className="text-blue-600 mr-2"
                      onClick={() => handleViewTests(lab)}
                    >
                      View Tests
                    </button>
                    <button
                      className="text-blue-600 mr-2"
                      onClick={() => {
                        setSelectedLab(lab);
                        setShowLabModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 mr-2"
                      onClick={() => {
                        setSelectedLab(lab);
                        setShowDeleteDialog(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="py-2 px-4 ">
                    <div className="flex items-center justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={lab.handleView}
                          onChange={() => handleToggleHandleView(lab?._id)}
                          className="sr-only"
                        />
                        <div
                          className={`w-11 h-6 bg-gray-200 rounded-full shadow-inner ${
                            lab.handleView ? "bg-green-600" : "bg-gray-200"
                          }`}
                        ></div>
                        <div
                          className={`absolute left-0 inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                            lab.handleView ? "translate-x-5" : "translate-x-1"
                          }`}
                        ></div>
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={pagination.currentPage}
            itemsPerPage={pagination.limit}
            totalItems={pagination.totalLabs}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {showLabModal && (
        <LabModal
          lab={selectedLab}
          onSubmit={(labData) =>
            handleLabAction(
              selectedLab ? updateLabAsync : createLabAsync,
              selectedLab?._id,
              labData
            )
          }
          onClose={() => setShowLabModal(false)}
        />
      )}

      {showDeleteDialog && (
        <DeleteConfirmationModal
          message={`Are you sure you want to delete the lab ${selectedLab?.name}?`}
          onConfirm={() => handleDeleteLab(selectedLab._id)}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}
    </div>
  );
};

export default LabTable;
