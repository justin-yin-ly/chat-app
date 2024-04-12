import { useState, useEffect } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";

const Chat = ({db, route, navigation}) => {
    const [messages, setMessages] = useState([]);
    const { name, chatColor, userID } = route.params;

    useEffect(() => {
      navigation.setOptions({ title: name})

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          newMessages.push({            
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        });
        setMessages(newMessages);
      });
  
      // Clean up code
      return () => {
        if (unsubMessages) unsubMessages();
      }
    }, []);

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

      const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
      }

    return(
        <View style={[styles.main, {backgroundColor: chatColor}]}> 
            <GiftedChat
              messages={messages}
              renderBubble={renderBubble}
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