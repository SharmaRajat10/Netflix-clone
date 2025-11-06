import React from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userslice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setToggle } from "../redux/movieSlice";
import logo from "../assets/netflix-logo.png";

const Header = () => {
  const user = useSelector((store) => store.app.user);
  const toggle = useSelector((store) => store.movie.toggle);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logouthandler = async () => {
    try {
      const res = await axios.get(`${API_URL}/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(setUser(null));
      toast.success(res.data.message);
      if (user) {
        return navigate("/browse");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const togglehandler = () => {
    dispatch(setToggle());
  };

  return (
    <div className="absoulte w-[100%] flex items-center justify-between  bg-gradient-to-b from-black z-20">
      <img
        className="w-56"
        src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png"
        alt="netflix-logo"
      />
      {user && (
        <div className="flex items-center">
          <IoIosArrowDropdown color="white" />
          <h1 className="text-lg font-medium text-white">{user.fullname}</h1>
          <div className="ml-4">
            <button
              onClick={logouthandler}
              className="bg-red-800 text-white px-4 py-2"
            >
              Logout
            </button>
            <button
              onClick={togglehandler}
              className="bg-red-800 text-white px-4 py-2 ml-2"
            >
              {toggle ? "Home" : "Search Movie"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
