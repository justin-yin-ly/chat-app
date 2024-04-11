import { useState, useEffect } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({route, navigation}) => {
    const [messages, setMessages] = useState([]);
    const { name, chatColor } = route.params;

    useEffect(() => {
        setMessages([
            {
              _id: 1,
              text: "Hello developer!",
              createdAt: new Date(),
              user: {
                _id: 2,
                name: "React Native",
                avatar: "https://placeimg.com/140/140/any",
              },
            },
            {
                _id: 2,
                text: 'Welcome to the chat.',
                createdAt: new Date(),
                system: true,
              },
        ]);

        navigation.setOptions({ title: name})
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
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

    return(
        <View style={[styles.main, {backgroundColor: chatColor}]}> 
            <GiftedChat
              messages={messages}
              renderBubble={renderBubble}
              onSend={messages => onSend(messages)}
              user={{
                _id: 1
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