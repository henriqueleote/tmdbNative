import React, { useEffect, useState, useRef } from 'react';
import { Text, Dimensions, View, Image, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import SearchBar from "react-native-dynamic-search-bar";



const discoverAPI = "https://api.themoviedb.org/3/discover/movie?api_key=8246306bee45758b9cae4e0b6a240224";
const searchAPI = "https://api.themoviedb.org/3/search/movie?api_key=8246306bee45758b9cae4e0b6a240224&query=";
const defaultImage = "https://image.tmdb.org/t/p/w185";


const DiscoverScreen = () => {

    const navigation = useNavigation();

    const [masterDataSource, setMasterDataSource] = useState([]);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [search, setSearch] = useState('');
    const { current: stable } = useRef(["one"]);

    useEffect(() => {
        fetch(discoverAPI)
        .then((res) => res.json())
        .then(data => {
            setFilteredDataSource(data.results);
            setMasterDataSource(data.results);
        })
    }, [stable])

    const reset = () => {
        let string = "";
        setFilteredDataSource(masterDataSource);
        setSearch(string);
    }

    const searchQuery = (text) => {
        if (text) {
            fetch(searchAPI + text)
            .then((res) => res.json())
            .then(data => {
                setFilteredDataSource(data.results);
            })
            setSearch(text);
        } else {
            let string = "";
            setFilteredDataSource(masterDataSource);
            setSearch(string);
        }
    }

      const ItemView = ({ item }) => {
        return (
            <View style={styles.card}>       
            <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { movieData: item })}>
            <Image
               style={styles.imageThumbnail}   
               source={{ uri: defaultImage + item.poster_path }}
               /> 
            <View style={styles.ratingContainer}>
              <Image style={styles.ratingImage}source={require('../../assets/icons/star.png')}/>
              <Text style={styles.ratingText}>{item.vote_average.toFixed(1)}</Text>
            </View>  
            </TouchableOpacity>
           </View>
        );
      };
    
       return(
        <View style={styles.main} >
            <Text style={styles.title}>Discover</Text>
            <SearchBar
                darkMode={true}
                onChangeText={(text) => searchQuery(text)}
                onClearPress={() => reset()}
                placeholder="Type Here..."
                value={search}
            />
            <View style={styles.grid}>
            <FlatList
                    style={{marginTop: 15}}
                    data={filteredDataSource}
                    numColumns={3}
                    keyExtractor={item => item.id}
                    renderItem={ItemView}
                />
            </View>
        </View>
        );



};

const styles = StyleSheet.create({
    main:{
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        backgroundColor: "#191931",
    },
    title:{
        fontSize: 25,
        color: "white",
        textAlign: "center",
        padding: 15,
    },
    grid:{
        height: Dimensions.get("screen").height-250,
        marginLeft: 20,
        marginRight: 20,
    },
    card: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15
    },
    imageThumbnail: {
        width: 100,
        height: 170,
        borderRadius:12,
    },
    ratingContainer:{
        position:'absolute',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        padding:3,
        right:5,
        top:5, 
        flexDirection:'row', 
        alignItems:'center',
        borderRadius: 5
      },
      ratingImage:{
        width:10,
        height:10
      },
      ratingText:{
        fontSize:10,
        color:'white',
        marginLeft: 3
      }
    
  });

export default DiscoverScreen;