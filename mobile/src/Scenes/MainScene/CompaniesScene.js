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

export default class CompaniesScene extends PureComponent {
  constructor() {
    super();
    // MISSING PAGINATION USING CURSOR!!!
  }
  render() {
    // todo: 2(done!). would be cool if we actually queried the graphql server for companies and displayed them here.
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Query query={QRY_COMPANIES}>
          {({ loading, error, data }) => {
            if (loading) {
              return <ActivityIndicator />;
            }
            if (error) {
              return <ErrorScene message={error.message} />;
            }
            return (
              <FlatList
                data={data.companies}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CompanyScene', { id: item.id })
                    }
                  >
                    <CompanyList key={item.id} company={item} />
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
