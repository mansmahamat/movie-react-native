import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import {
  addToWishList,
  addToWishListSerie,
  fetchMovies,
  removeFromWishlist,
  removeFromWishlistSerie,
} from "../redux/actions";

const _WishlistScreen = (props) => {
  const navigation = useNavigation();

  const { movieReducer, serieReducer } = props;
  const { wishlist } = movieReducer;
  const { wishlist_serie } = serieReducer;

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "600",
          color: "#998CF8",
          marginLeft: 20,
          marginBottom: 20,
        }}
      >
        Favoris
      </Text>

      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={wishlist}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.movieCard}>
            <Image
              resizeMode="stretch"
              style={{
                display: "flex",
                flex: 5,
                height: "100%",
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
              source={{
                uri: "https://image.tmdb.org/t/p/w500" + item.backdrop_path,
              }}
            />

            {item.name && (
              <Text style={{ flex: 5, padding: 10, fontSize: 14 }}>
                {" "}
                {item.name} (Série){" "}
              </Text>
            )}
            {item.title && (
              <Text style={{ flex: 5, padding: 10, fontSize: 14 }}>
                {" "}
                {item.title} (Film){" "}
              </Text>
            )}
            {item.title && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MovieDetail", { movie: item })
                }
                style={{
                  flex: 2,
                  height: "100%",
                  backgroundColor: "#998CF8",
                  justifyContent: "center",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <Text style={{ fontSize: 40, color: "#FFF" }}> ▶</Text>
              </TouchableOpacity>
            )}

            {item.name && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SerieDetail", { serie: item })
                }
                style={{
                  flex: 2,
                  height: "100%",
                  backgroundColor: "#998CF8",
                  justifyContent: "center",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <Text style={{ fontSize: 40, color: "#FFF" }}> ▶</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  movieReducer: state.movieReducer,
  serieReducer: state.serieReducer,
});

const WishlistScreen = connect(mapStateToProps, {
  fetchMovies,
  addToWishList,
  removeFromWishlist,
  addToWishListSerie,
  removeFromWishlistSerie,
})(_WishlistScreen);

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#111112",
    marginTop: Constants.statusBarHeight,
  },
  movieCard: {
    width: Dimensions.get("screen").width - 10,
    height: 110,
    backgroundColor: "#FFF",
    margin: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
