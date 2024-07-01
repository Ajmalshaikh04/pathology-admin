import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Users from "./components/Users";
import Register from "./components/Register";
import DiagnosticLabTable from "./components/Labs";
import Councilor from "./components/Councilor";
import Bookings from "./components/Bookings";
import Unauthorized from "./components/UnAuthorized";
import ProtectedRoute from "./utils/ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<App />}>
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "superAdmin"]} />}
          >
            <Route path="labs" element={<DiagnosticLabTable />} />
            <Route path="bookings" element={<Bookings />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["superAdmin"]} />}>
            <Route path="labs" element={<DiagnosticLabTable />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="users" element={<Users />} />
            <Route path="councilor" element={<Councilor />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
