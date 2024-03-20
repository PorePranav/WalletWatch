import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/users/forgotPassword", formData)
      .then((data) => {
        toast.success("Token sent to your mail");
        navigate("/sign-in");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Forgot Password
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          id="email"
          onChange={handleChange}
          placeholder="Email"
          className="border p-3 rounded-lg"
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Send Email
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-between">
        <Link to="/sign-up">
          <span className="text-blue-700">Dont have an account?</span>
        </Link>
        <Link to="/sign-in">
          <span className="text-blue-700">Already have an account?</span>
        </Link>
      </div>
    </div>
  );
}
