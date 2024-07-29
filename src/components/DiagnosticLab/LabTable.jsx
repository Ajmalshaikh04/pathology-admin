// import { useState, useEffect } from "react";
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
// import TestModal from "./TestModal";
// import DeleteConfirmationModal from "./DeleteConfirmationModal";
// import Pagination from "./Pagination";

// const LabTable = () => {
//   const [filter, setFilter] = useState("");
//   const [showLabModal, setShowLabModal] = useState(false);
//   const [showTestModal, setShowTestModal] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [testToDelete, setTestToDelete] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   const dispatch = useDispatch();
//   const { labs, loading, error } = useSelector((state) => state.labs);

//   useEffect(() => {
//     dispatch(getAllLabsAsync());
//   }, [dispatch]);

//   const filteredLabs = labs.filter(
//     (lab) => lab.name && lab.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentLabs = filteredLabs.slice(indexOfFirstItem, indexOfLastItem);

//   const handleCreateLab = async (labData) => {
//     await dispatch(createLabAsync(labData));
//     setShowLabModal(false);
//   };

//   const handleUpdateLab = async (labId, labData) => {
//     await dispatch(updateLabAsync({ id: labId, labData }));
//     setShowLabModal(false);
//   };

//   const handleDeleteLab = async (labId) => {
//     await dispatch(deleteLabAsync(labId));
//     setShowDeleteDialog(false);
//   };

//   const handleCreateTest = async (testData) => {
//     await dispatch(
//       createTestAsync({ ...testData, diagnosticLabId: selectedLab._id })
//     );
//     setShowTestModal(false);
//   };

//   const handleUpdateTest = async (testId, testData) => {
//     await dispatch(updateTestAsync({ id: testId, ...testData }));
//     setShowTestModal(false);
//   };

//   const handleDeleteTest = async (testId) => {
//     await dispatch(deleteTestAsync(testId));
//     setShowDeleteDialog(false);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full">
//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Filter labs..."
//           className="border rounded-md px-3 py-2 w-64"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         />
//         <button
//           className="px-3 py-2 border rounded-md"
//           onClick={() => setShowLabModal(true)}
//         >
//           Create lab
//         </button>
//       </div>

//       <table className="w-full">
//         <thead>
//           <tr className="border-b">
//             <th className="py-2 px-4"></th>
//             <th className="py-2 px-4">Name</th>
//             <th className="py-2 px-4">Address</th>
//             <th className="py-2 px-4">Contact</th>
//             <th className="py-2 px-4">Tests Offered</th>
//             <th className="py-2 px-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentLabs.map((lab) => (
//             <tr
//               key={lab._id}
//               className="border-b hover:bg-gray-100 cursor-pointer"
//             >
//               <td
//                 className="py-2 px-4 cursor-pointer"
//                 onClick={() => setSelectedLab(lab)}
//               >
//                 <img
//                   className="w-full h-28 object-cover cursor-pointer"
//                   src={lab.image}
//                   alt={lab.name}
//                 />
//               </td>
//               <td
//                 className="py-2 px-4 cursor-pointer"
//                 onClick={() => setSelectedLab(lab)}
//               >
//                 {lab.name}
//               </td>
//               <td
//                 className="py-2 px-4 cursor-pointer"
//                 onClick={() => setSelectedLab(lab)}
//               >
//                 {lab.address?.address}
//               </td>
//               <td
//                 className="py-2 px-4 cursor-pointer"
//                 onClick={() => setSelectedLab(lab)}
//               >
//                 {lab.contactNumber}
//               </td>
//               <td
//                 className="py-2 px-4 cursor-pointer"
//                 onClick={() => setSelectedLab(lab)}
//               >
//                 {lab.testsOffered?.length} test
//                 {lab.testsOffered?.length > 1 ? "s" : ""}
//               </td>
//               <td className="py-2 px-4">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedLab(lab);
//                     setShowLabModal(true);
//                   }}
//                   className="bg-blue-500 text-white mr-2 px-2 py-1 rounded-lg"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedLab(lab);
//                     setShowDeleteDialog(true);
//                   }}
//                   className="bg-red-500 text-white mr-2 px-2 py-1 rounded-lg"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Pagination
//         itemsPerPage={itemsPerPage}
//         totalItems={filteredLabs.length}
//         paginate={setCurrentPage}
//         currentPage={currentPage}
//       />

