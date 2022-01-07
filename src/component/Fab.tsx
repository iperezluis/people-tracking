import React from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  iconName: string;
}
const Fab = ({title, onPress, style = {}, iconName}: Props) => {
  return (
    <View style={{...(style as any)}}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.blackButton}>
        <Icon name={iconName} size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  blackButton: {
    backgroundColor: '#000',
    width: 50,
    height: 50,
    borderRadius: 50,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4,
    elevation: 9,
  },
});
export default Fab;
