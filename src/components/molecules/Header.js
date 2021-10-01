import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {IconGoBack} from '../../assets/Icons';

const Header = ({title, subTitle, onPress}) => {
  return (
    <View style={styles.headerContainer}>
      {onPress && (
        <Pressable onPress={onPress}>
          <View style={styles.containerIconBack}>
            <IconGoBack />
          </View>
        </Pressable>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {paddingHorizontal: 24, paddingBottom: 24, paddingTop: 30},
  title: {fontSize: 22, fontFamily: 'Poppins-Medium'},
  subTitle: {fontSize: 14, fontFamily: 'Poppins-Light'},
  containerIconBack: {paddingVertical: 10, marginLeft: 14, paddingLeft: 10},
});
