import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}
const BlackButton = ({title, onPress, style}: Props) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{...(style as any), ...styles.blackButton}}
        onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  blackButton: {
    height: 50,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1.5,
    shadowRadius: 5.5,
    elevation: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    alignItems: 'center',
  },
});
export default BlackButton;
