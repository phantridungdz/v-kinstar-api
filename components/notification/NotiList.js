import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

const NotiList = ({notification, navigation}) => {
  console.log(notification.notifies)
  return (
    <>
      {notification.notifies.map((data, id) =>{
        return(
        <TouchableOpacity key={id}>
            <View style={{flexDirection: 'row', marginBottom: 20, maxWidth: '80%',}} key={id} >
            <Image 
              source={{ uri: data.user.avatar}} 
              style={{
                width: 50, 
                height: 50,
                borderRadius: 25
              }} 
            />
            <View style={{ margin: 10}}>
              <Text style={{flex: 150,color: 'white', fontWeight: '700'}}>{data.user.username}</Text>
              <Text style={{flex: 150,color: 'gray', fontWeight: '600', fontSize: 12}}>{data.text}</Text>
            </View>
            <Text></Text>
          </View>
        </TouchableOpacity>
        )
      })}
    </>
  )
}

export default NotiList