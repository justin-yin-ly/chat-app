import { useState, useEffect } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({isConnected, db, route, navigation}) => {
    const [messages, setMessages] = useState([]);
    const { name, chatColor, userID } = route.params;

    const cacheMessages = async (messagesToCache) => {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
      } catch (error) {
        console.log(error.message);
      }
    };

    const loadCachedMessages = async () => {
      const cachedLists = await AsyncStorage.getItem("messages") || [];
      setMessages(JSON.parse(cachedLists));
    };

    let unsubMessages;

    useEffect(() => {
      navigation.setOptions({ title: name})

      if (isConnected === true) {
        // unregister current onSnapshot() listener to avoid registering multiple listeners when
        // useEffect code is re-executed.
        if (unsubMessages) unsubMessages();
        unsubMessages = null;
  
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        unsubMessages = onSnapshot(q, (documentsSnapshot) => {
          let newMessages = [];
          documentsSnapshot.forEach(doc => {
            newMessages.push({            
              id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis())
            })
          });
          cacheMessages(newMessages);
          setMessages(newMessages);
        });
      } else loadCachedMessages();

      // Clean up code
      return () => {
        if (unsubMessages) unsubMessages();
      }
    }, [isConnected]);

    const renderBubble = (props) => {
        return <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#000"
            },
            left: {
              backgroundColor: "#FFF"
            }
          }}
        />
      }

    const renderInputToolbar = (props) => {
      if (isConnected) return <InputToolbar {...props} />;
      else return null;
    }

    const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0])
    }

    return(
        <View style={[styles.main, {backgroundColor: chatColor}]}> 
            <GiftedChat
              messages={messages}
              renderBubble={renderBubble}
              renderInputToolbar={renderInputToolbar}
              onSend={messages => onSend(messages)}
              user={{
                _id: userID,
                name: name
              }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
});

export default Chat;