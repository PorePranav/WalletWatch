import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { updateUser, logOut } from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, isOauth } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .patch("http://localhost:3000/api/v1/users/updateMe", formData, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch(updateUser(data.data.updatedUser));
        setIsLoading(false);
        toast.success("User updated successfully");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => {
        toast.error("Image size should be less than 2 MB");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          toast.success("Photo uploaded successfully");
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleSignOut = () => {
    axios
      .get("http://localhost:3000/api/v1/users/logout", {
        withCredentials: true,
      })
      .then((data) => {
        dispatch(logOut());
        toast.success("You have been logged out!");
      })
      .catch((err) => toast.err(err.response.data.message));
  };

  const handleDelete = () => {
    axios
      .delete("http://localhost:3000/api/v1/users/deleteMe", {
        withCredentials: true,
      })
      .then((data) => {
        toast.success("Your account was deleted successfully!");
        dispatch(logOut());
        navigate("/");
      })
      .catch((err) => {
        toast.error("There was an error deleting your account");
      });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          className="hidden"
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="Profile Image"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          id="name"
          defaultValue={currentUser.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          disabled={isOauth}
          id="email"
          onChange={handleChange}
          defaultValue={currentUser.email}
          placeholder="Email"
          className="border p-3 rounded-lg"
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
        {!isOauth && (
          <button
            onClick={() => navigate("/change-password")}
            className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            Update Password
          </button>
        )}
      </form>
      <div className="flex mt-5 justify-between">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  );
}
