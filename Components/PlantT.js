import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import FadeIn from '../Animations/FadeIn'


export default class Plant extends React.Component {

  displayImgFav(){
    if(this.props.enFavor){
      return (
        <Image
          style={styles.favorite_img}
          source={require('../assets/favpl.png')}
        />
      )
    }
  }

  render() {
    const plant = this.props.plant
    const afficherDetailPlant = this.props.afficherDetailPlant

    return(
      <FadeIn>
        <TouchableOpacity
        onPress={() => afficherDetailPlant(plant)}
        style={styles.main_container}>
          <Image
            style={styles.image}
            source={{uri: plant.img}}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              {this.displayImgFav()}
              <Text style={styles.title_text}>{plant.title}</Text>
              {/*<View style={{textAlign: "center"}}>
                <Text style={styles.flm_text}>{plant.famille}</Text>
                <Text style={styles.fml_text_Stt}>Famille</Text>
              </View>*/}
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={5}>{plant.overview}</Text>
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>Origine : {plant.origine}</Text>
            </View>
            <View style={styles.separator}></View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    )
}
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
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
  description_container: {
    paddingTop: 2,
    flex: 5
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  separator: {
    height: 0.35,
    marginTop: 5,
    backgroundColor: 'grey'
  },
  favorite_img: {
    width: 25,
    height: 25,
    marginRight: 5
  }

})
