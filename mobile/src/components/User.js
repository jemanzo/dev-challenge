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
    flexDirection: 'row'
  },
  textName: {
    fontSize: 24
  },
  textEmail: {
    fontSize: 18
  }
});

export default memo(({ user }) => (
  <View style={styles.main}>
    <View style={styles.main}>
      <View style={[styles.imageWrapper, { borderColor: user.color }]}>
        <Image style={styles.image} source={{ uri: user.image }} />
      </View>
      <Text style={styles.textName}>{user.name}</Text>
      <Text> key {user.id}</Text>
    </View>
    <View>
      <Text style={styles.textEmail}>{user.email}</Text>
      <Text style={styles.textEmail}>{user.company && user.company.name}</Text>
    </View>
    <Address address={user.address} />
  </View>
));
