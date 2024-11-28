import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAssignedUsersByCounselorIdAsync } from "../store/features/auth/userSlice";
import { Link, useNavigate } from "react-router-dom";

const CouncilorUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { councilorUsers, loading, error, user, pagination } = useSelector(
    (state) => state.user
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default limit

  useEffect(() => {
    dispatch(
      getAllAssignedUsersByCounselorIdAsync({
        counselorId: user,
        page: currentPage,
        limit,
      })
    );
  }, [dispatch, user, currentPage, limit]);

  const handleRowClick = (userId) => {
    navigate(`/councilor-user-booking/${userId}`);
  };
  const handleViewClick = (userId) => {
    navigate(`/councilor/user-appointments/${userId}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on limit change
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-10 px-10">
      <h3 className="text-lg font-bold">List of Assigned Users</h3>

      <div className="mb-4 flex justify-between items-center">
        <div>
          <label className="mr-2">Show</label>
          <select
            className="border rounded-md px-3 py-2"
            value={limit}
            onChange={handleLimitChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
          <label className="ml-2">per page</label>
        </div>
      </div>

      <table className="min-w-full mt-4">
        <thead className="bg-blue-50">
          <tr className="text-left border-b">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Mobile</th>
            <th className="py-2 px-4">Appointment</th>
          </tr>
        </thead>
        <tbody>
          {councilorUsers?.length > 0 ? (
            councilorUsers?.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-100 cursor-pointer"
              >
                <td
                  className="py-3 px-4"
                  onClick={() => handleRowClick(user._id)}
                >
                  {user?.name}
                </td>
                <td
                  className="py-3 px-4"
                  onClick={() => handleRowClick(user._id)}
                >
                  {user?.email}
                </td>
                <td
                  className="py-3 px-4"
                  onClick={() => handleRowClick(user._id)}
                >
                  {user?.mobile}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleViewClick(user._id)}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-3 px-4 text-center">
                No assigned users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-3 py-2 border rounded-md"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {pagination?.totalPages || 1}
        </span>
        <button
          className="px-3 py-2 border rounded-md"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination?.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CouncilorUsers;
