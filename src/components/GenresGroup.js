import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function GenresGroup({data}) {
    return (
        <View style={styles.genresContainer} >
                {data.map((item, index) => {
                    return index < 2 ? (
                        <View style={styles.genresItem} key={index} >
                            <Text style={{ fontSize: 15}}>
                                {item.name}
                            </Text>
                        </View>
                    ) : <View key={index}/>
                })}
        
        </View>
    )
}
const styles = StyleSheet.create({
    genresContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 35
    },
    genresItem : {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        
        marginRight: 10,
        marginBottom: 5,
        borderRadius: 19,
        borderWidth: 1,
        borderColor: "red"
    }
})