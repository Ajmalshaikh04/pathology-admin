import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Users from "./components/Users";
import Register from "./components/Register";
import Councilor from "./components/Councilor";
import Bookings from "./components/Bookings/Bookings";
import BookingsView from "./components/Bookings/BookingView";
import Unauthorized from "./components/UnAuthorized";
import { useSelector } from "react-redux";
import Franchise from "./components/Franchise";
import AgentsBookings from "./components/AgentsBookings";
import CouncilorUsers from "./components/CouncilorUsers";
import CouncilorUserBooking from "./components/CouncilorUserBooking";
import LabTable from "./components/DiagnosticLab/LabTable";

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
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/view" element={<BookingsView />} />
              <Route path="users" element={<Users />} />
              <Route path="councilor" element={<Councilor />} />
              <Route path="franchise" element={<Franchise />} />
            </Route>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : role === "franchise" ? (
          <>
            <Route path="/" element={<App />}>
              <Route path="agents" element={<AgentsBookings />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/view" element={<BookingsView />} />
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
