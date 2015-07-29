import React, { PropTypes } from "react";

import {connect, createEnterTransitionHook} from "../../decorators";
import * as ForumActions from "../../actions/ForumActions";
import CircularProgress from "../../components/common/CircularProgress";
import Header from "../../components/common/Header";

if ("undefined" !== typeof window) {
  require("../../styles/views/App.styl");
}

function fetchData (dispatch) {
  return dispatch(ForumActions.getForumList());
}

@createEnterTransitionHook(store => (/*state, transition */) => {
  const { AppReducer, ForumReducer } = store.getState();

  if (AppReducer.fetchForServerRendering) {
    return fetchData(store.dispatch);
  }
  if (ForumReducer.get("forumList").isEmpty()) {
    return fetchData(store.dispatch);
  }
})
@connect(state => {
  const { AppReducer } = state;

  return {
    fullTitle: AppReducer.fullTitle,
    isLoginModalActive: AppReducer.isLoginModalActive,
  };
})
export default class App extends React.Component {

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static propTypes = {
    fullTitle: PropTypes.string.isRequired, // Provide by @connect decorator (The return value of the function)
    dispatch: PropTypes.func.isRequired, // Provide by @connect decorator
    isTransitioning: PropTypes.bool.isRequired, // Provide by Route component (who renders this component)
  }

  componentDidUpdate() {
    document.title = this.props.fullTitle;
  }

  render () {
    const {dispatch, isTransitioning} = this.props;

    return (
      <div className="app">
        <Header />
        {this.props.children && (
          React.cloneElement(this.props.children, { dispatch })
        )}
        {isTransitioning && (
          <div className="app__loading">
            <CircularProgress className="app__loading-progress"/>
          </div>
        )}
      </div>
    );
  }
}

export default App;
