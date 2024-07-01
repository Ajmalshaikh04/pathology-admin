// import { useState } from "react";
// import { AiOutlineUser, AiOutlineFileDone } from "react-icons/ai";
// import { FaRegCalendarCheck } from "react-icons/fa";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
// import { RiCustomerService2Fill } from "react-icons/ri";
// import { TbLayoutDashboard } from "react-icons/tb";
// import { Link, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   const linkClass = (path) => {
//     return `flex items-center  rounded-lg ${
//       collapsed ? "px-1 py-2 justify-center" : "px-3 py-2 gap-3"
//     } ${
//       isActive(path)
//         ? "bg-gray-900 text-white"
//         : "text-muted-foreground hover:text-primary hover:bg-gray-100"
//     }`;
//   };

//   return (
//     <div
//       className={`flex flex-col h-full border-r bg-muted/40 ${
//         collapsed ? "w-16" : "w-64"
//       } transition-width duration-300`}
//     >
//       <div className="flex h-16 items-center border-b px-6">
//         <Link to="/" className="flex items-center gap-2 font-semibold">
//           <TbLayoutDashboard className="h-6 w-6" />
//           {!collapsed && <span>Admin</span>}
//         </Link>
//         <div className="relative">
//           <div
//             className={`absolute -top-3  ${
//               collapsed ? `left-8` : `left-16`
//             } ml-auto flex gap-2`}
//           >
//             {!collapsed && (
//               <button
//                 className="px-2 py-1 border rounded-md hover:bg-gray-900 hover:text-white"
//                 onClick={() => setCollapsed(true)}
//               >
//                 <FaAngleLeft />
//               </button>
//             )}
//             {collapsed && (
//               <button
//                 className="px-2 py-1 border rounded-md hover:bg-gray-900 hover:text-white"
//                 onClick={() => setCollapsed(false)}
//               >
//                 <FaAngleRight />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       <nav className="flex-1 overflow-auto p-4 space-y-2">
//         <Link to="/labs" className={linkClass("/labs")}>
//           <AiOutlineFileDone className="h-4 w-4" />
//           {!collapsed && "Labs"}
//         </Link>
//         <Link to="/users" className={linkClass("/users")}>
//           <AiOutlineUser className="h-4 w-4" />
//           {!collapsed && "Users"}
//         </Link>
//         <Link to="/councilor" className={linkClass("/councilor")}>
//           <RiCustomerService2Fill className="h-4 w-4" />
//           {!collapsed && "Councilor"}
//         </Link>
//         <Link to="/bookings" className={linkClass("/bookings")}>
//           <FaRegCalendarCheck className="h-4 w-4" />
//           {!collapsed && "Bookings"}
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
//================================================
import { useState } from "react";
import { AiOutlineUser, AiOutlineFileDone } from "react-icons/ai";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { RiCustomerService2Fill } from "react-icons/ri";
import { TbLayoutDashboard } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { role } = useSelector((state) => state.user);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const linkClass = (path) => {
    return `flex items-center rounded-lg ${
      collapsed ? "px-1 py-2 justify-center" : "px-3 py-2 gap-3"
    } ${
      isActive(path)
        ? "bg-gray-900 text-white"
        : "text-muted-foreground hover:text-primary hover:bg-gray-100"
    }`;
  };

  return (
    <div
      className={`flex flex-col h-full border-r bg-muted/40 ${
        collapsed ? "w-16" : "w-64"
      } transition-width duration-300`}
    >
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <TbLayoutDashboard className="h-6 w-6" />
          {!collapsed && <span>Admin</span>}
        </Link>
        <div className="relative">
          <div
            className={`absolute -top-3  ${
              collapsed ? `left-8` : `left-16`
            } ml-auto flex gap-2`}
          >
            {!collapsed && (
              <button
                className="px-2 py-1 border rounded-md hover:bg-gray-900 hover:text-white"
                onClick={() => setCollapsed(true)}
              >
                <FaAngleLeft />
              </button>
            )}
            {collapsed && (
              <button
                className="px-2 py-1 border rounded-md hover:bg-gray-900 hover:text-white"
                onClick={() => setCollapsed(false)}
              >
                <FaAngleRight />
              </button>
            )}
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-auto p-4 space-y-2">
        {role === "admin" || role === "superAdmin" ? (
          <>
            <Link to="/labs" className={linkClass("/labs")}>
              <AiOutlineFileDone className="h-4 w-4" />
              {!collapsed && "Labs"}
            </Link>
            <Link to="/users" className={linkClass("/users")}>
              <AiOutlineUser className="h-4 w-4" />
              {!collapsed && "Users"}
            </Link>
            <Link to="/councilor" className={linkClass("/councilor")}>
              <RiCustomerService2Fill className="h-4 w-4" />
              {!collapsed && "Councilor"}
            </Link>
            <Link to="/bookings" className={linkClass("/bookings")}>
              <FaRegCalendarCheck className="h-4 w-4" />
              {!collapsed && "Bookings"}
            </Link>
          </>
        ) : (
          <Link to="/unauthorized" className={linkClass("/unauthorized")}>
            <span className="flex items-center">
              <AiOutlineUser className="h-4 w-4" />
              {!collapsed && "Unauthorized"}
            </span>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
