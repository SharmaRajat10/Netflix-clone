import axios from "axios";
import React, { useState } from "react";
import { options, SEARCH_MOVIE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedMoviesDetails } from "../redux/searchSlice";
import { setLoading } from "../redux/userslice";
import Movielist from "./Movielist";

const SearchMovie = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.app?.isLoading);
  const { movieName, searchedMovie } = useSelector(
    (store) => store.searchMovie
  );
  console.log(searchedMovie);

  const submithandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`,
        options
      );
      dispatch(
        setSearchedMoviesDetails({ searchMovie, movies: res.data.results })
      );
      console.log(res.data.results);
    } catch (error) {
      console.error(error);
    }
    setSearchMovie("");
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center pt-[10%] w-[100%]">
        <form className="w-[50%]" onSubmit={submithandler}>
          <div className="flex items-center justify-between shadow-md  border-2 border-gray-200 p-2 rounded-lg w-[100%]">
            <input
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
              className="w-full outline-none bg-transparent text-black placeholder-gray-400 px-2 rounded-md text-lg"
              type="text"
              placeholder="Search for a movie..."
            />
            <button className="bg-red-800 text-white px-4 py-2">
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>
      {searchedMovie ? (
        <Movielist
          title={movieName}
          searchMovie={true}
          movies={searchedMovie}
        />
      ) : (
        <h1>Movie Not Found!!</h1>
      )}
    </>
  );
};

export default SearchMovie;
