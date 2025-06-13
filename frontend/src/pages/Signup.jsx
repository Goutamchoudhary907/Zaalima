import React, { useState } from "react";
import axios from "axios";
import SignupImage from "../assets/Signup_Image.png";
import { Link } from "react-router-dom";
export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    address: "",
  });

  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fields = Object.keys(formData);
  const completedFields = fields.filter((field) => formData[field]).length;
  const progressPercent = Math.round((completedFields / fields.length) * 100);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await axios.post("http://localhost:3000/auth/signup", formData);
      setMessage({ type: "success", text: res.data.message });
      setFormData({
        name: "",
        email: "",
        password: "",
        gender: "",
        age: "",
        address: "",
      });
    } catch (error) {
      const errMsg = error.response?.data?.message || "Signup failed";
      setMessage({ type: "error", text: errMsg });
    } finally {
      setIsSubmitting(false);
    }
  };
 return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] p-4">
      <div className="w-full max-w-4xl bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
  
       
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
          <img 
            src={SignupImage}
            alt="Join Illustration" 
            className="w-full h-full object-cover opacity-90"
          />
        </div>
  
       
        <div className="w-full md:w-1/2 relative p-8 bg-white">
         
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-100 rounded-tr-full"></div>
  
          <div className="relative z-10">
            <div className="relative">
              <div className="relative z-10">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
                  Join <span className="text-blue-600">Now</span>
                </h2>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-gray-500">Profile completion</span>
                    <span className="text-xs font-bold text-gray-700">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {message && (
                  <div className={`mb-5 p-3 rounded-lg text-sm ${
                    message.type === "success" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { name: 'name', label: 'Full Name', type: 'text' },
                    { name: 'email', label: 'Email Address', type: 'email' },
                    { name: 'password', label: 'Create Password', type: 'password' },
                  ].map((field) => (
                    <div key={field.name} className="relative">
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder=" "
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="peer w-full px-3 py-2.5 bg-gray-50 text-gray-900 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none rounded-md transition-all"
                        required
                      />
                      <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600">
                        {field.label}
                      </label>
                    </div>
                  ))}

                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="peer w-full px-3 py-2.5 bg-gray-50 text-gray-900 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none rounded-md appearance-none"
                      required
                    >
                      <option value="" disabled hidden></option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600">
                      Gender
                    </label>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      name="age"
                      placeholder=" "
                      value={formData.age}
                      onChange={handleChange}
                      min="1"
                      className="peer w-full px-3 py-2.5 bg-gray-50 text-gray-900 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none rounded-md transition-all"
                      required
                    />
                    <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600">
                      Your Age
                    </label>
                  </div>

                  <div className="relative">
                    <textarea
                      name="address"
                      placeholder=" "
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="peer w-full px-3 py-2.5 bg-gray-50 text-gray-900 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none rounded-md transition-all resize-none"
                      required
                    ></textarea>
                    <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600">
                      Your Address
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-blue-600 hover:underline">
                    Sign in here
                  </Link>
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}