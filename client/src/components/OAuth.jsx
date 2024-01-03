import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { signIn } from "../redux/user/userSlice";
import axios from "axios";

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);
    const user = {
      name: result.user.displayName,
      email: result.user.email,
      photo: result.user.photoURL,
    };

    axios
      .post("http://localhost:3000/api/v1/users/oauth", user)
      .then((data) => {
        dispatch(signIn(data.data.user));
        navigate("/");
      })
      .catch((err) => {
        toast.error("There was a problem with OAuth");
      });
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}
