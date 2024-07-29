// LabTestsTable.jsx
import React from "react";

const LabTestsTable = ({
  lab,
  onBack,
  onAddTest,
  onEditTest,
  onDeleteTest,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="px-3 py-2 border rounded-md">
          Back to Labs
        </button>
        <h2 className="text-lg font-semibold">Tests for {lab.name}</h2>
        <button onClick={onAddTest} className="px-3 py-2 border rounded-md">
          Add Test
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-blue-50">
          <tr className="border-b">
            <th className="py-2 px-4"></th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lab.testsOffered.map((test) => (
            <tr key={test._id} className="border-b">
              <td className="py-2 px-4 w-56">
                <img
                  className="w-full h-28 object-cover"
                  src={test.image}
                  alt={test.name}
                />
              </td>
              <td className="py-2 px-4">{test.name}</td>
              <td className="py-2 px-4">{test.description}</td>
              <td className="py-2 px-4">₹ {test.price}</td>
              <td className="py-2 px-4">
                <button
                  className="text-blue-600 mr-2"
                  onClick={() => onEditTest(test)}
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
    </div>
  );
};

export default LabTestsTable;
