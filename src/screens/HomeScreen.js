import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { } from 'react-native-gesture-handler';

const HomeScreen = () => {

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.pageTitle}>Home</Text>
            </View>
            <Text>Home</Text>
        </View>

    );

    
};

const styles = StyleSheet.create({
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
        color: 'black',        
    },
});


export default HomeScreen;