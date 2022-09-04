import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import LoginScreen from './LoginScreen';
import firestore from '@react-native-firebase/firestore';

const specificMovie = "https://api.themoviedb.org/3/movie/"
const keyAPI = "?api_key=8246306bee45758b9cae4e0b6a240224";

const ProfileScreen = () => {

    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        getMovies().then(data => getStatistics(data).then(result => setMinutes(result)));
    })

    async function getMovies() {
        var moviesData = [];
        const userRef = firestore().collection('users').doc('kPFLrsuPkLCoY3fjusGX');
        const doc = await userRef.get();
        if (doc.exists) {
          moviesData = doc.get('movies');
        } else {
          console.log('No such document!');
        }
        const data = Promise.all(
          moviesData.map(async (movie) => await (await fetch(specificMovie + movie + keyAPI)).json())
        )
        return data
      }

      async function getStatistics(data) {
        var result = 0;
        data.map(movie => {
            result += movie.runtime
        })
        return result;
      }

    async function logout() {
        await auth().signOut()
          .then(() => {
            console.log('logged out');
            return <LoginScreen />;
          })
          .catch(error => console.log(error));
      }

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.pageTitle}>Profile</Text>
            </View>
            <TouchableOpacity style={styles.logout} onPress={() => logout()} >
            <Text style={{ color: '#ffffff', textAlign:'center' }}>LOG OUT</Text>
          </TouchableOpacity>
          <Text style={{ color: '#ffffff', textAlign:'center' }}>Total {'->'} {minutes} minutes</Text>
            <Text style={{ color: '#ffffff', textAlign:'center' }}>Total {'->'} {(minutes/60).toFixed(2)} hours</Text>
        </View>

    );

    
};

const styles = StyleSheet.create({
    main:{
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        backgroundColor: "#191931",
    },
    header: {
        minHeight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },

    pageTitle: {
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: 24,
        color: 'white',        
    },
});


export default ProfileScreen;