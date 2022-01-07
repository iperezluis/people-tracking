import React, {useContext} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../src/pages/MapScreen';
import PermisionScreen from '../src/pages/PermisionScreen';
import {PermissionContext} from '../src/context/permissionContext';
import LoadingScreen from '../src/pages/LoadingScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
  const {permission} = useContext(PermissionContext);
  if (permission.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }
  return (
    <Stack.Navigator
      initialRouteName="PermissionScreen"
      screenOptions={{headerShown: false}}>
      {permission.locationStatus === 'granted' ? (
        <Stack.Screen name="MapScreen" component={MapScreen} />
      ) : (
        <Stack.Screen name="PermissionScreen" component={PermisionScreen} />
      )}
    </Stack.Navigator>
  );
};
