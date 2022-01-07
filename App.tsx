import 'react-native-gesture-handler';
import React from 'react';
import {Navigator} from './navigation/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {PermissionProvider} from './src/context/permissionContext';

const AppState = ({children}: any) => {
  return <PermissionProvider>{children}</PermissionProvider>;
};
export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
}
