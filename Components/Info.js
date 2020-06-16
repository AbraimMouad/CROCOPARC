import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, Image, ImageBackground } from "react-native";

export default class Info extends Component {

  render() {
    return (
      <ImageBackground style={styles.bgCont} source={require('../assets/imgBackgroundOff.jpg')} >
      <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.image}
          source={require('../assets/infoPratique.jpg')}
        />
        <Text style={styles.description_text}>
          Activité de plus en plus appréciée, le jardinage comprend de nombreuses techniques qu'il faut apprendre à maîtriser afin de profiter pleinement de son jardin sans danger et en suivant la réglementation. Connaître les bonnes époques de plantations, savoir tailler, greffer, bouturer, tuteurer, mais aussi désherber sont des étapes nécessaires pour avoir un beau jardin. C'est aussi ici que vous apprendrez l'influence de la lune sur les végétaux et comment s'en inspirer pour mieux jardiner !
        </Text>
        <Image
          style={styles.image}
          source={require('../assets/infoPratiquee.jpg')}
        />
        <Text style={styles.description_text}>
          Emplacement dédié à la gourmandise, le verger doit être cultivé dans les règles de l'Art pour produire tout au
          long de l'année grâce à des récoltes échelonnées. Découvrez tous les fruitiers que vous pourrez y faire pousser selon votre région, mais aussi comment les planter, les entretenir, les traiter, les tailler et les multiplier par semis, bouturage ou greffage. Vous apprendrez également dans cette rubrique à les cultiver en pot et à les hiverner en cas d'hivers rigoureux.
        </Text>
        </ScrollView>
      </View>
      </ImageBackground>
    );
  }
}

Info.navigationOptions={headerStyle:{backgroundColor:'#91c9bc'}}

const styles = StyleSheet.create({
  bgCont:{
    flex: 1,
    width: null,
    height: null,
  },
  container: {
    flex: 1
    //  justifyContent: "space-between",
    //backgroundColor: "#fafafa"
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
  image: {
    height: 169,
    //margin: 5
  }
});
