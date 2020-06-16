import React ,{Component} from "react";
//import Geolocation from '@react-native-community/geolocation';
import MapView ,{ Marker,PROVIDER_GOOGLE } from 'react-native-maps'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    Platform,
    Dimensions
  } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

export default class MapScreen extends Component{

    state ={}

    componentDidMount() {
        this.requestLocationPermission();
      }
/*constructor(props){
    super(props);
    this.state={
        latitude:0,
        longitude:0,
        error:null
    };
}

componentDidMount(){
    navigator.geolocation.getCurrentPosition(position=>{
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null

        });
    },
    error=>this.setState({error:error.message}),
    {enableHighAccuracy:true, timeout:2000,maximumAge:2000}
    );
}
<Marker coordinate={this.state} />
initialRegion={this.state.initialPosition}
ref={map => this._map = map}
<MapView.Marker coordinate={{latitude: 30.388371,
                    longitude: -9.483695}}/>

*/



locateCurrentPosition = () => {
        Geolocation.getCurrentPosition(
        position => {

                  //  alert(JSON.stringify(position));
            let initialPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta:0.015,
            longitudeDelta:0.0121
            }

            this.setState({ initialPosition });
        },
        //error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
        )
    }



  requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
            var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            console.log('iPhone: ' + response);

            if (response === 'granted') {
                this.locateCurrentPosition();
            }
            } else {
            var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            console.log('Android: ' + response);

            if (response === 'granted') {
                this.locateCurrentPosition();
            }
            }
        }




        render(){
          const plant=this.props.navigation.state.params.plant
            return(
            <View style={{ flex: 1 }}>
                < MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex:1 }}
                ref={map => this._map = map}
                initialRegion={this.state.initialPosition}
                region={{latitude: 30.388371,
                    longitude: -9.483695,
                    latitudeDelta:0.015,
                    longitudeDelta:0.0121}}
                showsUserLocatsion={true}
                loadingEnabled
                >
                <Marker
                    coordinate={{latitude: 30.388371,
                    longitude: -9.483695}}
                    title={plant.title}>
                    <Image source={require('../assets/marker.png')}  />
                </Marker>




                    </MapView>


                </View>

    );

    }}
