const TestCard = ({ test, lab, handleTestStatusChange }) => (
  <div
    draggable
    onDragStart={(e) => {
      e.dataTransfer.setData("testId", test._id);
    }}
    className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-grab"
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="font-bold">{test.test.name}</p>
        <p className="text-sm text-gray-600">{test.status}</p>
        <p className="text-sm text-gray-600">{lab.name}</p>
        <p className="text-sm text-gray-600">{test.test.description}</p>
        <p className="text-sm text-gray-600">Price: ${test.test.price}</p>
        <p className="text-sm text-gray-600">
          <b>Updated by: {test?.updatedBy?.name}</b>
        </p>
      </div>
      <select
        value={test.status}
        onChange={(e) => handleTestStatusChange(test._id, e.target.value)}
        className="border rounded px-2 py-1 mr-2"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  </div>
);

export default TestCard;
//===========================================
