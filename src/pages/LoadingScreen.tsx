import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={30} color="grey" />
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
