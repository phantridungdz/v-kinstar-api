import React, { Component, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video'

export const VideoSingle = forwardRef(({item}, parentRef) => {
  console.disableYellowBox = true;
  const ref = useRef(null)
  useImperativeHandle(parentRef, () => ({
    play,
    unload,
    stop
  }))

  useEffect(() => {
    return () => unload()
  }, [])

  const play = async () => {
    if(ref.current == null){
      return
    }
    const status = await ref.current.getStatusAsync()
    if(status?.isPlaying){
      return
    }
    try{
      await ref.current.playAsync()
    }catch(e){
      console.log(e)
    }
  }
  const stop = async () => {
    if(ref.current == null){
      return
    }
    const status = await ref.current.getStatusAsync()
    if(!status?.isPlaying){
      return
    }
    try{
      await ref.current.stopAsync()
    }catch(e){
      console.log(e)
    }
  }
  const unload = async () => {
    console.log('unload')
    if (ref.current == null) {
      return
    }try {
      await ref.current.unloadAsync()
    }catch(e) {
      console.log(e)
    }
  }
  return (

      <Video
        style={styles.container}
        ref={ref}
        isLooping
        shouldPlay={false}
        resizeMode={Video.RESIZE_MODE_COVER}
        source={{uri: item.videoUrl[0]}}
        // source={{uri: 'https://res.cloudinary.com/ddnv4r9pb/video/upload/v1673026796/napa/xtlmh6rswjipgjihhdgq.mp4'}}
      />

    
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default VideoSingle;
