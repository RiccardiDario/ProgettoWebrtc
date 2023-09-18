import { View, Text, Pressable, StyleSheet} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default ChatComponent = ({ item }) => {
    //Crea una variabile navigation utilizzando il hook useNavigation()
    //per ottenere un'istanza di navigazione.
    const navigation = useNavigation();
    //efinisce una funzione handleNavigation che sarà chiamata quando l'utente
    //digita sull'elemento di chat. Questa funzione utilizza navigation.navigate()
    //per navigare verso la schermata "Chat" e passa l'oggetto item come parametro.
    const handleNavigation = () => {navigation.navigate("Chat", {item}); };
    //Il ritorno di questa funzione è una struttura JSX che rappresenta l'elemento di chat
    return (
        //Un componente Pressable che rappresenta l'area cliccabile dell'elemento di chat.
        //Quando viene cliccato, chiama la funzione handleNavigation.
        <Pressable style={styles.cchat} onPress={handleNavigation}>
            <Ionicons name='logo-electron' size={45} color='black'style={styles.cavatar} />
            <View style={styles.crightContainer}>
              <Text style={styles.cusername}>{item}</Text>
            </View>
        </Pressable>);};

const styles = StyleSheet.create({
cchat:{width:"100%",flexDirection:"row",alignItems:"center",borderRadius:5,paddingHorizontal:15,
backgroundColor:"#fff",height:80,marginBottom: 10},
cavatar: {marginRight: 15},
crightContainer: {flexDirection: "row",justifyContent: "space-between",flex: 1},
cusername: {fontSize: 18,marginBottom: 5,fontWeight: "bold"}
})