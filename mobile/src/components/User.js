import React, { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Address from './Address';

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    padding: 20
  },
  mainHeader: {
    flexDirection: 'row',
    padding: 10
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
  headerInfo: {
    fontSize: 22
  },
  headerInfoSmall: {
    fontSize: 12,
    color: 'gray'
  },
  separator: {
    marginVertical: 8
  },
  field: {
    flexDirection: 'column',
    margin: 10
  },
  fieldName: {
    fontSize: 16,
    color: 'gray',
    marginVertical: 10
  },
  fieldValue: {
    fontSize: 14,
    marginRight: 10
  }
});

export default memo(({ user }) => (
  <View style={styles.main}>
    <View style={styles.mainHeader}>
      <View style={[styles.imageWrapper, { borderColor: user.color }]}>
        <Image style={styles.image} source={{ uri: user.image }} />
      </View>
      <View>
        <Text style={styles.headerInfo}>{user.name}</Text>
        <Text style={styles.headerInfoSmall}>{user.id}</Text>
        <Text style={styles.headerInfoSmall}>{user.email.toLowerCase()}</Text>
      </View>
    </View>
    <View style={styles.field}>
      <Text style={styles.fieldName}>Company</Text>
      <Text style={styles.fieldValue}>{user.company ? user.company.name : 'none yet!' }</Text>
    </View>
    <View style={styles.field}>
      <Text style={styles.fieldName}>Address</Text>
      <Address address={user.address} />
    </View>
  </View>
));
