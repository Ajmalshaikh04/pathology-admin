import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { LuGrid, LuList } from "react-icons/lu";

// Sample user data with tests and labs
const dummyUsers = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    tests: [
      {
        id: "t1",
        name: "Blood Test",
        status: "pending",
        labId: "l1",
        details: "Fasting required",
        date: "2024-06-25",
      },
      {
        id: "t2",
        name: "Urine Test",
        status: "in progress",
        labId: "l2",
        details: "Morning sample preferred",
        date: "2024-06-26",
      },
    ],
    labs: [
      {
        id: "l1",
        name: "Lab A",
        status: "pending",
        address: "123 Main St, City, State",
        contact: "123-456-7890",
      },
      {
        id: "l2",
        name: "Lab B",
        status: "in progress",
        address: "456 Elm St, City, State",
        contact: "098-765-4321",
      },
    ],
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    tests: [
      {
        id: "t3",
        name: "X-ray",
        status: "in progress",
        labId: "l3",
        details: "No special preparation needed",
        date: "2024-06-27",
      },
    ],
    labs: [
      {
        id: "l3",
        name: "Lab C",
        status: "in progress",
        address: "789 Oak St, City, State",
        contact: "567-890-1234",
      },
    ],
  },
  {
    _id: "3",
    name: "Alice Johnson",
    email: "alice@example.com",
    tests: [
      {
        id: "t4",
        name: "MRI",
        status: "pending",
        labId: null,
        details: "No metal objects allowed",
        date: "2024-06-28",
      },
    ],
    labs: [],
  },
];

const Bookings = () => {
  const [currentTab, setCurrentTab] = useState("users");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGridView, setIsGridView] = useState(true);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setCurrentTab("bookings");
  };

  const handleDragStart = (e, itemId) => {
    e.dataTransfer.setData("itemId", itemId);
    setIsDragging(true);
    e.target.style.cursor = "grabbing";
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    e.target.style.cursor = "grab";
  };

  const handleDrop = (e, status) => {
    const itemId = e.dataTransfer.getData("itemId");
    const updatedUser = { ...selectedUser };

    const draggedTest = updatedUser.tests.find((test) => test.id === itemId);

    if (draggedTest) {
      const updatedTests = updatedUser.tests.map((test) =>
        test.id === itemId ? { ...test, status } : test
      );

      const updatedLabs = updatedUser.labs.map((lab) => {
        const associatedTests = updatedTests.filter(
          (test) => test.labId === lab.id
        );
        const labStatus = associatedTests.some(
          (test) => test.status === "in progress"
        )
          ? "in progress"
          : associatedTests.some((test) => test.status === "pending")
          ? "pending"
          : associatedTests.some((test) => test.status === "closed")
          ? "closed"
          : "completed";
        return { ...lab, status: labStatus };
      });

      updatedUser.tests = updatedTests;
      updatedUser.labs = updatedLabs;

      setSelectedUser(updatedUser);
    }
  };

  const handleLabStatusChange = (labId, newStatus) => {
    const updatedUser = { ...selectedUser };

    const updatedLabs = updatedUser.labs.map((lab) =>
      lab.id === labId ? { ...lab, status: newStatus } : lab
    );

    const updatedTests = updatedUser.tests.map((test) =>
      test.labId === labId ? { ...test, status: newStatus } : test
    );

    updatedUser.labs = updatedLabs;
    updatedUser.tests = updatedTests;

    setSelectedUser(updatedUser);
  };

  const renderTestsByStatus = (status) => (
    <div
      onDrop={(e) => handleDrop(e, status)}
      onDragOver={(e) => e.preventDefault()}
      className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3"
    >
      <h3 className="text-lg font-bold capitalize mb-4">{status}</h3>
      {selectedUser.tests
        .filter((test) => test.status === status)
        .map((test) => (
          <div
            key={test.id}
            draggable
            onDragStart={(e) => handleDragStart(e, test.id)}
            onDragEnd={handleDragEnd}
            className={`bg-white p-4 rounded-lg shadow-md mb-4 ${
              isDragging ? "cursor-grab" : "cursor-grabbing"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">{test.name}</p>
                <p className="text-sm text-gray-600">{test.status}</p>
                <p className="text-sm text-gray-600">
                  {selectedUser.labs.find((lab) => lab.id === test.labId)?.name}
                </p>
                <p className="text-sm text-gray-600">{test.details}</p>
                <p className="text-sm text-gray-600">{test.date}</p>
              </div>
              <button className="text-gray-600">
                <BsThreeDots />
              </button>
            </div>
          </div>
        ))}
    </div>
  );

  const renderLabs = () => (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold mb-4">Labs</h3>
        <div className="flex justify-end mt-4 gap-2">
          <button
            className={`px-2 py-1 rounded text-sm flex items-center justify-center ${
              isGridView ? "bg-gray-200" : "bg-blue-500 text-white"
            }`}
            onClick={() => setIsGridView(false)}
          >
            <LuList className="mr-2" /> List
          </button>
          <button
            className={`px-2 py-1 rounded text-sm flex items-center justify-center ${
              isGridView ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsGridView(true)}
          >
            <LuGrid className="mr-2" />
            Grid
          </button>
        </div>
      </div>
      {selectedUser.labs.length > 0 ? (
        isGridView ? (
          renderLabsGrid()
        ) : (
          renderLabsList()
        )
      ) : (
        <p>No labs found</p>
      )}
    </div>
  );

  const renderLabsList = () => (
    <div className="w-full">
      {selectedUser.labs.map((lab) => (
        <div key={lab.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold">{lab.name}</p>
              <p className="text-sm text-gray-600">{lab.address}</p>
              <p className="text-sm text-gray-600">{lab.contact}</p>
            </div>
            <div>
              <select
                value={lab.status}
                onChange={(e) => handleLabStatusChange(lab.id, e.target.value)}
                className="border rounded px-2 py-1 mr-2"
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="closed">Closed</option>
              </select>
              <button className="text-gray-600">
                <BsThreeDots />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLabsGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {selectedUser.labs.map((lab) => (
        <div key={lab.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold">{lab.name}</p>
              <p className="text-sm text-gray-600">{lab.address}</p>
              <p className="text-sm text-gray-600">{lab.contact}</p>
            </div>
            <div>
              <select
                value={lab.status}
                onChange={(e) => handleLabStatusChange(lab.id, e.target.value)}
                className="border rounded px-2 py-1 mr-2"
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="closed">Closed</option>
              </select>
              <button className="text-gray-600">
                <BsThreeDots />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Booking Management</h2>
      </div>

      {currentTab === "users" && (
        <div className="w-full">
          <table className="min-w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Tests</th>
                <th className="py-2 px-4">Labs</th>
              </tr>
            </thead>
            <tbody>
              {dummyUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleUserClick(user)}
                >
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.tests.length}</td>
                  <td className="py-3 px-4">{user.labs.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {currentTab === "bookings" && selectedUser && (
        <div>
          <div className="flex items-center justify-between p-2">
            <h3 className="text-lg font-bold mb-4">
              Tests and Labs for {selectedUser.name}
            </h3>
            <button
              className="mt-4 px-4 py-2 bg-gray-200 rounded"
              onClick={() => setCurrentTab("users")}
            >
              Back to bookings
            </button>
          </div>
          <div className="flex space-x-4">
            {["pending", "in progress", "completed", "closed"].map((status) =>
              renderTestsByStatus(status)
            )}
          </div>
          {renderLabs()}
        </div>
      )}
    </div>
  );
};

export default Bookings;
