import { useState } from "react";
import { Alert, StyleSheet, View, TextInput, Text, TouchableOpacity, ImageBackground } from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState('');
  const [chatColor, setChatColor] = useState('');

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", {userID: result.user.uid, name: name, chatColor: chatColor });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      })
  }

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
              <TouchableOpacity style={[styles.colorPick,styles.option1, chatColor === "#090C08" && styles.selection]} onPress={() => setChatColor("#090C08")}>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.colorPick,styles.option2, chatColor === "#474056" && styles.selection]} onPress={() => setChatColor("#474056")}>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.colorPick,styles.option3, chatColor === "#8A95A5" && styles.selection]} onPress={() => setChatColor("#8A95A5")}>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.colorPick,styles.option4, chatColor === "#B9C6AE" && styles.selection]} onPress={() => setChatColor("#B9C6AE")}>
              </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.chatButton}
            onPress={signInUser}
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
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 10
    },
    option1: {
        backgroundColor: "#090C08",
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
    selection: {
      borderWidth: 3,
      borderColor: 'gray'
    }
  });

export default Start;