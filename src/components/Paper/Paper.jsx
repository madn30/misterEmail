import React from 'react';

const Paper = React.forwardRef((props, ref) => (
  <section ref={ref} className={`paper ${props.className}`}>
    {props.children}
  </section>
));

export default Paper;