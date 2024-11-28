import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";

const LabsLabBoy = () => {
  const { user, token } = useSelector((state) => state.user); // Adjust state path if necessary
  const [labBoys, setLabBoys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabBoys = async () => {
      if (!user) return; // Ensure user is present

      try {
        const response = await axiosInstance.get(
          `/get-lab-boy-by-lab-id/${user}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setLabBoys(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLabBoys();
  }, [user, token]); // Dependencies updated to include user and token

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-xl font-semibold mb-6">List of LabBoy</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Login
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Logout
            </th>
          </tr>
        </thead>
        <tbody>
          {labBoys.map((labBoy) => (
            <tr key={labBoy._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {labBoy.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {labBoy.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {labBoy.contactNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {labBoy.role}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(labBoy.lastLogin).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(labBoy.lastLogout).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LabsLabBoy;
