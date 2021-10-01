/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';

import {Button, Gap, TextInput} from '../components/atoms';
import {Header} from '../components/molecules';
import {
  editContactAction,
  getContactByIdActions,
} from '../redux/Action/Contact';
import DummyProfile from '../assets/Dummy/profile-dummy.png';

const ContactDetail = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [id] = useState(route.params ? route.params.id : '');
  const dataDetail = useSelector(state => state.GetContactById.dataContactById);
  const [contactValue, setContactValue] = useState({
    firstName: dataDetail.length ? dataDetail.data.data.firstName : '',
    lastName: dataDetail.length ? dataDetail.data.data.lastName : '',
    age: dataDetail.length ? dataDetail.data.data.age.toString() : '',
    photo: dataPhoto ? dataPhoto.uri : 'N/A',
  });
  console.log('contactValue: ', contactValue);
  const [dataPhoto, setDataPhoto] = useState();
  console.log('dataPhoto: ', dataPhoto);
  console.log('dataDetail: ', dataDetail);

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
        console.log('response image: ', source);
        toDataURL(source.uri, data => {
          setContactValue({
            ...contactValue,
            photo: data,
          });
        });
        AsyncStorage.setItem('uriImage', source.uri);
      }
    });
  };

  useEffect(() => {
    dispatch(getContactByIdActions(id));
  }, []);

  return (
    <View style={styles.wrapper}>
      <Header
        title="Contact Detail"
        subTitle={`${
          dataDetail.length !== 0 ? dataDetail.data.data.firstName : ''
        } detail contact`}
      />
      <View style={styles.containerMain}>
        <View style={styles.containerAddPhoto}>
          <View style={styles.borderAddPhoto}>
            {dataPhoto || dataDetail !== undefined ? (
              <Pressable onPress={selectFile}>
                {dataPhoto !== undefined ? (
                  <Image
                    source={{
                      uri: dataPhoto.uri,
                    }}
                    style={styles.containerPhoto}
                  />
                ) : dataDetail.data && dataDetail.data.data.photo === 'N/A' ? (
                  <Image source={DummyProfile} style={styles.containerPhoto} />
                ) : (
                  <Image
                    source={{
                      uri:
                        dataDetail.length !== 0
                          ? dataDetail.data.data.photo
                          : '',
                    }}
                    style={styles.containerPhoto}
                  />
                )}
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
          defaultValue={
            dataDetail.length !== 0 ? dataDetail.data.data.firstName : ''
          }
          value={
            contactValue.firstName !== ''
              ? contactValue.firstName
              : dataDetail.length !== 0 && dataDetail.data.data.firstName
          }
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
          defaultValue={
            dataDetail.length !== 0 ? dataDetail.data.data.lastName : ''
          }
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
          defaultValue={
            dataDetail.length !== 0 ? dataDetail.data.data.age.toString() : ''
          }
          onChangeText={text => {
            setContactValue({
              ...contactValue,
              age: text,
            });
          }}
        />
        <Gap height={15} />
        <Button
          title="Update Contact"
          textColor="white"
          onPress={() => {
            dispatch(editContactAction(contactValue, id));
            setContactValue({
              ...contactValue,
              firstName: '',
              lastName: '',
              age: '',
              photo: '',
            });
          }}
        />
      </View>
    </View>
  );
};

export default ContactDetail;

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
