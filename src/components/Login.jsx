import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signInAdminAsync } from "../store/features/auth/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!formData.email || !formData.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const resultAction = await dispatch(signInAdminAsync(formData));
      const res = resultAction.payload;
      console.log("login res", res);
      if (res?.success) {
        toast.success("Login successful!");
        navigate("/labs");
      } else {
        const message = res.message || "Login failed. Please try again.";
        setErrorMessage(message);
        toast.error(message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      const message = error?.res?.message || "Login failed. Please try again.";
      setErrorMessage(message);
      toast.error(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-300">
      <div className="rounded-lg border text-card-foreground w-full max-w-4xl bg-background shadow-xl flex overflow-hidden">
        <div className="w-1/2">
          <img
            src="https://images.unsplash.com/photo-1639772823907-a716be4bdecc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Login background"
          />
        </div>
        <div className="w-1/2 p-4 bg-white">
          <div className="flex flex-col p-6 space-y-2 text-center">
            <h3 className="whitespace-nowrap tracking-tight text-3xl font-bold">
              Login
            </h3>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to login
            </p>
          </div>
          <div className="p-6">
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label
                  className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="flex h-10 w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="flex h-10 w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  id="password"
                  type="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="mt-10 inline-block items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1 border"
              >
                Login
              </button>
            </form>
          </div>
          <div className="flex items-center p-6 text-center">
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                className="font-medium text-blue-500 underline"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register Lab
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
