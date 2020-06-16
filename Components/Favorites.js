import React from 'react'
import { StyleSheet, Text, FlatList, View, ImageBackground } from 'react-native'
import Plant from './Plant'
import Avatar from './Avatar'
import { connect } from 'react-redux'

class Favorites extends React.Component {

  constructor(props){
    super(props)
    this.state={
      plants: []
    }

  }


  _afficherDetail = (plant) =>{
    this.props.navigation.navigate('DetailPlant', {plant: plant})
  }

  render() {
    return (
      <ImageBackground style={styles.bgCont} source={require('../assets/imgBackgroundOff.jpg')} >
      <View style={styles.main_container}>
          <View style={styles.avatar_container}>
            <Avatar/>
          </View>
        <FlatList
          style={styles.list}
          data={this.props.favoritesPlant}
          //extraData={this.props.favoritesPlant}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <Plant plant={item}
                                         afficherDetailPlant={this._afficherDetail}
                                         enFavor={(this.props.favoritesPlant.findIndex(film => film.id === item.id) !== -1) ? true : false}
                                         />}
        />
      </View>
      </ImageBackground>
    )
  }
}

Favorites.navigationOptions={headerStyle:{backgroundColor:'#91c9bc'}}

const styles = StyleSheet.create({
  bgCont:{
    flex: 1,
    width: null,
    height: null,
  },
  list: {
    flex: 1
  },
  main_container: {
    flex: 1
  },
  avatar_container: {
    alignItems: 'center',
    marginBottom: 5
  }
})

const mapStateToProps = state => {
  return {
    favoritesPlant: state.toggleFavorite.favoritesPlant
  }
}

export default connect(mapStateToProps)(Favorites)
