// import React, { useState, useEffect } from "react";
// import uploadImage from "../firebase/image";

// const LabModal = ({ closeModal, lab, onSubmit }) => {
//   const [labData, setLabData] = useState({
//     name: "",
//     address: {
//       address: "",
//       city: "",
//       state: "",
//       pinCode: "",
//     },
//     contactNumber: "",
//     image: "",
//   });
//   const [progressStatus, setProgressStatus] = useState(null);

//   useEffect(() => {
//     if (lab) {
//       setLabData(lab);
//     }
//   }, [lab]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (
//       name === "address" ||
//       name === "city" ||
//       name === "state" ||
//       name === "pinCode"
//     ) {
//       setLabData((prev) => ({
//         ...prev,
//         address: {
//           ...prev.address,
//           [name]: value,
//         },
//       }));
//     } else {
//       setLabData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleImageChange = async (event) => {
//     const selectedFile = event.target?.files?.[0];
//     const folderName = selectedFile?.name ?? "";
//     if (selectedFile) {
//       setProgressStatus(0);
//       try {
//         const imageUrl = await uploadImage(
//           folderName,
//           selectedFile,
//           (progress) => setProgressStatus(Math.round(progress))
//         );
//         setLabData((prev) => ({
//           ...prev,
//           image: imageUrl,
//           imageSrc: folderName,
//         }));
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       } finally {
//         setTimeout(() => setProgressStatus(null), 1000);
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(lab ? lab._id : null, labData);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-lg font-semibold mb-4">
//           {lab ? "Edit" : "Create"} Lab
//         </h2>
//         <form onSubmit={handleSubmit} className="mb-4">
//           <input
//             type="text"
//             name="name"
//             value={labData.name}
//             onChange={handleInputChange}
//             placeholder="Lab Name"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="text"
//             name="address"
//             value={labData.address.address}
//             onChange={handleInputChange}
//             placeholder="Street Address"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="text"
//             name="city"
//             value={labData.address.city}
//             onChange={handleInputChange}
//             placeholder="City"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="text"
//             name="state"
//             value={labData.address.state}
//             onChange={handleInputChange}
//             placeholder="State"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="text"
//             name="pinCode"
//             value={labData.address.pinCode}
//             onChange={handleInputChange}
//             placeholder="PIN Code"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="text"
//             name="contactNumber"
//             value={labData.contactNumber}
//             onChange={handleInputChange}
//             placeholder="Lab Contact Number"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <div className="relative w-full h-full mb-2">
//             <input
//               type="file"
//               name="image"
//               onChange={handleImageChange}
//               className="hidden"
//               id="file-upload"
//             />
//             <label
//               htmlFor="file-upload"
//               className="px-4 py-2 pl-24 relative w-full text-base bg-transparent focus:border-[#DEE1E2] border-gray-400 border rounded-md cursor-pointer flex items-center justify-between"
//             >
//               {labData.imageSrc || "Choose a file"}
//               <span className="text-gray-600 text-[15px] absolute top-0 h-full flex items-center left-0 rounded-tl-md rounded-bl-md px-3 border-r border-gray-400 font-medium bg-gray-50">
//                 Browse
//               </span>
//             </label>
//             {progressStatus !== null && (
//               <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
//                 <div
//                   className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
//                   style={{ width: `${progressStatus}%` }}
//                 ></div>
//               </div>
//             )}
//           </div>
//           <div className="flex justify-end">
//             <button type="submit" className="px-3 py-2 border rounded-md mr-2">
//               {lab ? "Save" : "Create"}
//             </button>
//             <button
//               type="button"
//               className="px-3 py-2 border rounded-md"
//               onClick={closeModal}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LabModal;
//=========================================
import { useState, useEffect } from "react";
import uploadImage from "../../firebase/image";

const LabModal = ({ closeModal, lab, onSubmit }) => {
  const [labData, setLabData] = useState({
    name: "",
    address: {
      address: "",
      city: "",
      state: "",
      pinCode: "",
    },
    contactNumber: "",
    image: "",
  });
  const [progressStatus, setProgressStatus] = useState(null);

  useEffect(() => {
    if (lab) {
      setLabData(lab);
    }
  }, [lab]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "address" ||
      name === "city" ||
      name === "state" ||
      name === "pinCode"
    ) {
      setLabData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setLabData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = async (event) => {
    const selectedFile = event.target?.files?.[0];
    const folderName = selectedFile?.name ?? "";
    if (selectedFile) {
      setProgressStatus(0);
      try {
        const imageUrl = await uploadImage(
          folderName,
          selectedFile,
          (progress) => setProgressStatus(Math.round(progress))
        );
        setLabData((prev) => ({
          ...prev,
          image: imageUrl,
          imageSrc: folderName,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setTimeout(() => setProgressStatus(null), 1000);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(lab ? lab._id : null, labData);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">
          {lab ? "Edit" : "Create"} Lab
        </h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            name="name"
            value={labData.name}
            onChange={handleInputChange}
            placeholder="Lab Name"
            className="border rounded-md px-3 py-2 mb-2 w-full"
          />
          <input
            type="text"
            name="address"
            value={labData.address.address}
            onChange={handleInputChange}
            placeholder="Street Address"
            className="border rounded-md px-3 py-2 mb-2 w-full"
          />
          <input
            type="text"
            name="city"
            value={labData.address.city}
            onChange={handleInputChange}
            placeholder="City"
            className="border rounded-md px-3 py-2 mb-2 w-full"
          />
          <input
            type="text"
            name="state"
            value={labData.address.state}
            onChange={handleInputChange}
            placeholder="State"
            className="border rounded-md px-3 py-2 mb-2 w-full"
          />
          <input
            type="text"
            name="pinCode"
            value={labData.address.pinCode}
            onChange={handleInputChange}
            placeholder="PIN Code"
            className="border rounded-md px-3 py-2 mb-2 w-full"
          />
          <input
            type="text"
            name="contactNumber"
            value={labData.contactNumber}
            onChange={handleInputChange}
            placeholder="Lab Contact Number"
            className="border rounded-md px-3 py-2 mb-2 w-full"
          />
          <div className="relative w-full h-full mb-2">
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="px-4 py-2 pl-24 relative w-full text-base bg-transparent focus:border-[#DEE1E2] border-gray-400 border rounded-md cursor-pointer flex items-center justify-between"
            >
              {labData.imageSrc || "Choose a file"}
              <span className="text-gray-600 text-[15px] absolute top-0 h-full flex items-center left-0 rounded-tl-md rounded-bl-md px-3 border-r border-gray-400 font-medium bg-gray-50">
                Browse
              </span>
            </label>
            {progressStatus !== null && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progressStatus}%` }}
                ></div>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-3 py-2 border rounded-md mr-2">
              {lab ? "Save" : "Create"}
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
  );
};

export default LabModal;
