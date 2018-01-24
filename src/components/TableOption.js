// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Text } from 'react-form';
import Autosuggest from 'react-autosuggest';

export default class TableOption extends Component {
  static propTypes = {
    field: PropTypes.string,
    placeholder: PropTypes.string,
    onSubmit: PropTypes.func,
    fetchAction: PropTypes.func,
  };

  state = { suggest: [] };

  // fetch(value) {
  //   const { fetchAction } = this.props;
  //   fetchAction().then(res => this.setState({ suggest: res.data }));
  // }

  render() {
    const { children } = this.props;
    return (
      <div className="_table-option-container _flex _vcenter-position">
        {/*
          <Form
            onSumbit={this.props.onSubmit}
            defaultValues={{value: ''}}>
            {formApi => (
              <form onSubmit={formApi.submitForm} id="table-option-form">
                <Text field={this.props.field} placeholder={this.props.placeholder}>
                  <Autosuggest
                    suggestions={this.state.suggest}
                    onSuggestionsFetchRequested={({ value }) => this.fetch(value)}
                    onSuggestionsClearRequested={() => this.setState({ suggest: [] })}
                </Text>
              </form>
            )}
          </Form>
        />
        */}
        {children}
      </div>
    );
  }
}
