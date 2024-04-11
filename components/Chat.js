import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({route, navigation}) => {
    const { name, chatColor } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name})
    }, []);

    return(
        <View style={[styles.main, {backgroundColor: chatColor}]}>
            <Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
});

export default Chat;