import React, {useEffect, useState} from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import Constants from "expo-constants";
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from 'axios'
import OtherMoviesList from '../components/OtherMoviesList'

export default function ActorDetail(props) {
    const actor = props.route.params.actor

    const [otherMovies, setOtherMovies] = useState([])

    useEffect(() => {
        axios
      .get(
        "https://api.themoviedb.org/3/person/" +
        actor.id +
          "/movie_credits?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=en-EN"
      )
      .then((response) => {
        setOtherMovies(response.data.cast)
      })
      .catch((error) => {
        console.log(error);
      });
    }, [])

    return (
        <View style={styles.container}>
      <ScrollView>
        <TouchableWithoutFeedback>
          <MaterialCommunityIcons
            onPress={() => props.navigation.pop()}
            style={{
              position: "absolute",
              top: Constants.statusBarHeight + 10,
              left: 10,
              zIndex: 9999,
              paddingRight: 20,
              paddingBottom: 20,
            }}
            name="chevron-left"
            color={"white"}
            size={35}
          />
        
        

        <Image
          resizeMode={"cover"}
          style={styles.cover_image}
          source={{
            uri: "https://image.tmdb.org/t/p/w500" + actor.profile_path 
          }}
        />
        </TouchableWithoutFeedback>
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
              <Text style={styles.title}>{actor.name} </Text>
              <Text style={{ flexWrap: "wrap" }}>Né·e le {actor.birthday} à {actor.place_of_birth} </Text>
            
            </View>
        
          </View>
     
        { actor.biography ? <View>
            <Text style={styles.header}>Biography</Text>
          <Text>
              {actor.biography}
          </Text>
        </View> : null }
        <Text style={styles.header}>
                Popular movies
            </Text>
        <ScrollView horizontal={true}>
        {otherMovies.map((item, index) => {
            return index < 20 ? (
              <OtherMoviesList otherMovies={item} key={index} />
            ) : (<View key={index} />);
          })}
           
           </ScrollView>
        </View>
        
      </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    cover_image: {
      height: 400,
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
      marginTop: 12
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
    },
  });
