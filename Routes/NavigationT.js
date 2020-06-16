import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Search from '../Components/Search'
import DetailPlant from '../Components/DetailPlant'
import Favorites from '../Components/Favorites'
import LoginPage from '../Components/LoginPage'
import ScanScreen from '../Components/ScanScreen'

const Navigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  DetailPlant: {
    screen: DetailPlant,
    navigationOptions: {
      title: ''
    }
  }
})

const NavigatorFavorite = createStackNavigator({
  Search: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favorite'
    }
  },
  DetailPlant: {
    screen: DetailPlant,
    navigationOptions: {
      title: ''
    }
  }
})

const NavigatorQrCode = createStackNavigator({
  QrScreen: {
    screen: ScanScreen,
    navigationOptions: {
      title: 'QR Code Scanner'
    }
  },
  DetailPlant: {
    screen: DetailPlant,
    navigationOptions: {
      title: ''
    }
  }
})

const BottomTabNav = createBottomTabNavigator({
  Search: {
    screen: Navigator,
    navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../assets/search.png')}
            style={styles.icon}/>
        }
      }
  },
  QrCode: {
    screen: NavigatorQrCode,
    navigationOptions: {
        tabBarIcon: () => {
          return (<View style={styles.shareTouchable}>
            <Image
            source={require('../assets/QrCode.png')}
            style={styles.iconCenter}/>
            </View>)
        }
      }
  },
  Favorites: {
    screen: NavigatorFavorite,
    navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../assets/favpl.png')}
            style={styles.icon}/>
        }
      }
  }
},
{
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
    inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
    showLabel: false,
    showIcon: true
  }
})

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  },
  iconCenter: {
    width: 50,
    height: 50
  },
  shareTouchable: {
    width: 80,
    height: 80,
    bottom: 14,
    borderRadius: 60,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

//export default createAppContainer(BottomTabNav);
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: LoginPage,
    App: BottomTabNav
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
