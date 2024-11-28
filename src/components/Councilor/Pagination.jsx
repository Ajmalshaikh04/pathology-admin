// Pagination.js
import React from "react";
import {
  FaAnglesLeft,
  FaAnglesRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa6";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        onClick={() => handlePageChange(1)}
        className="px-2 py-1 bg-gray-200 rounded-md"
        disabled={currentPage === 1}
      >
        <FaAnglesLeft />
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-2 py-1 bg-gray-200 rounded-md"
        disabled={currentPage === 1}
      >
        <FaAngleLeft />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`px-2 py-1 rounded-md ${
            currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-2 py-1 bg-gray-200 rounded-md"
        disabled={currentPage === totalPages}
      >
        <FaAngleRight />
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        className="px-2 py-1 bg-gray-200 rounded-md"
        disabled={currentPage === totalPages}
      >
        <FaAnglesRight />
      </button>
    </div>
  );
};

export default Pagination;
