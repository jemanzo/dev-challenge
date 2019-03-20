import React, { PureComponent } from 'react';
import { ActivityIndicator } from 'react-native';
import { Query } from 'react-apollo';
import { User, ErrorScene } from '../../components';
import { QRY_USER_FULL } from '../../queries';

export default class UserScene extends PureComponent {
  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');

    // todo: 2(done!). would be cool if we actually displayed full user data that is contained in the user data object.

    // todo: 3. would be extra cool to include their company info, and if you tap on it you can go that CompanyScene.
    // if this is done correctly, we should be re-using components from the CompaniesScene.

    // todo: 4. would be even cooler to see a list of their friends, so I can tap on them an get more info about that user.
    // todo: 5 would be cool to make the user name and email updateable and saved ot the database, so we can let our users change their info.
    return (
      <Query query={QRY_USER_FULL} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <ActivityIndicator />;
          }
          if (error) {
            return <ErrorScene message={error.message} />;
          }
          return <User user={data.user} />;
        }}
      </Query>
    );
  }
}
