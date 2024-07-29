import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAssignedUsersByCounselorIdAsync } from "../store/features/auth/userSlice";
import { useNavigate } from "react-router-dom";

const CouncilorUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { councilorUsers, loading, error, user } = useSelector(
    (state) => state.user
  );
  console.log("ID", user);
  console.log("councilorUsers", councilorUsers);
  useEffect(() => {
    dispatch(getAllAssignedUsersByCounselorIdAsync({ counselorId: user }));
  }, [dispatch]);

  const handleRowClick = (userId) => {
    navigate(`/councilor-user-booking/${userId}`);
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

      <table className="min-w-full mt-4">
        <thead className="bg-blue-50">
          <tr className="text-left border-b">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Mobile</th>
          </tr>
        </thead>
        <tbody>
          {councilorUsers?.length > 0 ? (
            councilorUsers?.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(user._id)}
              >
                <td className="py-3 px-4">{user?.name}</td>
                <td className="py-3 px-4">{user?.email}</td>
                <td className="py-3 px-4">{user?.mobile}</td>
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
    </div>
  );
};

export default CouncilorUsers;
//===========================================
