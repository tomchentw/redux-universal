import React, { PropTypes } from "react";
import {Link} from "react-router";

import {connect} from "../../decorators";
import * as AppActions from "../../actions/AppActions";

if ("undefined" !== typeof window) {
  require("../../styles/views/ForumListPageView.styl");
}

@connect(function mapStateToProps (state) {
  return {
    forumList: state.ForumReducer.get("forumList"),
  };
})
export default class ForumListPageView extends React.Component {

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static propTypes = {
    forumList: PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { dispatch } = this.props;
    dispatch(AppActions.setTitle("Forum List Page View"));
  }

  render() {
    const { forumList } = this.props;

    return (
      <ul className="forum-list">
        {forumList.map((forum) => (
          <li key={forum.get("id")}>
            <Link
              className="forum-list__link"
              to={`/forums/${ forum.get("id") }`}>
              {forum.get("title")}
            </Link>
          </li>
          // .toArray is still needed due to parent and owner context different in React 0.13
        )).toArray()}
      </ul>
    );
  }
}
