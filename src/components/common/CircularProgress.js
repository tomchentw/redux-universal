import React from "react";

import shouldImmutableComponentUpdate from "../../utils/shouldImmutableComponentUpdate";

class CircularProgress extends React.Component {
  shouldComponentUpdate = shouldImmutableComponentUpdate;

  render() {
    return (
      <div style={{fontSize: 60, paddingTop: 100}}>
        Loading ...
      </div>
    );
  }
}

export default CircularProgress;
