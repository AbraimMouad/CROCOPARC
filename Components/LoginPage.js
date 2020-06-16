import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, ImageBackground, Image } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import Animated from 'react-native-reanimated'
import {TopGestureHandler, State} from 'react-native-gesture-handler'
import BackImg from '../assets/bg.png'
import FadeIn from '../Animations/FadeIn'


export default class LoadingScreen extends React.Component {
  constructor(props){
    super(props)
    this.state={
      onCnx: false
    }
  }

  fadeInLog(){
    if(this.state.onCnx){
      return(
        <FadeIn>
          <TouchableOpacity
           style   = {styles.buttonGoogle}
           onPress = {this.signIn}
          >
            <Image
              style={{width:23,height:23,marginRight:13}}
              source={require('../assets/Google.png')}
            />
            <Text style={{fontSize:15, fontWeight:'bold'}}> Continuer avec Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style   = {styles.buttonFacebook}
          onPress = {this.onFBLogin}
          >
            <Image
              style={{width:20 ,height:20,marginRight:15}}
              source={require('../assets/facebookWhite.png')}
            />
            <Text style={{fontSize:15, fontWeight:'bold', color: 'white'}}>
              Continuer avec Facebook
            </Text>
          </TouchableOpacity>
        </FadeIn>
      )
      }else {
        return(
          <FadeIn>
            <TouchableOpacity
            style   = {styles.buttonCnx}
            onPress = {()=>{
              this.setState({ onCnx : true })
              LoginManager.logOut()
            }}
            >
              <Text style={{fontSize:20, fontWeight:'bold'}}>
                Se connecter
              </Text>
            </TouchableOpacity>
          </FadeIn>
        )
    }
  }

  // Somewhere in your code
    signIn = async () => {
      // alert("test")
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        // do what you want here after getting user information
        console.log(userInfo, "USER INFORMATION")
        this.props.navigation.navigate("App")
        this.setState({ userInfo })

      } catch (error) {
        console.log(error, "<<<<<< ERROR >>>>>>")
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    }

    getCurrentUserInfo = async () => {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        this.setState({ userInfo });
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          // user has not signed in yet
        } else {
          // some other error
        }
      }
    }

    isSignedIn = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      this.setState({ isLoginScreenPresented: !isSignedIn });
    };

    getCurrentUser = async () => {
      const currentUser = await GoogleSignin.getCurrentUser();
      this.setState({ currentUser });
    };

    signOut = async () => {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        alert ("Sign out")
        this.setState({ user: null }); // Remember to remove the user from your app's state as well
      } catch (error) {
        console.error(error);
      }
    };

    revokeAccess = async () => {
      try {
        await GoogleSignin.revokeAccess();
        console.log('deleted');
      } catch (error) {
        console.error(error);
      }
    };


  componentDidMount() {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '959405730943-hb9aiue4b3t5p67eh2mfsok3rb8ujo61.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }


  onFBLogin = async ()=>{
    // Attempt a login using the Facebook login dialog asking for default permissions.
  LoginManager.logInWithPermissions(["email"]).then(

    /**
     * MODIFICATION
     */

    // problem is here when we use arrow function then this is automatically available inside the function
    // other wise we need to bind the function
    // So its better to use always arrow function

    (result) =>{
    if (result.isCancelled) {
      console.log("Login cancelled");
    } else {

      console.log( "Login success with permissions: " + result.grantedPermissions.toString());
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          // console.log(data.accessToken.toString(), "<<<<<<")
          // this.initUser(data.accessToken)
          fetch('https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token='+data.accessToken)
            .then((response) => response.json())
            .then((json) => {
              // Some user object has been set up somewhere, build that user here
              this.props.navigation.navigate("App")
              // console.log(this.props)
              console.log(json,"DATA")

            })
            .catch((error) => {
              console.log(error)
            })
        }
      )
    }
    },
    function(error) {
    console.log("Login fail with error: " + error);
    }
    );
  }


  onFBLogout = ()=>{
    LoginManager.logOut()
  }



  initUser = (token) => {

    fetch('https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token='+token)
    .then((response) => response.json())
    .then((json) => {
      // Some user object has been set up somewhere, build that user here
      console.log(json,"DATA")
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <ImageBackground source={BackImg} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/Crocopark.png')}
          />
          <View style={styles.textContainer}>
            <Text style={{fontSize:20, fontWeight:'bold', color: 'white'}}>
              Bienvenue sur Crocoplant votre guide
            </Text>
            <Text style={{fontSize:20, fontWeight:'bold', color: 'white'}}>
              électronique lors de votre tour
            </Text>
            <Text style={{fontSize:20, fontWeight:'bold', color: 'white'}}>
              une présentation simple et amusante
            </Text>
          </View>
        </View>
        {this.fadeInLog()}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    //alignItems: 'center',
    justifyContent: 'center'
  },
  buttonGoogle: {
    backgroundColor: 'white',
    height: 60,
    marginHorizontal: 35,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    flexDirection: 'row'
  },
  buttonFacebook: {
    backgroundColor: '#2E71DC',
    height: 60,
    marginHorizontal: 35,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    flexDirection: 'row'
  },
  logoContainer: {
    marginBottom: 200,
    alignItems: 'center',
    //justifyContent: 'flex-start',
  },
  buttonCnx: {
    backgroundColor: 'white',
    height: 50,
    marginHorizontal: 80,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    flexDirection: 'row'
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  }
})