//       {showLabModal && (
//         <LabModal
//           closeModal={() => setShowLabModal(false)}
//           lab={selectedLab}
//           onSubmit={selectedLab ? handleUpdateLab : handleCreateLab}
//         />
//       )}

//       {showTestModal && (
//         <TestModal
//           closeModal={() => setShowTestModal(false)}
//           test={
//             selectedLab
//               ? selectedLab.testsOffered.find(
//                   (t) => t._id === testToDelete?._id
//                 )
//               : null
//           }
//           onSubmit={testToDelete ? handleUpdateTest : handleCreateTest}
//         />
//       )}

//       {showDeleteDialog && (
//         <DeleteConfirmationModal
//           onConfirm={() =>
//             testToDelete
//               ? handleDeleteTest(testToDelete._id)
//               : handleDeleteLab(selectedLab._id)
//           }
//           onCancel={() => setShowDeleteDialog(false)}
//           itemToDelete={testToDelete || selectedLab}
//           itemType={testToDelete ? "test" : "lab"}
//         />
//       )}
//     </div>
//   );
// };

// export default LabTable;
//===========================================
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
// import TestsTable from "./LabTests/TestsTable";
// import DeleteConfirmationModal from "./DeleteConfirmationModal";
// import Pagination from "./Pagination";

// const LabTable = () => {
//   const [filter, setFilter] = useState("");
//   const [showLabModal, setShowLabModal] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [expandedLab, setExpandedLab] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   const dispatch = useDispatch();
//   const { labs, loading, error } = useSelector((state) => state.labs);

//   useEffect(() => {
//     dispatch(getAllLabsAsync());
//   }, [dispatch]);

//   const filteredLabs = labs.filter(
//     (lab) => lab.name && lab.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentLabs = filteredLabs.slice(indexOfFirstItem, indexOfLastItem);

//   const handleCreateLab = async (labData) => {
//     await dispatch(createLabAsync(labData));
//     setShowLabModal(false);
//   };

//   const handleUpdateLab = async (labId, labData) => {
//     await dispatch(updateLabAsync({ id: labId, labData }));
//     setShowLabModal(false);
//   };

//   const handleDeleteLab = async (labId) => {
//     await dispatch(deleteLabAsync(labId));
//     setShowDeleteDialog(false);
//   };

//   const handleCreateTest = async (labId, testData) => {
//     await dispatch(createTestAsync({ labId, ...testData }));
//     setSelectedLab({
//       ...selectedLab,
//       testsOffered: [...selectedLab.testsOffered, testData],
//     });
//   };

//   const handleUpdateTest = async (testId, testData) => {
//     await dispatch(updateTestAsync({ id: testId, ...testData }));
//     const updatedTests = selectedLab.testsOffered.map((test) =>
//       test._id === testId ? { ...test, ...testData } : test
//     );
//     setSelectedLab({ ...selectedLab, testsOffered: updatedTests });
//   };

//   const handleDeleteTest = async (testId) => {
//     await dispatch(deleteTestAsync(testId));
//     const updatedTests = selectedLab.testsOffered.filter(
//       (test) => test._id !== testId
//     );
//     setSelectedLab({ ...selectedLab, testsOffered: updatedTests });
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Filter labs..."
//         value={filter}
//         onChange={(e) => setFilter(e.target.value)}
//         className="border rounded-md px-3 py-2 mb-4"
//       />

