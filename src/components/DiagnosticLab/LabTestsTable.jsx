// const LabTestsTable = ({
//   lab,
//   onBack,
//   onAddTest,
//   onEditTest,
//   onDeleteTest,
// }) => {
//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <button onClick={onBack} className="px-3 py-2 border rounded-md">
//           Back to Labs
//         </button>
//         <h2 className="text-lg font-semibold">Tests for {lab.name}</h2>
//         <button onClick={onAddTest} className="px-3 py-2 border rounded-md">
//           Add Test
//         </button>
//       </div>

//       <table className="w-full">
//         <thead className="bg-blue-50">
//           <tr className="border-b">
//             <th className="py-2 px-4"></th>
//             <th className="py-2 px-4">Name</th>
//             <th className="py-2 px-4">Description</th>
//             <th className="py-2 px-4">Price</th>
//             <th className="py-2 px-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {lab.testsOffered.map((test) => (
//             <tr key={test._id} className="border-b">
//               <td className="py-2 px-4 w-56">
//                 <img
//                   className="w-full h-28 object-cover"
//                   src={test.image}
//                   alt={test.name}
//                 />
//               </td>
//               <td className="py-2 px-4">{test.name}</td>
//               <td className="py-2 px-4">{test.description}</td>
//               <td className="py-2 px-4">₹ {test.price}</td>
//               <td className="py-2 px-4">
//                 <button
//                   className="text-blue-600 mr-2"
//                   onClick={() => onEditTest(test)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="text-red-600"
//                   onClick={() => onDeleteTest(test)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LabTestsTable;
//===========================================================
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLabTestCategories } from "../../store/features/labs/labsSlice";

// const LabTestsTable = ({
//   lab,
//   onBack,
//   onAddTest,
//   onEditTest,
//   onDeleteTest,
// }) => {
//   const dispatch = useDispatch();
//   const { labTestCategories, loading, error } = useSelector(
//     (state) => state.labs
//   );

