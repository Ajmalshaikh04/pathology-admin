// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import { TbLayoutDashboard } from "react-icons/tb";
// import {
//   AiOutlineUser,
//   AiOutlineFileDone,
//   AiOutlineLogout,
// } from "react-icons/ai";
// import { FaRegCalendarCheck } from "react-icons/fa";
// import { RiCustomerService2Fill } from "react-icons/ri";
// import { LuHeartHandshake } from "react-icons/lu";

// const Sidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();
//   const { isAuthenticated, role } = useSelector((state) => state.user);

//   const isActive = (path) => location.pathname === path;

//   const sidebarLinks = [
//     {
//       title: "CRM",
//       items: [
//         {
//           to: "/bookings",
//           icon: FaRegCalendarCheck,
//           text: "Bookings",
//           roles: ["admin", "superAdmin"],
//         },
//         {
//           to: "/users",
//           icon: AiOutlineUser,
//           text: "Users",
//           roles: ["admin", "superAdmin"],
//         },
//       ],
//     },
//     {
//       title: "ERP",
//       items: [
//         {
//           to: "/councilor",
//           icon: RiCustomerService2Fill,
//           text: "Counselor",
//           roles: ["superAdmin"],
//         },
//         {
//           to: "/labs",
//           icon: AiOutlineFileDone,
//           text: "Labs",
//           roles: ["admin", "superAdmin"],
//         },
//       ],
//     },

//     {
//       title: "Masters",
//       items: [
//         {
//           to: "/franchise",
//           icon: LuHeartHandshake,
//           text: "Franchise",
//           roles: ["admin", "superAdmin"],
//         },
//       ],
//     },
//   ];

//   const filteredLinks = sidebarLinks.map((section) => ({
//     ...section,
//     items: section.items.filter((link) => link.roles.includes(role)),
//   }));

//   const linkClass = (path) =>
//     `flex items-center rounded-lg ${
//       collapsed ? "px-1 py-2 justify-center" : "px-3 py-2 gap-3"
//     } ${
//       isActive(path)
//         ? "bg-blue-600 text-white"
//         : "text-gray-700 hover:text-white hover:bg-blue-500"
//     }`;

//   if (!isAuthenticated) {
//     return null; // Hide sidebar if not authenticated
//   }

//   return (
//     <div
//       className={`flex flex-col h-full border-r bg-blue-50 ${
//         collapsed ? "w-16" : "w-64"
//       } transition-width duration-300`}
//     >
//       <div className="flex h-16 items-center border-b px-6 bg-blue-600 text-white">
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
//             {!collapsed ? (
//               <button
//                 className="px-2 py-1 border rounded-md bg-white text-black"
//                 onClick={() => setCollapsed(true)}
//               >
//                 <FaAngleLeft />
//               </button>
//             ) : (
//               <button
//                 className="px-2 py-1 border rounded-md bg-white text-black"
//                 onClick={() => setCollapsed(false)}
//               >
//                 <FaAngleRight />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       <nav className="flex-1 overflow-auto p-4 space-y-4">
//         {filteredLinks.map((section, index) => (
//           <div key={index}>
//             {!collapsed && (
//               <h3 className="text-sm font-semibold text-gray-500 mb-2">
//                 {section.title}
//               </h3>
//             )}
//             <div className="space-y-1">
//               {section.items.map((item, itemIndex) => (
//                 <Link
//                   key={itemIndex}
//                   to={item.to}
//                   className={linkClass(item.to)}
//                 >
//                   <item.icon className="h-4 w-4" />
//                   {!collapsed && item.text}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
//======================================
// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import { TbLayoutDashboard } from "react-icons/tb";
// import {
//   AiOutlineUser,
//   AiOutlineFileDone,
//   AiOutlineLogout,
// } from "react-icons/ai";
// import { FaRegCalendarCheck } from "react-icons/fa";
// import { RiCustomerService2Fill } from "react-icons/ri";
// import { LuHeartHandshake } from "react-icons/lu";

// const Sidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();
//   const { isAuthenticated, role } = useSelector((state) => state.user);

//   const isActive = (path) => location.pathname === path;

