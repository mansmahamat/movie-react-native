import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import TrailersItems from "../components/TrailersItems";
import Constants from "expo-constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import YoutubePlayer from "react-native-youtube-iframe";
import GenresGroup from "../components/GenresGroup";
import { connect } from "react-redux";
import {
  fetchMovies,
  addToWishList,
  removeFromWishlist,
  fetchTopRatedMovies,
} from "../redux/actions";
import Actor from "../components/Actor";

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
  const [actor, setActor] = useState([]);
  const [details, setDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeMovieTrailerKey, setActiveMovieTrailerKey] = useState("")

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          movie.id +
          "/videos?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR"
      )
      .then((response) => {
        setTrailers(response.data.results );
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          movie.id +
          "?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR"
      )
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          movie.id +
          "/credits?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR"
      )
      .then((response) => {
        setActor(response.data.cast);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);




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
            <YoutubePlayer height={300} play={true} videoId={activeMovieTrailerKey} />
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
            size={30}
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
         { isExist(movie) ? ( <MaterialCommunityIcons
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
            size={27}
          />  ) : (
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
            size={27}
          />
          )
        }
        </TouchableWithoutFeedback>

        <Image
          resizeMode={"cover"}
          style={styles.cover_image}
          source={{
            uri: "https://image.tmdb.org/t/p/w500" + movie.backdrop_path,
          }}
        />
        <View style={{ flex: 1, backgroundColor: "pink", padding: 20 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View style={{ flexWrap: "wrap", flexDirection: "column" }}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text>{movie.release_date}</Text>
            </View>
            <View
              style={{
                width: 48,
                height: 48,
                backgroundColor: "white",
                borderRadius: 24,
                justifyContent: "center",
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={
                  movie.vote_average > 5 ? { color: "green" } : { color: "red" }
                }
              >
                {movie.vote_average}
              </Text>
            </View>
          </View>
          <View style={{ flexWrap: "wrap" }}>
            {/* <GenresGroup data={movie.genres} /> */}
          {details.genres &&  <GenresGroup data={details.genres} />}
          </View>

          <Text style={styles.header}>Résumé</Text>
          <Text>{movie.overview}</Text>
          <Text style={styles.header}>Trailers</Text>
          <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
            {trailers.map((item, index) => {
              return index < 2 ? (
                <TrailersItems
                  image={movie.backdrop_path}
                  key={item.key}
                  item={item}
                  setModalVisible={setModalVisible}
                  setActiveMovieTrailerKey={setActiveMovieTrailerKey}
                />
              ) : (<View key={item.key} />);
            })}
          </View>
          <Text style={styles.header}>Acteur</Text>
          <View style={{flexDirection: "row"}}>
          <ScrollView horizontal={true}>
           {actor.map((item, index) => {
            return index < 12 ? (
              <Actor
              key={index}
              
                actor={item}
              />
            ) : (<View key={index} />);
          })}
           </ScrollView>
              
            
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

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
    },
    cover_image: {
      height: 285,
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
    },
    title: {
      fontSize: 17,
      fontWeight: "800",
    },
  });