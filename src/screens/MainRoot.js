import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import SerieScreen from "./SerieScreen";
import WishlistScreen from "./WishlistScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";





export default function MainRoot() {
 const Tab = createBottomTabNavigator();


 

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#333",
        inactiveTintColor: "#999",
      }}
    >
      
      <Tab.Screen
        options={{
          tabBarLabel: "Films",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="movie-open" color={color} size={25} />
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Séries",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="popcorn" color={color} size={25} />
          ),
        }}
        name="SerieScreen"
        component={SerieScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Favoris",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={25} />
          ),
        }}
        name="WishlistScreen"
        component={WishlistScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
