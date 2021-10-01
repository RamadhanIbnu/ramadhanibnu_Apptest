import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {IconDeleteOff, IconGoNow} from '../../assets/Icons';
// import {DummyProfile} from '../../assets/Dummy/index';
import DummyProfile from '../../assets/Dummy/profile-dummy.png';

const ContactCard = ({route, image, firstName, onPress, deletePress}) => {
  return (
    <View style={styles.wrapper}>
      <Pressable onPress={deletePress}>
        <View style={styles.iconDelete}>
          <IconDeleteOff />
        </View>
      </Pressable>
      <Pressable onPress={onPress} style={styles.containerPressable}>
        <View style={styles.containerCard}>
          {image === 'N/A' ? (
            <Image source={DummyProfile} style={styles.photo} />
          ) : (
            <Image
              source={{
                uri: image,
              }}
              style={styles.photo}
            />
          )}
          <Text>{firstName}</Text>
          <IconGoNow />
        </View>
      </Pressable>
    </View>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 8,
    elevation: 10,
    shadowColor: '#bfbfbf',
    marginBottom: 20,
  },
  containerCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerPressable: {
    flex: 1,
  },
  photo: {height: 50, width: 50, borderRadius: 25},
  iconDelete: {
    marginRight: 10,
    justifyContent: 'center',
    padding: 5,
    marginTop: 3,
  },
});