//   const sidebarLinks = [
//     {
//       title: "CRM",
//       items: [
//         {
//           to: "/bookings",
//           icon: FaRegCalendarCheck,
//           text: "Bookings",
//           roles: ["admin", "superAdmin", "franchise"],
//         },
//         {
//           to: "/users",
//           icon: AiOutlineUser,
//           text: "Users",
//           roles: ["admin", "superAdmin"],
//         },
//       ],
//     },
//     {
//       title: "ERP",
//       items: [
//         {
//           to: "/councilor",
//           icon: RiCustomerService2Fill,
//           text: "Counselor",
//           roles: ["superAdmin"],
//         },
//         {
//           to: "/labs",
//           icon: AiOutlineFileDone,
//           text: "Labs",
//           roles: ["admin", "superAdmin"],
//         },
//       ],
//     },
//     {
//       title: "Masters",
//       items: [
//         {
//           to: "/franchise",
//           icon: LuHeartHandshake,
//           text: "Franchise",
//           roles: ["admin", "superAdmin"],
//         },
//       ],
//     },
//   ];

//   const filteredLinks = sidebarLinks.map((section) => ({
//     ...section,
//     items: section.items.filter((link) => link.roles.includes(role)),
//   }));

//   const linkClass = (path) =>
//     `flex items-center rounded-lg ${
//       collapsed ? "px-1 py-2 justify-center" : "px-3 py-2 gap-3"
//     } ${
//       isActive(path)
//         ? "bg-blue-600 text-white"
//         : "text-gray-700 hover:text-white hover:bg-blue-500"
//     }`;

//   if (!isAuthenticated) {
//     return null; // Hide sidebar if not authenticated
//   }

