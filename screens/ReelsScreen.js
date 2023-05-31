import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, LogBox, FlatList, Dimensions, SafeAreaView, Image, Platform, TouchableOpacity, Alert } from 'react-native';
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs'
import ImagePicker from 'react-native-image-crop-picker';
import VideoSingle from '../components/reel/VideoSingle'
import axios from 'axios'
import { BASE_URL } from "../config";
import { array } from 'yup';

const ReelsScreen = ({navigation, route}) => {
  LogBox.ignoreLogs(['Warning: ...']);
  console.disableYellowBox = true; 
  const mediaRefs = useRef([])
  const {userInfo} = route.params
  const array = [1,2,3,4,5,6,7,8,9]
  const [file, setFile] = useState(null)
  const [reels, setReels] = useState([])
  const onViewableItemsChanged = useRef(({changed}) => {
    changed.forEach( element => {
      const cell = mediaRefs.current[element.key]
      if(cell){
        if(element.isViewable){
          cell.play()
        }else{
          cell.stop()
        }
      }
    })
  })

  axios({
    method: 'get',
    headers: {Authorization: `${userInfo.access_token}`},
    url: `${BASE_URL}/reel`,
  }).then((response) => {
    let allreel = response.data.videos
    
    setReels(allreel)
  })
  


  const selectVideo = () => {
    ImagePicker.openPicker({
      mediaType: "video",
    }).then((video) => {
      const videoUri = Platform.OS === 'ios' ? video.path : video.uri
      let file = { uri: videoUri, type: "Video", name: video.filename }
      console.log(file)
      setFile(file)
      submitVideo(file)
    });
  }
  const submitVideo = async file => {
    const data = new FormData()
    console.log(file)
    data.append('file', file)
    data.append('upload_preset', 'upload_image')
    data.append('cloud_name', 'ddnv4r9pb')
    data.append('resource_type', 'video')
    // data.append('api_key', 'OA-GG3RuBpzUphm64O4mZfRqNmY')
    
    fetch("https://api.cloudinary.com/v1_1/ddnv4r9pb/video/upload", {
      method: 'post',
      body: data,
      header: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    }).then(res =>
      res.json()
    )
    .then(data => {
      console.log(data)
      axios.post(
        `${BASE_URL}/reel`,{
          'title': '',
          'videoUrl': data.url
        },
        {
          headers: {Authorization: `${userInfo.access_token}`},
        },
      ).then(res => {
        console.log(res.data)
      }).catch(e =>{
        console.log(` error ${e}`)
      })
    })
  }
  
  const renderItem = ({item, index}) => {
    return (
      <View style={[ {flex: 1, height: Dimensions.get('window').height - 125} , index % 2 == 0 ? { backgroundColor: 'blue'} : { backgroundColor: 'pink'}]}>
        <VideoSingle item={item} ref={VideoSingleRef => (mediaRefs.current[item._id] = VideoSingleRef)}/>
      </View>
    )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ zIndex: 2}}>
        <View style={{ flexDirection: 'row'}}>
          <View style={{ flex: 1}}>
            <Text style={{color: 'white', margin: 10, fontWeight: '800', fontSize: 18}}>Reels</Text>
          </View>
          <TouchableOpacity onPress={() => selectVideo()}>
            <View>
              <Image source={{uri: 'https://img.icons8.com/material/24/ffffff/camera--v2.png'}} style={{ height: 35, width: 35, marginRight: 10, alignSelf: 'flex-end'}}></Image>
            </View>
          </TouchableOpacity>
        </View>
      </View> 
      <FlatList
        data={reels}
        renderItem={renderItem}
        pagingEnabled
        windowSize={2}
        initialNumToRender={0}
        maxToRenderPerBatch={1}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100
        }}
        onViewableItemsChanged={onViewableItemsChanged.current}
        // keyExtractor={item => item.index}
        keyExtractor={item => item._id}
        decelerationRate={'normal'}
      />
      <BottomTabs icons={bottomTabIcons} navigation={navigation} userInfo={userInfo}/>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

//make this component available to the app
export default ReelsScreen;
