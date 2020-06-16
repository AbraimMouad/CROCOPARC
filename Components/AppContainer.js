import React from 'react';
//import { YellowBox } from 'react-native';
import Navigation from '../Routes/Navigation'
import { Provider } from 'react-redux'
import Store from '../Store/ConfigStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

//YellowBox.ignoreWarnings( [ 'Module RTCImageLoader']);

export default class AppContainer extends React.Component {
  render() {
    let persistor = persistStore(Store)
    return (
        <Provider store={Store}>
          <PersistGate persistor={persistor}>
            <Navigation />
          </PersistGate>
        </Provider>
    );
  }
}
