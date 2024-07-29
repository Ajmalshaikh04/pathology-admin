// import { useEffect, useState } from "react";
// import { LuGrid, LuList } from "react-icons/lu";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAppointmentsByUserIdAsync,
//   updateLabTestStatusAsync,
// } from "../store/features/appoinments/appoinmentsSlice";
// import { useParams } from "react-router-dom";

// const CouncilorUserBooking = () => {
//   const { userId } = useParams();
//   const dispatch = useDispatch();
//   const { appointments, loading, error } = useSelector(
//     (state) => state.appointments
//   );
//   const { user } = useSelector((state) => state.user);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [isGridView, setIsGridView] = useState(true);

//   useEffect(() => {
//     dispatch(getAppointmentsByUserIdAsync({ id: userId }));
//   }, [dispatch, userId]);

//   useEffect(() => {
//     if (appointments.length > 0) {
//       setSelectedAppointment(appointments[0]);
//     }
//   }, [appointments]);

//   const handleDrop = (e, newStatus) => {
//     e.preventDefault();
//     const testId = e.dataTransfer.getData("testId");
//     if (selectedAppointment?.labs?.tests) {
//       const updatedAppointment = {
//         ...selectedAppointment,
//         labs: {
//           ...selectedAppointment.labs,
//           tests: selectedAppointment.labs.tests.map((test) =>
//             test._id === testId ? { ...test, status: newStatus } : test
//           ),
//         },
//       };
//       setSelectedAppointment(updatedAppointment);

//       // Call the API to update the test status
//       dispatch(
//         updateLabTestStatusAsync({
//           appointmentId: selectedAppointment._id,
//           testId,
//           status: newStatus,
//           updatedBy: user._id,
//         })
//       );
//     }
//   };

//   const handleTestStatusChange = (testId, newStatus) => {
//     if (selectedAppointment?.labs?.tests) {
//       const updatedAppointment = {
//         ...selectedAppointment,
//         labs: {
//           ...selectedAppointment.labs,
//           tests: selectedAppointment.labs.tests.map((test) =>
//             test._id === testId ? { ...test, status: newStatus } : test
//           ),
//         },
//       };
//       setSelectedAppointment(updatedAppointment);
//       dispatch(
//         updateLabTestStatusAsync({
//           appointmentId: selectedAppointment._id,
//           testId,
//           status: newStatus,
//           updatedBy: user._id,
//         })
//       );
//     }
//   };

//   const renderTestsByStatus = (status) => (
//     <div
//       onDrop={(e) => handleDrop(e, status)}
//       onDragOver={(e) => e.preventDefault()}
//       className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3"
//     >
//       <h3 className="text-lg font-bold capitalize mb-4">{status}</h3>
//       {selectedAppointment?.labs?.tests
//         .filter((test) => test.status === status)
//         .map((test) => (
//           <TestCard
//             key={test._id}
//             test={test}
//             lab={selectedAppointment.labs.lab}
//             handleTestStatusChange={handleTestStatusChange}
//           />
//         )) || <p>No tests found for this status</p>}
//     </div>
//   );

//   const renderLabs = () => (
//     <div>
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-bold mb-4">Labs</h3>
//         <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
//       </div>
//       {selectedAppointment?.labs ? (
//         isGridView ? (
//           <LabsGrid
//             labs={[selectedAppointment.labs]}
//             handleTestStatusChange={handleTestStatusChange}
//           />
//         ) : (
//           <LabsList
//             labs={[selectedAppointment.labs]}
//             handleTestStatusChange={handleTestStatusChange}
//           />
//         )
//       ) : (
//         <p>No labs found</p>
//       )}
//     </div>
//   );

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full min-h-screen">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Booking Management</h2>
//       </div>
//       {selectedAppointment && (
//         <div>
//           <h3 className="text-xl font-bold mb-4">Appointment Details</h3>
//           <p>
//             <strong>User:</strong> {selectedAppointment?.user.name}
//           </p>
//           <p>
//             <strong>Email:</strong> {selectedAppointment?.user.email}
//           </p>
//           <p>
//             <strong>Problem:</strong> {selectedAppointment?.problem}
//           </p>
//           <p>
//             <strong>Date:</strong>{" "}
//             {new Date(selectedAppointment?.date).toLocaleDateString()}
//           </p>
//           <div className="flex gap-4 mt-4">
//             {renderTestsByStatus("Pending")}
//             {renderTestsByStatus("In Progress")}
//             {renderTestsByStatus("Completed")}
//             {renderTestsByStatus("Closed")}
//           </div>
//           {renderLabs()}
//         </div>
//       )}
//     </div>
//   );
// };

