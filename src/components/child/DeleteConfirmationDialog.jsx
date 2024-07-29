import React from "react";

const DeleteConfirmationDialog = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
        <p className="mb-4">Are you sure you want to delete this franchise?</p>
        <div className="flex justify-end">
          <button
            type="button"
            className="px-4 py-2 border rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
