import React from 'react'
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Image } from 'react-native'

const deviceWidth = Dimensions.get("window").width;
const imageWidth = (deviceWidth) ;
const leftPlay = (imageWidth- 94) / 2;

export default function TrailersMovies(props) {

    return (
        <TouchableWithoutFeedback onPress={() =>{ props.setModalVisible(true); props.setActiveMovieTrailerKey(props.item.key); props.setPlay(true)}}>
      <View style={{ flex: 1}}>
      <Image
        style={{
          position: "absolute",
                top: 90,
                left: leftPlay,
                zIndex: 1,
                width: 100,
                height: 100,
        }}
        source={require("../images/play.png")}
      />
        <Image
              resizeMode={"cover"}
              style={{height: 285}}
              source={{
                uri: "https://image.tmdb.org/t/p/w500" + props.movie.backdrop_path,
              }}
            />
     
    </View>
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    images: {
      height: 100,
      width: imageWidth,
      borderRadius: 21,
      marginBottom: 7
    },
  });