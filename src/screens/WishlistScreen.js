import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { FlatList, Animated } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

import { connect } from 'react-redux'
import { fetchMovies, addToWishList, removeFromWishlist, addToWishListSerie, removeFromWishlistSerie } from '../redux/actions'
import { BASE_URL } from '../utilities';



const _WishlistScreen = (props) => {
    const navigation = useNavigation();

    const { movieReducer, serieReducer } = props
    const { wishlist} = movieReducer;
    const { wishlist_serie} = serieReducer;
    

 
    return <View style={styles.container}>
        
        <Text style={{ fontSize: 30, fontWeight: '600', color: 'gray', marginLeft: 20,
        marginBottom: 20 }}>
                Favoris
            </Text>
            <Text style={{ fontSize: 30, fontWeight: '600', color: 'gray', marginLeft: 20,
        marginBottom: 20 }}>
                Film
            </Text>
        <FlatList
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={wishlist}
            renderItem={({item, index}) => (
                <View key={index} style={styles.movieCard}>
                    <Image resizeMode="stretch" 
                    style={{ display: 'flex', flex: 5, height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
                    source={{
                        uri: "https://image.tmdb.org/t/p/w500" + item.backdrop_path,
                      }}
                    />
                    
                    {item.name  &&  <Text style={{ flex: 5, padding: 10, fontSize: 14 }}> {item.name} </Text> }
                    {item.title  && <Text style={{ flex: 5, padding: 10, fontSize: 14 }}> {item.title} </Text>}
                   {item.title && <TouchableOpacity onPress={() => navigation.navigate("MovieDetail", { movie: item })} style={{ flex: 2, height: '100%', backgroundColor: '#D92F24', justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
                        <Text style={{ fontSize: 40 , color: '#FFF'}}> ▶</Text>
                    </TouchableOpacity>}

                    {item.name  &&  <TouchableOpacity onPress={() => navigation.navigate("SerieDetail", { serie: item })} style={{ flex: 2, height: '100%', backgroundColor: '#D92F24', justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
                        <Text style={{ fontSize: 40 , color: '#FFF'}}> ▶</Text>
                    </TouchableOpacity>}
                </View>
            )}
            keyExtractor={(item) => item._id}
        />

  
    </View>
}


const mapStateToProps = (state) => ({
    movieReducer: state.movieReducer,
    serieReducer: state.serieReducer
})

const WishlistScreen = connect(mapStateToProps, { fetchMovies, addToWishList, removeFromWishlist, addToWishListSerie, removeFromWishlistSerie })(_WishlistScreen)

export default WishlistScreen;

const styles = StyleSheet.create({

    container: {
        paddingTop: 50,
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#E5E5E5'
    }, 
    movieCard: {
    width: Dimensions.get('screen').width - 10,
    height: 110,
    backgroundColor: '#FFF',
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
    }
});