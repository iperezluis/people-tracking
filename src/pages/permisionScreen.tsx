import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BlackButton from '../component/BlackButton';
import {PermissionContext} from '../context/permissionContext';

const PermisionScreen = () => {
  const {permission, askLocationPermission} = useContext(PermissionContext);

  return (
    <View style={styles.container}>
      <BlackButton title="Permisos" onPress={askLocationPermission} />
      <Text>{JSON.stringify(permission, null, 4)}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default PermisionScreen;
