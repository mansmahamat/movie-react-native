import React, {useState, useEffect} from "react";
import { Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  View, } from "react-native";
import TrailersItems from "../components/TrailersItems";
import Constants from "expo-constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios'
import GenresGroup from '../components/GenresGroup'
import Actor from '../components/Actor'
import EpisodesList from "../components/EpisodesList";


const deviceWidth = Dimensions.get("window").width;
const leftDevice = (deviceWidth- 344);

export default function SerieDetail(props) {
  const [details, setDetails] = useState([]);
  const [actor, setActor] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [trailers, setTrailers] = useState([]);
  const [activeMovieTrailerKey, setActiveMovieTrailerKey] = useState("")
  const serie = props.route.params.serie;

  useEffect(() => {

    axios
      .get(
        "https://api.themoviedb.org/3/tv/" +
          serie.id +
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
        "https://api.themoviedb.org/3/tv/" +
          serie.id +
          "?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR"
      )
      .then((response) => {
        setDetails(response.data);
        setSeasons(response.data.seasons)
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


  }, [])

  

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
            <YoutubePlayer height={300} play={true} videoId={activeMovieTrailerKey}  />
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

        {/* <TouchableWithoutFeedback>
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
        </TouchableWithoutFeedback> */}

        <Image
          resizeMode={"cover"}
          style={styles.cover_image}
          source={{
            uri: "https://image.tmdb.org/t/p/w500" + serie.backdrop_path,
          }}
        />
        
        <View style={styles.square}>
        <Image
        resizeMode={"cover"}
        style={styles.poster}
        source={{
          uri: "https://image.tmdb.org/t/p/w500" + serie.poster_path,
        }}
      />
        </View>
        

        <View style={{ flex: 1, backgroundColor: "pink", padding: 20 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginBottom: 10,
             
            }}
          >
            <View style={{ flexWrap: "wrap", flexDirection: "column", alignItems:"flex-end" }}>
            <Text style={{fontSize: 18}} > Moyenne des notes : </Text>
              <Text
                style={
                  serie.vote_average > 5 ? { color: "green" , fontSize:26, fontWeight:"bold"} : { color: "red", fontSize:20 }
                }
              >
                {serie.vote_average}
              </Text>
            </View>
           
          </View>
          <Text style={styles.title}>{serie.name}</Text>
          <Text>
            Nombre de saisons : {details.number_of_seasons}
          </Text>
          <Text>
            Nombre apisodes : {details.number_of_episodes}
          </Text>
    
          

          <View style={{ flexWrap: "wrap" }}>
           
          {details.genres &&  <GenresGroup data={details.genres} />}
          </View>

          <Text style={styles.header}>Résumé</Text>
          <Text> {serie.overview} </Text>
          <Text style={styles.header}>Trailers</Text>
          <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
            {trailers.map((item, index) => {
              return index < 2 ? (
                <TrailersItems
                  image={serie.backdrop_path}
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
          <View>
              <EpisodesList seasons={seasons} />
          </View>
          <Text> Crere par  </Text>
          {/* <View>
            {details.created_by.map((detail, index) => {
              return <Text>
               { detail.name}
              </Text>
            })}
          </View> */}
        </View>
        
      </ScrollView>
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  cover_image: {
    height: 285,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
  },
  title: {
  fontSize: 22,
    fontWeight: "bold",
    alignItems:"center",
  },
  square: {
    width: 100,
    height: 150,
    backgroundColor: "red",
    zIndex: 1,
    position: "absolute",
    top: 220,
    left: 10,
    borderRadius: 20
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
    borderRadius: 20
  }
});