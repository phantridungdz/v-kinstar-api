import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

const SearchList = ({profile, navigation, userInfo, user}) => {
  console.log(userInfo)
  return (
    <>
      {profile.map((data, id) =>{
        return(
        <TouchableOpacity key={id} onPress={() => navigation.navigate('ProfileScreen', {userInfo, user})}>
            <View style={{flexDirection: 'row', marginBottom: 20, maxWidth: '80%',}} key={id} >
            <Image 
              source={{ uri: data.avatar}} 
              style={{
                width: 50, 
                height: 50,
                borderRadius: 25
              }} 
            />
            <View style={{ margin: 10}}>
              <Text style={{flex: 150,color: 'white', fontWeight: '700'}}>{data.fullname}</Text>
              <Text style={{flex: 150,color: 'gray', fontWeight: '600', fontSize: 12}}>{data.username}</Text>
            </View>
            <Text></Text>
          </View>
        </TouchableOpacity>
        )
      })}
    </>
  )
}

export default SearchList