//   // State to manage the add test modal
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [newTest, setNewTest] = useState({
//     description: "",
//     price: "",
//     labCategory: "",
//   });

//   useEffect(() => {
//     dispatch(fetchLabTestCategories());
//   }, [dispatch]);

//   const handleAddTest = () => {
//     onAddTest(newTest);
//     setIsAddModalOpen(false);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <button onClick={onBack} className="px-3 py-2 border rounded-md">
//           Back to Labs
//         </button>
//         <h2 className="text-lg font-semibold">Tests for {lab.name}</h2>
//         <button
//           onClick={() => setIsAddModalOpen(true)}
//           className="px-3 py-2 border rounded-md"
//         >
//           Add Test
//         </button>
//       </div>

//       <table className="w-full">
//         <thead className="bg-blue-50">
//           <tr className="border-b">
//             <th className="py-2 px-4"></th>
//             <th className="py-2 px-4">Description</th>
//             <th className="py-2 px-4">Price</th>
//             <th className="py-2 px-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {lab.testsOffered.map((test) => (
//             <tr key={test._id} className="border-b">
//               <td className="py-2 px-4">
//                 <img
//                   className="w-full h-28 object-cover"
//                   src={test.image}
//                   alt={test.name}
//                 />
//               </td>
//               <td className="py-2 px-4">{test.description}</td>
//               <td className="py-2 px-4">₹ {test.price}</td>
//               <td className="py-2 px-4">
//                 <button
//                   className="text-blue-600 mr-2"
//                   onClick={() => onEditTest(test)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="text-red-600"
//                   onClick={() => onDeleteTest(test)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isAddModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
//           <div className="bg-white p-6 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold mb-4">Add New Test</h3>
//             <form onSubmit={handleAddTest}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <input
//                   type="text"
//                   value={newTest.description}
//                   onChange={(e) =>
//                     setNewTest({ ...newTest, description: e.target.value })
//                   }
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Price
//                 </label>
//                 <input
//                   type="number"
//                   value={newTest.price}
//                   onChange={(e) =>
//                     setNewTest({ ...newTest, price: e.target.value })
//                   }
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Test Category
//                 </label>
//                 <select
//                   value={newTest.labCategory}
//                   onChange={(e) =>
//                     setNewTest({ ...newTest, labCategory: e.target.value })
//                   }
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//                 >
//                   <option value="">Select a category</option>
//                   {labTestCategories.map((category) => (
//                     <option key={category._id} value={category._id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => setIsAddModalOpen(false)}
//                   className="px-4 py-2 border rounded-md mr-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                 >
//                   Add Test
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabTestsTable;
//===============================================
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllLabsAsync,
//   createLabAsync,
//   updateLabAsync,
//   deleteLabAsync,
// } from "../../store/features/labs/labsSlice";
// import LabModal from "./LabModal";
// import DeleteConfirmationModal from "./DeleteConfirmationModal";

// const LabTestsTable = ({ onBack }) => {
//   const [filter, setFilter] = useState("");
//   const [showLabModal, setShowLabModal] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [selectedLab, setSelectedLab] = useState(null);

//   const dispatch = useDispatch();
//   const { labs, loading, error } = useSelector((state) => state.labs);

//   useEffect(() => {
//     dispatch(getAllLabsAsync());
//   }, [dispatch]);

//   const filteredLabs = labs.filter(
//     (lab) => lab.name && lab.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   const handleCreateLab = () => {
//     setSelectedLab(null); // Clear selected lab
//     setShowLabModal(true);
//   };

//   const handleUpdateLab = async (labId, labData) => {
//     try {
//       await dispatch(updateLabAsync({ id: labId, labData }));
//     } catch (error) {
//       console.error("Error updating lab:", error);
//     }
//   };

//   const handleCreateLabSubmit = async (labData) => {
//     try {
//       await dispatch(createLabAsync(labData));
//     } catch (error) {
//       console.error("Error creating lab:", error);
//     }
//   };

//   const handleDeleteLab = async (labId) => {
//     try {
//       await dispatch(deleteLabAsync(labId));
//       setShowDeleteDialog(false);
//     } catch (error) {
//       console.error("Error deleting lab:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search for a lab"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="border rounded-md px-3 py-2"
//         />
//         <button
//           onClick={handleCreateLab}
//           className="px-3 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
//         >
//           Add Lab
//         </button>
//         <button
//           onClick={onBack}
//           className="px-3 py-2 border rounded-md bg-gray-500 text-white hover:bg-gray-600"
//         >
//           Back
//         </button>
//       </div>

//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div className="text-red-500">Error: {error.message}</div>
//       ) : (
//         <table className="w-full bg-white border border-gray-200 rounded-md">
//           <thead className="bg-blue-50 border-b">
//             <tr>
//               <th className="py-2 px-4 text-left">Name</th>
//               <th className="py-2 px-4 text-left">Address</th>
//               <th className="py-2 px-4 text-left">Contact</th>
//               <th className="py-2 px-4 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredLabs.map((lab) => (
//               <tr key={lab._id} className="border-b">
//                 <td className="py-2 px-4">{lab.name}</td>
//                 <td className="py-2 px-4">
//                   {lab.address.address}, {lab.address.city}, {lab.address.state}
//                   , {lab.address.pinCode}
//                 </td>
//                 <td className="py-2 px-4">{lab.contact}</td>
//                 <td className="py-2 px-4">
//                   <button
//                     className="text-blue-600 hover:underline mr-2"
//                     onClick={() => {
//                       setSelectedLab(lab);
//                       setShowLabModal(true);
//                     }}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="text-red-600 hover:underline"
//                     onClick={() => {
//                       setSelectedLab(lab);
//                       setShowDeleteDialog(true);
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
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

// export default LabTestsTable;

//=====================================
// LabTestsTable.js
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLabTestCategories } from "../../store/features/labs/labsSlice";
// import TestModal from "./TestModal"; // Adjust the import path as needed

// const LabTestsTable = ({
//   lab,
//   onBack,
//   onAddTest,
//   onEditTest,
//   onDeleteTest,
// }) => {
//   const dispatch = useDispatch();
//   const { labTestCategories, loading, error } = useSelector(
//     (state) => state.labs
//   );

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTest, setModalTest] = useState(null);

//   useEffect(() => {
//     if (labTestCategories.length === 0) {
//       dispatch(fetchLabTestCategories());
//     }
//   }, [dispatch, labTestCategories.length]);

//   const handleAddTestClick = () => {
//     setModalTest(null);
//     setIsModalOpen(true);
//   };

//   const handleEditTestClick = (test) => {
//     setModalTest(test);
//     setIsModalOpen(true);
//   };

//   const handleModalSubmit = (testData) => {
//     if (modalTest) {
//       onEditTest(testData);
//     } else {
//       onAddTest(testData);
//     }
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="mx-10 py-10">
//       <div className="flex justify-between items-center mb-4">
//         <button onClick={onBack} className="px-3 py-2 border rounded-md">
//           Back to Labs
//         </button>
//         <h2 className="text-lg font-semibold">Tests for {lab.name}</h2>
//         <button
//           onClick={handleAddTestClick}
//           className="px-3 py-2 border rounded-md"
//         >
//           Add Test
//         </button>
//       </div>

//       <table className="w-full">
//         <thead className="bg-blue-50">
//           <tr className="border-b">
//             <th className="py-2 px-4"></th>
//             <th className="py-2 px-4">Name</th>
//             <th className="py-2 px-4">Price</th>
//             <th className="py-2 px-4">Description</th>
//             <th className="py-2 px-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {lab?.testsOffered?.map((test) => (
//             <tr key={test._id} className="border-b">
//               <td className="py-2 px-4">
//                 <img
//                   className="w-44 h-28"
//                   src={test?.labCategory?.image}
//                   alt={test?.labCategory?.name}
//                 />
//               </td>
//               <td className="py-2 px-4">{test?.labCategory?.name}</td>
//               <td className="py-2 px-4">₹ {test.price}</td>
//               <td className="py-2 px-4">{test.description}</td>
//               <td className="py-2 px-4">
//                 <button
//                   className="text-blue-600 mr-2"
//                   onClick={() => handleEditTestClick(test)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="text-red-600"
//                   onClick={() => onDeleteTest(test)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isModalOpen && (
//         <TestModal
//           test={modalTest}
//           onSubmit={handleModalSubmit}
//           closeModal={() => setIsModalOpen(false)}
//           categories={labTestCategories}
//         />
//       )}
//     </div>
//   );
// };

