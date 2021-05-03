import { useNavigation } from "@react-navigation/native";
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
  TextInput,
  Image,
  SafeAreaView,
  Button,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MovieItems from "../components/MovieItems";
import SerieItems from "../components/SerieItems";
import Constants from "expo-constants";
import { connect } from "react-redux";
import {
  fetchMovies,
  fetchSeries,
  addToWishList,
  removeFromWishlist,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "../redux/actions";
import { dummyData } from "../data/Data";
import Autocomplete from "react-native-autocomplete-input";
import axios from "axios";

const _HomeScreen = (props) => {
  const navigation = useNavigation();
  const {
    movieReducer,
    fetchMovies,
    fetchSeries,
    addToWishList,
    removeFromWishlist,
    fetchTopRatedMovies,
    fetchUpcomingMovies,
  } = props;

  const { movies, series, wishlist, topMovies, upcomingMovies } = movieReducer;

  const [currentMovie, setCurrentMovie] = useState(undefined);
  const [listTopMovie, setListTopMovie] = useState([]);
  const [listUpcomingMovie, setListUpcomingMovie] = useState();
  const [listSerie, setListSerie] = useState([])
  const [query, setQuery] = useState("");
  const [queryResult, setQueryResult] = useState([]);

  useEffect(() => {
    fetchTopRatedMovies();
    setListTopMovie(topMovies);
  }, [topMovies]);

  useEffect(() => {
    fetchUpcomingMovies();
    setListUpcomingMovie(upcomingMovies);
  }, [upcomingMovies]);

  useEffect(() => {
    fetchSeries()
  setListSerie(series)
  }, [])

  const searchData = (query) => {
    axios
      .get(
        "https://api.themoviedb.org/3/search/movie?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR&query=" + query +"&page=1&include_adult=false"
      )
      .then((response) => {
        setQueryResult(response.data.results)
       
      })
      .catch((error) => {
        console.log(error);
      });

      
  }

  const goSearchResults = () => {
    navigation.navigate("ResultsQueryMovie", { queryResult: queryResult })
    setQuery("")
  }

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
    <SafeAreaView
      style={styles.container}
      showHorizontalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Movied App</Text>
<View style={{flexDirection: "row", justifyContent:"center"}}>
<TextInput
       style={{
        backgroundColor: "green",
        width: 150
       
      }}
      data={queryResult}
      placeholder="searchhint"
      
     
      onChangeText={(query) => {
        searchData(query);
      }}
    
    />
    <Button
  onPress={goSearchResults}
  title="Learn More"
  color="#841584"
/>

 
</View>


        
  

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
         
        <Image
          style={styles.cover_image}
          source={{
            uri:
              "https://image.tmdb.org/t/p/w500/fatz1aegtBGh7KS0gipcsw9MqUn.jpg",
          }}
        />
      </View>
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
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </View>
        </View>
        <ScrollView horizontal={true}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            {listTopMovie.map((movie, index) => {
              return index < 15 ? (
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <Text>Recent movie</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </View>
        </View>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row", flex: 1, paddingLeft: 20 }}>
            {upcomingMovies.map((movie, index) => {
              return index < 15 ? (
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <Text>Popular serie</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </View>
        </View>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row", flex: 1, paddingLeft: 20 }}>
            {listSerie.map((serie, index) => {
              return index < 15 ? (
                <SerieItems
                  key={serie.id}
                  serie={serie}
                  title={serie.title}
                  image={serie.poster_path}
                />
              ) : (
                <View key={serie.id} />
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
  fetchUpcomingMovies,
  fetchSeries,
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
  cover_image: {
    width: "100%",
    height: 256,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 155,
    margin: 12,
    borderWidth: 1,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});
