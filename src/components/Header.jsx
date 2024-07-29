import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutAdminAsync } from "../store/features/auth/userSlice";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleLogout = () => {
    dispatch(signOutAdminAsync());
    toast.success("LogOut Successful");
    navigate("/login");
  };
  return (
    <div className="h-16 border-b flex items-center px-10 bg-blue-50">
      {isAuthenticated && location.pathname !== "/login" && (
        <button
          className="flex items-center justify-center border px-6 py-2 rounded-xl text-sm  hover:bg-blue-600 hover:text-white ml-auto"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-2" /> Log Out
        </button>
      )}
    </div>
  );
};

export default Header;
//=================================