// const TestCard = ({ test, lab, handleTestStatusChange }) => (
//   <div
//     draggable
//     onDragStart={(e) => e.dataTransfer.setData("testId", test._id)}
//     onDragEnd={(e) => (e.target.style.cursor = "grab")}
//     className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-grab"
//   >
//     <div className="flex justify-between items-center">
//       <div>
//         <p className="font-bold">{test.test.name}</p>
//         <p className="text-sm text-gray-600">{test.status}</p>
//         <p className="text-sm text-gray-600">{lab.name}</p>
//         <p className="text-sm text-gray-600">{test.test.description}</p>
//         <p className="text-sm text-gray-600">Price: ${test.test.price}</p>
//       </div>
//       <select
//         value={test.status}
//         onChange={(e) => handleTestStatusChange(test._id, e.target.value)}
//         className="border rounded px-2 py-1 mr-2"
//       >
//         <option value="Pending">Pending</option>
//         <option value="In Progress">In Progress</option>
//         <option value="Completed">Completed</option>
//         <option value="Closed">Closed</option>
//       </select>
//     </div>
//   </div>
// );

// const ViewToggle = ({ isGridView, setIsGridView }) => (
//   <div className="flex justify-end mt-4 gap-2">
//     <button
//       className={`px-2 py-1 rounded text-sm flex items-center justify-center ${
//         !isGridView ? "bg-gray-200" : "bg-blue-500 text-white"
//       }`}
//       onClick={() => setIsGridView(false)}
//     >
//       <LuList className="mr-2" /> List
//     </button>
//     <button
//       className={`px-2 py-1 rounded text-sm flex items-center justify-center ${
//         isGridView ? "bg-gray-200" : "bg-blue-500 text-white"
//       }`}
//       onClick={() => setIsGridView(true)}
//     >
//       <LuGrid className="mr-2" /> Grid
//     </button>
//   </div>
// );

// const LabsGrid = ({ labs, handleTestStatusChange }) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//     {labs.map((lab) => (
//       <div key={lab.lab._id} className="bg-white p-4 rounded-lg shadow-md">
//         <div>
//           <p className="font-bold">{lab.lab.name}</p>
//           <p className="text-sm text-gray-600">{lab.lab.address}</p>
//           <p className="text-sm text-gray-600">{lab.lab.contactNumber}</p>
//         </div>
//         <div className="mt-4">
//           <h4 className="font-bold mb-2">Tests:</h4>
//           {lab.tests.map((test) => (
//             <div
//               key={test._id}
//               className="flex justify-between items-center mb-2"
//             >
//               <span>{test.test.name}</span>
//               <select
//                 value={test.status}
//                 onChange={(e) =>
//                   handleTestStatusChange(test._id, e.target.value)
//                 }
//                 className="border rounded px-2 py-1"
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Completed">Completed</option>
//                 <option value="Closed">Closed</option>
//               </select>
//             </div>
//           ))}
//         </div>
//       </div>
//     ))}
//   </div>
// );

// const LabsList = ({ labs, handleTestStatusChange }) => (
//   <div className="w-full">
//     {labs.map((lab) => (
//       <div key={lab.lab._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
//         <div className="flex justify-between">
//           <div>
//             <p className="font-bold">{lab.lab.name}</p>
//             <p className="text-sm text-gray-600">{lab.lab.address}</p>
//             <p className="text-sm text-gray-600">{lab.lab.contactNumber}</p>
//           </div>
//         </div>
//         <div className="mt-4">
//           <h4 className="font-bold mb-2">Tests:</h4>
//           {lab.tests.map((test) => (
//             <div
//               key={test._id}
//               className="flex justify-between items-center mb-2"
//             >
//               <span>{test.test.name}</span>
//               <select
//                 value={test.status}
//                 onChange={(e) =>
//                   handleTestStatusChange(test._id, e.target.value)
//                 }
//                 className="border rounded px-2 py-1"
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Completed">Completed</option>
//                 <option value="Closed">Closed</option>
//               </select>
//             </div>
//           ))}
//         </div>
//       </div>
//     ))}
//   </div>
// );

// export default CouncilorUserBooking;
//===================================================
import { useEffect, useState } from "react";
import { LuGrid, LuList } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import {
  getAppointmentsByUserIdAsync,
  updateLabTestStatusAsync,
} from "../store/features/appoinments/appoinmentsSlice";

