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
import MapScreen from '../Components/MapScreen'
import Info from '../Components/Info'


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
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions: {
      title: ''
    }
  }
})

const NavigatorFavorite = createStackNavigator({
  Search: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  DetailPlant: {
    screen: DetailPlant,
    navigationOptions: {
      title: ''
    }
  },
  MapScreen: {
    screen: MapScreen,
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
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions: {
      title: ''
    }
  }
})

const NavigatorInfos = createStackNavigator({
  Information: {
    screen: Info,
    navigationOptions: {
      title: 'Infopratique'
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
          return <Image
            source={require('../assets/QrCode.png')}
            style={styles.icon}/>
        }
      }
  },
  Favorites: {
    screen: NavigatorFavorite,
    navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../assets/favplW.png')}
            style={styles.icon}/>
        }
      }
  },
  Info: {
    screen: NavigatorInfos,
    navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../assets/info.png')}
            style={styles.icon}/>
        }
      }
  }
},
{
  tabBarOptions: {
    activeBackgroundColor: '#d8e8e3', // Couleur d'arrière-plan de l'onglet sélectionné
    inactiveBackgroundColor: '#e7f5f1', // Couleur d'arrière-plan des onglets non sélectionnés
    showLabel: false,
    showIcon: true,
    style: {height: 44}
  }
})

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25
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
    Auth: LoginPage,
    App: BottomTabNav
  },
  {
    initialRouteName: 'Auth',
  }
));
