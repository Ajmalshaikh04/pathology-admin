// import { useState, useEffect } from "react";
// import uploadImage from "../../firebase/image";

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
//     } else {
//       setLabData({
//         name: "",
//         address: {
//           address: "",
//           city: "",
//           state: "",
//           pinCode: "",
//         },
//         contactNumber: "",
//         image: "",
//       });
//     }
//   }, [lab]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name in labData.address) {
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
//     console.log(lab);
//     onSubmit(lab ? lab._id : null, labData);
//   };
//   console.log(labData);
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
//=============================================
// import { useState, useEffect } from "react";

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

//   useEffect(() => {
//     if (lab) {
//       setLabData(lab);
//     } else {
//       setLabData({
//         name: "",
//         address: {
//           address: "",
//           city: "",
//           state: "",
//           pinCode: "",
//         },
//         contactNumber: "",
//         image: "",
//       });
//     }
//   }, [lab]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name in labData.address) {
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
//             placeholder="Address"
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
//             placeholder="Pin Code"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="text"
//             name="contactNumber"
//             value={labData.contactNumber}
//             onChange={handleInputChange}
//             placeholder="Contact Number"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="text"
//             name="image"
//             value={labData.image}
//             onChange={handleInputChange}
//             placeholder="Image URL"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <div className="flex justify-end">
//             <button type="submit" className="px-3 py-2 border rounded-md mr-2">
//               {lab ? "Save" : "Create"}
//             </button>
//             <button
//               type="button"
//               className="px-3 py-2 border rounded-md"
//               onClick={() => {
//                 closeModal();
//                 setLabData({
//                   name: "",
//                   address: {
//                     address: "",
//                     city: "",
//                     state: "",
//                     pinCode: "",
//                   },
//                   contactNumber: "",
//                   image: "",
//                 });
//               }}
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
//=================================================
// import { useState, useEffect } from "react";
// import uploadImage from "../../firebase/image"; // Import your uploadImage function

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
//     } else {
//       setLabData({
//         name: "",
//         address: {
//           address: "",
//           city: "",
//           state: "",
//           pinCode: "",
//         },
//         contactNumber: "",
//         image: "",
//       });
//     }
//   }, [lab]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name in labData.address) {
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

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProgressStatus(0);
//       try {
//         const imageUrl = await uploadImage(file, (progress) =>
//           setProgressStatus(Math.round(progress))
//         );
//         setLabData((prev) => ({
//           ...prev,
//           image: imageUrl,
//         }));
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       } finally {
//         setTimeout(() => setProgressStatus(null), 1000);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await onSubmit(lab ? lab._id : null, labData);
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
//             placeholder="Contact Number"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="file"
//             onChange={handleImageChange}
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           {labData.image && (
//             <img
//               src={labData.image}
//               alt="Lab"
//               className="w-full h-32 object-cover mb-2"
//             />
//           )}
//           {progressStatus !== null && (
//             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
//               <div
//                 className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
//                 style={{ width: `${progressStatus}%` }}
//               ></div>
//             </div>
//           )}
//           <div className="flex justify-end">
//             <button type="submit" className="px-3 py-2 border rounded-md mr-2">
//               {lab ? "Save" : "Create"}
//             </button>
//             <button
//               type="button"
//               className="px-3 py-2 border rounded-md"
//               onClick={() => {
//                 closeModal();
//                 setLabData({
//                   name: "",
//                   address: {
//                     address: "",
//                     city: "",
//                     state: "",
//                     pinCode: "",
//                   },
//                   contactNumber: "",
//                   image: "",
//                 });
//               }}
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
//=====================================================
// import { useState, useEffect } from "react";
// import uploadImage from "../../firebase/image"; // Import your uploadImage function

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
//     password: "", // Add password to the initial state
//   });
//   const [progressStatus, setProgressStatus] = useState(null);

//   useEffect(() => {
//     if (lab) {
//       setLabData(lab);
//     } else {
//       setLabData({
//         name: "",
//         address: {
//           address: "",
//           city: "",
//           state: "",
//           pinCode: "",
//         },
//         contactNumber: "",
//         image: "",
//         password: "", // Ensure password is reset
//       });
//     }
//   }, [lab]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name in labData.address) {
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

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProgressStatus(0);
//       try {
//         const imageUrl = await uploadImage(file, (progress) =>
//           setProgressStatus(Math.round(progress))
//         );
//         setLabData((prev) => ({
//           ...prev,
//           image: imageUrl,
//         }));
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       } finally {
//         setTimeout(() => setProgressStatus(null), 1000);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await onSubmit(lab ? lab._id : null, labData);
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
//             placeholder="Contact Number"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="file"
//             onChange={handleImageChange}
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           {labData.image && (
//             <img
//               src={labData.image}
//               alt="Lab"
//               className="w-full h-32 object-cover mb-2"
//             />
//           )}
//           {progressStatus !== null && (
//             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
//               <div
//                 className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
//                 style={{ width: `${progressStatus}%` }}
//               ></div>
//             </div>
//           )}
//           <input
//             type="password"
//             name="password"
//             value={labData.password}
//             onChange={handleInputChange}
//             placeholder="Password"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <div className="flex justify-end">
//             <button type="submit" className="px-3 py-2 border rounded-md mr-2">
//               {lab ? "Save" : "Create"}
//             </button>
//             <button
//               type="button"
//               className="px-3 py-2 border rounded-md"
//               onClick={() => {
//                 closeModal();
//                 setLabData({
//                   name: "",
//                   address: {
//                     address: "",
//                     city: "",
//                     state: "",
//                     pinCode: "",
//                   },
//                   contactNumber: "",
//                   image: "",
//                   password: "", // Reset password
//                 });
//               }}
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
//============================================
// import { useState, useEffect } from "react";
// import uploadImage from "../../firebase/image"; // Import your uploadImage function

// const LabModal = ({ onClose, lab, onSubmit }) => {
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
//     profileImg: "",
//     password: "", // Add password to the initial state
//   });
//   const [progressStatus, setProgressStatus] = useState(null);

//   useEffect(() => {
//     if (lab) {
//       // console.log("Lab data received:", lab); // Debug log
//       // setLabData(lab);
//       setLabData((prevState) => ({
//         ...prevState,
//         ...lab,
//         address: {
//           ...prevState.address,
//           ...lab.address,
//         },
//         password: prevState.password, // Ensure password is not overwritten
//       }));
//     } else {
//       setLabData({
//         name: "",
//         email: "",
//         address: {
//           address: "",
//           city: "",
//           state: "",
//           pinCode: "",
//         },
//         contactNumber: "",
//         image: "",
//         profileImg: "",
//         password: "", // Ensure password is reset
//       });
//     }
//   }, [lab]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     console.log("Input change:", name, value); // Debug log
//     if (name in labData.address) {
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

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     console.log("File selected:", file); // Debug log
//     if (file) {
//       setProgressStatus(0);
//       try {
//         const imageUrl = await uploadImage("LabImages", file, (progress) =>
//           setProgressStatus(Math.round(progress))
//         );
//         setLabData((prev) => ({
//           ...prev,
//           image: imageUrl,
//         }));
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       } finally {
//         setTimeout(() => setProgressStatus(null), 1000);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting data:", labData); // Debug log
//     try {
//       if (lab) {
//         await onSubmit(lab._id, labData); // Pass both labId and labData
//       } else {
//         await onSubmit(labData);
//       }
//       console.log("Submitting data:", labData);
//     } catch (error) {
//       console.error("Error submitting lab data:", error); // Log any error
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center ">
//       <div className="bg-white px-6 py-10 rounded-lg shadow-md max-w-4xl">
//         <h2 className="text-lg font-semibold mb-4">
//           {lab ? "Edit" : "Create"} Lab
//         </h2>
//         {/* <form onSubmit={handleSubmit} className="mb-4 space-y-4">
//           <input
//             type="text"
//             name="name"
//             value={labData.name}
//             onChange={handleInputChange}
//             placeholder="Lab Name"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="password"
//             name="password"
//             value={labData.password}
//             onChange={handleInputChange}
//             placeholder="Password"
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
//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="text"
//               name="city"
//               value={labData.address.city}
//               onChange={handleInputChange}
//               placeholder="City"
//               className="border rounded-md px-3 py-2 mb-2 w-full"
//             />
//             <input
//               type="text"
//               name="state"
//               value={labData.address.state}
//               onChange={handleInputChange}
//               placeholder="State"
//               className="border rounded-md px-3 py-2 mb-2 w-full"
//             />
//             <input
//               type="text"
//               name="pinCode"
//               value={labData.address.pinCode}
//               onChange={handleInputChange}
//               placeholder="PIN Code"
//               className="border rounded-md px-3 py-2 mb-2 w-full"
//             />
//             <input
//               type="text"
//               name="contactNumber"
//               value={labData.contactNumber}
//               onChange={handleInputChange}
//               placeholder="Contact Number"
//               className="border rounded-md px-3 py-2 mb-2 w-full"
//             />
//           </div>
//           <input
//             type="file"
//             onChange={handleImageChange}
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           {labData.image && (
//             <img
//               src={labData.image}
//               alt="Lab"
//               className="w-full h-32 object-cover mb-2"
//             />
//           )}
//           {progressStatus !== null && (
//             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
//               <div
//                 className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
//                 style={{ width: `${progressStatus}%` }}
//               ></div>
//             </div>
//           )}

//           <div className="flex justify-end">
//             <button type="submit" className="px-3 py-2 border rounded-md mr-2">
//               {lab ? "Save" : "Create"}
//             </button>
//             <button
//               type="button"
//               className="px-3 py-2 border rounded-md"
//               onClick={() => {
//                 closeModal();
//                 setLabData({
//                   name: "",
//                   address: {
//                     address: "",
//                     city: "",
//                     state: "",
//                     pinCode: "",
//                   },
//                   contactNumber: "",
//                   image: "",
//                   password: "", // Reset password
//                 });
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </form> */}
//         <form onSubmit={handleSubmit} className="mb-4 space-y-2">
// <div>
//   <label htmlFor="name" className="block mb-2">
//     Lab Name
//   </label>
//   <input
//     type="text"
//     id="name"
//     name="name"
//     value={labData.name}
//     onChange={handleInputChange}
//     placeholder="Lab Name"
//     className="border rounded-md px-3 py-2 mb-2 w-full"
//   />
// </div>
// <div>
//   <label htmlFor="email" className="block mb-2">
//     Email
//   </label>
//   <input
//     type="email"
//     id="email"
//     name="email"
//     value={labData.email}
//     onChange={handleInputChange}
//     placeholder="Lab Name"
//     className="border rounded-md px-3 py-2 mb-2 w-full"
//   />
// </div>
// <div>
//   <label htmlFor="password" className="block mb-2">
//     Password
//   </label>
//   <input
//     type="password"
//     id="password"
//     name="password"
//     value={labData.password}
//     onChange={handleInputChange}
//     placeholder="Password"
//     className="border rounded-md px-3 py-2 mb-2 w-full"
//   />
// </div>
// <div>
//   <label htmlFor="address" className="block mb-2">
//     Street Address
//   </label>
//   <input
//     type="text"
//     id="address"
//     name="address"
//     value={labData.address.address}
//     onChange={handleInputChange}
//     placeholder="Street Address"
//     className="border rounded-md px-3 py-2 mb-2 w-full"
//   />
// </div>
// <div className="grid grid-cols-2 gap-2">
//   <div>
//     <label htmlFor="city" className="block mb-2">
//       City
//     </label>
//     <input
//       type="text"
//       id="city"
//       name="city"
//       value={labData.address.city}
//       onChange={handleInputChange}
//       placeholder="City"
//       className="border rounded-md px-3 py-2 mb-2 w-full"
//     />
//   </div>
//   <div>
//     <label htmlFor="state" className="block mb-2">
//       State
//     </label>
//     <input
//       type="text"
//       id="state"
//       name="state"
//       value={labData.address.state}
//       onChange={handleInputChange}
//       placeholder="State"
//       className="border rounded-md px-3 py-2 mb-2 w-full"
//     />
//   </div>
//   <div>
//     <label htmlFor="pinCode" className="block mb-2">
//       PIN Code
//     </label>
//     <input
//       type="text"
//       id="pinCode"
//       name="pinCode"
//       value={labData.address.pinCode}
//       onChange={handleInputChange}
//       placeholder="PIN Code"
//       className="border rounded-md px-3 py-2 mb-2 w-full"
//     />
//   </div>
//   <div>
//     <label htmlFor="contactNumber" className="block mb-2">
//       Contact Number
//     </label>
//     <input
//       type="text"
//       id="contactNumber"
//       name="contactNumber"
//       value={labData.contactNumber}
//       onChange={handleInputChange}
//       placeholder="Contact Number"
//       className="border rounded-md px-3 py-2 mb-2 w-full"
//     />
//   </div>
// </div>
// <div>
//             <label htmlFor="image" className="block mb-2">
//               Image
//             </label>
//             <input
//               type="file"
//               id="image"
//               onChange={handleImageChange}
//               className="border rounded-md px-3 py-2 mb-2 w-full"
//             />
//           </div>
//           {labData.image && (
//             <img
//               src={labData.image}
//               alt="Lab"
//               className="w-full h-32 object-cover mb-2"
//             />
//           )}
//           {progressStatus !== null && (
//             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
//               <div
//                 className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
//                 style={{ width: `${progressStatus}%` }}
//               ></div>
//             </div>
//           )}
//           <div className="flex justify-end">
//             <button type="submit" className="px-3 py-2 border rounded-md mr-2">
//               {lab ? "Save" : "Create"}
//             </button>
//             <button
//               type="button"
//               className="px-3 py-2 border rounded-md"
//               onClick={() => {
//                 onClose();
//                 setLabData({
//                   name: "",
//                   address: {
//                     address: "",
//                     city: "",
//                     state: "",
//                     pinCode: "",
//                   },
//                   contactNumber: "",
//                   image: "",
//                   password: "", // Reset password
//                 });
//               }}
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
//=============================================
import { useState, useEffect } from "react";
import uploadImage from "../../firebase/image"; // Import your uploadImage function

const LabModal = ({ onClose, lab, onSubmit }) => {
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
    profileImg: "", // Initialize profileImg in the state
    password: "",
  });
  const [progressStatus, setProgressStatus] = useState(null);

  useEffect(() => {
    if (lab) {
      setLabData((prevState) => ({
        ...prevState,
        ...lab,
        address: {
          ...prevState.address,
          ...lab.address,
        },
        password: prevState.password, // Ensure password is not overwritten
      }));
    } else {
      setLabData({
        name: "",
        email: "",
        address: {
          address: "",
          city: "",
          state: "",
          pinCode: "",
        },
        contactNumber: "",
        image: "",
        profileImg: "", // Ensure profileImg is reset
        password: "",
      });
    }
  }, [lab]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in labData.address) {
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

  const handleImageChange = async (e, fieldName) => {
    const file = e.target.files[0];
    console.log("File selected:", file); // Debug log
    if (file) {
      setProgressStatus(0);
      try {
        const imageUrl = await uploadImage("LabImages", file, (progress) =>
          setProgressStatus(Math.round(progress))
        );
        setLabData((prev) => ({
          ...prev,
          [fieldName]: imageUrl, // Set the field dynamically based on the input
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setTimeout(() => setProgressStatus(null), 1000);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (lab) {
        await onSubmit(labData);
      } else {
        await onSubmit(labData);
      }
    } catch (error) {
      console.error("Error submitting lab data:", error);
    }
  };
  console.log("LabTable modal", lab);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center ">
      <div className="bg-white px-6 py-10 rounded-lg shadow-md max-w-5xl">
        <h2 className="text-lg font-semibold mb-4">
          {lab ? "Edit" : "Create"} Lab
        </h2>
        <form onSubmit={handleSubmit} className="mb-4 space-y-2">
          <div>
            <label htmlFor="name" className="block mb-2">
              Lab Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={labData.name}
              onChange={handleInputChange}
              placeholder="Lab Name"
              className="border rounded-md px-3 py-2 mb-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={labData.email}
              onChange={handleInputChange}
              placeholder="Lab Name"
              className="border rounded-md px-3 py-2 mb-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={labData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="border rounded-md px-3 py-2 mb-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-2">
              Street Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={labData.address.address}
              onChange={handleInputChange}
              placeholder="Street Address"
              className="border rounded-md px-3 py-2 mb-2 w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="city" className="block mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={labData.address.city}
                onChange={handleInputChange}
                placeholder="City"
                className="border rounded-md px-3 py-2 mb-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="state" className="block mb-2">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={labData.address.state}
                onChange={handleInputChange}
                placeholder="State"
                className="border rounded-md px-3 py-2 mb-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="pinCode" className="block mb-2">
                PIN Code
              </label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={labData.address.pinCode}
                onChange={handleInputChange}
                placeholder="PIN Code"
                className="border rounded-md px-3 py-2 mb-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="contactNumber" className="block mb-2">
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={labData.contactNumber}
                onChange={handleInputChange}
                placeholder="Contact Number"
                className="border rounded-md px-3 py-2 mb-2 w-full"
              />
            </div>
          </div>

          <div className="flex">
            <div>
              <label htmlFor="image" className="block mb-2">
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => handleImageChange(e, "image")}
                className="border rounded-md px-3 py-2 mb-2 w-full"
              />
            </div>
            {labData.image && (
              <img
                src={labData.image}
                alt="Lab"
                className="w-full h-32 object-cover mb-2"
              />
            )}

            {/* New input field for profileImg */}
            <div>
              <label htmlFor="profileImg" className="block mb-2">
                Profile Image
              </label>
              <input
                type="file"
                id="profileImg"
                onChange={(e) => handleImageChange(e, "profileImg")}
                className="border rounded-md px-3 py-2 mb-2 w-full"
              />
            </div>
            {labData.profileImg && (
              <img
                src={labData.profileImg}
                alt="Profile"
                className="w-full h-32 object-cover mb-2"
              />
            )}
          </div>

          {progressStatus !== null && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progressStatus}%` }}
              ></div>
            </div>
          )}

          <div className="flex justify-end">
            <button type="submit" className="px-3 py-2 border rounded-md mr-2">
              {lab ? "Save" : "Create"}
            </button>
            <button
              type="button"
              className="px-3 py-2 border rounded-md"
              onClick={() => {
                onClose();
                setLabData({
                  name: "",
                  address: {
                    address: "",
                    city: "",
                    state: "",
                    pinCode: "",
                  },
                  contactNumber: "",
                  image: "",
                  profileImg: "", // Reset profileImg
                  password: "", // Reset password
                });
              }}
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
