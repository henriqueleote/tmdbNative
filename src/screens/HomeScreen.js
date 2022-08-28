import React, { useEffect, useState } from 'react';
import { Text, Dimensions, View, Image, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import SearchBar from "react-native-dynamic-search-bar";




const defaultAPI = "https://api.themoviedb.org/3/discover/movie?api_key=8246306bee45758b9cae4e0b6a240224";
const defaultImage = "https://image.tmdb.org/t/p/w185";


const HomeScreen = () => {

    const navigation = useNavigation();

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(defaultAPI)
        .then((res) => res.json())
        .then(data => {
            setMovies(data.results);
        })
    }, [])

        return(
        <View style={styles.main} >
            <Text style={styles.title}>Discover</Text>
            <SearchBar
                darkMode={true}
                placeholder="Search here"
                onPress={() => alert("onPress")}
                onChangeText={(text) => console.log(text)}
            />
            <View style={styles.grid}>
            <FlatList
                    data={movies}
                    renderItem={({ item }) => (
                    <View style={styles.card}>       
                     <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { movieData: item })}>
                     <Image
                        style={styles.imageThumbnail}   
                        source={{ uri: defaultImage + item.poster_path }}
                        /> 
                     </TouchableOpacity>
                    </View>
                    )}
                    numColumns={3}
                    keyExtractor={({ id, index }) => id.toString()}
                />
            </View>
        </View>
    );



};

const styles = StyleSheet.create({
    main:{
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        backgroundColor: "#191931",
    },
    title:{
        fontSize: 25,
        color: "white",
        textAlign: "center",
        padding: 15,
        fontFamily: "Roboto-Bold"
    },
    grid:{
        marginTop:10
    },
    card: {
        flex: 1,
        flexDirection: 'column',
        margin: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom:15
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: 170,
      borderRadius:12,
    },
    
  });

export default HomeScreen;