import React, { Component } from 'react';

class HoverableDiv extends Component {
  state = { hover: false }
  render() {
    const { children, hover, ...otherProps } = this.props
    const onHover = React.cloneElement(hover, {
      style: { position: 'absolute' }
    })
    return (<div {...otherProps}
      onMouseOver={() => this.setState({ hover: true })}
      onMouseOut={() => this.setState({ hover: false })}>
      { children }
      { this.state.hover && onHover }
    </div>)
  }
}

export default HoverableDiv
