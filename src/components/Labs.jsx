// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   FaAnglesLeft,
//   FaAnglesRight,
//   FaAngleLeft,
//   FaAngleRight,
// } from "react-icons/fa6";
// import {
//   getAllLabsAsync,
//   createLabAsync,
// } from "../store/features/labs/labsSlice";

// const DiagnosticLabTable = () => {
//   const [filter, setFilter] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [newLab, setNewLab] = useState({
//     name: "",
//     address: "",
//     contactNumber: "",
//   });

//   const dispatch = useDispatch();
//   const { labs, loading, error } = useSelector((state) => state.labs);

//   useEffect(() => {
//     dispatch(getAllLabsAsync());
//   }, [dispatch]);

//   const filteredLabs = labs.filter(
//     (lab) => lab.name && lab.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewLab({ ...newLab, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createLabAsync(newLab));
//     setShowModal(false);
//     setNewLab({
//       name: "",
//       address: "",
//       contactNumber: "",
//     });
//     dispatch(getAllLabsAsync());
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setNewLab({
//       name: "",
//       address: "",
//       contactNumber: "",
//     });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full">
//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Filter labs..."
//           className="border rounded-md px-3 py-2 w-64"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         />
//         <button
//           className="px-3 py-2 border rounded-md"
//           onClick={() => setShowModal(true)}
//         >
//           Create lab
//         </button>
//       </div>

//       {/* Modal for creating a new lab */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-md w-96">
//             <h2 className="text-lg font-semibold mb-4">Create New Lab</h2>
//             <form onSubmit={handleSubmit} className="mb-4">
//               <input
//                 type="text"
//                 name="name"
//                 value={newLab.name}
//                 onChange={handleInputChange}
//                 placeholder="Lab Name"
//                 className="border rounded-md px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="address"
//                 value={newLab.address}
//                 onChange={handleInputChange}
//                 placeholder="Lab Address"
//                 className="border rounded-md px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="contactNumber"
//                 value={newLab.contactNumber}
//                 onChange={handleInputChange}
//                 placeholder="Lab Contact Number"
//                 className="border rounded-md px-3 py-2 mb-2 w-full"
//               />
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="px-3 py-2 border rounded-md mr-2"
//                 >
//                   Create
//                 </button>
//                 <button
//                   type="button"
//                   className="px-3 py-2 border rounded-md"
//                   onClick={closeModal}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <table className="min-w-full">
//         <thead>
//           <tr className="text-left border-b">
//             <th className="py-2 px-4">Name</th>
//             <th className="py-2 px-4">Address</th>
//             <th className="py-2 px-4">Contact</th>
//             <th className="py-2 px-4">Tests Offered</th>
//             <th className="py-2 px-4"></th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredLabs.map((lab) => (
//             <tr key={lab._id} className="border-b hover:bg-gray-100">
//               <td className="py-3 px-4">{lab.name}</td>
//               <td className="py-3 px-4">{lab.address}</td>
//               <td className="py-3 px-4">{lab.contactNumber}</td>
//               <td className="py-3 px-4">{lab.testsOffered.length}</td>
//               <td className="py-3 px-4 text-right">
//                 <button className="text-gray-600">...</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mt-4 flex justify-between items-center">
//         <p className="text-sm text-gray-600">
//           {filteredLabs.length} of {labs.length} row(s) selected.
//         </p>
//         <div className="flex items-center space-x-2">
//           <span className="text-sm text-gray-600">Rows per page</span>
//           <select className="border rounded-md px-2 py-1">
//             <option>10</option>
//             <option>25</option>
//             <option>50</option>
//           </select>
//           <div className="flex justify-end space-x-1 text-gray-500">
//             <button className="px-2 py-1 border rounded-md ">
//               <FaAnglesLeft />
//             </button>
//             <button className="px-2 py-1 border rounded-md">
//               <FaAngleLeft />
//             </button>
//             <button className="px-2 py-1 border rounded-md">
//               <FaAngleRight />
//             </button>
//             <button className="px-2 py-1 border rounded-md">
//               <FaAnglesRight />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiagnosticLabTable;
//======================================
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaAnglesLeft,
  FaAnglesRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa6";
import {
  getAllLabsAsync,
  createLabAsync,
} from "../store/features/labs/labsSlice";
import { BsThreeDots } from "react-icons/bs";

const DiagnosticLabTable = () => {
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newLab, setNewLab] = useState({
    name: "",
    address: "",
    contactNumber: "",
  });

  const dispatch = useDispatch();
  const { labs, loading, error } = useSelector((state) => state.labs);

  useEffect(() => {
    dispatch(getAllLabsAsync());
  }, [dispatch]);

  const filteredLabs = labs.filter(
    (lab) => lab.name && lab.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLab({ ...newLab, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(createLabAsync(newLab));
    if (createLabAsync.fulfilled.match(resultAction)) {
      setShowModal(false);
      setNewLab({
        name: "",
        address: "",
        contactNumber: "",
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setNewLab({
      name: "",
      address: "",
      contactNumber: "",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Filter labs..."
          className="border rounded-md px-3 py-2 w-64"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          className="px-3 py-2 border rounded-md"
          onClick={() => setShowModal(true)}
        >
          Create lab
        </button>
      </div>

      {/* Modal for creating a new lab */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">Create New Lab</h2>
            <form onSubmit={handleSubmit} className="mb-4">
              <input
                type="text"
                name="name"
                value={newLab.name}
                onChange={handleInputChange}
                placeholder="Lab Name"
                className="border rounded-md px-3 py-2 mb-2 w-full"
              />
              <input
                type="text"
                name="address"
                value={newLab.address}
                onChange={handleInputChange}
                placeholder="Lab Address"
                className="border rounded-md px-3 py-2 mb-2 w-full"
              />
              <input
                type="text"
                name="contactNumber"
                value={newLab.contactNumber}
                onChange={handleInputChange}
                placeholder="Lab Contact Number"
                className="border rounded-md px-3 py-2 mb-2 w-full"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-3 py-2 border rounded-md mr-2"
                >
                  Create
                </button>
                <button
                  type="button"
                  className="px-3 py-2 border rounded-md"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="min-w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Address</th>
            <th className="py-2 px-4">Contact</th>
            <th className="py-2 px-4">Tests Offered</th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {filteredLabs.map((lab) => (
            <tr key={lab._id} className="border-b hover:bg-gray-100">
              <td className="py-3 px-4">{lab.name}</td>
              <td className="py-3 px-4">{lab.address}</td>
              <td className="py-3 px-4">{lab.contactNumber}</td>
              <td className="py-3 px-4">{lab.testsOffered.length}</td>
              <td className="py-3 px-4 text-right">
                <button className="text-gray-600">
                  <BsThreeDots />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {filteredLabs.length} of {labs.length} row(s) selected.
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Rows per page</span>
          <select className="border rounded-md px-2 py-1">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <div className="flex justify-end space-x-1 text-gray-500">
            <button className="px-2 py-1 border rounded-md ">
              <FaAnglesLeft />
            </button>
            <button className="px-2 py-1 border rounded-md">
              <FaAngleLeft />
            </button>
            <button className="px-2 py-1 border rounded-md">
              <FaAngleRight />
            </button>
            <button className="px-2 py-1 border rounded-md">
              <FaAnglesRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticLabTable;
