import React, { useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity,  SafeAreaView, Button, ScrollView, Text } from 'react-native';
import axios from 'axios';

const ChatGPT = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [messagesUser, setMessagesUser] = useState([]);
  const [input, setInput] = useState('');

  const apiKey = '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';
  const endpoint = 'https://api.openai.com/v1/completions';

  const sendMessage = async () => {
    // Add the user's message to the messages list
    setMessages([...messages, { text: input, type: 'user' }]);
    setInput('');

    // Call the GPT-3 API to generate a response
    try {
      const res = await axios.post(endpoint, {
        model: 'text-davinci-003',
        prompt: input,
        temperature: 0,
        max_tokens: 1000
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        }
      });
      const response = res.data.choices[0].text.trim();

      // Add the API's response to the messages list
      setMessages([...messages, { text: response, type: 'api' }]);
      console.log(messages)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ zIndex: 2}}>
        <View style={{ flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View >
              <Image source={{uri: 'https://img.icons8.com/material/24/ffffff/back--v1.png'}} style={{ height: 35, width: 35, marginRight: 10, alignSelf: 'flex-end'}}></Image>
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1}}>
            <Text style={{color: 'white', margin: 10, fontWeight: '800', fontSize: 18}}>Chat GPT</Text>
          </View>
        </View>
      </View> 
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {/* <Text key={index} style={{ color: message.type === 'user' ? 'blue' : 'red' }}>{message.text}</Text> */}
          {messages.map((message, index) =>{
            return(
              message.type === 'user' ? 
                <View key={index} style={styles.reciever}>
                  <Text style={{color: 'white', fontWeight: '700'}}>{message.text.trim()}</Text>
                </View>
               :
                <View key={index} style={styles.sender}>
                  <Text style={{flex: 1,color: 'white', fontWeight: '700'}}>{message.text.trim()}</Text>
                </View>
            )
          })}
        </ScrollView>
        <KeyboardAvoidingView  
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={{}}
          keyboardVerticalOffset={10}>
        
        <View style={{
          flexDirection: 'row',
        }}>
        <View style={{
          marginLeft: 10,
          marginRight: 10,
          flex:11,
          flexDirection: 'row', 
          borderWidth: 0.5, 
          borderColor: 'gray',
          borderRadius: 20,
          justifyContent: 'space-between'
        }}>
            <TextInput
                style={{
                  maxWidth: 300,
                  marginLeft: 10,
                  height: 50,
                  paddingLeft: 8,
                }}
                color='white'
                placeholderTextColor="white"
                placeholder={"Send Comment.."}
                onChangeText={setInput}
                value={input}
            >
              
            </TextInput>
            <TouchableOpacity onPress={() => sendMessage()} style={{justifyContent: 'center', marginRight: 10}} >
              <Text style={{color: '#088ecc'}}>Send</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
});

export default ChatGPT;