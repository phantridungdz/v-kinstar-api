import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import NotiList from '../components/notification/NotiList'
import { ScrollView } from 'react-native-gesture-handler'
import { BASE_URL } from "../config";
import axios from 'axios'

const NotificationScreen = ({navigation,route}) => {
  const {userInfo} = route.params
  const [notification, setNotifications] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      headers: {Authorization: `${userInfo.access_token}`},
      url: `${BASE_URL}/notifies`,
    }).then((response) => {
      let allNotification = response.data
      setNotifications(allNotification)
    });
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: 'black', flex: 1}}>
      <Header navigation={navigation}>
      </Header>
      <View style={{
          height:35,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#232224',
          borderRadius: 5,
        }}>
        <Image
        source={{ uri: 'https://img.icons8.com/material-outlined/96/ffffff/search--v1.png'}}
        width={10}
        height={10}
          style={{
            marginLeft: 10,
            width: 20, 
            height: 20,
          }} 
        />
        <View style={{
          marginRight: 10,
          flex:11,
          flexDirection: 'row', 
          justifyContent: 'space-between'
        }}>
            <TextInput
                style={{
                  maxWidth: 300,
                  marginLeft: 10,
                  paddingLeft: 8,
                  fontWeight: '800'
                }}
                color='white'
                placeholderTextColor="#c9c6c5"
                
                placeholder={"Find"}
            >
            </TextInput>
            <TouchableOpacity onPress={() => sendMessage()} style={{justifyContent: 'center', marginRight: 10}} >
              <Text style={{color: '#088ecc', fontWeight: '600'}}>Notification</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      <>
          <ScrollView>
            <NotiList notification={notification} navigation={navigation} userInfo={userInfo}></NotiList>
          </ScrollView>
        </>
    </SafeAreaView>
  )
}

const Header = ({navigation, users}) => (
  <View style={styles.headerContrainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <View>
          <Image source={{ uri: 'https://img.icons8.com/material/24/ffffff/back--v1.png'}} style={{ width: 35, height: 35}}></Image>
        </View>
    </TouchableOpacity>
    <Text style={styles.headerText}>Notification</Text>
    
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContrainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerText: {
    alignItems: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    marginRight: 25,
    margin: 10
  },
  reciever: {
    padding: 12,
    backgroundColor: '#7630e6',
    alignSelf: 'flex-end',
    borderRadius: 30,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative'
  },
  sender: {
    marginLeft: 10,
    padding: 12,
    backgroundColor: '#4f4d54',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    position: 'relative'
  },

})

export default NotificationScreen