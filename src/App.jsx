import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import Header from "./components/Header";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <div className="flex  h-screen">
        {isAuthenticated ? <Sidebar /> : null}
        <div className="w-full">
          {isAuthenticated ? <Header /> : null}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
