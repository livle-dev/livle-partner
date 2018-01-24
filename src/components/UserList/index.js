import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPartners, fetchUsers } from '../../actions';
import { map } from 'lodash';
// view
import PartnerTable from './PartnerTable';
import UserTable from './UserTable';
import Loading from '../Loading';
import Content from '../Content';

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
    return (
      <div>
        <div>
          {this.state.partnerFetched ? (
            <PartnerTable partners={this.props.partnerList} />
          ) : (
            <Content title="파트너 목록" backgroundColor="rgba(0, 0, 0, 0.58)">
              <Loading />
            </Content>
          )}
        </div>
        <div>
          {this.state.userFetched ? (
            <UserTable users={this.props.userList} />
          ) : (
            <Content title="회원 목록" backgroundColor="rgba(20, 42, 41, 0.58)">
              <Loading />
            </Content>
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
