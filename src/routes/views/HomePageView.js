import React, { PropTypes } from "react";

import * as AppActions from "../../actions/AppActions";

if ("undefined" !== typeof window) {
  require("../../styles/views/HomePageView.styl");
}

export default class HomePageView extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount () {
    const { dispatch } = this.props;
    dispatch(AppActions.setTitle("HomePageView", false));
  }

  render() {
    return (
      <div className="home__section-top">
        Content of HomePageView
      </div>
    );
  }
}
