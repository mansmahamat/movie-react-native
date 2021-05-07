import axios from "axios";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
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
import EpisodesList from "../components/EpisodesList";
import GenresGroup from "../components/GenresGroup";
import SimilarSerie from "../components/SimilarSerie";
import TrailersItems from "../components/TrailersItems";
import { addToWishList, removeFromWishlist } from "../redux/actions";

const deviceWidth = Dimensions.get("window").width;
const imageWidth = deviceWidth - 250;
const leftPlay = imageWidth;

const _SerieDetail = (props) => {
  const { movieReducer, addToWishList, removeFromWishlist } = props;

  const { wishlist } = movieReducer;
  const serie = props.route.params.serie;

  const [details, setDetails] = useState([]);
  const [actor, setActor] = useState([]);
  const [creator, setCreator] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [play, setPlay] = useState(true);
  const [trailers, setTrailers] = useState([]);
  const [similars, setSimilars] = useState([]);
  const [activeMovieTrailerKey, setActiveMovieTrailerKey] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/tv/" +
          serie.id +
          "/videos?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR"
      )
      .then((response) => {
        setTrailers(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        "https://api.themoviedb.org/3/tv/" +
          serie.id +
          "?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR"
      )
      .then((response) => {
        setDetails(response.data);
        setCreator(response.data.created_by);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        "https://api.themoviedb.org/3/tv/" +
          serie.id +
          "/recommendations?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR"
      )
      .then((response) => {
        setSimilars(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        "https://api.themoviedb.org/3/tv/" +
          serie.id +
          "/credits?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR"
      )
      .then((response) => {
        setActor(response.data.cast);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [serie]);

  const onTapAddToWishlistSerie = (serie) => {
    addToWishList(serie);
  };

  const onTapRemoveFromWishlistSerie = (serie) => {
    removeFromWishlist(serie);
  };

  const isExist = (serie) => {
    if (wishlist.filter((item) => item.id === serie.id).length > 0) {
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
            <TouchableWithoutFeedback
              onPress={() => {
                setModalVisible(false), setPlay(false);
              }}
            >
              <MaterialCommunityIcons name="close" size={42} color="black" />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ width: "100%" }}>
            <YoutubePlayer
              height={300}
              play={play}
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
                <TrailersItems
                  image={serie.backdrop_path}
                  key={item.key}
                  item={item}
                  serie={serie}
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
              uri: "https://image.tmdb.org/t/p/w500" + serie.backdrop_path,
            }}
          />
        )}

        <TouchableWithoutFeedback>
          {isExist(serie) ? (
            <MaterialCommunityIcons
              onPress={() => onTapRemoveFromWishlistSerie(serie)}
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
              onPress={() => onTapAddToWishlistSerie(serie)}
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
              size={38}
            />
          )}
        </TouchableWithoutFeedback>

        <View style={{ flex: 1, padding: 20 }}>
          <View
            style={{
              flex: 1,
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <Text style={styles.title}>{serie.name}</Text>
          </View>

          <View style={{ flexWrap: "wrap" }}>
            {details.genres && <GenresGroup data={details.genres} />}
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
                serie.vote_average > 5
                  ? { color: "green", fontSize: 26, fontWeight: "bold" }
                  : { color: "red", fontSize: 26, fontWeight: "bold" }
              }
            >
              {serie.vote_average.toFixed(2)}
            </Text>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={styles.detail}>
              Nombre de saisons : {details.number_of_seasons}
            </Text>
            <Text style={styles.detail}>
              Nombre épisodes : {details.number_of_episodes}
            </Text>
            <Text style={styles.detail}>
              Durée moyenne des épisodes : {details.episode_run_time} min
            </Text>
            <EpisodesList creators={creator} />
          </View>

          <Text style={styles.header}>Résumé</Text>
          <Text style={{ color: "#fff" }}> {serie.overview} </Text>

          <Text style={styles.header}>Acteurs</Text>
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

          <Text style={styles.header}> Séries Similaires</Text>
          <ScrollView horizontal={true}>
            {similars.map((similar, index) => {
              return <SimilarSerie similar={similar} key={index} />;
            })}
          </ScrollView>
        </View>
      </ScrollView>

      {/* <View style={{backgroundColor: "red"}}>
        
        
      </View> */}
    </View>
  );
};

const mapStateToProps = (state) => ({
  movieReducer: state.movieReducer,
});

const SerieDetail = connect(mapStateToProps, {
  addToWishList,
  removeFromWishlist,
})(_SerieDetail);

export default SerieDetail;

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
  square: {
    width: 100,
    height: 150,
    backgroundColor: "red",
    zIndex: 1,
    position: "absolute",
    top: 220,
    left: 10,
    borderRadius: 20,
  },
  squareo: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 24,
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  poster: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  detail: {
    color: "#fff",
  },
});
