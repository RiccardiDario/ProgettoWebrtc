import React from 'react';
import { AuthenticatedUserProvider} from './config/AuthProvider';
import { StackNavigator } from './navigation/StackNavigator';

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <StackNavigator/>
    </AuthenticatedUserProvider>
  );
}