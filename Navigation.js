import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import CommentScreen from './screens/CommentScreeen'
import NewPostScreen from './screens/NewPostScreen'
import ProfileScreen from './screens/ProfileScreen'
import ChatScreen from './screens/ChatScreen'
import ReelsScreen from './screens/ReelsScreen'
import { useState, useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import MessesageScreen from './screens/MessageScreen'
import AudioCallScreen from './screens/AudioCallScreen'
import ChatGPT from './screens/ChatGPT'
import NotificationScreen from './screens/NotificationScreen'
import SearchScreen from './screens/SearchScreen'

const Stack = createNativeStackNavigator()

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

const Navigation = () => {
  const {userInfo} = useContext(AuthContext)
  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {userInfo.access_token ? (
            <>
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
              <Stack.Screen name="CommentScreen" component={CommentScreen} options={{headerShown: false}}/>
              <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}}/>
              <Stack.Screen name="NewPostScreen" component={NewPostScreen} options={{headerShown: false}}/>
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}}/>
              <Stack.Screen name="MessesageScreen" component={MessesageScreen} options={{headerShown: false}}/>
              <Stack.Screen name="AudioCallScreen" component={AudioCallScreen} options={{headerShown: false}}/>
              <Stack.Screen name="ReelsScreen" component={ReelsScreen} options={{headerShown: false}}/>
              <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{headerShown: false}}/>
              <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerShown: false}}/>
              <Stack.Screen name="ChatGPT" component={ChatGPT} options={{headerShown: false}}/>
            </>
          ):(
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
            </>
          )}
          
          
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default Navigation