const CouncilorUserBooking = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(
    (state) => state.appointments
  );
  const { user } = useSelector((state) => state.user);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    dispatch(getAppointmentsByUserIdAsync({ id: userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (appointments.length > 0) {
      setSelectedAppointment(appointments[0]);
    }
  }, [appointments]);

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const testId = e.dataTransfer.getData("testId");
    if (selectedAppointment?.labs?.tests) {
      const updatedAppointment = {
        ...selectedAppointment,
        labs: {
          ...selectedAppointment.labs,
          tests: selectedAppointment.labs.tests.map((test) =>
            test._id === testId ? { ...test, status: newStatus } : test
          ),
        },
      };
      setSelectedAppointment(updatedAppointment);

      // Call the API to update the test status
      dispatch(
        updateLabTestStatusAsync({
          appointmentId: selectedAppointment._id,
          testId,
          status: newStatus,
          updatedBy: user._id,
        })
      );
    }
  };

  const handleTestStatusChange = (testId, newStatus) => {
    if (selectedAppointment?.labs?.tests) {
      const updatedAppointment = {
        ...selectedAppointment,
        labs: {
          ...selectedAppointment.labs,
          tests: selectedAppointment.labs.tests.map((test) =>
            test._id === testId ? { ...test, status: newStatus } : test
          ),
        },
      };
      setSelectedAppointment(updatedAppointment);
      dispatch(
        updateLabTestStatusAsync({
          appointmentId: selectedAppointment._id,
          testId,
          status: newStatus,
          updatedBy: user._id,
        })
      );
    }
  };

  const renderTestsByStatus = (status) => (
    <div
      onDrop={(e) => handleDrop(e, status)}
      onDragOver={(e) => e.preventDefault()}
      className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3"
    >
      <h3 className="text-lg font-bold capitalize mb-4">{status}</h3>
      {selectedAppointment?.labs?.tests
        .filter((test) => test.status === status)
        .map((test) => (
          <TestCard
            key={test._id}
            test={test}
            lab={selectedAppointment.labs.lab}
            handleTestStatusChange={handleTestStatusChange}
          />
        )) || <p>No tests found for this status</p>}
    </div>
  );

  const renderLabs = () => (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold mb-4">Labs</h3>
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      {selectedAppointment?.labs ? (
        isGridView ? (
          <LabsGrid
            labs={[selectedAppointment.labs]}
            handleTestStatusChange={handleTestStatusChange}
          />
        ) : (
          <LabsList
            labs={[selectedAppointment.labs]}
            handleTestStatusChange={handleTestStatusChange}
          />
        )
      ) : (
        <p>No labs found</p>
      )}
    </div>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Booking Management</h2>
      </div>
      {selectedAppointment && (
        <div>
          <h3 className="text-xl font-bold mb-4">Appointment Details</h3>
          <p>
            <strong>User:</strong> {selectedAppointment?.user?.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {selectedAppointment?.user?.email || "N/A"}
          </p>
          <p>
            <strong>Problem:</strong> {selectedAppointment?.problem || "N/A"}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {selectedAppointment?.date
              ? new Date(selectedAppointment.date).toLocaleDateString()
              : "N/A"}
          </p>
          <div className="flex gap-4 mt-4">
            {renderTestsByStatus("Pending")}
            {renderTestsByStatus("In Progress")}
            {renderTestsByStatus("Completed")}
            {renderTestsByStatus("Closed")}
          </div>
          {renderLabs()}
        </div>
      )}
    </div>
  );
};

const TestCard = ({ test, lab, handleTestStatusChange }) => (
  <div
    draggable
    onDragStart={(e) => e.dataTransfer.setData("testId", test._id)}
    onDragEnd={(e) => (e.target.style.cursor = "grab")}
    className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-grab"
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="font-bold">{test.test.name}</p>
        <p className="text-sm text-gray-600">{test.status}</p>
        <p className="text-sm text-gray-600">{lab.name}</p>
        <p className="text-sm text-gray-600">{test.test.description}</p>
        <p className="text-sm text-gray-600">Price: ${test.test.price}</p>
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

const ViewToggle = ({ isGridView, setIsGridView }) => (
  <div className="flex justify-end mt-4 gap-2">
    <button
      className={`px-2 py-1 rounded text-sm flex items-center justify-center ${
        !isGridView ? "bg-gray-200" : "bg-blue-500 text-white"
      }`}
      onClick={() => setIsGridView(false)}
    >
      <LuList className="mr-2" /> List
    </button>
    <button
      className={`px-2 py-1 rounded text-sm flex items-center justify-center ${
        isGridView ? "bg-gray-200" : "bg-blue-500 text-white"
      }`}
      onClick={() => setIsGridView(true)}
    >
      <LuGrid className="mr-2" /> Grid
    </button>
  </div>
);

const LabsGrid = ({ labs, handleTestStatusChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {labs.map((lab) => (
      <div key={lab.lab._id} className="bg-white p-4 rounded-lg shadow-md">
        <div>
          <p className="font-bold">{lab.lab.name}</p>
          <p className="text-sm text-gray-600">{lab.lab.address}</p>
          <p className="text-sm text-gray-600">{lab.lab.contactNumber}</p>
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

const LabsList = ({ labs, handleTestStatusChange }) => (
  <div className="space-y-4">
    {labs.map((lab) => (
      <div key={lab.lab._id} className="bg-white p-4 rounded-lg shadow-md">
        <div>
          <p className="font-bold">{lab.lab.name}</p>
          <p className="text-sm text-gray-600">{lab.lab.address}</p>
          <p className="text-sm text-gray-600">{lab.lab.contactNumber}</p>
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

export default CouncilorUserBooking;
