import React, { PureComponent } from 'react';
import { ActivityIndicator } from 'react-native';
import { Query } from 'react-apollo';
import { Company, ErrorScene } from '../../components';
import { QRY_COMPANY_FULL } from '../../queries';

export default class CompanyScene extends PureComponent {
  render() {
    // todo: 2(done!). would be really cool to show the company info here.
    // todo: 3. would be extra cool to show the employee list and make it navigate to that user on tap.

    const { navigation } = this.props;
    const id = navigation.getParam('id');

    return (
      <Query query={QRY_COMPANY_FULL} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <ActivityIndicator />;
          }
          if (error) {
            return <ErrorScene message={error.message} />;
          }
          return <Company company={data.company} />;
        }}
      </Query>
    );
  }
}
