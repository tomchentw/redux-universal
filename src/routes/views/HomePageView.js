import React, { PropTypes } from "react";

import {connect} from "../../decorators";
import * as AppActions from "../../actions/AppActions";

if ("undefined" !== typeof window) {
  require("../../styles/views/HomePageView.styl");
}

@connect(null // mapStateToProps
, {// mapDispatchToProps
  setTitle: AppActions.setTitle,
})
export default class HomePageView extends React.Component {

  static propTypes = {
    setTitle: PropTypes.func.isRequired,
  }

  componentWillMount () {
    const { setTitle } = this.props;
    setTitle("HomePageView", false);
  }

  render() {
    return (
      <div className="home__section-top">
        Content of HomePageView
      </div>
    );
  }
}
