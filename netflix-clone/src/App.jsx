import React from "react";
import Body from "./components/Body";
import { ToastContainer } from "react-toastify";
import MovieDialog from "./components/MovieDialog";
import { useEffect } from "react";
import { setUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  if (user) {
    try {
      dispatch(setUser(JSON.parse(user)));
    } catch (e) {
      console.error("Failed to parse user from localStorage");
      localStorage.removeItem("user");
    }
  }
  return (
    <>
      <div>
        <Body />
        <ToastContainer />
        <MovieDialog />
      </div>
    </>
  );
};

export default App;
