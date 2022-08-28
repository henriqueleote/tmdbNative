import React, { useEffect, useState } from 'react';
import { Text, Dimensions, View, Image, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import SearchBar from "react-native-dynamic-search-bar";



const defaultAPI = "https://api.themoviedb.org/3/discover/movie?api_key=8246306bee45758b9cae4e0b6a240224";
const defaultImage = "https://image.tmdb.org/t/p/w185";


const HomeScreen = () => {

    const navigation = useNavigation();

    const [masterDataSource, setMasterDataSource] = useState([]);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(defaultAPI)
        .then((res) => res.json())
        .then(data => {
            setFilteredDataSource(data.results);
            setMasterDataSource(data.results);
        })
    }, [])

    const searchFilterFunction = (text) => {
        if (text) {
          const newData = masterDataSource.filter(function (item) {
            const itemData = item.title
              ? item.title.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          setFilteredDataSource(masterDataSource);
          setSearch(text);
        }
      };    

      const ItemView = ({ item }) => {
        return (
            <View style={styles.card}>       
            <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { movieData: item })}>
            <Image
               style={styles.imageThumbnail}   
               source={{ uri: defaultImage + item.poster_path }}
               /> 
            </TouchableOpacity>
           </View>
        );
      };
    
       return(
        <View style={styles.main} >
            <Text style={styles.title}>Discover</Text>
            <SearchBar
                darkMode={true}
                onPress={() => alert("onPress")}
                onChangeText={(text) => searchFilterFunction(text)}
                onClearPress={(text) => searchFilterFunction('')}
                placeholder="Type Here..."
                value={search}
            />
            <View style={styles.grid}>
            <FlatList
                    data={filteredDataSource}
                    numColumns={3}
                    keyExtractor={({ id, index }) => id.toString()}
                    renderItem={ItemView}
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