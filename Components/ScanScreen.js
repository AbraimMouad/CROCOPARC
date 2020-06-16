import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import plants from '../Data/PlantData'

export default class ScanScreen extends React.Component {
  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  };

  _afficherDetail = (plant) =>{
    this.props.navigation.navigate('DetailPlant', {plant: plant})
  }

  searchId = (e) => {
    let items = plants

    const plnt = plants.findIndex(function(item, index){
        return (item.id.toString() === e.data)
    })

    if(!Array.isArray(plnt)){
      const plantDtl = items[plnt]
      console.log(plantDtl)
      this._afficherDetail(plantDtl)
    }
  }

  render() {
    return (
      <View style={{ flex: 1}}>
      <QRCodeScanner
        onRead={this.searchId}

        //flashMode={QRCodeScanner.Constants.FlashMode.torch}
        /*topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }*/
      />
      </View>
    );
  }
}

ScanScreen.navigationOptions={headerStyle:{backgroundColor:'#91c9bc'}}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

AppRegistry.registerComponent('default', () => ScanScreen);