//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       <table className="min-w-full divide-y divide-gray-200">
//         <thead>
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Name
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Address
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               City
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               State
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Pin Code
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Contact Number
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {currentLabs.map((lab) => (
//             <React.Fragment key={lab._id}>
//               <tr>
//                 <td className="px-6 py-4 whitespace-nowrap">{lab.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {lab.address?.address}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {lab.address?.city}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {lab.address?.state}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {lab.address?.pinCode}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {lab.contactNumber}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <button
//                     className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2"
//                     onClick={() => {
//                       setSelectedLab(lab);
//                       setShowLabModal(true);
//                     }}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-2 py-1 rounded-lg"
//                     onClick={() => {
//                       setSelectedLab(lab);
//                       setShowDeleteDialog(true);
//                     }}
//                   >
//                     Delete
//                   </button>
//                   <button
//                     className="bg-green-500 text-white px-2 py-1 rounded-lg"
//                     onClick={() => {
//                       setExpandedLab(expandedLab === lab._id ? null : lab._id);
//                       setSelectedLab(lab);
//                     }}
//                   >
//                     {expandedLab === lab._id ? "Hide Tests" : "View Tests"}
//                   </button>
//                 </td>
//               </tr>
//               {expandedLab === lab._id && (
//                 <tr>
//                   <td colSpan="7">
//                     <TestsTable
//                       lab={lab}
//                       onEditTest={handleUpdateTest}
//                       onDeleteTest={handleDeleteTest}
//                       onAddTest={(testData) =>
//                         handleCreateTest(lab._id, testData)
//                       }
//                     />
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>

//       <Pagination
//         itemsPerPage={itemsPerPage}
//         totalItems={filteredLabs.length}
//         paginate={paginate}
//         currentPage={currentPage}
//       />

//       {showLabModal && (
//         <LabModal
//           closeModal={() => setShowLabModal(false)}
//           lab={selectedLab}
//           onSubmit={selectedLab ? handleUpdateLab : handleCreateLab}
//         />
//       )}

//       {showDeleteDialog && (
//         <DeleteConfirmationModal
//           onConfirm={() => handleDeleteLab(selectedLab._id)}
//           onCancel={() => setShowDeleteDialog(false)}
//           itemToDelete={selectedLab}
//           itemType="lab"
//         />
//       )}
//     </div>
//   );
// };

// export default LabTable;
//====================================================
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllLabsAsync,
  createLabAsync,
  updateLabAsync,
  deleteLabAsync,
  createTestAsync,
  updateTestAsync,
  deleteTestAsync,
} from "../../store/features/labs/labsSlice";
import LabModal from "./LabModal";
import TestModal from "./TestModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Pagination from "./Pagination";
import LabTestsTable from "./LabTestsTable";

const LabTable = () => {
  const [filter, setFilter] = useState("");
  const [showLabModal, setShowLabModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const [testToDelete, setTestToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [viewingLabTests, setViewingLabTests] = useState(false);

  const dispatch = useDispatch();
  const { labs, loading, error } = useSelector((state) => state.labs);

  useEffect(() => {
    dispatch(getAllLabsAsync());
  }, [dispatch]);

  const filteredLabs = labs.filter(
    (lab) => lab.name && lab.name.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLabs = filteredLabs.slice(indexOfFirstItem, indexOfLastItem);

  const handleCreateLab = async (labData) => {
    await dispatch(createLabAsync(labData));
    setShowLabModal(false);
  };

  const handleUpdateLab = async (labId, labData) => {
    await dispatch(updateLabAsync({ id: labId, labData }));
    setShowLabModal(false);
  };

  const handleDeleteLab = async (labId) => {
    await dispatch(deleteLabAsync(labId));
    setShowDeleteDialog(false);
  };

  const handleCreateTest = async (testData) => {
    await dispatch(
      createTestAsync({ ...testData, diagnosticLabId: selectedLab._id })
    );
    setShowTestModal(false);
  };

  const handleUpdateTest = async (testId, testData) => {
    await dispatch(updateTestAsync({ id: testId, ...testData }));
    setShowTestModal(false);
  };

  const handleDeleteTest = async (testId) => {
    await dispatch(deleteTestAsync(testId));
    setShowDeleteDialog(false);
  };

  const handleLabClick = (lab) => {
    setSelectedLab(lab);
    setViewingLabTests(true);
  };

  const handleBackToLabs = () => {
    setSelectedLab(null);
    setViewingLabTests(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full">
      {viewingLabTests ? (
        <LabTestsTable
          lab={selectedLab}
          onBack={handleBackToLabs}
          onAddTest={() => setShowTestModal(true)}
          onEditTest={(test) => {
            setTestToDelete(test);
            setShowTestModal(true);
          }}
          onDeleteTest={(test) => {
            setTestToDelete(test);
            setShowDeleteDialog(true);
          }}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Filter labs..."
              className="border rounded-md px-3 py-2 w-64"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <button
              className="px-3 py-2 border rounded-md"
              onClick={() => setShowLabModal(true)}
            >
              Create lab
            </button>
          </div>

          <table className="w-full">
            <thead className="bg-blue-50">
              <tr className="border-b">
                <th className="py-2 px-4"></th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Address</th>
                <th className="py-2 px-4">Contact</th>
                <th className="py-2 px-4">Tests Offered</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentLabs.map((lab) => (
                <tr
                  key={lab._id}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLabClick(lab)}
                >
                  <td
                    className="py-2 px-4 cursor-pointer"
                    onClick={() => setSelectedLab(lab)}
                  >
                    <img
                      className="w-full h-28 object-cover cursor-pointer"
                      src={lab.image}
                      alt={lab.name}
                    />
                  </td>
                  <td
                    className="py-2 px-4 cursor-pointer"
                    onClick={() => setSelectedLab(lab)}
                  >
                    {lab.name}
                  </td>
                  <td
                    className="py-2 px-4 cursor-pointer"
                    onClick={() => setSelectedLab(lab)}
                  >
                    {lab.address?.address}
                  </td>
                  <td
                    className="py-2 px-4 cursor-pointer"
                    onClick={() => setSelectedLab(lab)}
                  >
                    {lab.contactNumber}
                  </td>
                  <td
                    className="py-2 px-4 cursor-pointer"
                    onClick={() => setSelectedLab(lab)}
                  >
                    {lab.testsOffered?.length} test
                    {lab.testsOffered?.length > 1 ? "s" : ""}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLab(lab);
                        setShowLabModal(true);
                      }}
                      className="bg-blue-500 text-white mr-2 px-2 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLab(lab);
                        setShowDeleteDialog(true);
                      }}
                      className="bg-red-500 text-white mr-2 px-2 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredLabs.length}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
      {showLabModal && (
        <LabModal
          closeModal={() => setShowLabModal(false)}
          lab={selectedLab}
          onSubmit={selectedLab ? handleUpdateLab : handleCreateLab}
        />
      )}

      {showTestModal && (
        <TestModal
          closeModal={() => setShowTestModal(false)}
          test={
            selectedLab
              ? selectedLab.testsOffered.find(
                  (t) => t._id === testToDelete?._id
                )
              : null
          }
          onSubmit={testToDelete ? handleUpdateTest : handleCreateTest}
        />
      )}

      {showDeleteDialog && (
        <DeleteConfirmationModal
          onConfirm={() =>
            testToDelete
              ? handleDeleteTest(testToDelete._id)
              : handleDeleteLab(selectedLab._id)
          }
          onCancel={() => setShowDeleteDialog(false)}
          itemToDelete={testToDelete || selectedLab}
          itemType={testToDelete ? "test" : "lab"}
        />
      )}
    </div>
  );
};

export default LabTable;
