import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function MovieItems({ movie }) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("MovieDetail", { movie: movie })}
    >
      <View style={styles.list}>
        <Image
          style={styles.cover_image}
          source={{
            uri: "https://image.tmdb.org/t/p/w500" + movie.backdrop_path,
          }}
        />
        <Text style={{ width: 171, color:"#fff", fontSize:16, fontWeight:"500" }}>{movie.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: "column",
    flexWrap: "wrap",
    marginRight: 10,
  },
  cover_image: {
    width: 171,
    height: 256,
    borderRadius: 10,
    marginBottom: 10,
  },
});
