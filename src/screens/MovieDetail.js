import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity,ListItem, Linking  } from 'react-native';
import { } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FloatingAction } from "react-native-floating-action";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import firebase from "@react-native-firebase/app"
import Stars from 'react-native-stars';


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
    const [isFavourite, setIsFavourite] = useState(false);
    const [genres, setGenres] = useState('');
    const { current: stable } = useRef(["one"]);
    const { movieData } = route.params;
    const navigation = useNavigation();


    useEffect(() => {
        getFavourite().then(result => setIsFavourite(result));
        getCastData().then(cast => setMasterDataSource(cast));
        getData().then(trailer => setYoutubeLink(trailer[trailer.length-1]));
        getGenres().then(genres => setGenres(genres));
    }, [stable])

    async function getGenres(){
      var string = '';
      if(movieData.genres !== undefined){
        let max = movieData.genres.length;
        for(var i = 0; i < max - 1; i++){
          string += movieData.genres[i].name + ', ';
        }
      return string.substring(0,string.length-2)
      }
      return "N/A";
    }

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

  async function getFavourite(){
    var isFav = false;
    var movieData = [];
    const movieRef = firestore().collection('users').doc('kPFLrsuPkLCoY3fjusGX');
    const doc = await movieRef.get();
    if (doc.exists) {
      movieData = doc.get('movies');
      if(movieData.includes(movieData.id)){
        //movieRef.update({'movies': firebase.firestore.FieldValue.arrayRemove(movieData.id)})
        isFav = true;
      }
      else{
        //movieRef.update({'movies': firebase.firestore.FieldValue.arrayUnion(movieData.id)})
        isFav = false;
      }
    }
      return isFav;
  }

  async function setFavourite(){
      const movieRef = firestore().collection('users').doc('kPFLrsuPkLCoY3fjusGX');
      if(isFavourite){
        movieRef.update({'movies': firebase.firestore.FieldValue.arrayRemove(movieData.id)})
        setIsFavourite(false);
      }
      else{
        movieRef.update({'movies': firebase.firestore.FieldValue.arrayUnion(movieData.id)})
        setIsFavourite(true);
      }
  }

   const ItemView = ({ item }) => {
        return (
            <View style={styles.card}>       
                <Image
                    style={styles.castImage}   
                    source={{ uri: defaultImage + item.profile_path }}/> 
                    <Text style={styles.castName}>{item.name.substring(0, 8) + '...'}</Text>
           </View>
        );
      };

    return(
        <View style={styles.main} > 
            <View style={styles.cover}>
            <Image style={styles.imageThumbnail} source={{ uri: coverImage + movieData.backdrop_path }}/> 
            </View>
            <View style={styles.page}>
                  <Text style={styles.movieTitle}>{movieData.title} 
                  {
                    movieData.genres !== undefined
                    ? <Text style={styles.movieYear}> ({movieData.release_date.substring(0,4)})</Text>
                    : <Text style={styles.movieYear}></Text>
                  }
                  </Text>
                <View style={styles.movieWatchRating}>
                {youtubeLink === undefined
                ? <TouchableOpacity disabled={true} style={styles.watchButtonDisabled}>
                <Text style={styles.watchButtonText}>TRAILER NOT AVALIABLE</Text>
                </TouchableOpacity>
                : <TouchableOpacity style={styles.watchButton} onPress={ ()=>{ Linking.openURL(youtube + youtubeLink.key)}}>
                <Text style={styles.watchButtonText}>WATCH TRAILER</Text>
                </TouchableOpacity>
                }
                <View style={styles.rating}>
                <Stars
                  display={(movieData.vote_average)/2}
                  spacing={8}
                  count={5}
                  starSize={20}
                  fullStar = {require('../../assets/icons/star.png')}
                  emptyStar = {require('../../assets/icons/image.png')}
                  style/>
                </View>
                </View>
                <Text style={styles.overviewTitle}>Overview</Text>
                <Text style={styles.overview}>{movieData.overview}</Text>
                {
                    movieData.runtime !== undefined
                    ? <Text style={{marginLeft: 20, color:'white', fontSize:12, marginTop:2}}>Duration - {movieData.runtime} minutes</Text>
                    : <Text style={{marginLeft: 20, color:'white', fontSize:12, marginTop:2}}></Text>
                  }
                <Text style={{marginLeft: 20, color:'white', fontSize:12, marginTop:2}}>Genres - {genres}</Text>
                <View style={styles.cast}>
                    <Text style={styles.castTitle}>Cast</Text>
                <FlatList
                    style={{marginLeft:10, marginRight: 10}}
                    data={masterDataSource}
                    horizontal={true}
                    keyExtractor={item => item.id}
                    renderItem={ItemView} />
                </View>
              
                <TouchableOpacity style={styles.favButton} onPress={() => setFavourite()}>
                  {
                    isFavourite === false
                    ? <Text style={styles.favButtonText}>REMOVE FROM FAVOURITES</Text>
                    : <Text style={styles.favButtonText}>ADD TO FAVOURITES</Text>
                  }
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.backArrowContainer} onPress={() => { navigation.goBack() }}>
                    <Image style={styles.backArrow} source={require('../../assets/icons/arrow.png')} />
            </TouchableOpacity>
        </View>
      );
};

const styles = StyleSheet.create({
    main:{
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        backgroundColor: "#191931",
    },
    backArrowContainer:{
      backgroundColor: '#ed3a39',
      padding: 5,
      borderRadius: 5,
      position: 'absolute',
      left: 15,
      top: 15
  },
    backArrow:{
        height: 25,
        width: 25,
        right:2
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
    movieYear:{
      fontSize: 15,
      color:'grey',
      alignSelf:'flex-end',
    },
    movieWatchRating:{
        width:"100%",
        marginTop: 10,
        flexDirection:'row',
        alignItems:'center',
      },
      watchButton:{
        width:"30%",
        height: 35,
        backgroundColor:"#ed3a39",
        borderRadius:25,
        alignItems:"center",
        justifyContent:"center",
        marginRight: 'auto',
        marginLeft: 20
      },
      watchButtonDisabled:{
        width:"30%",
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
        textAlign:'center'
      },
      rating:{
        flex: 0,
        marginLeft:'auto',
        marginRight: 20
      },
      overviewTitle:{
        fontSize: 18,
        marginLeft: 20,
        marginBottom: 10,
        color:'white',
        marginTop: 20
      },
      overview:{
        color:'grey',
        fontSize:12,
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
        fontSize: 18,
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
      },
      favButton:{
        width:"40%",
        height: 45,
        backgroundColor:"#ed3a39",
        borderRadius:25,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 20,
        marginRight: 'auto',
        marginLeft:'auto'
      },
      favButtonText:{
        color: 'white',
        fontSize:12,
        textAlign:'center'
      },

});


export default MovieDetail;