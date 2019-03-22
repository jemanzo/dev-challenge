import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from 'react-native';
import { Query } from 'react-apollo';

import { ErrorScene, CompanyList } from '../../components';
import { QRY_COMPANIES } from '../../queries';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class CompanysScene extends PureComponent {
  constructor() {
    super();
    // MISSING PAGINATION USING CURSOR!!!
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Query query={QRY_COMPANIES} variables={{ first: 100 }}>
          {({ loading, error, data, fetchMore }) => {
            if (loading) {
              return <ActivityIndicator />;
            }
            if (error) {
              return <ErrorScene message={error.message} />;
            }
            const { count, totalCount, pageInfo, edges } = data.companies
            return (
              <FlatList
                data={edges}
                keyExtractor={item => item.cursor}
                onEndReachedThreshold={0.5}
                onEndReached={() =>
                  fetchMore({
                    variables: { first: 400, after: pageInfo.endCursor },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      const newEdges = fetchMoreResult.companies.edges;
                      const pageInfo = fetchMoreResult.companies.pageInfo;
                      return newEdges.length
                        ? { companies: {
                              __typename: previousResult.companies.__typename,
                              count,
                              totalCount,
                              pageInfo,
                              edges: [...previousResult.companies.edges, ...newEdges]
                          } }
                        : previousResult;
                    }
                  })
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CompanyScene', { id: item.node.id, cursor: item.cursor })
                    }
                  >
                    <CompanyList key={item.cursor} company={item.node} />
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
