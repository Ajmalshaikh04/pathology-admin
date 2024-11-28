// import React from "react";

// const LabsGrid = ({ labs, handleTestStatusChange }) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//     {labs?.map((lab) => (
//       <div key={lab?.lab?._id} className="bg-white p-4 rounded-lg shadow-md">
//         <div>
//           <p className="font-bold">{lab?.lab?.name}</p>
//           <p className="text-sm text-gray-600">{lab?.lab?.address}</p>
//           <p className="text-sm text-gray-600">{lab?.lab?.contactNumber}</p>
//         </div>
//         <div className="mt-4">
//           <h4 className="font-bold mb-2">Tests:</h4>
//           {lab?.tests.map((test) => (
//             <div
//               key={test._id}
//               className="flex justify-between items-center mb-2"
//             >
//               <span>{test?.test?.labCategory?.name}</span>
//               <select
//                 value={test?.status}
//                 onChange={(e) =>
//                   handleTestStatusChange(test?._id, e.target.value)
//                 }
//                 className="border rounded px-2 py-1"
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Interact with Client">
//                   Interact with Client
//                 </option>
//                 <option value="Collected Sample">Collected Sample</option>
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

// export default LabsGrid;
//======================================
import React from "react";
import { useSelector } from "react-redux";

const LabsGrid = ({ labs, handleTestStatusChange }) => {
  const { role } = useSelector((state) => state.user);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {labs?.map((lab) => (
        <div key={lab?.lab?._id} className="bg-white p-4 rounded-lg shadow-md">
          <div>
            <p className="font-bold">{lab?.lab?.name}</p>
            <p className="text-sm text-gray-600">{lab?.lab?.address}</p>
            <p className="text-sm text-gray-600">{lab?.lab?.contactNumber}</p>
          </div>
          <div className="mt-4">
            <h4 className="font-bold mb-2">Tests:</h4>
            {lab?.tests.map((test) => (
              <div
                key={test._id}
                className="flex justify-between items-center mb-2"
              >
                <span>{test?.test?.labCategory?.name}</span>
                <select
                  value={test?.status}
                  onChange={(e) =>
                    handleTestStatusChange(test?._id, e.target.value)
                  }
                  className="border rounded px-2 py-1"
                  disabled={role === "lab" && test?.status === "Pending"}
                >
                  {role === "lab" || role === "labBoy" ? null : (
                    <option value="Pending">Pending</option>
                  )}
                  <option value="In Progress">In Progress</option>
                  <option value="Interact with Client">
                    Interact with Client
                  </option>
                  <option value="Collected Sample">Collected Sample</option>
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
};

export default LabsGrid;
