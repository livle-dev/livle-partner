import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLimit } from '../../actions';

class ReservationCounter extends Component {
  state = { newLimit: null }

  render() {
    const { subscription } = this.props
    const openForm = () =>
      this.state.newLimit || this.setState({ newLimit: limit })
    const closeForm = () => this.setState({ newLimit: null })
    const submitForm = () => {
      this.props.updateLimit(subscription.id, this.state.newLimit)
        .then(closeForm).catch((msg) => alert(msg))
    }
    const renderForm = () => {
      return (<div>
        <div>
          <input type="number" value={this.state.newLimit}
            onChange={(e) => {
              this.setState({ newLimit: e.target.value })
            }}/>
        </div>
        <div>
          <button onClick={submitForm}>수정</button> <button onClick={closeForm}>취소</button>
        </div>
      </div>)
    }
    const limit = subscription.limit
    const stats = `${subscription.reservations.length} / ${limit}`
    return (<div onClick={openForm}>
      { this.state.newLimit ? renderForm() : stats }
      </div>)
  }
}

export default connect(null, { updateLimit })(ReservationCounter)
