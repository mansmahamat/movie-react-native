import { useNavigation } from "@react-navigation/native";
import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function SimilarSerie({similar}) {
    const navigation = useNavigation();
    
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("SerieDetail", { serie: similar })}>
        <View style={{ marginRight: 10 }}>
        <Image
          resizeMode={"cover"}
          style={styles.images}
          source={{
            uri: "https://image.tmdb.org/t/p/w500" + similar.poster_path ,
          }}
        />
        <Text style={{ flexWrap: "wrap", width: 91 }}>{similar.name}</Text>
       
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
