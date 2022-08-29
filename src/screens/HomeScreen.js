import React, { useEffect, useState } from 'react';
import { Text, Dimensions, View, Image, FlatList, StyleSheet, RefreshControl, ScrollView, Empty } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const specificMovie = "https://api.themoviedb.org/3/movie/"
const keyAPI = "?api_key=8246306bee45758b9cae4e0b6a240224";
const defaultImage = "https://image.tmdb.org/t/p/w185";


const HomeScreen = () => {

    const [masterDataSource, setMasterDataSource] = useState([]);

    const [isFetching, setIsFetching] = useState(false);

    const navigation = useNavigation();

    useEffect( () => {
      getAll();
    }, []);

    async function getAll() {
      let movies = [];
      const value = await getUsers();
      console.log(value);
      value.map(movie => {
        fetch(specificMovie + movie + keyAPI)
        .then((res) => res.json())
        .then(data => { movies.push(data);})
        .then(function(){
          })
        .catch(function(error) {
          console.log(error)
        });
      })
      setMasterDataSource(movies);
      setIsFetching(false);
    }

    const onRefresh = () => {
      setIsFetching(true);
      getAll();
    };

    async function getUsers() {
      const userRef = firestore().collection('users').doc('kPFLrsuPkLCoY3fjusGX');
      const doc = await userRef.get();
      if (doc.exists) {
        console.log('Document data:', doc.get('movies'));
        const moviesData = doc.get('movies');
        return moviesData;
      } else {
        console.log('No such document!');
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
          </TouchableOpacity>
         </View>
      );
    };

    return(
      <View style={styles.main} >
          <Text style={styles.title}>My List</Text>
        <View style={styles.grid}>
        <FlatList
          style={{backgroundColor:'red'}}
          data={masterDataSource}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          renderItem={ItemView}
          onRefresh={onRefresh}
          refreshing={isFetching}
          progressViewOffset={100} />
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