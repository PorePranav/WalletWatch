import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("http://localhost:3000/api/v1/users/login", formData, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch(signIn(data.data.user));
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign In
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5 justify-between">
        <Link to="/sign-up">
          <span className="text-blue-700">Dont have an account?</span>
        </Link>
        <Link to="/forgot-password">
          <span className="text-blue-700">Forgot password?</span>
        </Link>
      </div>
    </div>
  );
}
