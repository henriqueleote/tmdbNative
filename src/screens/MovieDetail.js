import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity,ListItem, Linking  } from 'react-native';
import { } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FloatingAction } from "react-native-floating-action";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import firebase from "@react-native-firebase/app"


const MovieDetail = ({route}) => {

    const specificMovie = "https://api.themoviedb.org/3/movie/"
    const movieCredits = "/credits";
    const movieVideos = "/videos";
    const keyAPI = "?api_key=8246306bee45758b9cae4e0b6a240224";
    const coverImage = "https://image.tmdb.org/t/p/w500";
    const defaultImage = "https://image.tmdb.org/t/p/w154";
    const youtube = "https://www.youtube.com/watch?v=";

    const [masterDataSource, setMasterDataSource] = useState([]);
    const [youtubeLink, setYoutubeLink] = useState([]);
    const { current: stable } = useRef(["one"]);
    const { movieData } = route.params;
    const navigation = useNavigation();


    useEffect(() => {
        getCastData().then(cast => setMasterDataSource(cast));
        getData().then(trailer => setYoutubeLink(trailer[trailer.length-1]));
    }, [stable])

    async function getCastData(){
        var cast = [];
        await (fetch(specificMovie + movieData.id + movieCredits + keyAPI)
        .then((res) => res.json())
        .then(data => {
            data.cast.map(person => {
                if(person.known_for_department == "Acting")
                    cast.push(person);
            })
        }))
        return cast;
    }

    async function getData(){
      var trailer = [];
      await (fetch(specificMovie + movieData.id + movieVideos + keyAPI)
      .then((res) => res.json())
      .then(data => {
          data.results.map(video => {
            if(video.type == "Trailer"){
              trailer.push(video);
            }
          })
      }))
      return trailer;
  }

  async function checkFavourite(){
    console.log("oi")
    var moviesData = [];
    const movieRef = firestore().collection('users').doc('kPFLrsuPkLCoY3fjusGX');
    const doc = await movieRef.get();
    if (doc.exists) {
      moviesData = doc.get('movies');
      if(moviesData.includes(movieData.id)){
        movieRef.update({'movies': firebase.firestore.FieldValue.arrayRemove(movieData.id)})
      }
      else{
        movieRef.update({'movies': firebase.firestore.FieldValue.arrayUnion(movieData.id)})
      }
    } else {
      console.log('No such document!');
    }
  }

   const ItemView = ({ item }) => {
        return (
            <View style={styles.card}>       
                <Image
                    style={styles.castImage}   
                    source={{ uri: defaultImage + item.profile_path }}/> 
                    <Text style={styles.castName}>{item.name}</Text>
           </View>
        );
      };


    return(
        <View style={styles.main} >
            <View style={styles.cover}>
            <Image style={styles.imageThumbnail} source={{ uri: coverImage + movieData.backdrop_path }}/> 
            </View>
            <View style={styles.page}>
                <Text style={styles.movieTitle}>{movieData.title}</Text>
                <View style={styles.movieWatchRating}>
                {youtubeLink === undefined
                ? <TouchableOpacity disabled={true} style={styles.watchButtonDisabled}>
                <Text style={styles.watchButtonText}>WATCH NOW</Text>
                </TouchableOpacity>

                : <TouchableOpacity style={styles.watchButton} onPress={ ()=>{ Linking.openURL(youtube + youtubeLink.key)}}>
                <Text style={styles.watchButtonText}>WATCH NOW</Text>
                </TouchableOpacity>
                }
                </View>
                <Text style={styles.description}>{movieData.overview}</Text>
                <View style={styles.cast}>
                    <Text style={styles.castTitle}>Cast</Text>
                <FlatList
                    style={{marginLeft:10, marginRight: 10}}
                    data={masterDataSource}
                    horizontal={true}
                    keyExtractor={item => item.id}
                    renderItem={ItemView} />
                </View>
                {/* {
                movieData.genres.map(genre =>{
                  return(<Text style={{color:'white'}} key={genre.id}>{genre.name}</Text>)
                })
                } */}
                <Text style={{color:'white'}}>Release Year - {movieData.release_date}</Text>
                <Text style={{color:'white'}}>Runtime - {movieData.runtime} minutes</Text>
                <TouchableOpacity style={styles.watchButton} onPress={() => checkFavourite()}>
                <Text style={styles.watchButtonText}>ADD TO FAVOURITES</Text>
                </TouchableOpacity>
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
    backButton:{
        position: 'absolute',
        left: 0,
        top: 10
    },
    cover:{
        width: Dimensions.get("window").width,
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get("window").width,
        height: 200,
        borderBottomRightRadius:12,
        borderBottomLeftRadius:12
      },
    page:{
        height: (Dimensions.get("window").height)/2,
        width: Dimensions.get("window").width,
    },
    movieTitle:{
        fontSize: 20,
        color: 'white',
        marginTop: 20,
        marginLeft: 20
    },
    movieWatchRating:{
        width:"80%",
        marginTop: 20,
        flexDirection:'row',
        alignItems:'center'
      },
      watchButton:{
        width:"40%",
        height: 35,
        backgroundColor:"#ed3a39",
        borderRadius:25,
        alignItems:"center",
        justifyContent:"center",
        marginRight: 'auto',
        marginLeft: 20
      },
      watchButtonDisabled:{
        width:"40%",
        height: 35,
        backgroundColor:"grey",
        borderRadius:25,
        alignItems:"center",
        justifyContent:"center",
        marginRight: 'auto',
        marginLeft: 20
      },
      watchButtonText:{
        color: 'white',
        fontSize:12,
      },
      description:{
        color:'grey',
        fontSize:12,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        lineHeight: 18,
        textAlign: 'justify'
      },
      cast:{
        width: "100%",
        marginTop: 20,
        marginBottom: 10
      },
      castTitle:{
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 10,
        color:'white'
      },
      card:{   
        marginLeft: 5,
        marginRight: 5
      },
      castImage:{
        width:90,
        height:120,
        borderRadius: 10
      },
      castName:{
        fontSize: 12,
        textAlign: 'center',
        marginTop:5,
        color:'white'
      }

});


export default MovieDetail;