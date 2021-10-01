/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {ContactCard, Header} from '../components/molecules';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllContactActions,
  deleteContactAction,
} from '../redux/Action/Contact';

//redux action

const ContactList = ({route, navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContactActions());
  }, [route, navigation.state]);

  const dataAllContact = useSelector(state => state.GetAllContact);
  console.log('dataAllContact: ', dataAllContact);
  return (
    <View style={styles.wrapper}>
      <Header title="Contact" subTitle="You'r contact list" />
      <View style={styles.containerMainContact}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {dataAllContact.dataAllContact.length !== 0 ? (
            dataAllContact.dataAllContact.data.data.map((item, index) => (
              <ContactCard
                key={item.id}
                firstName={item.firstName}
                image={item.photo}
                deletePress={() => {
                  dispatch(deleteContactAction(item.id)),
                    console.log('deleted');
                }}
                onPress={() => {
                  navigation.navigate('ContactDetail', {id: item.id});
                }}
              />
            ))
          ) : (
            <ActivityIndicator size="large" style={styles.spinner} />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  containerMainContact: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  spinner: {marginTop: 20},
  containerScroll: {flex: 1},
});
