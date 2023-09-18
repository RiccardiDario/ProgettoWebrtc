import React, {useState,useLayoutEffect,useEffect} from "react";
import { View, Text, Pressable, SafeAreaView, FlatList, StyleSheet} from "react-native";
import { Feather } from "@expo/vector-icons";
import {collection, orderBy, query, onSnapshot} from 'firebase/firestore';
import ChatComponent from "../components/ChatComponent";
import Modal from "./../components/Modal";
import isEmpty from 'lodash/isEmpty';
import {database} from '../config/firebase';
import { useNavigation } from "@react-navigation/native";

export default Home = () => {
  // Stati del componente
  const [visible, setVisible] = useState(false); // Gestisce la visibilità del modal
  const [room, setRoom] = useState([]); // Memorizza le informazioni sulle stanze
  const [roomNamesList, setroomNamesList]= useState([]);
  const [position,setPosition] = useState(false); // Viene usato per capire quale bottone è stato cliccato
  const navigation = useNavigation();

  // useEffect che si esegue durante il rendering iniziale
  useLayoutEffect(() => {
    const collectionRef = collection(database, 'prova'); // Riferimento alla collezione Firestore 'prova'
    const q = query(collectionRef, orderBy('name', 'desc')); // Query per ottenere le stanze ordinate per nome discendente
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setRoom(querySnapshot.docs.map(doc => ({ key: doc.data().key, name: doc.data().name }))); // Aggiorna lo stato "room" con i dati delle stanze
      setroomNamesList(room.map(roomItem => roomItem.name));
    });
    return unsubscribe; // Unsubscribe dalla query quando il componente viene smontato
  }, [room]); // L'array vuoto [] indica che questo effetto si eseguirà solo una volta al montaggio del componente

  // useEffect per aggiornare l'header della navigazione
  useEffect(() => {
    navigation.setOptions({ title:"Homepage", headerTitleAlign: 'center',
    headerLeft: () => (
      <Pressable onPress={() => {setVisible(true), setPosition(true)}}>
        <Feather name='trash-2' size={30} color='green' />
      </Pressable>),
      headerRight: () => (
        <Pressable onPress={() => {setVisible(true), setPosition(false)}}>
          <Feather name='message-circle' size={30} color='green' />
        </Pressable>)
   });
  }, [navigation]);
  
  useEffect(() => {
    if (!isEmpty(room)) {
      setroomNamesList(room.map(roomItem => roomItem.name));
    }}, [room]);

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chatlistContainer}>
        {!isEmpty(room) ? (
          // Renderizza una FlatList se 'room' non è vuoto
          <FlatList
            data={room}
            renderItem={({ item }) => <ChatComponent item={item.name} />} // Renderizza il componente ChatComponent
            keyExtractor={(item) => item.key}
          />
        ) : (
          // Mostra un messaggio se 'room' è vuoto
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      {visible ? <Modal setVisible={setVisible} room={roomNamesList} position={position}/> : ""}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chatscreen: {backgroundColor: "#F7F7F7",flex: 1,padding: 10,position: "relative"},
  chatheading: {fontSize: 24,fontWeight: "bold",color: "green"},
  chatlistContainer: {paddingHorizontal:10},
  chatemptyContainer: {width: "100%", height: "80%", alignItems: "center", justifyContent: "center"},
  chatemptyText: {fontWeight: "bold", fontSize: 24,paddingBottom: 30}
});