import React, { useState, createContext, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

//Viene creato un contesto (AuthenticatedUserContext) che verrà utilizzato per condividere lo 
//stato dell'utente autenticato attraverso l'app. AuthenticatedUserProvider è un componente che 
//fornisce il contesto dell'utente autenticato a componenti nidificati. Utilizza lo stato per
//memorizzare le informazioni sull'utente e lo rende accessibile tramite il contesto.
const AuthenticatedUserContext = createContext({});
export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
//l'hook useEffect viene utilizzato per gestire il cambiamento dello stato dell'autenticazione. 
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
    });return () => unsubscribeAuth(); }, []);

  return (
    <AuthenticatedUserContext.Provider value={{ user }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
export const useAuthenticatedUser = () => useContext(AuthenticatedUserContext);