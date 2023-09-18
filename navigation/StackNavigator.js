import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthenticatedUser } from '../config/AuthProvider';
import Home from '../screens/Home';
import Chat from '../screens/Chat';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

///Viene creat un oggetto di navigazione stack 
const Stack = createStackNavigator();

export function StackNavigator() {
  const { user } = useAuthenticatedUser();
   // Mostra l'indicatore di caricamento finché non è stato determinato lo stato dell'utente
   if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  if (user === null) {
    // Utente non autenticato, mostra lo stack di navigazione per l'autenticazione
    //screenOptions nasconde l'intestazione in tutte le schermate di questo stack.
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Signup' component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // Utente autenticato, mostra lo stack di navigazione della chat
  //defaultScreenOptions imposta la schermata iniziale su Home.
  return (
    <NavigationContainer>
      <Stack.Navigator defaultScreenOptions={Home}  >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Chat' component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}