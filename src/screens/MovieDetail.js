import axios from "axios";
import Constants from "expo-constants";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import YoutubePlayer from "react-native-youtube-iframe";
import { connect } from "react-redux";
import Actor from "../components/Actor";
import GenresGroup from "../components/GenresGroup";
import SimilarMovie from "../components/SimilarMovie";
import TrailersMovies from "../components/TrailersMovies";
import {
  addToWishList,
  fetchMovies,
  fetchTopRatedMovies,
  removeFromWishlist,
} from "../redux/actions";

const _MovieDetail = (props) => {
  const {
    movieReducer,
    fetchMovies,
    addToWishList,
    removeFromWishlist,
    fetchTopRatedMovies,
  } = props;

  const { movies, wishlist, topMovies } = movieReducer;
  const movie = props.route.params.movie;

  const [trailers, setTrailers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actor, setActor] = useState([]);
  const [details, setDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [play, setPlay] = useState(true);
  const [similars, setSimilars] = useState([]);
  const [activeMovieTrailerKey, setActiveMovieTrailerKey] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          movie.id +
          "?api_key=afd804ef50f1e6b1ad6f29209e9395e6"
      )
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movies]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          movie.id +
          "/recommendations?api_key=afd804ef50f1e6b1ad6f29209e9395e6"
      )
      .then((response) => {
        setIsLoading(true);
        setSimilars(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [similars]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          movie.id +
          "/credits?api_key=afd804ef50f1e6b1ad6f29209e9395e6"
      )
      .then((response) => {
        setIsLoading(true);
        setActor(response.data.cast);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [actor]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          movie.id +
          "/videos?api_key=afd804ef50f1e6b1ad6f29209e9395e6"
      )
      .then((response) => {
        setIsLoading(true);
        setTrailers(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [trailers]);

  const onTapAddToWishlist = (movie) => {
    addToWishList(movie);
  };

  const onTapRemoveFromWishlist = (movie) => {
    removeFromWishlist(movie);
  };

  const isExist = (movie) => {
    if (wishlist.filter((item) => item.id === movie.id).length > 0) {
      return true;
    }

    return false;
  };

  return (
    <View style={styles.container}>
      <Modal
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "center",

            backgroundColor: "#000",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 48,
              height: 48,
              position: "absolute",
              top: Constants.statusBarHeight + 10,
              left: 20,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <MaterialCommunityIcons name="close" size={42} color="black" />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ width: "100%" }}>
            <YoutubePlayer
              height={300}
              play={true}
              videoId={activeMovieTrailerKey}
            />
          </View>
        </View>
      </Modal>
      <ScrollView>
        <TouchableWithoutFeedback>
          <MaterialCommunityIcons
            onPress={() => props.navigation.pop()}
            style={{
              position: "absolute",
              top: Constants.statusBarHeight + 10,
              left: 10,
              zIndex: 1,
              paddingRight: 20,
              paddingBottom: 20,
            }}
            name="chevron-left"
            color={"#fff"}
            size={40}
          />
        </TouchableWithoutFeedback>

        {trailers.length > 0 ? (
          <View>
            {trailers.map((item, index) => {
              return index < 1 ? (
                <TrailersMovies
                  image={movie.backdrop_path}
                  key={item.key}
                  item={item}
                  movie={movie}
                  setPlay={setPlay}
                  setModalVisible={setModalVisible}
                  setActiveMovieTrailerKey={setActiveMovieTrailerKey}
                />
              ) : (
                <View key={item.key} />
              );
            })}
          </View>
        ) : (
          <Image
            resizeMode={"cover"}
            style={{ height: 285 }}
            source={{
              uri: "https://image.tmdb.org/t/p/w500" + movie.backdrop_path,
            }}
          />
        )}

        <TouchableWithoutFeedback>
          {isExist(movie) ? (
            <MaterialCommunityIcons
              onPress={() => onTapRemoveFromWishlist(movie)}
              style={{
                position: "absolute",
                top: Constants.statusBarHeight + 10,
                right: 10,
                zIndex: 1,
                paddingRight: 20,
                paddingBottom: 20,
              }}
              name="heart"
              color={"red"}
              size={32}
            />
          ) : (
            <MaterialCommunityIcons
              onPress={() => onTapAddToWishlist(movie)}
              style={{
                position: "absolute",
                top: Constants.statusBarHeight + 10,
                right: 10,
                zIndex: 1,
                paddingRight: 20,
                paddingBottom: 20,
              }}
              name="heart-outline"
              color={"white"}
              size={32}
            />
          )}
        </TouchableWithoutFeedback>
        <View style={{ flex: 1, padding: 20, }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              flexWrap: "wrap"
            }}
          >
            <View style={{  flexDirection: "column" }}>
              <Text style={styles.title}>{movie.title} </Text>
              <Text style={{ marginTop: 5, color: "#fff"}}>
                Released on {moment(movie.release_date).format("DD/MM/YYYY")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <MaterialCommunityIcons name="star" size={32} color="#FFD700" />
              <Text
                style={
                  movie.vote_average > 5
                    ? { color: "green", fontSize: 26, fontWeight: "bold" }
                    : { color: "red", fontSize: 26, fontWeight: "bold" }
                }
              >
                {movie.vote_average.toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={{ flexWrap: "wrap", marginTop: 12 }}>
            {/* <GenresGroup data={movie.genres} /> */}
            {details.genres && <GenresGroup data={details.genres} />}
          </View>

          <Text style={styles.header}>Summary</Text>
          <Text style={{ color: "#fff" }}>{movie.overview}</Text>

          <Text style={styles.header}>Actors</Text>
          <View style={{ flexDirection: "row" }}>
            <ScrollView horizontal={true}>
              {actor.map((item, index) => {
                return index < 12 ? (
                  <Actor key={index} actor={item} />
                ) : (
                  <View key={index} />
                );
              })}
            </ScrollView>
          </View>
          <Text style={styles.header}> Similar movies</Text>
          <Text></Text>
          <ScrollView horizontal={true}>
            {similars.map((similar, index) => {
              return <SimilarMovie similar={similar} key={index} />;
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  movieReducer: state.movieReducer,
});

const MovieDetail = connect(mapStateToProps, {
  fetchMovies,
  addToWishList,
  removeFromWishlist,
  fetchTopRatedMovies,
})(_MovieDetail);

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#111112",
  },
  cover_image: {
    height: 285,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    color: "#fff",
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    alignItems: "center",
    color: "#fff",
  },
  detail: {
    color: "#fff",
  },
});
