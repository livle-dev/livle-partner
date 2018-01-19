import React from 'react';
// images
import { background } from '../../images';
// style
import { backgroundImage } from '../../styles/javascript';

export default ({ children }) => (
  <div
    id="session"
    className="_fullscreen _flex _hcenter-position _vcenter-position"
    style={backgroundImage(background.session_bg)}>
    {children}
  </div>
);
