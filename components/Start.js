import { useState } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ImageBackground } from "react-native";

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [chatColor, setChatColor] = useState('');

    return (
      <ImageBackground source={require('../img/BackgroundImage.png')} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.container}>
          
          <View>
            <Text style={styles.title}>Chat App</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.border}>
              <TextInput
                style={[styles.text, styles.opacity]}
                value={name}
                onChangeText={setName}
                placeholder='Your Name'
              />
            </View>
            <Text style={styles.text}>Choose Background Color:</Text>
            <View style={styles.colorButtons}>
              <TouchableOpacity style={[styles.colorPick,styles.option1]} onPress={() => setChatColor("#090C08")}>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.colorPick,styles.option2]} onPress={() => setChatColor("#474056")}>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.colorPick,styles.option3]} onPress={() => setChatColor("#8A95A5")}>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.colorPick,styles.option4]} onPress={() => setChatColor("#B9C6AE")}>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={styles.chatButton}
              onPress={() => navigation.navigate('Chat', {name: name, chatColor: chatColor})}
            >
              <Text style={styles.chatText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12
    },
    backgroundImage: {
      flex: 1
    },
    title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: '50%'
    },
    text: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083'
    },
    opacity: {
        opacity: 0.5
    },
    content: {
      width: '88%',
      height: '44%',
      backgroundColor: 'white',
      padding: 20,
    },
    border: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#757083',
        padding: 10,
        marginBottom: 30
    },
    chatButton: {
      height: 60,
      backgroundColor: "#757083",
      alignItems: 'center',
      justifyContent: 'center'
    },
    chatText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: '600',
    },
    colorButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginBottom: 20
    },
    colorPick: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 10
    },
    option1: {
        backgroundColor: "#090C08"
    },
    option2: {
        backgroundColor: "#474056"
    },
    option3: {
        backgroundColor: "#8A95A5"
    },
    option4: {
        backgroundColor: "#B9C6AE"
    },
  });

export default Start;