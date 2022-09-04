import React, { useEffect, useState, useRef } from 'react';
import { Text, Dimensions, View, Image, FlatList, StyleSheet, RefreshControl, ScrollView, Empty } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const specificMovie = "https://api.themoviedb.org/3/movie/"
const keyAPI = "?api_key=8246306bee45758b9cae4e0b6a240224";
const defaultImage = "https://image.tmdb.org/t/p/w185";


const HomeScreen = () => {

    const [masterDataSource, setMasterDataSource] = useState([]);
    const { current: stable } = useRef(["one"]);

    const navigation = useNavigation();

    useEffect( () => {
      const focusHandler = navigation.addListener('focus', () => {
        getMoviesFromUser()
      .then(data => {
        setMasterDataSource(data)
      })
    });
    return focusHandler;
    }, [stable]);

    async function getMoviesFromUser() {
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

    const [onRefresh, setOnRefresh] = useState(false);


    const refreshControl = () => {
 
      getMoviesFromUser()
      .then(data => {
        setMasterDataSource(data)
      })
  
    }


    return(
      <View style={styles.main} >
          <Text style={styles.title}>My List</Text>
          <View style={styles.grid}>
          <FlatList
            style={{marginTop: 15}}
            data={masterDataSource}
            numColumns={3}
            keyExtractor={item => item.id}
            renderItem={ItemView}
            refreshControl={
              <RefreshControl
                refreshing={onRefresh}
                onRefresh={refreshControl}
              />
            } />
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
      marginTop: 15,
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

export default HomeScreen;