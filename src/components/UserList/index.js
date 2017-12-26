import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPartners, fetchUsers } from '../../actions';
import { map } from 'lodash';
import PartnerTable from './PartnerTable';
import UserTable from './UserTable';

class UserList extends Component {
  state = { partnerFetched: false, userFetched: false };

  componentWillMount() {
    const { fetchPartners, fetchUsers } = this.props;
    fetchPartners()
      .then(() => this.setState({ partnerFetched: true }))
      .catch(msg => alert(msg));
    fetchUsers()
      .then(() => this.setState({ userFetched: true }))
      .catch(msg => alert(msg));
  }

  render() {
    const userList = map(this.props.userList, u => (
      <div key={u.email}>{u.email}</div>
    ));

    return (
      <div>
        <div>
          {this.state.userFetched && <UserTable users={this.props.userList} />}
        </div>
        <div>
          {this.state.partnerFetched && (
            <PartnerTable partners={this.props.partnerList} />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userList: state.userList, partnerList: state.partnerList };
}

export default connect(mapStateToProps, { fetchPartners, fetchUsers })(
  UserList
);
