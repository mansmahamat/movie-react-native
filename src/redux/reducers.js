import { Action } from "./actions";

const initialState = {
  movies: [],
  series: [],
  topMovies: [],
  upcomingMovies: [],
  wishlist: [],
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Action.GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
      case Action.GET_SERIES:
        return {
          ...state,
          series: action.payload,
        };
      case Action.GET_UPCOMING_MOVIES:
      return {
        ...state,
        upcomingMovies: action.payload,
      };
    case Action.GET_TOP_RATED_MOVIES:
      return {
        ...state,
        topMovies: action.payload,
      };
    case Action.ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case Action.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (movie) => movie.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
