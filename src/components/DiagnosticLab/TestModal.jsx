// // import React, { useState, useEffect } from "react";

// // const TestModal = ({ closeModal, test, onSubmit }) => {
// //   const [testData, setTestData] = useState({
// //     testName: "",
// //     description: "",
// //     price: "",
// //   });

// //   useEffect(() => {
// //     if (test) {
// //       setTestData(test);
// //     }
// //   }, [test]);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setTestData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     onSubmit(test ? test._id : null, testData);
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
// //       <div className="bg-white p-6 rounded-lg shadow-md w-96">
// //         <h2 className="text-lg font-semibold mb-4">
// //           {test ? "Edit" : "Create"} Test
// //         </h2>
// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-4">
// //             <label className="block mb-2">Test Name</label>
// //             <input
// //               type="text"
// //               name="testName"
// //               value={testData.testName}
// //               onChange={handleInputChange}
// //               className="border rounded-md px-3 py-2 w-full"
// //               required
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label className="block mb-2">Description</label>
// //             <textarea
// //               name="description"
// //               value={testData.description}
// //               onChange={handleInputChange}
// //               className="border rounded-md px-3 py-2 w-full"
// //               required
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label className="block mb-2">Price</label>
// //             <input
// //               type="number"
// //               name="price"
// //               value={testData.price}
// //               onChange={handleInputChange}
// //               className="border rounded-md px-3 py-2 w-full"
// //               required
// //             />
// //           </div>
// //           <div className="flex justify-end">
// //             <button
// //               type="button"
// //               onClick={closeModal}
// //               className="bg-gray-500 text-white px-3 py-2 rounded-md mr-2"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="bg-blue-500 text-white px-3 py-2 rounded-md"
// //             >
// //               {test ? "Update" : "Create"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TestModal;
// //========================================
// import React, { useState, useEffect } from "react";
// import uploadImage from "../../firebase/image";

// const TestModal = ({ closeModal, test, onSubmit }) => {
//   const [testData, setTestData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     image: "",
//   });
//   const [progressStatus, setProgressStatus] = useState(null);

//   useEffect(() => {
//     if (test) {
//       setTestData(test);
//     }
//   }, [test]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTestData((prev) => ({ ...prev, [name]: value }));
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
//         setTestData((prev) => ({
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
//     onSubmit(test ? test._id : testData);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-lg font-semibold mb-4">
//           {test ? "Edit" : "Add"} Test
//         </h2>
//         <form onSubmit={handleSubmit} className="mb-4">
//           <input
//             type="text"
//             name="name"
//             value={testData.name}
//             onChange={handleInputChange}
//             placeholder="Test Name"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="text"
//             name="description"
//             value={testData.description}
//             onChange={handleInputChange}
//             placeholder="Test Description"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="number"
//             name="price"
//             value={testData.price}
//             onChange={handleInputChange}
//             placeholder="Test Price"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <div className="relative w-full h-full mb-2">
//             <input
//               type="file"
//               name="image"
//               onChange={handleImageChange}
//               className="hidden"
//               id="test-file-upload"
//             />
//             <label
//               htmlFor="test-file-upload"
//               className="px-4 py-2 pl-24 relative w-full text-base bg-transparent focus:border-[#DEE1E2] border-gray-400 border rounded-md cursor-pointer flex items-center justify-between"
//             >
//               {testData.imageSrc || "Choose a file"}
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
//               {test ? "Save" : "Add"}
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

// export default TestModal;
//===============================================================
// import React, { useState, useEffect } from "react";
// import uploadImage from "../../firebase/image";

// const TestModal = ({ closeModal, test, onSubmit }) => {
//   const [testData, setTestData] = useState({
//     description: "",
//     price: "",
//     image: "", // This can be removed if not used
//   });
//   const [progressStatus, setProgressStatus] = useState(null);

