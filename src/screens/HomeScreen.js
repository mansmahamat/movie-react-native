import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MovieItems from '../components/MovieItems'
import Constants from "expo-constants";
import { connect } from "react-redux";
import {
  fetchMovies,
  addToWishList,
  removeFromWishlist,
  fetchTopRatedMovies,
} from "../redux/actions";
import { BASE_URL } from "../utilities";

const _HomeScreen = (props) => {
  const {
    movieReducer,
    fetchMovies,
    addToWishList,
    removeFromWishlist,
    fetchTopRatedMovies,
  } = props;

  const { movies, wishlist, topMovies } = movieReducer;

  const [currentMovie, setCurrentMovie] = useState(undefined);
  const [listTopMovie, setListTopMovie] = useState([]);

  useEffect(() => {
    fetchTopRatedMovies();
    setListTopMovie(topMovies);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      setCurrentMovie(movies[0]);
    }
  }, [movies]);



  const didTapCurrentMovie = (movie) => {
    setCurrentMovie(movie);
  };

  const onTapAddToWishlist = (movie) => {
    addToWishList(movie);
  };

  const onTapRemoveFromWishlist = (movie) => {
    removeFromWishlist(movie);
  };

  const isExist = (movie) => {
    if (wishlist.filter((item) => item._id === movie._id).length > 0) {
      return true;
    }

    return false;
  };

  return (
    <SafeAreaView style={styles.container} showHorizontalScrollIndicator={false}>
     

        <View>
        <Text style={styles.title}>Search</Text>

<MaterialCommunityIcons name="magnify" size={24} />
        </View>

<ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <Text>Popular movie</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Text>View all</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </View>
        </View>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row", flex: 1, paddingLeft: 20 }}>
            {listTopMovie.map((movie, index) => {
              return index < 10 ? (
                <MovieItems
                  key={movie.id}
                  movie={movie}
                  title={movie.title}
                  image={movie.poster_path}
                />
              ) : (
                <View key={movie.id} />
              );
            })}
          </View>
        </ScrollView>
        </ScrollView>

       
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  movieReducer: state.movieReducer,
});

const HomeScreen = connect(mapStateToProps, {
  fetchMovies,
  addToWishList,
  removeFromWishlist,
  fetchTopRatedMovies,
})(_HomeScreen);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingVertical: 20,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    flex: 1,
  },
  posterView: {
    display: "flex",
    width: Dimensions.get("screen").width,
    flex: 7,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  listView: {
    width: Dimensions.get("screen").width,
    flex: 5,
    padding: 10,
  },
  poster: {
    display: "flex",
    width: Dimensions.get("screen").width,
    height: "100%",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  movieCard: {
    display: "flex",
    flexDirection: "column",
    width: Dimensions.get("screen").width / 2.5 - 10,
    backgroundColor: "#FFF",
    borderRadius: 20,
    height: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
});
