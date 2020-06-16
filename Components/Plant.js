import React, {PureComponent} from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'
import FadeIn from '../Animations/FadeIn'


export default class Plant extends PureComponent {

  displayImgFav(){
    if(this.props.enFavor){
      return (
        <Image
          style={styles.favorite_img}
          source={require('../assets/favBrw.png')}
        />
      )
    }
  }

  render() {
    const plant = this.props.plant
    const afficherDetailPlant = this.props.afficherDetailPlant

    let {container, cardText, card, cardImg, title, bgCont} = styles
    return(
      <FadeIn>
      <View style={bgCont} >

        <TouchableOpacity style= {card} onPress={() => afficherDetailPlant(plant)}>
          <ImageBackground style={cardImg} source={{uri: plant.img}} >
            <View style= {cardText}>
            {this.displayImgFav()}
            <Text style= {title}>
              {plant.title}
            </Text>
            </View>
            <View style={{flex:1 ,alignItems: 'flex-end'}}>
            <Image
              style={{width:60, height:60,  margin: 9,justifyContent: 'center'}}
              source={require('../assets/Asie.png')}
            />
            </View>
          </ImageBackground>

        </TouchableOpacity>
      </View>
      </FadeIn>
    )
}
}

const styles = StyleSheet.create({
  bgCont: {
    flex: 1,
    width: null,
    height: null,
    marginTop: 20
  },
  container: {
    flex: 1,
    height: 190,
    margin: 8,
    flexDirection: 'row'
  },
  cardText: {
    marginBottom: 15,
    marginLeft: 6,
    flexDirection: 'row',
    backgroundColor: '#00000055'
  },
  title: {
    fontSize: 18,
    fontWeight:'bold',
    color: '#fff',
    paddingBottom: 4,
    paddingLeft: 5,

  },
  card: {
    backgroundColor: '#fff',
    padding: 3,
    marginBottom: 5,
    marginLeft: '2%',
    width: '96%',
    shadowColor: '#000',
    shadowOpacity: 10,
    //borderRadius: 10,
    shadowOffset: {
      width:3,
      height: 3
    }
  },
  cardImg: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 1
    //justifyContent: 'flex-end',
  },
  favorite_img: {
    width: 25,
    height: 25,
    marginLeft: 5,

  }

})
