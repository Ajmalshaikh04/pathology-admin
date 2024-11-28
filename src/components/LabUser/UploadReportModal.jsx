// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   uploadReportAsync,
//   fetchReportByAppointmentIdAsync,
//   updateReportByAppointmentIdAsync,
//   deleteReportByIdAsync,
// } from "../../store/features/labs/labsSlice";

// const UploadReportModal = ({ isOpen, onClose, appointment }) => {
//   const [details, setDetails] = useState("");
//   const [file, setFile] = useState(null);
//   const dispatch = useDispatch();
//   const { report } = useSelector((state) => state.labs);

//   useEffect(() => {
//     if (isOpen && appointment) {
//       dispatch(fetchReportByAppointmentIdAsync(appointment._id));
//     }
//   }, [isOpen, appointment, dispatch]);

//   useEffect(() => {
//     if (report) {
//       console.log("Report Data:", report); // Debugging
//       setDetails(report.details || "");
//       setFile(report.file || null);
//     }
//   }, [report]);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFile(reader.result);
//     };
//     reader.readAsDataURL(selectedFile);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const reportData = {
//       details,
//       file,
//       appointmentId: appointment._id,
//     };

//     if (report && report._id) {
//       await dispatch(
//         updateReportByAppointmentIdAsync({
//           reportId: report._id,
//           reportData,
//         })
//       );
//     } else {
//       await dispatch(uploadReportAsync(reportData));
//     }
//     onClose();
//   };

//   const handleDelete = async () => {
//     if (report && report._id) {
//       await dispatch(deleteReportByIdAsync(report._id));
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-4 rounded shadow-md w-full max-w-lg">
//         <h2 className="text-2xl mb-4">
//           {report ? "Update Report" : "Upload Report"}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-2">Details</label>
//             <textarea
//               className="w-full p-2 border border-gray-300 rounded"
//               value={details}
//               onChange={(e) => setDetails(e.target.value)}
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">File</label>
//             {file && (
//               <div className="mb-4">
//                 <img
//                   src={file}
//                   alt="Report"
//                   className="w-full h-auto border border-gray-300 rounded"
//                 />
//               </div>
//             )}
//             <input
//               type="file"
//               className="w-full p-2 border border-gray-300 rounded"
//               onChange={handleFileChange}
//             />
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-2 rounded"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             {report && report._id && (
//               <button
//                 type="button"
//                 className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded"
//                 onClick={handleDelete}
//               >
//                 Delete
//               </button>
//             )}
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
//             >
//               {report ? "Update" : "Upload"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadReportModal;
//====================================================
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadReportAsync,
  fetchReportByAppointmentIdAsync,
  updateReportByAppointmentIdAsync,
  deleteReportByIdAsync,
} from "../../store/features/labs/labsSlice";

const UploadReportModal = ({ isOpen, onClose, appointment }) => {
  const [details, setDetails] = useState("");
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(""); // Added state for file type
  const dispatch = useDispatch();
  const { report } = useSelector((state) => state.labs);

  useEffect(() => {
    if (isOpen && appointment) {
      dispatch(fetchReportByAppointmentIdAsync(appointment._id));
    }
  }, [isOpen, appointment, dispatch]);

  useEffect(() => {
    if (report) {
      setDetails(report.details || "");
      setFile(report.file || null);
      // Determine file type based on file URL or data
      if (report.file) {
        const type = report.file.split(";")[0].split(":")[1];
        setFileType(type);
      }
    }
  }, [report]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
      setFileType(selectedFile.type); // Set file type based on selected file
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reportData = {
      details,
      file,
      appointmentId: appointment._id,
    };

    if (report && report._id) {
      // Update existing report
      await dispatch(
        updateReportByAppointmentIdAsync({
          reportId: report._id,
          reportData,
        })
      );
    } else {
      // Create new report
      await dispatch(uploadReportAsync(reportData));
    }
    onClose();
  };

  const handleDelete = async () => {
    if (report && report._id) {
      await dispatch(deleteReportByIdAsync(report._id));
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl mb-4">
          {report ? "Update Report" : "Upload Report"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Details</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">File</label>
            {file && fileType && (
              <div className="mb-4">
                {fileType.startsWith("image/") ? (
                  <img
                    src={file}
                    alt="Report"
                    className="w-full h-auto border border-gray-300 rounded"
                  />
                ) : fileType === "application/pdf" ? (
                  <iframe
                    src={file}
                    className="w-full h-64 border border-gray-300 rounded"
                    title="PDF Preview"
                  />
                ) : (
                  <p>Unsupported file type</p>
                )}
              </div>
            )}
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            {report && report._id && (
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
            >
              {report ? "Update" : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadReportModal;
