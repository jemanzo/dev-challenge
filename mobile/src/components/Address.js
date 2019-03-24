import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainBody: {
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#EEEEEE'
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
  separator: {
    marginVertical: 8
  },
  field: {
    flexDirection: 'row'
  },
  fieldName: {
    flex: 1,
    fontSize: 12,
    color: 'gray'
  },
  fieldValue: {
    flex: 2,
    fontSize: 14
  }
});

export default memo(({ address }) => (
  <View style={styles.mainBody}>
    <View style={styles.separator}>
      {fieldRow('zipcode', address.zipCode)}
    </View>
    <View style={styles.separator}>
      {fieldRow('city', address.city)}
      {fieldRow('   prefix', address.cityPrefix)}
      {fieldRow('   suffix', address.citySuffix)}
    </View>
    <View style={styles.separator}>
      {fieldRow('street', address.streetName)}
      {fieldRow('   address', address.streetAddress)}
      {fieldRow('   prefix', address.streetPrefix)}
      {fieldRow('   suffix', address.streetSuffix)}
      {fieldRow('   sec.', address.secondaryAddress)}
    </View>
    <View style={styles.separator}>
      {fieldRow('country', address.country)}
      {fieldRow('   state', address.state)}
      {fieldRow('   county', address.county)}
    </View>
    {fieldRow('geolocation', `${address.latitude}    ${address.longitude}`)}
  </View>
));

function fieldRow(fieldName, fieldValue){
  return (
    <View style={styles.field}>
      <Text style={styles.fieldName}>{fieldName}</Text>
      <Text style={styles.fieldValue}>{fieldValue}</Text>
    </View>
  )
}

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
