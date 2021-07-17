import Constants from "expo-constants";
import React from 'react'
import { Text, View, StyleSheet, Dimensions, FlatList, Image, SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

export default function ResultsQuerySerie(props) {
    const queryResult = props.route.params.queryResult;
    const navigation = useNavigation();
    console.log(props)
    return (
        <SafeAreaView style={styles.container}>

<Text style={{ fontSize: 30, fontWeight: '600', color: 'white', marginLeft: 20,
        marginBottom: 20 }}>
                Search for a series
            </Text>
            <Text style={{ color: '#998CF8', fontWeight: 'bold'}}onPress={() => { props.navigation.pop(); props.route.params.resetQuery("")}}>
              Back
            </Text>
            
            {queryResult.length === 0 ? <Text style={{marginTop: 50, fontWeight: "bold", fontSize:26}}>
              No results found
            </Text> : <FlatList
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={queryResult}
            renderItem={({item, index}) =>  {
              return index < 15 ? (
                <TouchableOpacity key={index} onPress={() => navigation.navigate("SerieDetail", { serie: item })} key={index} style={styles.movieCard}>
                    <Image resizeMode="cover" 
                    style={{ display: 'flex', flex: 5, height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
                    source={ item.backdrop_path ? {
                        uri: "https://image.tmdb.org/t/p/w500" + item.backdrop_path,
                      }: {uri: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}}
                    />
                    <Text style={{ flex: 5, padding: 10, fontSize: 14 }}> {item.name} </Text>
                    <TouchableOpacity  style={{ flex: 2, height: '100%', backgroundColor: '#998CF8', justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
                        
                    </TouchableOpacity>
                </TouchableOpacity>
            ) : <View key={index}/>}}
            keyExtractor={(item) => item._id}
        />  }
            
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

  container: {
      paddingTop: 50,
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#111112',
      marginTop: Constants.statusBarHeight,
  }, 
  movieCard: {
  width: Dimensions.get('screen').width - 10,
  height: 110,
  backgroundColor: '#998CF8',
  margin: 5,
  borderRadius: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
  }
});
