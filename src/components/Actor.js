import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState} from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableWithoutFeedback, Image } from 'react-native'
import axios from 'axios'

const deviceWidth = Dimensions.get("window").width;
const imageWidth = (deviceWidth - 0) / 2;
const leftPlay = (imageWidth- 44) / 2;

export default function Actor(props) {

  const [actorDetail, setActorDetail] = useState([])

  const navigation = useNavigation();
  
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/person/" +
        props.actor.id +
          "?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR"
      )
      .then((response) => {
        setActorDetail(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [])

    return (
        <TouchableWithoutFeedback>
        <View style={{ marginRight: 10, marginTop:10 }}>
        <Image
          resizeMode={"cover"}
          style={styles.images}
          source={{
            uri: "https://image.tmdb.org/t/p/w500" + props.actor.profile_path,
          }}
        />
        <Text style={{ flexWrap: "wrap", width: 91, color:"#fff", fontWeight:"600", fontSize: 16 }}>{props.actor.name}</Text>
       
      </View>
      </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    images: {
      height: 150,
      width: 100,
      borderRadius: 21,
      marginBottom: 7
    },
  });
