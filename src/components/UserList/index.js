import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPartners, fetchUsers } from '../../actions';
import { map } from 'lodash';
// view
import PartnerTable from './PartnerTable';
import UserTable from './UserTable';

class UserList extends Component {
  state = { partnerFetched: false, userFetched: false, partnerApproved: false };

  componentWillMount() {
    const { fetchPartners, fetchUsers } = this.props;
    fetchPartners(false)
      .then(() => this.setState({ partnerFetched: true }))
      .catch(msg => alert(msg));
    fetchUsers()
      .then(() => this.setState({ userFetched: true }))
      .catch(msg => alert(msg));
  }

  changeApprovedStatus = () => {
    const { fetchPartners } = this.props;
    const { partnerApproved } = this.state;
    this.setState({ partnerFetched: false, partnerApproved: !partnerApproved });
    fetchPartners(!partnerApproved)
      .then(() => this.setState({ partnerFetched: true }))
      .catch(msg => alert(msg));
  };

  render() {
    return (
      <div id="user-list">
        <PartnerTable
          partners={this.props.partnerList}
          fetched={this.state.partnerFetched}
          toggle={!this.state.partnerApproved}
          onClick={this.changeApprovedStatus}
        />
        <UserTable
          users={this.props.userList}
          fetched={this.state.userFetched}
        />
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
