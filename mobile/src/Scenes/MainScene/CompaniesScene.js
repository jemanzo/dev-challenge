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
import { ErrorScene, CompanyList } from '../../components';
import { QRY_COMPANIES } from '../../queries';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class CompaniesScene extends PureComponent {
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
          this.props.navigation.navigate('CompanyScene', {
            id: item.node.id,
            cursor: item.cursor
          });
        }}
      >
        <CompanyList key={item.cursor} company={item.node} />
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
          query={QRY_COMPANIES}
          variables={{ first: 40, name: this.state.search }}
        >
          {({ loading, error, data, fetchMore }) => {
            if (loading) {
              return <ActivityIndicator />;
            }
            if (error) {
              return <ErrorScene message={error.message} />;
            }
            const { count, totalCount, pageInfo, edges } = data.companies;
            return (
              <FlatList
                data={edges}
                keyExtractor={item => item.cursor}
                onEndReachedThreshold={0.5}
                onEndReached={() =>
                  fetchMore({
                    variables: { first: 80, after: pageInfo.endCursor },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      const newEdges = fetchMoreResult.companies.edges;
                      const pageInfo = fetchMoreResult.companies.pageInfo;
                      return newEdges.length
                        ? {
                            companies: {
                              __typename: previousResult.companies.__typename,
                              count,
                              totalCount,
                              pageInfo,
                              edges: [
                                ...previousResult.companies.edges,
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
