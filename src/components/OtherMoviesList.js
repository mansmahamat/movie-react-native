import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function OtherMoviesList(props) {
  return (
    <TouchableWithoutFeedback>
      <View style={{ marginRight: 5, marginTop: 20 }}>
        <Image
          style={styles.cover_image}
          source={{
            uri:
              "https://image.tmdb.org/t/p/w500" +
              props.otherMovies.backdrop_path,
          }}
        />
        <Text style={{ width: 171, textAlign: "center" }}>
          {" "}
          {props.otherMovies.title}{" "}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cover_image: {
    width: 171,
    height: 186,
    borderRadius: 10,
    marginBottom: 10,
  },
});
