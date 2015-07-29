import {OrderedSet} from "immutable";
import React, {PropTypes} from "react";

import {connect, createEnterTransitionHook} from "../../decorators";
import * as AppActions from "../../actions/AppActions";
import * as PostActions from "../../actions/PostActions";
import PostList from "../../components/common/PostList";

if ("undefined" !== typeof window) {
  require("../../styles/views/ForumPostPageView.styl");
}

function fetchData (dispatch, forumId) {
  return dispatch(PostActions.getPostList(forumId));
}

@createEnterTransitionHook(store => (state/*, transition */) => {
  const { AppReducer, PostReducer } = store.getState();
  const { forumId } = state.params;

  if (AppReducer.fetchForServerRendering) {
    return fetchData(store.dispatch, forumId);
  }
  if (!PostReducer.hasIn(["postIdsByForumId", forumId])) {
    return fetchData(store.dispatch, forumId);
  }
})
@connect((state, props) => {
  const { ForumReducer, PostReducer } = state;
  const { params: { forumId } } = props;

  const forum = ForumReducer.get("forumList").find(item => forumId === item.get("id"));
  const posts = PostReducer.getIn(["postIdsByForumId", forumId], new OrderedSet())
    .map(id => PostReducer.getIn(["postById", id]));

  return {
    forum,
    posts,
  };
})
export default class ForumPostPageView extends React.Component {

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    forum: PropTypes.object,
    posts: PropTypes.object,
  }

  componentWillMount () {
    const { dispatch, forum } = this.props;

    dispatch(AppActions.setTitle(`${ forum.get("title") } | ForumPostPageView`));
  }

  render () {
    const {params, forum, posts} = this.props;

    return (
      <div>
        <header className="forum__header">
          <h2 className="forum__title">{forum.get("title")}</h2>
        </header>
        <PostList
          forumId={params.forumId}
          posts={posts}
        />
      </div>
    );
  }
}
