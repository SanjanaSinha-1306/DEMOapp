import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //  Validation Checks
  const isPasswordLong = formData.password.length >= 8;
  const hasNumber = /\d/.test(formData.password);
  const hasUppercase = /[A-Z]/.test(formData.password);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isFormValid =
    isPasswordLong &&
    hasNumber &&
    hasUppercase &&
    isEmailValid &&
    formData.name;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // (Connecting to Backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(""); // Clear previous errors

    try {
      // We send the formData to the /signup route we made in Node.js
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        formData,
      );

      if (response.status === 201) {
        alert("Industrial Account Created Successfully!");
        navigate("/login"); // After signup, send user to login
      }
    } catch (err) {
      // If backend validation or SQL fails, show the message
      setServerError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
          Join Pro-Stock
        </h2>

        {serverError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  <path d="M15.171 13.576l1.472 1.473a1 1 0 001.414-1.414l-14-14a1 1 0 00-1.414 1.414l1.473 1.473A10.014 10.014 0 00.458 10c1.274 4.057 5.064 7 9.542 7 2.412 0 4.644-.604 6.171-1.627z" />
                </svg>
              )}
            </button>
          </div>

          {/* Validation Checklist UI */}
          <div className="space-y-2 py-2">
            <ValidationItem label="8+ characters" isValid={isPasswordLong} />
            <ValidationItem label="Contains a number" isValid={hasNumber} />
            <ValidationItem
              label="An uppercase letter"
              isValid={hasUppercase}
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:bg-slate-300 shadow-lg shadow-blue-100"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

// Reusable UI Checkmark
const ValidationItem = ({ label, isValid }) => (
  <div className="flex items-center space-x-2 text-xs">
    <span className={isValid ? "text-green-500 font-bold" : "text-slate-300"}>
      {isValid ? "✓" : "○"}
    </span>
    <span className={isValid ? "text-slate-700" : "text-slate-400"}>
      {label}
    </span>
  </div>
);

export default Signup;
