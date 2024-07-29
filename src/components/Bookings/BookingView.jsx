// import  { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import TestCard from "./TestCard";
// import ViewToggle from "./ViewToggle";
// import LabsGrid from "./LabsGrid";
// import LabsList from "./LabsList";
// import { updateLabTestStatusAsync } from "../../store/features/appoinments/appoinmentsSlice.js";

// const BookingsView = () => {
//   const location = useLocation();
//   const { appointment } = location.state || {};
//   const [isGridView, setIsGridView] = useState(true);
//   const [selectedAppointment, setSelectedAppointment] = useState(appointment);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Example user ID; replace with actual user context or auth data
//   const user = "someUserId";

//   useEffect(() => {
//     if (appointment) {
//       setSelectedAppointment(appointment);
//     }
//   }, [appointment]);

//   if (!appointment) {
//     navigate("/bookings");
//     return null;
//   }

//   const handleTestStatusChange = (testId, newStatus) => {
//     if (
//       selectedAppointment &&
//       selectedAppointment.labs &&
//       selectedAppointment.labs.tests
//     ) {
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
//           testId: testId,
//           status: newStatus,
//           updatedBy: user, // Ensure this is the correct user ID
//         })
//       );
//     } else {
//       console.error("Selected appointment or labs or tests is undefined");
//     }
//   };

//   const renderTestsByStatus = (status) => (
//     <div className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3">
//       <h3 className="text-lg font-bold capitalize mb-4">{status}</h3>
//       {selectedAppointment.labs.tests
//         .filter((test) => test.status === status)
//         .map((test) => (
//           <TestCard
//             key={test._id}
//             test={test}
//             lab={selectedAppointment.labs.lab}
//             handleTestStatusChange={handleTestStatusChange}
//           />
//         ))}
//     </div>
//   );

//   const renderLabs = () => (
//     <div>
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-bold mb-4">Labs</h3>
//         <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
//       </div>
//       {isGridView ? (
//         <LabsGrid
//           labs={[selectedAppointment.labs]}
//           handleTestStatusChange={handleTestStatusChange}
//         />
//       ) : (
//         <LabsList
//           labs={[selectedAppointment.labs]}
//           handleTestStatusChange={handleTestStatusChange}
//         />
//       )}
//     </div>
//   );

//   return (
//     <div>
//       <div className="flex items-center justify-between p-2">
//         <h3 className="text-lg font-bold mb-4">
//           Tests and Labs for{" "}
//           {selectedAppointment?.createdBy?.name || "Unknown User"}
//         </h3>
//         <button
//           className="mt-4 px-4 py-2 bg-gray-200 rounded"
//           onClick={() => navigate("/bookings")}
//         >
//           Back to bookings
//         </button>
//       </div>
//       <div className="flex space-x-4">
//         {["Pending", "In Progress", "Completed", "Closed"].map((status) =>
//           renderTestsByStatus(status)
//         )}
//       </div>
//       {renderLabs()}
//     </div>
//   );
// };

// export default BookingsView;
//==========================================
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TestCard from "./TestCard";
import ViewToggle from "./ViewToggle";
import LabsGrid from "./LabsGrid";
import LabsList from "./LabsList";
import { updateLabTestStatusAsync } from "../../store/features/appoinments/appoinmentsSlice.js";

const BookingsView = () => {
  const location = useLocation();
  const { appointment } = location.state || {};
  const [isGridView, setIsGridView] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(appointment);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Access the user ID from the Redux store
  const userId = useSelector((state) => state.user.user);

  useEffect(() => {
    if (appointment) {
      setSelectedAppointment(appointment);
    }
  }, [appointment]);

  if (!appointment) {
    navigate("/bookings");
    return null;
  }

  const handleDragStart = (e, testId) => {
    e.dataTransfer.setData("testId", testId);
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const testId = e.dataTransfer.getData("testId");
    if (
      selectedAppointment &&
      selectedAppointment.labs &&
      selectedAppointment.labs.tests
    ) {
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
          updatedBy: userId,
        })
      );
    }
  };

  const handleTestStatusChange = (testId, newStatus) => {
    console.log("Updating test:", testId, "to status:", newStatus);

    if (
      selectedAppointment &&
      selectedAppointment.labs &&
      selectedAppointment.labs.tests
    ) {
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
          updatedBy: userId,
        })
      );
    } else {
      console.error("Selected appointment or labs or tests is undefined");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const renderTestsByStatus = (status) => (
    <div
      className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3"
      onDrop={(e) => handleDrop(e, status)}
      onDragOver={handleDragOver}
    >
      <h3 className="text-lg font-bold capitalize mb-4">{status}</h3>
      {selectedAppointment.labs.tests
        .filter((test) => test.status === status)
        .map((test) => (
          <TestCard
            key={test._id}
            test={test}
            lab={selectedAppointment.labs.lab}
            handleTestStatusChange={handleTestStatusChange}
            onDragStart={(e) => handleDragStart(e, test._id)}
            draggable
          />
        ))}
    </div>
  );

  const renderLabs = () => (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold mb-4">Labs</h3>
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      {isGridView ? (
        <LabsGrid
          labs={[selectedAppointment.labs]}
          handleTestStatusChange={handleTestStatusChange}
        />
      ) : (
        <LabsList
          labs={[selectedAppointment.labs]}
          handleTestStatusChange={handleTestStatusChange}
        />
      )}
    </div>
  );

  return (
    <div className="mx-6">
      <div className="flex items-center justify-between p-2">
        <h3 className="text-lg font-bold mb-4">
          Tests and Labs for{" "}
          {selectedAppointment?.createdBy?.name || "Unknown User"}
        </h3>
        <button
          className="mt-4 px-4 py-2 bg-gray-200 rounded"
          onClick={() => navigate("/bookings")}
        >
          Back to bookings
        </button>
      </div>
      <div className="flex space-x-4">
        {["Pending", "In Progress", "Completed", "Closed"].map((status) =>
          renderTestsByStatus(status)
        )}
      </div>
      {renderLabs()}
    </div>
  );
};

export default BookingsView;