//   useEffect(() => {
//     if (test) {
//       setTestData(test);
//     }
//   }, [test]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTestData((prev) => ({ ...prev, [name]: value }));
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
//         setTestData((prev) => ({
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

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(test ? { ...testData, id: test._id } : testData);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-lg font-semibold mb-4">
//           {test ? "Edit" : "Add"} Test
//         </h2>
//         <form onSubmit={handleSubmit} className="mb-4">
//           <input
//             type="text"
//             name="description"
//             value={testData.description}
//             onChange={handleInputChange}
//             placeholder="Test Description"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="number"
//             name="price"
//             value={testData.price}
//             onChange={handleInputChange}
//             placeholder="Test Price"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <div className="relative w-full h-full mb-2">
//             <input
//               type="file"
//               name="image"
//               onChange={handleImageChange}
//               className="hidden"
//               id="test-file-upload"
//             />
//             <label
//               htmlFor="test-file-upload"
//               className="px-4 py-2 pl-24 relative w-full text-base bg-transparent focus:border-[#DEE1E2] border-gray-400 border rounded-md cursor-pointer flex items-center justify-between"
//             >
//               {testData.image || "Choose a file"}
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
//               {test ? "Save" : "Add"}
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

// export default TestModal;
//========================================
// TestModal.js
// import React, { useState, useEffect } from "react";

// const TestModal = ({ closeModal, test, onSubmit, categories = [] }) => {
//   const [testData, setTestData] = useState({
//     description: "",
//     price: "",
//     labCategory: "",
//   });

//   useEffect(() => {
//     if (test) {
//       setTestData(test);
//     }
//   }, [test]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTestData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(test ? { ...testData, _id: test._id } : testData);
//     console.log(testData);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-lg font-semibold mb-4">
//           {test ? "Edit" : "Add"} Test
//         </h2>
//         <form onSubmit={handleSubmit} className="mb-4">
//           <input
//             type="text"
//             name="description"
//             value={testData.description}
//             onChange={handleInputChange}
//             placeholder="Test Description"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="number"
//             name="price"
//             value={testData.price}
//             onChange={handleInputChange}
//             placeholder="Test Price"
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           />
//           <select
//             name="labCategory"
//             value={testData.labCategory}
//             onChange={handleInputChange}
//             className="border rounded-md px-3 py-2 mb-2 w-full"
//           >
//             <option value="">Select a category</option>
//             {categories.map((category) => (
//               <option key={category._id} value={category._id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//           <div className="flex justify-end">
//             <button type="submit" className="px-3 py-2 border rounded-md mr-2">
//               {test ? "Save" : "Add"}
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

// export default TestModal;
//=========================================
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLabTestCategories } from "../../store/features/labs/labsSlice";

// const TestModal = ({ test, onSubmit, closeModal }) => {
//   const dispatch = useDispatch();
//   const { labTestCategories, loading, error } = useSelector(
//     (state) => state.labs
//   );

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//     labCategory: "",
//   });

//   useEffect(() => {
//     if (!labTestCategories.length) {
//       dispatch(fetchLabTestCategories());
//     }
//   }, [dispatch, labTestCategories.length]);

//   useEffect(() => {
//     if (test) {
//       setFormData({
//         name: test.name || "",
//         price: test.price || "",
//         description: test.description || "",
//         labCategory: test.labCategory || "",
//       });
//     }
//   }, [test]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2 className="text-lg font-semibold">
//           {test ? "Edit Test" : "Add Test"}
//         </h2>
//         {loading ? (
//           <div>Loading categories...</div>
//         ) : error ? (
//           <div>Error fetching categories: {error.message}</div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block">Price</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 className="border rounded-md px-3 py-2 w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block">Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="border rounded-md px-3 py-2 w-full"
//                 rows="4"
//               />
//             </div>
//             <div>
//               <label className="block">Category</label>
//               <select
//                 name="labCategory"
//                 value={formData.labCategory}
//                 onChange={handleChange}
//                 className="border rounded-md px-3 py-2 w-full"
//                 required
//               >
//                 <option value="">Select a category</option>
//                 {labTestCategories.map((category) => (
//                   <option key={category._id} value={category._id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex justify-end space-x-4">
//               <button
//                 type="button"
//                 onClick={closeModal}
//                 className="px-4 py-2 border rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md"
//               >
//                 {test ? "Update" : "Add"} Test
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TestModal;
//============================================
// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLabTestCategories } from "../../store/features/labs/labsSlice";

