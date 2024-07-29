// ViewToggle.js
import React from "react";
import { LuGrid, LuList } from "react-icons/lu";

const ViewToggle = ({ isGridView, setIsGridView }) => (
  <div className="flex justify-end mt-4 gap-2">
    <button
      className={`px-2 py-1 rounded text-sm flex items-center justify-center ${
        isGridView ? "bg-gray-200" : "bg-blue-500 text-white"
      }`}
      onClick={() => setIsGridView(false)}
    >
      <LuList className="mr-2" /> List
    </button>
    <button
      className={`px-2 py-1 rounded text-sm flex items-center justify-center ${
        isGridView ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
      onClick={() => setIsGridView(true)}
    >
      <LuGrid className="mr-2" />
      Grid
    </button>
  </div>
);

export default ViewToggle;
