import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const MovieDetail = ({route}) => {

    const { movieData } = route.params;
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.pageTitle}>MovieDetail</Text>
            </View>
            <Text>{movieData.title}</Text>
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


export default MovieDetail;