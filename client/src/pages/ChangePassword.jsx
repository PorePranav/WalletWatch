import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { logOut } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function ChangePassword() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const updatePasswordFunction = axios
      .patch('http://localhost:3000/api/v1/users/updatePassword', formData, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch(logOut());
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    toast.promise(updatePasswordFunction, {
      loading: 'Updating your password',
      success: 'Updated password successfully',
      error: 'There was an error updating the password',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Password
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="Profile Image"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="password"
          id="passwordCurrent"
          onChange={handleChange}
          placeholder="Current Password"
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="Password"
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="password"
          id="passwordConfirm"
          onChange={handleChange}
          placeholder="Confirm Password"
          className="border p-3 rounded-lg"
          required
        />
        <button
          disabled={isLoading}
          className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
