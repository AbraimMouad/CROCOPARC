import React from 'react';
import { YellowBox,Text, View } from 'react-native';
import AppContainer from './Components/AppContainer'
import ScanScreen from './Components/ScanScreen'
//YellowBox.ignoreWarnings( [ 'Module RTCImageLoader']);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