//   return (
//     <div
//       className={`flex flex-col h-full border-r bg-blue-50 ${
//         collapsed ? "w-16" : "w-64"
//       } transition-width duration-300`}
//     >
//       <div className="flex h-16 items-center border-b px-6 bg-blue-600 text-white">
//         <Link to="/" className="flex items-center gap-2 font-semibold">
//           <TbLayoutDashboard className="h-6 w-6" />
//           {!collapsed && (
//             <span>{role === "franchise" ? "Franchise" : "Admin"}</span>
//           )}
//         </Link>
//         <div className="relative">
//           <div
//             className={`absolute -top-3  ${
//               collapsed ? `left-8` : `left-14`
//             } ml-auto flex gap-2`}
//           >
//             {!collapsed ? (
//               <button
//                 className="px-2 py-1 border rounded-md bg-white text-black"
//                 onClick={() => setCollapsed(true)}
//               >
//                 <FaAngleLeft />
//               </button>
//             ) : (
//               <button
//                 className="px-2 py-1 border rounded-md bg-white text-black"
//                 onClick={() => setCollapsed(false)}
//               >
//                 <FaAngleRight />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       <nav className="flex-1 overflow-auto p-4 space-y-4">
//         {filteredLinks.map((section, index) => (
//           <div key={index}>
//             {!collapsed && section.items.length > 0 && (
//               <h3 className="text-sm font-semibold text-gray-500 mb-2">
//                 {section.title}
//               </h3>
//             )}
//             <div className="space-y-1">
//               {section.items.map((item, itemIndex) => (
//                 <Link
//                   key={itemIndex}
//                   to={item.to}
//                   className={linkClass(item.to)}
//                 >
//                   <item.icon className="h-4 w-4" />
//                   {!collapsed && item.text}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
//===========================================
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { TbLayoutDashboard } from "react-icons/tb";
import {
  AiOutlineUser,
  AiOutlineFileDone,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaRegCalendarCheck } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { LuHeartHandshake } from "react-icons/lu";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { isAuthenticated, role } = useSelector((state) => state.user);

  const isActive = (path) => location.pathname === path;

  const sidebarLinks = [
    {
      title: "CRM",
      items: [
        {
          to: "/bookings",
          icon: FaRegCalendarCheck,
          text: "Bookings",
          roles: ["superAdmin"],
        },
        {
          to: "/users",
          icon: AiOutlineUser,
          text: "Users",
          roles: ["superAdmin"],
        },
        {
          to: "/councilor-users",
          icon: AiOutlineUser,
          text: "Users",
          roles: ["councilor"],
        },
        {
          to: "/lab",
          icon: AiOutlineUser,
          text: "Appointment",
          roles: ["lab"],
        },
        {
          to: "/my-referral-bookings",
          icon: AiOutlineUser,
          text: "Bookings",
          roles: ["agent"],
        },
      ],
    },
    {
      title: "ERP",
      items: [
        {
          to: "/councilor",
          icon: RiCustomerService2Fill,
          text: "Counselor",
          roles: ["superAdmin"],
        },
        {
          to: "/labs",
          icon: AiOutlineFileDone,
          text: "Labs",
          roles: ["superAdmin"],
        },
        {
          to: "/labs-tests",
          icon: AiOutlineFileDone,
          text: "Lab Test Categories",
          roles: ["superAdmin"],
        },
        {
          to: "/labs-boy",
          icon: AiOutlineFileDone,
          text: "Lab Boy",
          roles: ["superAdmin", "lab"],
        },
        {
          to: "/health-problem",
          icon: AiOutlineFileDone,
          text: "Health Problem",
          roles: ["superAdmin"],
        },
        {
          to: "/lab-bookings",
          icon: AiOutlineFileDone,
          text: "Lab Bookings",
          roles: ["labBoy"],
        },
      ],
    },
    {
      title: "Masters",
      items: [
        {
          to: "/franchise",
          icon: LuHeartHandshake,
          text: "Franchise",
          roles: ["superAdmin"],
        },
        {
          to: "/agents",
          icon: AiOutlineUser,
          text: "Agents",
          roles: ["franchise", "superAdmin"],
        },
        // {
        //   to: "/handle-commission",
        //   icon: AiOutlineUser,
        //   text: "Handle Commission",
        //   roles: ["superAdmin"],
        // },
      ],
    },
  ];

  const filteredLinks = sidebarLinks
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => item.roles.includes(role)),
    }))
    .filter((section) => section.items.length > 0);

  const linkClass = (path) =>
    `flex items-center rounded-lg ${
      collapsed ? "px-1 py-2 justify-center" : "px-3 py-2 gap-3"
    } ${
      isActive(path)
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:text-white hover:bg-blue-500"
    }`;

  if (!isAuthenticated) {
    return null; // Hide sidebar if not authenticated
  }

  return (
    <div
      className={`flex flex-col max-h-screen border-r bg-blue-50 ${
        collapsed ? "w-16" : "w-64"
      } transition-width duration-300`}
    >
      <div className="flex h-16 items-center border-b px-6 bg-blue-600 text-white">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <TbLayoutDashboard className="h-6 w-6" />
          {!collapsed && (
            <span>
              {role === "franchise"
                ? "Franchise"
                : role === "admin"
                ? "Admin"
                : role === "superAdmin"
                ? "S-Admin"
                : role === "councilor"
                ? "Councilor"
                : role === "lab"
                ? "Lab"
                : role === "agent"
                ? "Agent"
                : role === "labBoy"
                ? "Lab Boy"
                : "Unknown Role"}
            </span>
          )}
        </Link>
        <div className="relative">
          <div
            className={`absolute -top-3  ${
              collapsed ? `left-8` : `left-10`
            } ml-auto flex gap-2`}
          >
            {!collapsed ? (
              <button
                className="px-2 py-1 border rounded-md bg-white text-black"
                onClick={() => setCollapsed(true)}
              >
                <FaAngleLeft />
              </button>
            ) : (
              <button
                className="px-2 py-1 border rounded-md bg-white text-black"
                onClick={() => setCollapsed(false)}
              >
                <FaAngleRight />
              </button>
            )}
          </div>
        </div>
      </div>
      <nav className="flex flex-col p-4 space-y-4">
        {filteredLinks.map((section, index) => (
          <div key={index}>
            {!collapsed && section.items.length > 0 && (
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  to={item.to}
                  className={linkClass(item.to)}
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && item.text}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
