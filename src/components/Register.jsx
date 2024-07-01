// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { registerUserAsync } from "../store/features/auth/userSlice";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     mobile: "",
//   });
//   const [errorMessage, setErrorMessage] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//   };

//   const handleRegister = async (event) => {
//     event.preventDefault();
//     setErrorMessage("");

//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.password ||
//       !formData.mobile
//     ) {
//       setErrorMessage("All fields are required.");
//       return;
//     }

//     try {
//       await dispatch(registerUserAsync(formData))
//         .unwrap()
//         .then((res) => {
//           if (res.success) {
//             toast.success("Registered Successful");
//             navigate("/login");
//           }
//         });
//     } catch (error) {
//       console.error("Registration Error:", error);
//       const message =
//         error.response?.data?.message ||
//         "Registration failed. Please try again.";
//       setErrorMessage(message);
//       toast.error(message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary to-primary-foreground">
//       <div
//         className="rounded-lg border text-card-foreground w-full max-w-md bg-background shadow-xl"
//         data-v0-t="card"
//       >
//         <div className="flex flex-col p-6 space-y-2 text-center">
//           <h3 className="whitespace-nowrap tracking-tight text-3xl font-bold">
//             Register Your Lab
//           </h3>
//           <p className="text-sm text-muted-foreground">
//             Enter your name, email, mobile, and password to Register.
//           </p>
//         </div>
//         <div className="p-6">
//           <form className="space-y-4" onSubmit={handleRegister}>
//             {["labname", "email", "mobile", "password", "labAddress"].map(
//               (field) => (
//                 <div key={field} className="space-y-2">
//                   <label
//                     className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
//                     htmlFor={field}
//                   >
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   <input
//                     className="flex h-10 w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
//                     id={field}
//                     placeholder={`Enter your ${field}`}
//                     type={field === "password" ? "password" : "text"}
//                     value={formData[field]}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//               )
//             )}
//             {errorMessage && (
//               <p className="text-red-500 text-sm">{errorMessage}</p>
//             )}
//             <button
//               type="submit"
//               className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1"
//             >
//               Register
//             </button>
//           </form>
//         </div>
//         <div className="flex items-center p-6 text-center">
//           <div className="text-sm text-muted-foreground">
//             Have an account?{" "}
//             <button
//               type="button"
//               className="font-medium text-primary underline"
//               onClick={() => {
//                 navigate("/login");
//               }}
//             >
//               Log In
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
//===================================================
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUserAsync } from "../store/features/auth/userSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    labAddress: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.mobile ||
      !formData.labAddress
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      await dispatch(registerUserAsync(formData))
        .unwrap()
        .then((res) => {
          if (res.success) {
            toast.success("Registered Successfully");
            navigate("/login");
          }
        });
    } catch (error) {
      console.error("Registration Error:", error);
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setErrorMessage(message);
      toast.error(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary to-primary-foreground">
      <div
        className="rounded-lg border text-card-foreground w-full max-w-md bg-background shadow-xl"
        data-v0-t="card"
      >
        <div className="flex flex-col p-6 space-y-2 text-center">
          <h3 className="whitespace-nowrap tracking-tight text-3xl font-bold">
            Register Your Lab
          </h3>
          <p className="text-sm text-muted-foreground">
            Enter your name, email, mobile, password, and lab address to
            Register.
          </p>
        </div>
        <div className="p-6">
          <form className="space-y-4" onSubmit={handleRegister}>
            {[
              {
                field: "name",
                label: "Lab Name",
                placeholder: "Enter your name",
              },
              {
                field: "labAddress",
                label: "Lab Address",
                placeholder: "Enter your lab address",
              },
              {
                field: "email",
                label: "Email",
                placeholder: "Enter your email",
              },
              {
                field: "mobile",
                label: "Mobile",
                placeholder: "Enter your mobile",
              },
              {
                field: "password",
                label: "Password",
                placeholder: "Enter your password",
                type: "password",
              },
            ].map(({ field, label, placeholder, type = "text" }) => (
              <div key={field} className="space-y-2">
                <label
                  className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
                  htmlFor={field}
                >
                  {label}
                </label>
                <input
                  className="flex h-10 w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  id={field}
                  placeholder={placeholder}
                  type={type}
                  value={formData[field]}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 border"
            >
              Register
            </button>
          </form>
        </div>
        <div className="flex items-center p-6 text-center">
          <div className="text-sm text-muted-foreground">
            Have an account?{" "}
            <button
              type="button"
              className="font-medium text-primary underline"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
