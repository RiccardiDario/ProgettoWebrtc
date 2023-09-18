import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {collection, query,where,getDocs,doc,deleteDoc, addDoc} from 'firebase/firestore';
import { database} from '../config/firebase';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


export default Modal = ({ setVisible, room, position }) => {
    // Utilizzo dello stato per gestire il valore del campo
    // "groupName" e inizializzazione a una stringa vuota
    const [groupName, setGroupName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // Funzione per chiudere il modal
    const closeModal = () => setVisible(false);
    // Funzione per gestire la creazione di una nuova stanza
    const handleCreateRoom = () => {
        const isGroupNameInRoomList = room.includes(groupName); // Verifica se groupName è presente in room
        if(!position){
          const newUUID = uuidv4();
          if(!isGroupNameInRoomList){
            addDoc(collection(database, 'prova'), {key:newUUID, name: groupName});
            closeModal(); 
          }else{ 
            setErrorMessage("Il nome del gruppo esiste già nella lista. Riprova con un altro nome");}
        }else{
          if(isGroupNameInRoomList){
            const q = query(collection(database, 'prova'), where('name', '==', groupName));
            getDocs(q).then((querySnapshot) => {
              // Controlla se ci sono documenti con lo stesso 'name'
              if (!querySnapshot.empty) {
                // Se ci sono documenti, elimina il primo documento trovato
                const documentRef = doc(database, 'prova', querySnapshot.docs[0].id);
                // Elimina il documento utilizzando il suo riferimento
                deleteDoc(documentRef).then(() => {
                    console.log("Documento eliminato con successo");
                    closeModal();
                  })
                  .catch((error) => {
                    console.error("Errore durante l'eliminazione del documento:", error);
                  });
              } else {
                setErrorMessage("Il nome del gruppo non esiste nella lista.");
              }
            })
            .catch((error) => {
              console.error("Errore durante la query:", error);
            });
          }else{ 
            setErrorMessage("Il nome del gruppo non esiste nella lista");}} };

    //// Il componente restituisce una serie di elementi UI, tra cui un testo, 
    //un campo di input e due pulsanti
    return (
        <View style={styles.modalContainer}>
          <Text style={styles.modalsubheading}>Enter your Group name</Text>
          <TextInput style={styles.modalinput} placeholder='Group name'
            onChangeText={(value) => setGroupName(value)}/>
          {errorMessage !== "" && (<Text style={styles.errorText}>{errorMessage}</Text>)}
            <View style={styles.modalbuttonContainer}>
                <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
                    <Text style={styles.modaltext}>SUBMIT</Text>
                </Pressable>
                <Pressable
                    style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
                    onPress={closeModal}>
                    <Text style={styles.modaltext}>RETURN</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
modalContainer:{width:"100%",borderTopColor:"#ddd",borderTopWidth:1,elevation: 1,height: 400,
backgroundColor: "#fff",position: "absolute",bottom: 0,zIndex: 10,paddingVertical: 50,paddingHorizontal: 20},
modalsubheading: {fontSize: 20,fontWeight: "bold",marginBottom: 15,textAlign: "center"},
modalinput: {borderWidth: 2,padding: 15},
modalbuttonContainer: {flexDirection: "row",justifyContent: "space-between",marginTop: 10},
modalbutton: {width: "40%",height: 45, backgroundColor: "green",borderRadius: 5,alignItems: "center",
justifyContent: "center", color: "#fff" },
errorText: {color: "red",
textAlign: "center",
    marginTop: 10,
},
modaltext: {color: "#fff"}});