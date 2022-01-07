import React from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import Maps from '../component/Maps';
const MapScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Maps />
    </View>
  );
};

export default MapScreen;
