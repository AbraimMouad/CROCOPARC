import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

export default class LoadingScreen extends React.Component {

  // Somewhere in your code
  signIn = async () => {
    // alert("test")
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // do what you want here after getting user information
      console.log(userInfo, "USER INFORMATION")
      this.props.navigation.navigate("App");
      this.setState({ userInfo });

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
    function(result) {
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
              console.log(json,"DATA")
            })
            .catch(() => {
              reject('ERROR GETTING DATA FROM FACEBOOK')
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
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style   = {{ width: 192, height: 48 }}
          size    = {GoogleSigninButton.Size.Wide}
          color   = {GoogleSigninButton.Color.Dark}
          onPress = {this.signIn}
          />
           <TouchableOpacity
            onPress = {this.signOut}
           >
             <Text>Logout</Text>
           </TouchableOpacity>

            <View>

            <TouchableOpacity
            onPress = {this.onFBLogin}
            >
              <Text>FB LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress = {this.onFBLogout}
            >
              <Text>FBLOGOUT Btn</Text>
            </TouchableOpacity>
              <LoginButton
                readPermissions={["email", "name"]}
                onLoginFinished={
                  (error, result) => {

                    if (error) {
                      console.log("login has error: " + result.error);
                    } else if (result.isCancelled) {
                      console.log("login is cancelled.");
                    } else {

                      AccessToken.getCurrentAccessToken().then(
                        (data) => {
                          console.log(data.accessToken.toString())
                          this.initUser(data.accessToken)
                        }
                      )
                    }
                  }
                }
                onLogoutFinished={() => console.log("logout.")}/>
            </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
