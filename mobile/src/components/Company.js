import React, { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Address from './Address';

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
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

export default memo(({ company }) => (
  <View style={styles.main}>
    <View style={[styles.imageWrapper, { borderColor: company.color }]}>
      <Image style={styles.image} source={{ uri: company.image }} />
    </View>
    <View>
      <Text>{company.id}</Text>
      <Text style={styles.textName}>{company.name}</Text>
      <Address address={company.address} />
    </View>
  </View>
));
