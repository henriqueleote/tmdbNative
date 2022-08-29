import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions,Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { SocialIcon } from 'react-native-elements'



const LoginScreen = () => {

    useEffect(()=> {
        GoogleSignin.configure({
            webClientId: '335520103021-0qtan5usoc883epj7sek5rv1fmaqilea.apps.googleusercontent.com',
        });
    })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);

    const handlePasswordVisibility = () => {
        if (passwordVisibility === true) {
          setPasswordVisibility(!passwordVisibility);
        } else if (passwordVisibility === false) {
          setPasswordVisibility(!passwordVisibility);
        }
    };

    const emailSignIn = () => {
      try {
        if (email.trim().length == 0) alert('Type in email')
        else if (password.trim().length == 0) alert('Type in password')
        else auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };

    async function googleSignIn() {
        try{
            // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
        } catch (error) {
            alert(error);
            console.log(error);
          }
      }

    const facebookSignIn = () => {
        
    }

    const twitterSignIn = () => {
        
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
                <TouchableOpacity style={styles.clickable} onPress={googleSignIn}>
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
    });


export default LoginScreen;