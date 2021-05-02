import axios from "axios";
import { BASE_URL } from "../utilities";

export const Action = {
  GET_MOVIES: "fetch_movies",
  ADD_TO_WISHLIST: "add_to_wishlist",
  REMOVE_FROM_WISHLIST: "remove_from_wishlist",
  ON_ERROR: "on_error",
  GET_TOP_RATED_MOVIES: 'fetch_top_rated_movies'
};

export const fetchMovies = () => {
  try {
    return async (dispatch) => {
      const response = await axios.get(
        `${BASE_URL}/watch/movie`
      );

    //   console.log(response);
      if (response.data) {
        dispatch({
          type: Action.GET_MOVIES,
          payload: response.data,
        });
      } else {
        //throw error
        dispatch({
          type: Action.ON_ERROR,
          payload: "Unable to fetch movies",
        });
      }
    };
  } catch (err) {
    //throw error
    dispatch({
      type: Action.ON_ERROR,
      payload: "Unable to fetch movies",
    });
  }
};

export const fetchTopRatedMovies = () => {
    try {
      return async (dispatch) => {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR&page=2"
        );
  
        // console.log(response.data.results);
        if (response.data.results) {
          dispatch({
            type: Action.GET_TOP_RATED_MOVIES,
            payload: response.data.results,
          });
        } else {
          //throw error
          dispatch({
            type: Action.ON_ERROR,
            payload: "Unable to fetch top movies",
          });
        }
      };
    } catch (err) {
      //throw error
      dispatch({
        type: Action.ON_ERROR,
        payload: "Unable to fetch movies",
      });
    }
  };

export const addToWishList = (movie) => (dispatch) => {
  dispatch({
    type: Action.ADD_TO_WISHLIST,
    payload: movie,
  });
};

export const removeFromWishlist = (movie) => (dispatch) => {
  dispatch({
    type: Action.REMOVE_FROM_WISHLIST,
    payload: movie,
  });
};
