import React, {useState,useLayoutEffect,useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {collection, addDoc, orderBy, query, onSnapshot} from 'firebase/firestore';
import {signOut} from 'firebase/auth';
import {auth, database} from '../config/firebase';
import {useNavigation} from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons';

export default function Chat({route}) {
  const gray= '#C5C5C7';
  //Viene utilizzato lo stato messages per immagazzinare i messaggi della chat.
  const [messages, setMessages] = useState([]);
  //useNavigation è utilizzato per ottenere l'oggetto di navigazione che
  //consente di interagire con la navigazione dell'app
  const navigation = useNavigation();
  //La funzione onSignOut viene chiamata quando l'utente clicca il pulsante di 
  //logout. Utilizza la funzione signOut di Firebase per effettuare il logout.
  const onSignOut = () => {signOut(auth).catch(error => console.log('Error logging out: ', error));};
  //Questo hook viene utilizzato per personalizzare l'intestazione della
  //navigazione. Aggiunge un nome e un'icona di logout nell'angolo superiore destro
  //dell'intestazione. Quando l'icona viene cliccata, richiama la funzione onSignOut.
  useLayoutEffect(() => {
    navigation.setOptions({ title: route.params.item,
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 10}} onPress={onSignOut}>
          <AntDesign name="logout" size={24} color={gray} style={{marginRight: 10}}/>
        </TouchableOpacity>)});}, 
      [navigation]); 
  //In questo effetto collaterale, viene configurato un ascolto per i messaggi 
  //dalla collezione Firebase "chats". Viene creato un query snapshot per recuperare
  //i messaggi in ordine di creazione decrescente. Quando viene rilevato un
  //cambiamento nei dati, la funzione fornita a onSnapshot aggiorna lo stato
  //messages con i dati dei messaggi
  useLayoutEffect(() => { 
    const collectionRef = collection(database, route.params.item);
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(querySnapshot.docs.map(doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user})));});
    return unsubscribe;}, []);
  //La funzione onSend viene chiamata quando l'utente invia un messaggio.
  //Aggiunge il messaggio alla lista dei messaggi esistente e lo invia al database Firebase.
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const { _id, createdAt, text, user } = messages[0];    
    addDoc(collection(database, route.params.item), {_id, createdAt, text, user});}, []);
    //Viene restituito il componente GiftedChat che è un componente di chat fornito da
    //react-native-gifted-chat. Vengono passati i messaggi, le impostazioni di visualizzazione
    //dei messaggi e gli stili. Il campo user viene impostato con l'ID dell'utente corrente
    //e un avatar predefinito.
    return (
      <GiftedChat messages={messages} showAvatarForEveryMessage={true} showUserAvatar={true}
      onSend={messages => onSend(messages)} messagesContainerStyle={{backgroundColor: '#fff'}}
      textInputStyle={{backgroundColor: '#fff', borderRadius: 20,}} user={{
      _id: auth?.currentUser?.email, avatar: 'https://i.pravatar.cc/300'}}/>);}