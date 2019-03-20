import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  userList: {
    flexDirection: 'row',
    padding: 20
  },
  imageWrapper: {
    marginRight: 20,
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.2)',
    width: 80,
    height: 80,
    overflow: 'hidden'
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  text: {
    flexDirection: 'column'
  },
  textName: {
    fontSize: 24
  },
  textEmail: {
    fontSize: 18
  }
});

export default memo(({ address }) => (
  <View style={styles.addressList}>
    <Text style={styles.textName}>Address</Text>
    <View style={styles.text}>
      <Text style={styles.textName}>{address.zipCode}</Text>
      <Text style={styles.textEmail}>{address.city}</Text>
      <Text style={styles.textEmail}>{address.cityPrefix}</Text>
      <Text style={styles.textEmail}>{address.citySuffix}</Text>
      <Text style={styles.textEmail}>{address.streetName}</Text>
      <Text style={styles.textEmail}>{address.streetAddress}</Text>
      <Text style={styles.textEmail}>{address.streetSuffix}</Text>
      <Text style={styles.textEmail}>{address.streetPrefix}</Text>
      <Text style={styles.textEmail}>{address.secondaryAddress}</Text>
      <Text style={styles.textEmail}>{address.county}</Text>
      <Text style={styles.textEmail}>{address.country}</Text>
      <Text style={styles.textEmail}>{address.state}</Text>
      <Text style={styles.textEmail}>{address.latitude}</Text>
      <Text style={styles.textEmail}>{address.longitude}</Text>
    </View>
  </View>
));

// address:
//    { zipCode: '71904',
//      city: 'Port Alfonzoton',
//      cityPrefix: 'East',
//      citySuffix: 'town',
//      streetName: 'Charlene Point',
//      streetAddress: '51512 Ferne Point',
//      streetSuffix: 'Track',
//      streetPrefix: 'a',
//      secondaryAddress: 'Suite 217',
//      county: 'Cambridgeshire',
//      country: "Democratic People's Republic of Korea",
//      state: 'New Mexico',
//      latitude: '9.4783',
//      longitude: '132.6434' },
