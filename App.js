import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";

import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCYZCw5Se1MAWNJ9NyQOWIzf64ApGj329M",
    authDomain: "chat-app-651fe.firebaseapp.com",
    projectId: "chat-app-651fe",
    storageBucket: "chat-app-651fe.appspot.com",
    messagingSenderId: "1014105878160",
    appId: "1:1014105878160:web:3060449353abc4459eb215"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const storage = getStorage(app);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props}/>}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;