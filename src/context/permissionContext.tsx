import React, {useEffect, useState} from 'react';

import {createContext} from 'react';
import {AppState, Platform, Text, View} from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

interface permissionState {
  locationStatus: PermissionStatus;
  //  cameraStatus: PermissionStatus;
  //  contactStatus: PermissionStatus;
}

export const permissionInitialState: permissionState = {
  locationStatus: 'unavailable',
};
//vamos a definir el tipado que vamos a extraer del context
type PermissionContextProps = {
  permission: permissionState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionContext = createContext({} as PermissionContextProps); //permissionContext.

export const PermissionProvider = ({children}: any) => {
  const [permission, setPermission] = useState(permissionInitialState);

  //Ahora vamos a usar un useEffect pára comprobar los settings del sistema operativo y actualizarlos la app cada vez que haya un cambio con el listener 'change'
  useEffect(() => {
    //aqui disparamos nuevamente el check para arreglar el error del loading infinito
    checkLocationPermission();
    AppState.addEventListener('change', state => {
      if (state !== 'active') {
        return;
      }
      //vamos a ejecutatr el check cada vez que el usuario se salga de la app
      checkLocationPermission();
    });
  }, []);
  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      // permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      // if (Platform.OS === 'android') {
      // permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      // con openSetting mandamos a l usuario a las configuraciones del teklefono tanto en android como en ios
      if (permission.locationStatus === 'blocked') {
        openSettings();
      }
    }
    //aqui vamos a mandar todos los permisos(cuando tengas mas de una) y vamos a actualizar el del location(en este caso)
    setPermission({...permission, locationStatus: permissionStatus});
  };
  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      // permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      // if (Platform.OS === 'android') {
      // permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    //aqui vamos a actualizar el estado del permiso, cada vez que salga y entre el useuario de la app con el listener del useEffect
    setPermission({...permission, locationStatus: permissionStatus});
  };

  return (
    <PermissionContext.Provider
      value={{permission, askLocationPermission, checkLocationPermission}}>
      {children}
    </PermissionContext.Provider>
  );
};
