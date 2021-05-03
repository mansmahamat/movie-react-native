import React from 'react'
import { Text, View } from 'react-native'

export default function EpisodesList({seasons}) {
    return (
        <View>
            {seasons.map((season, index) => {
                    return  (
                        <View  key={index} >
                            <Text style={{ fontSize: 15}}>
                               {season.name}
                            </Text>
                        </View>
                    ) 
                })}
        </View>
    )
}
