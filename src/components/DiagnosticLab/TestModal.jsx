// import React, { useState, useEffect } from "react";

// const TestModal = ({ closeModal, test, onSubmit }) => {
//   const [testData, setTestData] = useState({
//     testName: "",
//     description: "",
//     price: "",
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
//     onSubmit(test ? test._id : null, testData);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-lg font-semibold mb-4">
//           {test ? "Edit" : "Create"} Test
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-2">Test Name</label>
//             <input
//               type="text"
//               name="testName"
//               value={testData.testName}
//               onChange={handleInputChange}
//               className="border rounded-md px-3 py-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Description</label>
//             <textarea
//               name="description"
//               value={testData.description}
//               onChange={handleInputChange}
//               className="border rounded-md px-3 py-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Price</label>
//             <input
//               type="number"
//               name="price"
//               value={testData.price}
//               onChange={handleInputChange}
//               className="border rounded-md px-3 py-2 w-full"
//               required
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={closeModal}
//               className="bg-gray-500 text-white px-3 py-2 rounded-md mr-2"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-3 py-2 rounded-md"
//             >
//               {test ? "Update" : "Create"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TestModal;
//========================================
import React, { useState, useEffect } from "react";
import uploadImage from "../../firebase/image";

const TestModal = ({ closeModal, test, onSubmit }) => {
  const [testData, setTestData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [progressStatus, setProgressStatus] = useState(null);

  useEffect(() => {
    if (test) {
      setTestData(test);
    }
  }, [test]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestData((prev) => ({ ...prev, [name]: value }));
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
        setTestData((prev) => ({
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
    onSubmit(test ? test._id : null, testData);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">
          {test ? "Edit" : "Add"} Test
        </h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            name="name"
            value={testData.name}
            onChange={handleInputChange}
            placeholder="Test Name"
            className="border rounded-md px-3 py-2 mb-2 w-full"
          />
          <input
            type="text"
            name="description"
            value={testData.description}
            onChange={handleInputChange}
            placeholder="Test Description"
            className="border rounded-md px-3 py-2 mb-2 w-full"
          />
          <input
            type="number"
            name="price"
            value={testData.price}
            onChange={handleInputChange}
            placeholder="Test Price"
            className="border rounded-md px-3 py-2 mb-2 w-full"
          />
          <div className="relative w-full h-full mb-2">
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="hidden"
              id="test-file-upload"
            />
            <label
              htmlFor="test-file-upload"
              className="px-4 py-2 pl-24 relative w-full text-base bg-transparent focus:border-[#DEE1E2] border-gray-400 border rounded-md cursor-pointer flex items-center justify-between"
            >
              {testData.imageSrc || "Choose a file"}
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
              {test ? "Save" : "Add"}
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

export default TestModal;
