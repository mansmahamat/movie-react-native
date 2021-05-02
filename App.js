import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image} from 'react-native';

//navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//redux
import { Provider } from 'react-redux';
import { store, appPersist } from './src/redux/store'
import { PersistGate }  from 'redux-persist/integration/react'


//Screens
import HomeScreen from './src/screens/HomeScreen'
import WishlistScreen from './src/screens/WishlistScreen'
import MovieDetail from './src/screens/MovieDetail'
import SerieDetail from './src/components/SerieDetail'
import MainRoot from './src/screens/MainRoot'


const Stack = createStackNavigator();

const switchNavigator = createSwitchNavigator({

  homeStack: createBottomTabNavigator({

    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarOptions: {
              activeTintColor: '#1d1d1d',
              style: {
                backgroundColor: '#FFF'
              }
            },
            tabBarIcon: ({ focused}) => {
                let icon = focused === true ? require('./src/images/home_icon.png') : 
                require('./src/images/home_n_icon.png')
                return <Image source={icon} style={styles.tabIcon} />
            }

        }
    },
    Wishlist: {
      screen: WishlistScreen,
      navigationOptions: {
          tabBarOptions: {
            activeTintColor: '#1d1d1d',
            style: {
              backgroundColor: '#FFF'
            }
          },
          tabBarIcon: ({ focused}) => {
              let icon = focused === true ? require('./src/images/wish_icon.png') : 
              require('./src/images/wish_n_icon.png')
              return <Image source={icon} style={styles.tabIcon} />
          }

      }
  },

  })


})


const App = createAppContainer(
  <NavigationContainer>
    <Stack.Navigator  screenOptions={{ headerShown:false, }} >
      <Stack.Screen
        name="MainRoot"
        component={MainRoot}
        options={{ title: 'MainRoot' }}
      />
       <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ title: 'MovieDetail' }}
      />
      <Stack.Screen
        name="SerieDetail"
        component={SerieDetail}
        options={{ title: 'SerieDetail' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
)


export default () => {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={appPersist}>
        <NavigationContainer>
    <Stack.Navigator  screenOptions={{ headerShown:false, }} >
      <Stack.Screen
        name="MainRoot"
        component={MainRoot}
        options={{ title: 'MainRoot' }}
      />
       <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ title: 'MovieDetail' }}
      />
      <Stack.Screen
        name="SerieDetail"
        component={SerieDetail}
        options={{ title: 'SerieDetail' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
        </PersistGate>
      </Provider>
  )
};


const styles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30
  },
});