// export default LabTestsTable;
//===============================================
// import React, { useState } from "react";
// import TestModal from "./TestModal";

// const LabTestsTable = ({
//   lab,
//   onBack,
//   onAddTest,
//   onEditTest,
//   onDeleteTest,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTest, setModalTest] = useState(null);

//   const handleAddTestClick = () => {
//     setModalTest(null);
//     setIsModalOpen(true);
//   };

//   const handleEditTestClick = (test) => {
//     setModalTest(test);
//     setIsModalOpen(true);
//   };

//   const handleModalSubmit = (testData) => {
//     if (modalTest) {
//       onEditTest(testData);
//     } else {
//       onAddTest(testData);
//     }
//     setIsModalOpen(false);
//   };
//   console.log("TEST", lab);

//   return (
//     <div className="mx-10 py-10">
//       <div className="flex justify-between items-center mb-4">
//         <button onClick={onBack} className="px-3 py-2 border rounded-md">
//           Back to Labs
//         </button>
//         <h2 className="text-lg font-semibold">Tests for {lab.name}</h2>
//         <button
//           onClick={handleAddTestClick}
//           className="px-3 py-2 border rounded-md"
//         >
//           Add Test
//         </button>
//       </div>

//       <table className="w-full">
//         <thead className="bg-blue-50">
//           <tr className="border-b">
//             <th className="py-2 px-4"></th>
//             <th className="py-2 px-4">Name</th>
//             <th className="py-2 px-4">Price</th>
//             <th className="py-2 px-4">Description</th>
//             <th className="py-2 px-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {lab?.testsOffered?.map((test) => (
//             <tr key={test._id} className="border-b">
//               <td className="py-2 px-4">
//                 <img
//                   className="w-44 h-28"
//                   src={test?.labCategory?.image}
//                   alt={test?.labCategory?.name}
//                 />
//               </td>
//               <td className="py-2 px-4">{test?.labCategory?.name}</td>
//               <td className="py-2 px-4">₹ {test.price}</td>
//               <td className="py-2 px-4">{test.description}</td>
//               <td className="py-2 px-4">
//                 <button
//                   className="text-blue-600 mr-2"
//                   onClick={() => handleEditTestClick(test)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="text-red-600"
//                   onClick={() => onDeleteTest(test._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isModalOpen && (
//         <TestModal
//           // categories={labTestCategories}
//           test={modalTest}
//           onSubmit={handleModalSubmit}
//           closeModal={() => setIsModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default LabTestsTable;
//============================================
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import TestModal from "./TestModal";

const LabTestsTable = ({
  lab,
  onBack,
  onAddTest,
  onEditTest,
  onDeleteTest,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTest, setModalTest] = useState(null);

  const handleAddTestClick = useCallback(() => {
    setModalTest(null);
    setIsModalOpen(true);
  }, []);

  const handleEditTestClick = useCallback((test) => {
    setModalTest(test);
    setIsModalOpen(true);
  }, []);

  const handleModalSubmit = useCallback(
    (testData) => {
      if (modalTest) {
        onEditTest(testData);
      } else {
        onAddTest(testData);
      }
      setIsModalOpen(false);
    },
    [modalTest, onAddTest, onEditTest]
  );

  return (
    <div className="mx-10 py-10">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="px-3 py-2 border rounded-md">
          Back to Labs
        </button>
        <h2 className="text-lg font-semibold">Tests for {lab.name}</h2>
        <button
          onClick={handleAddTestClick}
          className="px-3 py-2 border rounded-md"
        >
          Add Test
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-blue-50">
          <tr className="border-b">
            <th className="py-2 px-4"></th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lab?.testsOffered?.map((test) => (
            <tr key={test._id} className="border-b">
              <td className="py-2 px-4">
                <img
                  className="w-44 h-28"
                  src={test?.labCategory?.image}
                  alt={test?.labCategory?.name}
                />
              </td>
              <td className="py-2 px-4">{test?.labCategory?.name}</td>
              <td className="py-2 px-4">₹ {test.price}</td>
              <td className="py-2 px-4">{test.description}</td>
              <td className="py-2 px-4">
                <button
                  className="text-blue-600 mr-2"
                  onClick={() => handleEditTestClick(test)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => onDeleteTest(test)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <TestModal
          test={modalTest}
          onSubmit={handleModalSubmit}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default LabTestsTable;
