import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {createContactAction} from '../redux/Action/Contact';

import {Button, Gap, TextInput} from '../components/atoms';
import {Header} from '../components/molecules';
import {ScrollView} from 'react-native-gesture-handler';

const AddContact = () => {
  const [dataPhoto, setDataPhoto] = useState();
  const [contactValue, setContactValue] = useState({
    firstName: '',
    lastName: '',
    age: '',
    photo: dataPhoto ? dataPhoto.uri : 'N/A',
  });
  console.log('contactValue :', contactValue);
  const dispatch = useDispatch();

  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  const selectFile = () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res.assets[0];
        setDataPhoto(source);
        toDataURL(source.uri, data => {
          setContactValue({
            ...contactValue,
            photo: data,
          });
        });
        console.log('response image: ', source);
        console.log('response all image source : ', res);
        AsyncStorage.setItem('uriImage', source.uri);
      }
    });
  };

  return (
    <View style={styles.wrapper}>
      <Header title="Add Contact" subTitle="Save your contact here" />
      <View style={styles.containerMain}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerAddPhoto}>
            <View style={styles.borderAddPhoto}>
              {dataPhoto ? (
                <Pressable onPress={selectFile}>
                  <Image
                    source={{
                      uri: dataPhoto.uri,
                    }}
                    style={styles.containerPhoto}
                  />
                </Pressable>
              ) : (
                <Pressable onPress={selectFile}>
                  <View style={styles.backgroundAddPhoto}>
                    <Text style={styles.textAddPhoto}>Add Photo</Text>
                  </View>
                </Pressable>
              )}
            </View>
          </View>
          <TextInput
            label="First Name"
            placeholder="First name of your contact"
            onChangeText={text => {
              setContactValue({
                ...contactValue,
                firstName: text,
              });
            }}
          />
          <TextInput
            label="Last Name"
            placeholder="Last name of your contact"
            onChangeText={text => {
              setContactValue({
                ...contactValue,
                lastName: text,
              });
            }}
          />
          <TextInput
            label="Age"
            placeholder="Age of your contact"
            onChangeText={text => {
              setContactValue({
                ...contactValue,
                age: text,
              });
            }}
          />
          <Gap height={15} />
          <Button
            title="Save Contact"
            textColor="white"
            onPress={() => {
              dispatch(createContactAction(contactValue)),
                setContactValue({
                  ...contactValue,
                  firstName: '',
                  lastName: '',
                  age: '',
                  photo: '',
                });
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default AddContact;

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  containerMain: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 24,
    padding: 24,
  },
  containerAddPhoto: {alignItems: 'center'},
  containerPhoto: {
    height: 90,
    width: 90,
    borderRadius: 90 / 2,
  },
  backgroundAddPhoto: {
    height: 90,
    width: 90,
    borderRadius: 90 / 2,
    backgroundColor: '#F0F0F0',
  },
  borderAddPhoto: {
    borderWidth: 1,
    borderStyle: 'dashed',
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAddPhoto: {
    textAlign: 'center',
    lineHeight: 90,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
  },
});
