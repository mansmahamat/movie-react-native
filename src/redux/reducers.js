import { Action } from "./actions";

const initialState = {
  movies: [],
  series: [],
  onAirSeries: [],
  topMovies: [],
  upcomingMovies: [],
  wishlist: [],
  wishlist_serie: [],
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
        case Action.GET_ON_AIR_SERIES:
        return {
          ...state,
          onAirSeries: action.payload,
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
      case Action.ADD_TO_WISH_LIST_SERIE:
      return {
        ...state,
        wishlist: [...state.wishlist_serie, action.payload],
      };
    case Action.REMOVE_FROM_WISHLIST_SERIE:
      return {
        ...state,
        wishlist: state.wishlist_serie.filter(
          (serie) => serie.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
