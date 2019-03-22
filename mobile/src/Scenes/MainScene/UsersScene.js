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
        <Query query={QRY_USERS} variables={{ first: 100 }}>
          {({ loading, error, data, fetchMore }) => {
            if (loading) {
              return <ActivityIndicator />;
            }
            if (error) {
              return <ErrorScene message={error.message} />;
            }
            const { count, totalCount, pageInfo, edges } = data.users
            return (
              <FlatList
                data={edges}
                keyExtractor={item => item.cursor}
                onEndReachedThreshold={0.5}
                onEndReached={() =>
                  fetchMore({
                    variables: { first: 400, after: pageInfo.endCursor },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      const newEdges = fetchMoreResult.users.edges;
                      const pageInfo = fetchMoreResult.users.pageInfo;
                      return newEdges.length
                        ? { users: {
                              __typename: previousResult.users.__typename,
                              count,
                              totalCount,
                              pageInfo,
                              edges: [...previousResult.users.edges, ...newEdges]
                          } }
                        : previousResult;
                    }
                  })
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('UserScene', { id: item.node.id, cursor: item.cursor })
                    }
                  >
                    <UserList key={item.cursor} user={item.node} />
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
