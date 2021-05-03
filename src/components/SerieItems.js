import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function SerieItems({ serie }) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
       onPress={() => navigation.navigate("SerieDetail", { serie: serie })}
    >
      <View style={styles.list}>
        <Image
          style={styles.cover_image}
          source={{
            uri: "https://image.tmdb.org/t/p/w500" + serie.backdrop_path,
          }}
        />
        <Text style={{ width: 171 }}> {serie.name} </Text>
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
