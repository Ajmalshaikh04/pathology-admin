const LabsList = ({ labs, handleTestStatusChange }) => (
  <div className="w-full">
    {labs.map((lab) => (
      <div key={lab.lab._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold">{lab.lab.name}</p>
            <p className="text-sm text-gray-600">{lab.lab.address}</p>
            <p className="text-sm text-gray-600">{lab.lab.contactNumber}</p>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-bold mb-2">Tests:</h4>
          {lab.tests.map((test) => (
            <div
              key={test._id}
              className="flex justify-between items-center mb-2"
            >
              <span>{test.test.name}</span>
              <select
                value={test.status}
                onChange={(e) =>
                  handleTestStatusChange(test._id, e.target.value)
                }
                className="border rounded px-2 py-1"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default LabsList;