// const TestModal = ({ test, onSubmit, closeModal }) => {
//   const dispatch = useDispatch();
//   const { labTestCategories, loading, error } = useSelector(
//     (state) => state.labs
//   );
//   const modalRef = useRef(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//     labCategory: "",
//   });

//   useEffect(() => {
//     if (!labTestCategories.length) {
//       dispatch(fetchLabTestCategories());
//     }
//   }, [dispatch, labTestCategories.length]);

//   useEffect(() => {
//     if (test) {
//       setFormData({
//         name: test.name || "",
//         price: test.price || "",
//         description: test.description || "",
//         labCategory: test.labCategory || "",
//       });
//     }
//   }, [test]);

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === "Escape") {
//         closeModal();
//       }
//     };

//     document.addEventListener("keydown", handleEscape);
//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [closeModal]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   const handleOutsideClick = (e) => {
//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//       closeModal();
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//       onClick={handleOutsideClick}
//       aria-modal="true"
//       role="dialog"
//     >
//       <div ref={modalRef} className="bg-white rounded-lg p-8 max-w-md w-full">
//         <h2 className="text-lg font-semibold mb-4">
//           {test ? "Edit Test" : "Add Test"}
//         </h2>
//         {loading ? (
//           <div>Loading categories...</div>
//         ) : error ? (
//           <div>Error fetching categories: {error.message}</div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="price" className="block mb-1">
//                 Price
//               </label>
//               <input
//                 id="price"
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 className="border rounded-md px-3 py-2 w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="description" className="block mb-1">
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="border rounded-md px-3 py-2 w-full"
//                 rows="4"
//               />
//             </div>
//             <div>
//               <label htmlFor="labCategory" className="block mb-1">
//                 Category
//               </label>
//               <select
//                 id="labCategory"
//                 name="labCategory"
//                 value={formData.labCategory}
//                 onChange={handleChange}
//                 className="border rounded-md px-3 py-2 w-full"
//                 required
//               >
//                 <option value="">Select a category</option>
//                 {labTestCategories.map((category) => (
//                   <option key={category._id} value={category._id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex justify-end space-x-4">
//               <button
//                 type="button"
//                 onClick={closeModal}
//                 className="px-4 py-2 border rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md"
//               >
//                 {test ? "Update" : "Add"} Test
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TestModal;
//===============================================
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";

const TestModal = ({ test, onSubmit, closeModal }) => {
  const dispatch = useDispatch();
  const { labTestCategories, loading, error } = useSelector(
    (state) => state.labs
  );
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    labCategory: "",
  });
  const [categories, setCategories] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/lab-all-test");

        setCategories(response.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        // Handle error if needed
      } finally {
        setFetching(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (test) {
      setFormData({
        price: test.price || "",
        description: test.description || "",
        labCategory: test.labCategory || "",
      });
    }
  }, [test]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
      aria-modal="true"
      role="dialog"
    >
      <div ref={modalRef} className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">
          {test ? "Edit Test" : "Add Test"}
        </h2>
        {fetching ? (
          <div>Loading categories...</div>
        ) : error ? (
          <div>Error fetching categories</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="price" className="block mb-1">
                Price
              </label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
                rows="4"
              />
            </div>
            <div>
              <label htmlFor="labCategory" className="block mb-1">
                Category
              </label>
              <select
                id="labCategory"
                name="labCategory"
                value={formData.labCategory}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                {test ? "Update" : "Add"} Test
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TestModal;
