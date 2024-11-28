import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Users from "./components/Users";
import Register from "./components/Register";
import Councilor from "./components/Councilor/Councilor";
import Bookings from "./components/Bookings/Bookings";
import BookingsView from "./components/Bookings/BookingView";
import Unauthorized from "./components/UnAuthorized";
import { useSelector } from "react-redux";
import Franchise from "./components/Franchise";
import AgentsBookings from "./components/AgentsBookings";
import CouncilorUsers from "./components/CouncilorUsers";
import CouncilorUserBooking from "./components/CouncilorUserBooking";
import LabTable from "./components/DiagnosticLab/LabTable";
import Agents from "./components/Agents";
import AgentAllBooking from "./components/AgentBookings/AgentAllBooking";
import ListAllAgents from "./components/Agents/ListAllAgents";
import LabAppointments from "./components/LabUser/LabUser";
import ReferralBookings from "./components/Agents/ReferralBookings";
import LabCategoriesManager from "./components/LabTests";
import HandleCommission from "./components/handleCommission/HandleCommission";
import CouncilorAssignedUser from "./components/Councilor/CouncilorAssignedUser";
import UserAppointments from "./components/Councilor/UserAppointments";
import LabBoy from "./components/LabBoy/LabBoy";
import LabBoyAppointments from "./components/LabBoy/labBoyAppointments";
import LabsLabBoy from "./components/DiagnosticLab/labBoy";
import HealthProblem from "./components/HealthProblem";
import BookingsDetails from "./components/Bookings/BookingsDetails";

const AppRouter = () => {
  const { isAuthenticated, role } = useSelector((state) => state.user);
  console.log(isAuthenticated, role);

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : role === "admin" || role === "superAdmin" ? (
          <>
            <Route path="/" element={<App />}>
              <Route path="labs" element={<LabTable />} />
              <Route path="labs-tests" element={<LabCategoriesManager />} />
              <Route path="labs-boy" element={<LabBoy />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/view" element={<BookingsView />} />
              <Route path="/bookings-details" element={<BookingsDetails />} />
              <Route path="users" element={<Users />} />
              <Route path="councilor" element={<Councilor />} />
              <Route path="health-problem" element={<HealthProblem />} />
              <Route
                path="councilor/user-list/:councilorId"
                element={<CouncilorAssignedUser />}
              />
              <Route
                path="councilor/user-appointments/:userId"
                element={<UserAppointments />}
              />
              <Route path="franchise" element={<Franchise />} />
              <Route path="agents" element={<ListAllAgents />} />
              <Route path="handle-commission" element={<HandleCommission />} />
              <Route
                path="/appointments/:agentId"
                element={<AgentAllBooking />}
              />
              <Route
                path="councilor-user-booking/:userId"
                element={<CouncilorUserBooking />}
              />
            </Route>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : role === "franchise" ? (
          <>
            <Route path="/" element={<App />}>
              <Route path="agents" element={<AgentsBookings />} />
              {/* <Route path="bookings" element={<Bookings />} /> */}
              <Route path="bookings/view" element={<BookingsView />} />
              <Route
                path="my-referral-bookings"
                element={<AgentAllBooking />}
              />
              <Route path="/bookings-details" element={<BookingsDetails />} />
            </Route>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : role === "councilor" ? (
          <>
            <Route path="/" element={<App />}>
              <Route path="councilor-users" element={<CouncilorUsers />} />
              <Route
                path="councilor-user-booking/:userId"
                element={<CouncilorUserBooking />}
              />
              <Route
                path="councilor/user-appointments/:userId"
                element={<UserAppointments />}
              />
              <Route path="/bookings-details" element={<BookingsDetails />} />
            </Route>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : role === "lab" ? (
          <>
            <Route path="/" element={<App />}>
              <Route path="lab" element={<LabAppointments />} />
              <Route path="bookings/view" element={<BookingsView />} />
              <Route path="labs-boy" element={<LabsLabBoy />} />
              <Route path="/bookings-details" element={<BookingsDetails />} />
            </Route>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : role === "agent" ? (
          <>
            <Route path="/" element={<App />}>
              <Route
                path="my-referral-bookings"
                element={<AgentAllBooking />}
              />
              <Route path="bookings/view" element={<BookingsView />} />
              <Route path="/bookings-details" element={<BookingsDetails />} />
            </Route>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : role === "labBoy" ? (
          <>
            <Route path="/" element={<App />}>
              <Route path="lab-bookings" element={<LabBoyAppointments />} />
              <Route path="bookings/view" element={<BookingsView />} />
              <Route path="/bookings-details" element={<BookingsDetails />} />
            </Route>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Navigate to="/unauthorized" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
