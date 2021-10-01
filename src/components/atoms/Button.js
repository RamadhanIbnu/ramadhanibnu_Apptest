import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const Button = ({color = '#3d75c4', title, textColor = '#020202', onPress}) => {
  return (
    <View>
      <Pressable onPress={onPress}>
        <View style={styles.containerButton(color)}>
          <Text style={styles.text(textColor)}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  containerButton: color => ({
    backgroundColor: color,
    paddingVertical: 12,
    borderRadius: 8,
  }),
  text: textColor => ({
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: textColor,
  }),
});
