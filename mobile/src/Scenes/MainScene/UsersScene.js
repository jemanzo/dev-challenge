import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from 'react-native';
import { Query } from 'react-apollo';
import { SearchBar } from 'react-native-elements';
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
    this.state = { search: '' };
    this.updateSearch = this.updateSearch.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }
  updateSearch(search) {
    this.setState({ search });
  }
  _renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('UserScene', {
            id: item.node.id,
            cursor: item.cursor
          });
        }}
      >
        <UserList key={item.cursor} user={item.node} />
      </TouchableOpacity>
    );
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <SearchBar
          round={true}
          lightTheme={true}
          showLoading={this.state.loading}
          placeholder="search..."
          onChangeText={this.updateSearch}
          value={this.state.search}
        />
        <Query
          query={QRY_USERS}
          variables={{ first: 100, name: this.state.search }}
        >
          {({ loading, error, data, fetchMore }) => {
            if (loading) {
              return <ActivityIndicator />;
            }
            if (error) {
              return <ErrorScene message={error.message} />;
            }
            const { count, totalCount, pageInfo, edges } = data.users;
            return (
              <FlatList
                data={edges}
                keyExtractor={item => item.cursor}
                onEndReachedThreshold={50}
                onEndReached={() =>
                  fetchMore({
                    variables: { first: 400, after: pageInfo.endCursor },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      const newEdges = fetchMoreResult.users.edges;
                      const pageInfo = fetchMoreResult.users.pageInfo;
                      return newEdges.length
                        ? {
                            users: {
                              __typename: previousResult.users.__typename,
                              count,
                              totalCount,
                              pageInfo,
                              edges: [
                                ...previousResult.users.edges,
                                ...newEdges
                              ]
                            }
                          }
                        : previousResult;
                    }
                  })
                }
                renderItem={this._renderItem}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}
