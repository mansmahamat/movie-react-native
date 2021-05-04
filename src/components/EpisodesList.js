import React from 'react'
import { Text, View, Image } from 'react-native'

export default function EpisodesList({creators}) {
    return (
        <View style={{flexDirection:"row"}}>
          <Text>
            Créer par  
          </Text>
            {creators?.map((creator, index) => {
                    return index < 2 ? (
                        <View style={{marginLeft: 8}} key={index} >
                            <Text style={{ fontSize: 15, fontWeight:'700'}}>
                                {creator.name}.
                            </Text>
                            
                        </View>
                    ) : <View key={index} />
                })}
        </View>
    )
}
