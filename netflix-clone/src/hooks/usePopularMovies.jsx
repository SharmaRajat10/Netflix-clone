import axios from "axios";
import { Popular_Movie, options } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { getPopularMovies } from "../redux/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const fetchPopularMovies = async () => {
    try {
      const res = await axios.get(Popular_Movie, options);

      dispatch(getPopularMovies(res.data.results));
    } catch (error) {
      console.log(error);
    }
  };

  return fetchPopularMovies;
};

export default usePopularMovies;
