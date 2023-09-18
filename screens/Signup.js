import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import backImage from "../assets/backImage.png";

export default function Signup({ navigation }) {
  //Viene utilizzato lo stato per immagazzinare l'email e la password inserite dall'utente.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //La funzione onHandleSignup viene chiamata quando l'utente preme il pulsante di registrazione.
  //Se entrambi l'email e la password sono stati inseriti, utilizza la funzione
  //createUserWithEmailAndPassword di Firebase per creare un nuovo utente.
  //In caso di successo, verrà visualizzato un messaggio di log, altrimenti verrà mostrato un
  //messaggio di errore tramite Alert.alert.
  const onHandleSignup = () => {
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
      .then(() => console.log('Signup success'))
      .catch((err) => Alert.alert("Login error", err.message));
    }
  };
  //All'interno del componente return, viene restituita la struttura dell'interfaccia utente.
  //Questo include un'immagine di sfondo (backImage), una "scheda" bianca che sovrappone 
  //l'immagine di sfondo (whiteSheet), un'area sicura (SafeAreaView) e il contenuto del modulo di login.
  //Vengono creati due campi di input per l'email e la password. Vengono utilizzati gli stati email 
  //e password per associare i valori degli input e la funzione onChangeText per aggiornarli.
  //Viene creato il pulsante di login. Quando viene cliccato, verrà chiamata la funzione onHandleLogin.
  //Quando l'utente clicca "Login", verrà portato alla schermata di Login tramite la prop navigation.
  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
         <TextInput
        style={styles.input}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
        <Text style={styles.TextLogin}> Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.TextAccount}>
        <Text style={styles.TextAAccount}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.TextLogin}> Log In</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: "#fff"},
  title: {fontSize: 36,fontWeight: 'bold',color: "orange",alignSelf: "center",paddingBottom: 24},
  input: {backgroundColor: "#F6F7FB",height: 58,marginBottom: 20,fontSize: 16,borderRadius: 10,padding: 12},
  backImage: {width: "100%",height: 340,position: "absolute",top: 0,resizeMode: 'cover'},
  whiteSheet:{width:'100%',height:'75%',position:"absolute",bottom:0,backgroundColor:'#fff',
  borderTopLeftRadius: 60},
  form: {flex: 1, justifyContent: 'center', marginHorizontal: 30},
  button:{backgroundColor:'#f57c00',height:58,borderRadius:10,justifyContent:'center',alignItems:'center',
  marginTop: 40},
  TextLogin: { fontWeight: 'bold', color: '#fff', fontSize: 18},
  TextAccount: {marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'},
  TextAAccount: {color: 'gray', fontWeight: '600', fontSize: 14},
  TextLogin: {color: '#f57c00', fontWeight: '600', fontSize: 14}
});