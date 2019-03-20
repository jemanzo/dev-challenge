import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from 'react-native';
import { Query } from 'react-apollo';

import { ErrorScene, UserList } from '../../components';
import { QRY_USERS } from '../../queries';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class UsersScene extends PureComponent {
  constructor() {
    super();
    // MISSING PAGINATION USING CURSOR!!!
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Query query={QRY_USERS}>
          {({ loading, error, data, fetchMore }) => {
            if (loading) {
              return <ActivityIndicator />;
            }
            if (error) {
              return <ErrorScene message={error.message} />;
            }
            return (
              <FlatList
                data={data.users}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('UserScene', { id: item.id })
                    }
                  >
                    <UserList key={item.id} user={item} />
                  </TouchableOpacity>
                )}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}
