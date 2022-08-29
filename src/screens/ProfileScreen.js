import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import LoginScreen from './LoginScreen';

const ProfileScreen = () => {

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
            <Text style={{ color: '#ffffff' }}>LOG OUT</Text>
          </TouchableOpacity>
        </View>

    );

    
};

const styles = StyleSheet.create({
    main:{
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
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