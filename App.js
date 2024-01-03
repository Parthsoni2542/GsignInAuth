
import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const App = () => {
  const [data, setData] = useState({});
  const webClientId ='954839794164-ogabgft5c1tjfdhlnbrlm3m0l02r8bjq.apps.googleusercontent.com';

  useEffect(() => {
    GoogleSignin.configure({
      scope: [],
      webClientId: webClientId,
    });
  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setData(userInfo);
      console.log('userinfo', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
      } else {
        console.log('Other Error', error);
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setData('');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {data == '' ? null : (
        <View style={{flex: 0.5}}>
          <Text>Name : {data?.user?.name}</Text>
          <Text>Email : {data?.user?.email}</Text>
          <Image
            source={{uri: data?.user?.photo}}
            style={{height: 200, width: 200, resizeMode: 'contain'}}
          />

          <TouchableOpacity
            onPress={signOut}
            style={{
              height: 48,
              borderRadius: 10,
              backgroundColor: 'black',
              width: screenWidth - 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 30,
            }}>
            <Text style={{color: '#ffffff', fontWeight: '400', fontSize: 18}}>
              Sign-out
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
        <GoogleSigninButton
          style={{width: 200, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleLogin}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: screenWidth - 50,
    height: 48,
    borderRadius: 10,
    bottom: 0,
    position: 'absolute',
  },
});

export default App;