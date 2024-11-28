// const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <ul className="flex justify-center">
//         {pageNumbers.map((number) => (
//           <li key={number} className="mx-1">
//             <button
//               onClick={() => paginate(number)}
//               className={`px-3 py-1 rounded-md ${
//                 currentPage === number
//                   ? "bg-blue-500 text-white"
//                   : "bg-white text-blue-500"
//               }`}
//             >
//               {number}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;
//===========================================
// import React from "react";
// import {
//   FaAngleLeft,
//   FaAngleRight,
//   FaAnglesLeft,
//   FaAnglesRight,
// } from "react-icons/fa6";

// const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="mt-4 flex justify-between items-center">
//       <p className="text-sm text-gray-600">{totalItems} row(s) selected.</p>
//       <div className="flex items-center space-x-2">
//         <span className="text-sm text-gray-600">Rows per page</span>
//         <select className="border rounded-md px-2 py-1">
//           <option>{itemsPerPage}</option>
//           <option>25</option>
//           <option>50</option>
//         </select>
//         <div className="flex justify-end space-x-1 text-gray-500">
//           <button
//             className="px-2 py-1 border rounded-md"
//             onClick={() => paginate(1)}
//             disabled={currentPage === 1}
//           >
//             <FaAnglesLeft />
//           </button>
//           <button
//             className="px-2 py-1 border rounded-md"
//             onClick={() => paginate(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             <FaAngleLeft />
//           </button>
//           {pageNumbers.map((number) => (
//             <button
//               key={number}
//               onClick={() => paginate(number)}
//               className={`px-2 py-1 border rounded-md ${
//                 currentPage === number ? "bg-blue-500 text-white" : ""
//               }`}
//             >
//               {number}
//             </button>
//           ))}
//           <button
//             className="px-2 py-1 border rounded-md"
//             onClick={() => paginate(currentPage + 1)}
//             disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
//           >
//             <FaAngleRight />
//           </button>
//           <button
//             className="px-2 py-1 border rounded-md"
//             onClick={() => paginate(Math.ceil(totalItems / itemsPerPage))}
//             disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
//           >
//             <FaAnglesRight />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
//====================================================
import React from "react";

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex justify-between items-center mt-4">
      <span>
        Showing {startItem} to {endItem} of {totalItems} items
      </span>
      <div className="flex items-center">
        <span className="mr-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border rounded-md mr-2"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
