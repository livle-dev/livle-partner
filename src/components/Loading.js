import React from 'react';
import ReactLoading from 'react-loading';

export default ({ fullscreen }) => (
  <div
    className={`_flex_1 _hcenter-position _vcenter-position ${fullscreen &&
      '_fullscreen'}`}>
    <ReactLoading
      type="spinningBubbles"
      delay={0}
      color="#FFFFFF"
      width="3rem"
      height="3rem"
    />
  </div>
);
