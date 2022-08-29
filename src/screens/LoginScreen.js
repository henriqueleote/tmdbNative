import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions,Image, ToastAndroid } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import RBSheet from "react-native-raw-bottom-sheet";


const LoginScreen = () => {

  const refRBSheet = useRef();

    useEffect(()=> {
        GoogleSignin.configure({
            webClientId: '335520103021-0qtan5usoc883epj7sek5rv1fmaqilea.apps.googleusercontent.com',
        });
    })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bottomEmail, setBottomEmail] = useState('');
    const [bottomPassword, setBottomPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [bottomPasswordVisibility, setBottomPasswordVisibility] = useState(true);

    const handlePasswordVisibility = () => {
        if (passwordVisibility === true) {
          setPasswordVisibility(!passwordVisibility);
        } else if (passwordVisibility === false) {
          setPasswordVisibility(!passwordVisibility);
        }
    };

    const handleBottomPasswordVisibility = () => {
      if (bottomPasswordVisibility === true) {
        setBottomPasswordVisibility(!bottomPasswordVisibility);
      } else if (bottomPasswordVisibility === false) {
        setBottomPasswordVisibility(!bottomPasswordVisibility);
      }
  };

            
    

    const emailSignIn = () => {
      try {
        if (email.trim().length == 0) ToastAndroid.show('Email is mandatory', ToastAndroid.SHORT)
        else if (password.trim().length == 0) ToastAndroid.show('Password is mandatory', ToastAndroid.SHORT)
        else auth().signInWithEmailAndPassword(email.trim(), password)
        .then(() => console.log("Signed in!"))
        .catch(error => {  
          console.log(error);
          switch(error.code) {
            case 'auth/invalid-email':
              ToastAndroid.show('Email not valid', ToastAndroid.SHORT);
              break;
            case 'auth/user-disabled':
              ToastAndroid.show('This account has been disabled', ToastAndroid.SHORT);
              break;
            case 'auth/user-not-found':
              ToastAndroid.show('There is no account registered with this email', ToastAndroid.SHORT);
              break;
            case 'auth/wrong-password':
              ToastAndroid.show('Password is wrong', ToastAndroid.SHORT);
              break;
         }
       })
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };

    const emailRegister = () => {
      try {
        if (bottomEmail.trim().length == 0) ToastAndroid.show('Email is mandatory', ToastAndroid.SHORT)
        else if (bottomPassword.trim().length == 0) ToastAndroid.show('Password is mandatory', ToastAndroid.SHORT)
        else 
        auth().createUserWithEmailAndPassword(bottomEmail.trim(),bottomPassword)
        .then(() => console.log("Signed up!"))
        .catch(error => {   
          console.log(error);
          switch(error.code) {
            case 'auth/email-already-in-use':
              ToastAndroid.show('Email already in use', ToastAndroid.SHORT);
              break;
            case 'auth/invalid-email':
              ToastAndroid.show('Email not valid', ToastAndroid.SHORT);
              break;
            case 'auth/operation-not-allowed':
              ToastAndroid.show('Something went wrong with the system, please reach out to support', ToastAndroid.SHORT);
              break;
            case 'auth/weak-password':
              ToastAndroid.show('Password not strong enough, please use characteres and numbers', ToastAndroid.SHORT);
              break;
         }
       })
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }

    async function googleSignIn() {
        try{
            // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential)
        .then(() => console.log("Signed in!"))
        .catch(error => {   
          console.log(error);
          switch(error.code) {
            case 'auth/account-exists-with-different-credential':
              ToastAndroid.show('There is already an account with this credentials', ToastAndroid.SHORT);
              break;
            case 'auth/invalid-credential':
              ToastAndroid.show('Credential not valid', ToastAndroid.SHORT);
              break;
            case 'auth/operation-not-allowed':
              ToastAndroid.show('Something went wrong with the system, please reach out to support', ToastAndroid.SHORT);
              break;
            case 'auth/user-disabled':
              ToastAndroid.show('This account has been disabled', ToastAndroid.SHORT);
              break;
            case 'auth/user-not-found':
              ToastAndroid.show('There is no account registered with this email', ToastAndroid.SHORT);
              break;
            case 'auth/wrong-password':
              ToastAndroid.show('Password is wrong', ToastAndroid.SHORT);
              break;
            case 'auth/invalid-verification-code':
              ToastAndroid.show('The verification code is invalid', ToastAndroid.SHORT);
              break;
            case 'auth/invalid-verification-id':
              ToastAndroid.show('The verification ID is invalid', ToastAndroid.SHORT);
              break;
         }
       });
        } catch (error) {
            alert(error);
            console.log(error);
          }
    }

    const facebookSignIn = () => {
        
    }

    function twitterSignIn() {
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>TMDBNative</Text>
            <View style={styles.inputView1} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="E-mail" 
                    placeholderTextColor="white"
                    onChangeText={setEmail}/>
            </View>
            <View style={styles.inputView2}>
                <TextInput
                  style={styles.inputText}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="newPassword"
                  placeholderTextColor="white"
                  secureTextEntry={passwordVisibility}
                  enablesReturnKeyAutomatically
                />
            <TouchableOpacity onPress={handlePasswordVisibility} style={styles.passwordEyeView}>
              <Image  style={styles.passwordEye} source={passwordVisibility ? require('../../assets/icons/eye-off.png') : require('../../assets/icons/eye.png')}></Image>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginBtn}  onPress={emailSignIn}>
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.dividor}/>
            <Text style={styles.signup}>Don't have an account?</Text>
            <View style={styles.social}>
                <TouchableOpacity style={styles.clickable} onPress={() => refRBSheet.current.open()}>
                    <Image style={styles.email} source={require('../../assets/icons/email.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clickable} onPress={googleSignIn}>
                    <Image style={styles.google} source={require('../../assets/icons/google.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clickable}  onPress={facebookSignIn}>
                    <Image style={styles.facebook} source={require('../../assets/icons/facebook.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clickable}  onPress={twitterSignIn}>
                    <Image style={styles.twitter} source={require('../../assets/icons/twitter.png')}/>
                </TouchableOpacity>
            </View>
            <RBSheet
              backgroundColor={'black'}
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              closeOnPressBack={true}
              minClosingHeight={200}
              height={300}
              customStyles={{
                wrapper: {
                },
                container: {
                  backgroundColor: "#191931",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  borderColor:'white',
                },
                draggableIcon: {
                  backgroundColor: "white"
                }
              }}
            >
              <View style={styles.bottomContainer}>
                <Text style={styles.bottomTitle}>Register</Text>
                <View style={styles.bottomInputView1} >
                <TextInput  
                    style={styles.bottomInputText}
                    placeholder="E-mail" 
                    placeholderTextColor="white"
                    onChangeText={setBottomEmail}/>
            </View>
            <View style={styles.bottomInputView2}>
                <TextInput
                  style={styles.bottomInputText}
                  value={bottomPassword}
                  onChangeText={setBottomPassword}
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="newPassword"
                  placeholderTextColor="white"
                  secureTextEntry={bottomPasswordVisibility}
                  enablesReturnKeyAutomatically
                />
            <TouchableOpacity onPress={handleBottomPasswordVisibility} style={styles.passwordEyeView}>
              <Image style={styles.passwordEye} source={bottomPasswordVisibility ? require('../../assets/icons/eye-off.png') : require('../../assets/icons/eye.png')}></Image>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.bottomRegisterBtn}  onPress={emailRegister}>
              <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
              </View>
            </RBSheet>
        </View>
    );

    
};

const styles = StyleSheet.create({
    container:{
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        backgroundColor: "#191931",
    },
    logo:{
        fontWeight:"bold",
        fontSize: 45,
        color:"#ed3a39",
        marginTop: 180,
        textAlign:'center',
      },
    inputView1:{
        width:"80%",
        backgroundColor:"#333336",
        borderRadius:25,
        height:50,
        justifyContent:"center",
        padding:20,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 40,
      },
      inputView2:{
        width:"80%",
        backgroundColor:"#333336",
        borderRadius:25,
        height:50,
        justifyContent:"center",
        padding:20,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
      },
      inputText:{
        height:50,
        color:"white",
      },
      loginBtn:{
        width:"80%",
        backgroundColor:"#ed3a39",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 40,
      },
      forgot:{
        color:"white",
        fontSize:15,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
      },
      loginText:{
        color:"white"
      },
      dividor:{
        width: '90%',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        opacity: 0.3,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30 
      },
      signup:{
        fontSize: 15,
        color:"#ed3a39",
        textAlign:'center',
        marginTop: 30 
      },
      social: {
        width: '80%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30 
      },
      clickable: {
        width: 60,
        height: 60,
      },
      email: {
        width: 50,
        height: 50,
      },
      google: {
        width: 50,
        height: 50,
      },
      facebook: {
        width: 50,
        height: 50,
      },
      twitter: {
        width: 50,
        height: 50,
      },
      passwordEyeView: {
        position: 'absolute',
        right: 0,
        width: 50
      },
      passwordEye: {
        height: 25,
        width: 25,
      },
      bottomContainer:{
        
      },
      bottomTitle:{
        textAlign:'center',
        color: 'white',
        fontSize: 20,
        marginTop: 5
      },
      bottomInputView1:{
        width:"80%",
        backgroundColor:"#333336",
        borderRadius:25,
        height:30,
        justifyContent:"center",
        padding:20,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
      },
      bottomInputView2:{
        width:"80%",
        backgroundColor:"#333336",
        borderRadius:25,
        height:30,
        justifyContent:"center",
        padding:20,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
      },
      bottomInputText:{
        height:50,
        color:"white",
      },
      bottomRegisterBtn:{
        width:"40%",
        backgroundColor:"#ed3a39",
        borderRadius:25,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
      },
    });


export default LoginScreen;