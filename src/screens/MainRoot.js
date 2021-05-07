import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Constants from "expo-constants";
import React from "react";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "./HomeScreen";
import SerieScreen from "./SerieScreen";
import WishlistScreen from "./WishlistScreen";

export default function MainRoot() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#998CF8",
        inactiveTintColor: "#999",
        style: {
          backgroundColor: "#111112",
        },
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
