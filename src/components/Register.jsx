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
//     labAddress: "",
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
//       !formData.mobile ||
//       !formData.labAddress
//     ) {
//       setErrorMessage("All fields are required.");
//       return;
//     }

//     try {
//       await dispatch(registerUserAsync(formData))
//         .unwrap()
//         .then((res) => {
//           if (res.success) {
//             toast.success("Registered Successfully");
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
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-300">
//       <div
//         className="rounded-lg border text-card-foreground w-full max-w-md bg-white shadow-xl"
//         data-v0-t="card"
//       >
//         <div className="flex flex-col p-6 space-y-2 text-center">
//           <h3 className="whitespace-nowrap tracking-tight text-3xl font-bold">
//             Register Your Lab
//           </h3>
//           <p className="text-sm text-muted-foreground">
//             Enter your name, email, mobile, password, and lab address to
//             Register.
//           </p>
//         </div>
//         <div className="p-6">
//           <form className="space-y-4" onSubmit={handleRegister}>
//             {[
//               {
//                 field: "name",
//                 label: "Lab Name",
//                 placeholder: "Enter your name",
//               },
//               {
//                 field: "labAddress",
//                 label: "Lab Address",
//                 placeholder: "Enter your lab address",
//               },
//               {
//                 field: "email",
//                 label: "Email",
//                 placeholder: "Enter your email",
//               },
//               {
//                 field: "mobile",
//                 label: "Mobile",
//                 placeholder: "Enter your mobile",
//               },
//               {
//                 field: "password",
//                 label: "Password",
//                 placeholder: "Enter your password",
//                 type: "password",
//               },
//             ].map(({ field, label, placeholder, type = "text" }) => (
//               <div key={field} className="space-y-2">
//                 <label
//                   className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
//                   htmlFor={field}
//                 >
//                   {label}
//                 </label>
//                 <input
//                   className="flex h-10 w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                   id={field}
//                   placeholder={placeholder}
//                   type={type}
//                   value={formData[field]}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             ))}
//             {errorMessage && (
//               <p className="text-red-500 text-sm">{errorMessage}</p>
//             )}
//             <button
//               type="submit"
//               className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1 border"
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
//               className="font-medium text-blue-500 underline"
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
//============================================
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
    address: "",
    city: "",
    state: "",
    pinCode: "",
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
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pinCode
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-300">
      <div
        className="rounded-lg border text-card-foreground w-full max-w-md bg-white shadow-xl"
        data-v0-t="card"
      >
        <div className="flex flex-col p-6 space-y-2 text-center">
          <h3 className="whitespace-nowrap tracking-tight text-3xl font-bold">
            Register Your Franchise
          </h3>
          <p className="text-sm text-muted-foreground">
            Enter your details to register your franchise.
          </p>
        </div>
        <div className="p-6">
          <form className="space-y-4" onSubmit={handleRegister}>
            {[
              {
                field: "name",
                label: "Franchise Name",
                placeholder: "Enter your name",
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
                  className="flex h-10 w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  id={field}
                  placeholder={placeholder}
                  type={type}
                  value={formData[field]}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  field: "address",
                  label: "Address",
                  placeholder: "Enter your address",
                },
                {
                  field: "city",
                  label: "City",
                  placeholder: "Enter your city",
                },
                {
                  field: "state",
                  label: "State",
                  placeholder: "Enter your state",
                },
                {
                  field: "pinCode",
                  label: "Pin Code",
                  placeholder: "Enter your pin code",
                },
              ].map(({ field, label, placeholder }) => (
                <div key={field} className="space-y-2">
                  <label
                    className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
                    htmlFor={field}
                  >
                    {label}
                  </label>
                  <input
                    className="flex h-10 w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    id={field}
                    placeholder={placeholder}
                    type="text"
                    value={formData[field]}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ))}
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1 border"
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
              className="font-medium text-blue-500 underline"
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
