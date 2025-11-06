import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { API_URL } from "../utils/Constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userslice";
import { setLoading } from "../redux/userslice";
import { useSelector } from "react-redux";
import banner from "../assets/netflix-background.jpg";

const Login = () => {
  const [islogin, setIsLogin] = useState(true);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isloading = useSelector((store) => store.app.isloading);

  const loginhandler = () => {
    setIsLogin(!islogin);
  };

  const submithandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    if (islogin) {
      const user = { email, password };
      try {
        const res = await axios.post(`${API_URL}/login`, user, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        toast.success(res.data.message || "Login successful");
        dispatch(setUser(res.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        console.log("User logged in:", res.data.user);

        navigate("/browse");
      } catch (error) {
        const errMsg = error.response?.data?.message || "Something went wrong";
        toast.error(errMsg);
      } finally {
        dispatch(setLoading(false));
      }
      setEmail("");
      setPassword("");
    } else {
      // register
      dispatch(setLoading(true));
      const user = { fullname, email, password };
      try {
        const res = await axios.post(`${API_URL}/register`, user, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        toast.success(res.data.message || "Registered successfully");
        setIsLogin(true);
      } catch (error) {
        const errMsg = error.response?.data?.message || "Something went wrong";
        toast.error(errMsg);
      } finally {
        dispatch(setLoading(false));
      }
      setFullname("");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <>
      <Header />

      <div className="relative w-full h-screen">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          src={banner}
          alt="banner"
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <form
            onSubmit={submithandler}
            className="w-80 bg-black opacity-90 p-6 rounded-md flex flex-col text-white shadow-lg"
          >
            <h1 className="text-3xl mb-5 font-bold text-center">
              {islogin ? "Login" : "Sigup"}
            </h1>
            {!islogin && (
              <>
                <label className="mb-1">Full Name</label>
                <input
                  className="mb-4 p-2 rounded bg-gray-800"
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Fullname"
                  required
                />
              </>
            )}

            <label className="mb-1">Email</label>
            <input
              className="mb-4 p-2 rounded bg-gray-800"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="mb-1">Password</label>
            <input
              className="mb-4 p-2 rounded bg-gray-800"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              className="bg-red-600 mt-8 p-3 mb-3 text-white rounded"
              disabled={isloading}
            >
              {`${isloading ? "Loading..." : islogin ? "login" : "signup"}`}
            </button>
            <p className="mb-4 text-sm text-gray-300">
              {islogin ? "New to Netflix? " : "Already have an account? "}
              <span
                onClick={loginhandler}
                className="ml-2 text-blue-900 font-medium cursor-pointer"
              >
                {islogin ? "Signup" : "Login"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
