// import React from "react";

// const DeleteConfirmationModal = ({
//   onConfirm,
//   onCancel,
//   itemToDelete,
//   itemType,
// }) => {
//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-lg font-semibold mb-4">Delete {itemType}</h2>
//         <p>Are you sure you want to delete this {itemType}?</p>
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={onCancel}
//             className="bg-gray-500 text-white px-3 py-2 rounded-md mr-2"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="bg-red-500 text-white px-3 py-2 rounded-md"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteConfirmationModal;
//============================================
import React from "react";

const DeleteConfirmationModal = ({
  onConfirm,
  onCancel,
  itemToDelete,
  itemType,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-4">
          Are you sure you want to delete this {itemType}
          {itemType === "lab" ? ` (${itemToDelete.name})` : ""}? This action
          cannot be undone.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="px-3 py-2 bg-red-600 text-white rounded-md mr-2"
          >
            Delete
          </button>
          <button onClick={onCancel} className="px-3 py-2 border rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
