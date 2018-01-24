import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { fetchPartnersByCompany } from '../../actions';

const renderSuggestion = (p, { query, isHighlighted }) =>
  (<div style={
    {color: 'white', padding: '1rem', position: 'absolute',
      background: 'gray', opacity: isHighlighted ? 1 : 0.5 } }>
      {p.company}
    </div>)

class PartnerSuggest extends Component {
  constructor() {
    super()
    this.state = { partners: [], company: '' }
    this.fetch = this.fetch.bind(this)
  }

  fetch(value) {
    fetchPartnersByCompany(value).then((res) => {
      this.setState({ partners: res.data.data })
    })
  }

  render() {
    const onSuggestionSelected = (event, { suggestion }) =>
      this.props.handleSelect(suggestion.id)

    return (
      <Autosuggest suggestions={this.state.partners}
        onSuggestionsFetchRequested={({ value }) => this.fetch(value)}
        onSuggestionsClearRequested={() => this.setState({ partners: [] })}
        getSuggestionValue={(p) => p.company}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={ {
          value: this.state.company,
          onChange: (e, {newValue}) => this.setState({ company: newValue })
        } } />
    )
  }
}

export default PartnerSuggest
