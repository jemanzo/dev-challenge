import React, { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  companyList: {
    flexDirection: 'row',
    padding: 10
  },
  imageWrapper: {
    marginRight: 20,
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.2)',
    width: 60,
    height: 60,
    overflow: 'hidden'
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
  text: {
    flexDirection: 'column'
  },
  textName: {
    fontSize: 22
  },
  textID: {
    fontSize: 10,
    color: 'gray'
  }
});

export default memo(({ company }) => (
  <View style={styles.companyList}>
    <View style={[styles.imageWrapper, { borderColor: company.color }]}>
      <Image style={styles.image} source={{ uri: company.image }} />
    </View>
    <View style={styles.text}>
      <Text style={styles.textName}>
        {company.name.length > 24
          ? company.name.substr(0, 24) + '...'
          : company.name}
      </Text>
      <Text style={styles.textID}>{company.id}</Text>
    </View>
  </View>
));
