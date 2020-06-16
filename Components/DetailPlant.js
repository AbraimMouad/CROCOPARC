import React from 'react';
import { Share, Alert, Platform, StyleSheet, Text, View, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import FavoriteAnimation from '../Animations/FavoriteAnimation';
import { connect } from 'react-redux';


class DetailPlant extends React.Component {

  //Pour partager plant pour IOS
  _updateNavigationParams(){
    const plnt=this.props.navigation.state.params.plant
    this.props.navigation.setParams({
      //sharePlant: this.sharePlant,
      plant: plnt
    })
  }

  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state
      // On accède à la fonction sharePlant et au plant via les paramètres qu'on a ajouté à la navigation
      if (params.plant != undefined && Platform.OS === 'ios') {
        return {
            // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
            headerRight: <TouchableOpacity
                            style={styles.shareTouchableios}
                            onPress={() => {
                              Share.share({title: params.plant.title, message: params.plant.overview})
                                .then(
                                  Alert.alert(
                                    'Succès',
                                    'Plant partagé',
                                    [
                                      {text: 'OK', onPress: ()=>{}},
                                    ]
                                  )
                                )
                                .catch( err=>
                                  Alert.alert(
                                    'Echec',
                                    'Plant non partagé',
                                    [
                                      {text: 'OK', onPress: ()=>{}},
                                    ]
                                  )
                                )
                            }}>
                            <Image
                              style={styles.shareImg}
                              source={require('../assets/share-ios.png')} />
                          </TouchableOpacity>
        }
      }
  }
//**********************
  constructor(props){
    super(props)
    //this.sharePlant = this.sharePlant.bind(this)
  }

  imgSource(origine){
    if(origine.length < 14){
      return(
        <Image
          style={{width:50, height:50, marginLeft: 9}}
          source={require('../assets/Asie.png')}
        />
      )
    }else if(origine.length > 20){
      return(
        <Image
          source={require('../assets/Asielarge.png')}
        />
      )
    }else{
      return(
        <Image
          source={require('../assets/AsieMed.png')}
        />
      )
    }
  }

  //Pour partager plant pour Android
  sharingButton(plnt){
    if(plnt != undefined && Platform.OS === 'android'){
      return (
        <TouchableOpacity
          style={styles.shareTouchable}
          onPress={() => this.sharePlant()}>
          <Image
            style={styles.shareImg}
            source={require('../assets/Share-Android.png')} />
        </TouchableOpacity>
      )
    }
  }

  sharePlant(){
    const plnt=this.props.navigation.state.params.plant
    Share.share({title: plnt.title, message: plnt.overview})
      .then(
        Alert.alert(
          'Succès',
          'Plant partagé',
          [
            {text: 'OK', onPress: ()=>{}},
          ]
        )
      )
      .catch( err=>
        Alert.alert(
          'Echec',
          'Plant non partagé',
          [
            {text: 'OK', onPress: ()=>{}},
          ]
        )
      )
  }

  /*componentDidMount(){
    this.setState({plantfav: this.props.navigation.state.params.plant})
  }*/

/*  componentDidUpdate(){
    console.log(this.props.favoritesPlantt)
  }*/

  Addfavorite(plant){
    const action ={ type:"TOGGLE_FAVORITE", value:plant}
    this.props.dispatch(action)
  }

  mapSwitch(plnt){
    this.props.navigation.navigate('MapScreen', {plant: plnt})
  }

  displayImgFav(plant){
    var imgSrc= require('../assets/fav.png')
    var shouldEnlarge = false
    if(this.props.favoritesPlant.findIndex(item => item.id === plant.id) !== -1){
      imgSrc= require('../assets/favpl.png')
      var shouldEnlarge = true
    }
    return (
      <FavoriteAnimation shouldEnlarge={shouldEnlarge}>
        <Image
          style={styles.favorite_img}
          source={imgSrc}
        />
      </FavoriteAnimation>
    )
  }

  render() {
    console.log(this.props)
    const plant=this.props.navigation.state.params.plant
    const origine=plant.origine
    return (
      <View style={styles.main_container}>
        <ScrollView style={styles.scrollview_container}>
        <Image
          style={styles.image}
          source={{uri: plant.img}}
        />
        <Text style={styles.title_text}>{plant.title}</Text>
        <TouchableOpacity onPress={() => this.Addfavorite(plant)}
                          style={styles.fav_cntainer}>
            {this.displayImgFav(plant)}
        </TouchableOpacity>
        <View style={styles.header_container}>

          <View style={styles.title_text1}>
            <Text>Famille :</Text>
            <Text style={{fontWeight: 'bold',fontSize: 15, color: '#386837'}}>{plant.famille}</Text>
          </View>

          <View style={{marginRight: 15}}>
            {
              this.imgSource(origine)
            }
            <Text style={styles.flm_text}>{plant.origine}</Text>
          </View>
        </View>

        <Text style={styles.description_text}>{plant.overview}</Text>
        <Text style={styles.default_title}>Culture</Text>
        <Text style={styles.description_text}>{plant.culture}</Text>

        <TouchableOpacity onPress={() => this.mapSwitch(plant)} >
            <Text>Map View  >> </Text>
        </TouchableOpacity>

        </ScrollView>
        {this.sharingButton(plant)}
      </View>
    )
  }
}



const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
    marginBottom: 15
  },
  title_text1: {
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
    paddingLeft: 15,
    paddingTop:22
  },
  flm_text:{
    fontWeight: 'bold',
    fontSize: 15,
    color: '#666666'
  },
  flm_text_Stt:{
    color: '#666666',
    textAlign: "left"
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    fontSize: 16,
    color: '#666666',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    textAlign: 'justify'
  },
  default_title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#386837'
  },
  fav_cntainer: {
    alignItems: 'center'
  },
  favorite_img: {
    flex: 1,
    width: null,
    height: null
  },
  shareTouchable: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#007934',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareImg: {
    width: 30,
    height: 30
  },
  shareTouchableios: {
    marginRight: 8
  }
})

const mapStateToProps = (state) => {
  return{
    favoritesPlant: state.toggleFavorite.favoritesPlant
  }
}

export default connect(mapStateToProps)(DetailPlant)
